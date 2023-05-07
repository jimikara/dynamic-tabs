<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { VNodeRef } from 'vue'
import draggable from 'vuedraggable'
import { useTabStore } from '@/store/tabs'
import SearchTab from '@/components/SearchTab.vue'
import type { Tab } from '@/types'

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
      @change="log"
    >
      <template #item="{ element }">
        <SearchTab
          :tab="element"
          :is-dragging="drag"
          :tab-being-dragged="tabBeingDragged"
        />
      </template>
    </draggable>
  </section>
</template>

<style scoped lang="scss">
.tabs {
  width: 100%;
  margin-top: 2.4rem;
  font-size: 1.4rem;
  position: relative;
  z-index: 1001;

  &__draggable-container {
    display: inline-flex;
  }
}
.endbit {
  flex: 1;
  background: peachpuff;
}
</style>
