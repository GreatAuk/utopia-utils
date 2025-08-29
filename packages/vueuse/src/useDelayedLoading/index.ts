import type { Ref, MaybeRefOrGetter} from 'vue'
import type { TimeOut } from '@utopia-utils/type';

import { ref, watch, toValue } from 'vue';

import { tryOnScopeDispose } from '../utils';

interface Options {
  /**
   * 延迟显示 loading 的时间 (ms)
   * @default 300
   */
  delay?: MaybeRefOrGetter<number>;
  /**
   * Loading 动画的最小显示时间 (ms)
   * @default 500
   */
  minDisplayTime?: MaybeRefOrGetter<number>;
}

interface Result {
  loadingDelayed: Ref<boolean>;
  /**
   * 清理所有定时器，防止内存泄漏
   */
  cleanup: () => void;
}

/**
 * 处理异步请求时 loading 的闪烁问题。
 *
 * 思路：延迟（默认 300ms）显示 loading，如果请求在 300ms 内完成，则不显示 loading；如果超过 300ms 则显示 loading，并且最少显示 500ms（默认）。
 *
 * @param {Ref<boolean>} loading - 用于控制 loading 状态的响应式引用
 * @param {object} options - 配置项
 * @param {MaybeRefOrGetter<number>} [options.delay=300] - 延迟显示 loading 的毫秒数
 * @param {MaybeRefOrGetter<number>} [options.minDisplayTime=500] - loading 动画的最小显示时间 (ms)
 *
 * @see https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useDelayedLoading/README.md
 */
export function useDelayedLoading(loading: Ref<boolean>, options: Options = {}): Result {
  const { delay = 300, minDisplayTime = 500 } = options;

  const loadingDelayed = ref(false);

  let showTimer: TimeOut | null = null;
  let hideTimer: TimeOut | null = null;
  let startTime: number | null = null;

  /** 清理所有定时器的函数 */
  const cleanup = () => {
    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
    }
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  };

  watch(loading, (newVal) => {
    if (newVal === true) {
      // 开始加载
      cleanup(); // 先清理可能存在的定时器
      startTime = Date.now(); // 记录开始时间
      loadingDelayed.value = false; // 重置状态

      showTimer = setTimeout(() => {
        loadingDelayed.value = true;
      }, toValue(delay));
    }

    if (newVal === false) {
      // 停止加载

      cleanup(); // 清理所有定时器

      if (startTime !== null && loadingDelayed.value) {
        /** loading 已显示，需要确保最小显示时间 */
        const elapsedTime = Date.now() - startTime;
        const displayTime = elapsedTime - toValue(delay); // 实际显示时间
        const remainingTime = toValue(minDisplayTime) - displayTime;

        if (remainingTime > 0) {
          hideTimer = setTimeout(() => {
            loadingDelayed.value = false;
            startTime = null; // 重置开始时间
          }, remainingTime);
        } else {
          loadingDelayed.value = false;
          startTime = null; // 重置开始时间
        }
      } else {
        /** loading 状态还未显示，直接取消 */
        loadingDelayed.value = false;
        startTime = null; // 重置开始时间
      }
    }
  });

  // 在组件卸载时清理定时器
  tryOnScopeDispose(cleanup);

  // 返回结果和清理函数
  return { loadingDelayed, cleanup };
}