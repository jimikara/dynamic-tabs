<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import draggable from 'vuedraggable'
import type { MoveEvent } from 'vuedraggable'
import { useTabStore } from '@/store/tabs'
import SearchTab from '@/components/SearchTab.vue'
import Loader from '@/components/Loader.vue'
import type { Tab } from 'tabs'

const tabStore = useTabStore()
const drag = ref(false)
const tabBeingDragged = ref<string | null>(null)

const checkMove = (evt: MoveEvent<Tab>) => {
  tabBeingDragged.value = evt.draggedContext.element.id
  tabStore.setActiveTab(evt.draggedContext.element.id)
}

const dragStart = () => {
  drag.value = true
}

const dragEnd = () => {
  drag.value = false
}

const showLoader = computed(() => {
  return tabStore.tabs?.length < 7 && tabStore.isLoading
})

onMounted(() => {
  tabStore.setActiveTab(tabStore.tabs[0]?.id)
})
</script>

<template>
  <section class="tabs">
    <draggable
      v-model="tabStore.tabs"
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

  @media screen and (max-width: 1060px) {
    overflow-x: auto;
  }

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
