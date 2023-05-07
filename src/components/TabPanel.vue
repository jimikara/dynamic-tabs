<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import { useTabStore } from '@/store/tabs'

const store = useTabStore()
</script>

<template>
  <div class="tab-panel">
    <Loader v-if="store.isLoading" class="tab-panel__loader" />
    <!-- <Loader v-if="true" class="tab-panel__loader" /> -->
    <template v-else>
      <a href="https://google.com">Test link</a>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum tenetur
        asperiores quia consequuntur dolor enim eaque officiis, quos molestiae
        blanditiis eius commodi repellat dolorem, vitae rerum ullam iure
        corporis laboriosam?
      </p>
    </template>
  </div>
</template>

<style scoped lang="scss">
.tab-panel {
  height: calc(100vh - 284px);
  padding: 1.2rem;
  border-left: $border-dark;
  border-right: $border-dark;
  border-top: $border-dark;
  background: #fff;
  position: relative;

  &__loader {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 12rem;
  }
}
</style>
