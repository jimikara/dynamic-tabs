<script setup lang="ts">
import BlockIcon from 'vue-material-design-icons/BlockHelper.vue'
</script>

<template>
  <div class="form-error">
    <BlockIcon class="form-error__icon" />
    <slot></slot>
  </div>
</template>

<style lang="scss">
.form-error {
  display: flex;
  position: relative;
  color: map-get($palette, 'dark');
  font-size: 1.2rem;
  align-items: center;
  padding: 1.2rem 0;

  &__icon {
    position: relative;
    top: 0.1rem;
    > .material-design-icon__svg {
      width: 1.6rem;
      height: 1.6rem;
    }
    margin-right: 0.5rem;
  }
}
</style>
