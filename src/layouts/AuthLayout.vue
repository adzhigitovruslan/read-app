<script setup lang="ts"></script>

<template>
  <div>
    <div class="overlay"></div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  pointer-events: auto;
  background-color: #000;
  border-radius: inherit;
  bottom: 0;
  left: 0;
  opacity: 0.32;
  position: fixed;
  right: 0;
  top: 0;
}
</style>
