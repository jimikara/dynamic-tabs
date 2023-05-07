<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { VNodeRef } from 'vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import type { Tab } from '@/types'
import { useTabStore } from '@/store/tabs'
import TabHeadingLoader from '@/components/TabHeadingLoader.vue'

const store = useTabStore()

type PropTypes = {
  tab: Tab
  isDragging: boolean
  tabBeingDragged: string | null
}

const props = defineProps<PropTypes>()
const tabEl = ref<VNodeRef | null>(null)

const isFirstTab = computed(() => {
  return store.firstTabId === props.tab.id
})

watch(
  () => store.activeTabId,
  newValue => {
    if (newValue === props.tab.id) {
      tabEl.value.focus()
    }
  }
)

const isActiveTab = computed(() => {
  return store.activeTabId === props.tab.id
})

onMounted(() => {
  if (store.activeTabId === props.tab.id) {
    tabEl.value.focus()
  }
})
</script>

<template>
  <div
    ref="tabEl"
    class="tab"
    :class="{
      'tab--is-dragging': isDragging && props.tabBeingDragged === props.tab.id,
      'tab--active': isActiveTab
    }"
    :tabindex="isFirstTab ? 0 : -1"
    role="button"
    @click="store.setActiveTab(props.tab.id)"
    @keydown.left="store.selectPreviousTab(props.tab.id)"
    @keydown.right="store.selectNextTab(props.tab.id)"
    @keydown.enter="store.setActiveTab(props.tab.id)"
    @keydown.space="store.setActiveTab(props.tab.id)"
    @keydown.delete="store.removeTab(props.tab)"
  >
    <TabHeadingLoader
      v-if="
        store.isLoading &&
        store.activeTabId === props.tab.id &&
        !props.tab.search
      "
    />
    <div v-else class="tab__text">{{ props.tab.search }}</div>
    <CloseIcon
      role="button"
      class="tab__close-icon"
      tabindex="0"
      @click.stop="store.removeTab(props.tab)"
    />
  </div>
</template>

<style scoped lang="scss">
.tab {
  width: 160px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-left: $border-dark;
  border-top: $border-dark;
  border-right: $border-dark;
  position: relative;

  &:not(:last-child) {
    border-right: none;
  }

  &:hover {
    cursor: grab;
  }

  &:focus-visible,
  &:focus {
    outline: none;
    text-decoration: underline; // TODO: improve focus style.  Make global util
  }

  &--is-dragging {
    background: map-get($palette, 'primary');
  }

  &--active {
    &:after {
      content: ' ';
      position: absolute;
      width: 100%;
      height: 3px;
      right: 0;
      bottom: -2px;
      background: #fff;
    }
  }

  &__text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 1rem;
  }

  &__close-icon {
    height: 24px;
    cursor: pointer;
  }
}
</style>
