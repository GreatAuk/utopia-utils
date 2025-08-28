import type { Ref, ShallowRef } from 'vue';

import { onScopeDispose, ref, shallowRef } from 'vue';

import { deepClone, isFunction } from '@utopia-utils/core';
import { watchDebounced } from '@vueuse/core';

type UseTableOptions<Filters> = {
  defaultFilters?: (() => Filters) | Filters;
  /**
   * 默认分页数量
   * @default 10
   */
  defaultPageSize?: number;
  /**
   * searchType 为 simple 时，表单项更新的 debounce 时间
   * @default 400
   */
  searchDebounce?: number;
  /** 表单类型
   * simple, 每个表单项更新，会自动更新 filters，同步 url, 触发接口请求。
   * advance, 需要手动搜索按钮，调用 search.submit()，才会更新 filters，同步 url, 触发接口请求。
   * @default 'advance'
   */
  searchType?: 'advance' | 'simple';
};

type TableSort = {
  field: string;
  order?: 'ascend' | 'descend' | null;
};
type UseTableReturn<Filters> = {
  pageSize: Ref<number>;
  currentPage: Ref<number>;
  sort: ShallowRef<TableSort | undefined>;
  filters: Ref<Filters>;
  setDefaultFilters: (filters: Filters) => void;
  search: {
    submit: () => void;
    reset: () => void;
    formState: Ref<Filters>;
  };
};

/* 强制刷新标识符，避免污染用户数据 */
const FORCE_REFRESH_SYMBOL = '__now__';

/**
 * `useTable` 是一个用于管理表格状态的 Vue 3 组合式函数，提供了分页、排序、过滤和搜索功能的完整解决方案。
 *
 * 轻量封装，减少模板代码
 *
 * @see https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useTable/README.md
 */
export function useTable<Filters extends Record<string, any>>(
  options?: UseTableOptions<Filters>,
): UseTableReturn<Filters> {
  const {
    defaultFilters = {} as Filters,
    searchType = 'advance',
    defaultPageSize = 10,
    searchDebounce = 400,
  } = options || {};

  const pageSize = ref(defaultPageSize);
  const currentPage = ref(1);
  const sort = shallowRef<TableSort>();
  const filters = ref<Filters>(
    deepClone(getDefaultFilters(defaultFilters)),
  ) as Ref<Filters>;
  const formState = ref<Filters>(
    deepClone(getDefaultFilters(defaultFilters)),
  ) as Ref<Filters>;

  const onFormChange = ({ forceRefresh }: { forceRefresh?: boolean }) => {
    filters.value = deepClone({
      ...formState.value,
      // 强制刷新（tanstack/query 在 queryKey 相同时不会触发更新）
      ...(forceRefresh ? { [FORCE_REFRESH_SYMBOL]: Date.now() } : {}),
    });
    if (currentPage.value !== 1) currentPage.value = 1; // 更新 currentPage, 会触发 watch, 重新设置 query
  };

  const submit: () => void = () => onFormChange({ forceRefresh: true });

  const reset: () => void = () => {
    formState.value = deepClone(getDefaultFilters(defaultFilters));

    onFormChange({ forceRefresh: true });
  };

  if (searchType === 'simple') {
    watchDebounced(formState, onFormChange, {
      debounce: searchDebounce,
      deep: true,
    });
  }

  /* 处理内存泄漏：保存清理函数 */
  let stopWatcher: (() => void) | undefined;

  /* 组件卸载时清理监听器 */
  onScopeDispose(() => {
    stopWatcher?.();
  });

  return {
    pageSize,
    currentPage,
    sort,
    filters,
    search: {
      submit,
      reset,
      formState,
    },
  };
}

function getDefaultFilters<T>(defaultFilters: (() => T) | T) {
  if (isFunction(defaultFilters)) {
    return defaultFilters();
  }
  return defaultFilters;
}
