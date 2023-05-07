<script setup lang="ts"></script>

<template>
  <div class="loader">
    <div class="loader__element"></div>
    <div class="loader__element"></div>
    <div class="loader__element"></div>
    <div class="loader__element"></div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  width: 2rem;
  height: 2rem;
  padding: 0.2rem;
  position: relative;

  &__element {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    background: map-get($palette, 'midgray');
    display: inline-block;
    animation: loader 1.2s ease infinite;

    &:nth-child(1) {
      top: 0;
      left: 0;
    }

    &:nth-child(2) {
      top: 0;
      right: 0;
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      bottom: 0;
      left: 0;
      animation-delay: 0.9s;
    }

    &:nth-child(4) {
      bottom: 0;
      right: 0;
      animation-delay: 0.6s;
    }
  }

  @keyframes loader {
    0% {
      background: map-get($palette, 'white');
    }
    50% {
      background: map-get($palette, 'secondary');
    }
    100% {
      background: map-get($palette, 'white');
    }
  }
}
</style>
