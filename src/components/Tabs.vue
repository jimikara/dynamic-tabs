<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { VNodeRef } from 'vue'
import draggable from 'vuedraggable'
import { useTabStore } from '@/store/tabs'
import type { Tab } from '@/types'
import SearchTab from '@/components/SearchTab.vue'
import Loader from '@/components/Loader.vue'

const store = useTabStore()
// const tabEl = ref<HTMLElement | null>(null)
const drag = ref(false)
const tabBeingDragged = ref<Tab | null>(null) // Todo get event

const checkMove = (evt: any, originalEvent: any) => {
  tabBeingDragged.value = evt.draggedContext.element.id
  store.setActiveTab(evt.draggedContext.element.id)
}

const dragStart = (evt: any) => {
  drag.value = true
}

const dragEnd = (evt: any) => {
  drag.value = false
}

const showLoader = computed(() => {
  return store.tabs?.length < 7 && store.isLoading
})

onMounted(() => {
  store.setActiveTab(store.tabs[0]?.id)
  // focus first tab
})
</script>

<template>
  <section class="tabs">
    <draggable
      v-model="store.tabs"
      item-key="id"
      class="tabs__draggable-container"
      :move="checkMove"
      @start="dragStart"
      @end="dragEnd"
    >
      <template #item="{ element }">
        <SearchTab
          :tab="element"
          :is-dragging="drag"
          :tab-being-dragged="tabBeingDragged"
        />
      </template>
    </draggable>
    <div v-if="showLoader" class="tabs__loader-wrapper">
      <Loader class="tabs__loader" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.tabs {
  width: 100%;
  margin-top: 2.4rem;
  font-size: 1.4rem;
  position: relative;
  z-index: 1001;
  display: flex;
  // overflow-x: scroll;

  &__draggable-container {
    display: inline-flex;
  }

  &__loader-wrapper {
    width: 160px;
    height: 50px;
    position: relative;
  }

  &__loader {
    position: absolute;
    top: 50%;
    left: 1.2rem;
    transform: translateY(-50%);
  }
}
</style>
