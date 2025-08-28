<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { loadScript } from '@utopia-utils/core'

let unload_: any

function loadScript_() {
  const { unload } = loadScript('https://unpkg.com/browse/axios@1.3.224/index.js', {
    appendPosition: 'body',
    onStatusChange: () => {
    },
  })
  unload_ = unload
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">
          HomeView
        </RouterLink>
        <RouterLink to="/use-fake-progress">
          UseFakeProgress
        </RouterLink>
        <RouterLink to="/use-sms-countdown">
          UseSmsCountdown
        </RouterLink>
        <RouterLink to="/use-delayed-loading">
          UseDelayedLoading
        </RouterLink>
        <RouterLink to="/use-deferred-toggle">
          UseDeferredToggle
        </RouterLink>
      </nav>
    </div>
  </header>

  <div style="padding: 1rem;">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

nav {
  width: 100%;
  text-align: center;
  display: flex;
  gap: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
