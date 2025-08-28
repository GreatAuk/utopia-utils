<script setup lang='ts'>
</script>

<template>
  <div class="code-section">
    <h2>代码示例</h2>
      <slot></slot>
  </div>
</template>

<style>
.code-section{
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: white;
  pre {
    margin-top: 20px;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
  }

  code {
    color: #16a085;
  }
}
</style>