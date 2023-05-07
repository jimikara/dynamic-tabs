<script setup lang="ts">
import { computed, ref } from 'vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { useTabStore } from '@/store/tabs'

const store = useTabStore()

const search = (event: any) => {
  if (!event.target.value || event.target.value?.length === 0) {
    return
  }

  store.fetchSearchResults(event.target.value).catch((error: any) => {
    console.log('ERRR', error)
  })
}

const searchTerm = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

const tabLimitReached = computed(() => {
  return store.tabs.length >= 7
})

const clearSearch = () => {
  searchTerm.value = ''
  searchInput.value?.focus()
}
</script>

<template>
  <section class="search-bar">
    <button class="search-bar__search-button">
      <MagnifyIcon
        role="button"
        tabindex="0"
        class="search-bar__search-button-icon"
        @click="search"
      />
    </button>
    <input
      ref="searchInput"
      v-model="searchTerm"
      type="text"
      placeholder="search"
      class="search-bar__input"
      :disabled="tabLimitReached"
      @keydown.enter="search"
    />
    <CloseIcon
      v-if="searchTerm.length > 0"
      role="button"
      tabindex="0"
      class="search-bar__icon search-bar__icon--close"
      @click="clearSearch"
      @keydown.enter="clearSearch"
    />
  </section>
  <div class="form-error">
    <p v-if="tabLimitReached">You have reached the tab limit</p>
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  position: relative;
  margin-top: 1.2rem;
  margin-bottom: 2.4rem;

  &__input {
    width: 100%;
    height: 46px;
    font-size: 1.6rem;
    padding: 1.2rem;
    padding-left: 5.8rem;
    border: 2px solid map-get($palette, 'midgray');

    &:focus {
      outline: none;
      // border: 2px solid orange;
    }
  }

  &__search-button {
    position: absolute;
    top: 0;
    width: 46px;
    height: 46px;
    background: map-get($palette, 'midgray');
    border: 0;
    padding: 0;
    cursor: pointer;

    &-icon {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    position: absolute;
    transform: translateY(-50%);
    cursor: pointer;

    &--close {
      top: 2.4rem;
      right: 1.2rem;
    }
  }
}
</style>