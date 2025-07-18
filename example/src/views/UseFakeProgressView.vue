<script setup lang='ts'>
import { useFakeProgress } from '@utopia-utils/vueuse'

const { progress, startProgress, stopProgress, incProgress, doneProgress, resetProgress, setProgress } = useFakeProgress()

function start() {
  startProgress()
  // 假设某个异步操作完成后，设置进度为100%
  setTimeout(() => {
    doneProgress()
  }, 4000)
}
</script>

<template>
  <div>
    <h1>UseFakeProgressView</h1>

    <div style="display: flex; align-items: center; gap: 1rem;">
      <progress :value="progress" max="1" style="width: 100%; margin-top: 1rem;"></progress>
      <span>{{ Math.floor(progress * 100) }}%</span>
    </div>

    <div>
      Current progress: {{ progress }}
    </div>

    <div class="buttons">
      <button @click="start">
        Start
      </button>
      <button @click="stopProgress">
        Stop
      </button>
      <button @click="incProgress()">
        Increment
      </button>
      <button @click="doneProgress">
        Finish
      </button>
      <button @click="resetProgress">
        Reset
      </button>
      <button @click="setProgress(0.7)">
        Set 70%
      </button>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  margin-top: 1rem;
}
button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
