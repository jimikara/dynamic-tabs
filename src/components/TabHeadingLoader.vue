<script setup lang="ts"></script>

<template>
  <div class="tab-heading-loader">
    <div class="tab-heading-loader__element"></div>
    <div class="tab-heading-loader__element"></div>
    <div class="tab-heading-loader__element"></div>
    <div class="tab-heading-loader__element"></div>
  </div>
</template>

<style scoped lang="scss">
.tab-heading-loader {
  display: flex;

  &__element {
    width: 0.8rem;
    height: 0.8rem;
    background: map-get($palette, 'midgray');
    margin-right: 0.3rem;
    animation: loader 1.2s ease infinite;

    &:nth-child(1) {
      top: 0;
      left: 0;
    }

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.9s;
    }

    &:nth-child(4) {
      animation-delay: 0.6s;
    }
  }

  @keyframes loader {
    // Todo: move to shared styles
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
