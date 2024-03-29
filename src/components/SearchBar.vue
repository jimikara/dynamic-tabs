<script setup lang="ts">
import { computed, ref } from 'vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import FormError from '@/components/FormError.vue'
import { useTabStore } from '@/store/tabs'

const store = useTabStore()

const search = () => {
  if (!searchTerm.value || searchTerm.value?.length === 0) {
    return
  }

  store.fetchSearchResults(searchTerm.value)

  searchTerm.value = ''
}

const searchTerm = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

const clearSearch = () => {
  searchTerm.value = ''
  searchInput.value?.focus()
}

const tabLimitReached = computed(() => {
  return store.tabs.length >= 7
})
</script>

<template>
  <section class="search-bar">
    <div :class="{ 'search-bar__input-wrapper--disabled': tabLimitReached }">
      <button
        class="search-bar__search-button"
        aria-label="search"
        @click="search"
      >
        <MagnifyIcon
          tabindex="0"
          fillColor="#fff"
          class="search-bar__search-button-icon"
        />
      </button>
      <input
        ref="searchInput"
        v-model="searchTerm"
        type="text"
        placeholder="Search dictionary"
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
    </div>
    <FormError v-if="tabLimitReached" class="search-bar__tab-limit-error">
      Tab limit reached
    </FormError>
  </section>
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
    border: 2px solid map-get($palette, 'black');

    &:focus {
      outline: none;
    }
  }

  &__input-wrapper {
    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__search-button {
    position: absolute;
    top: 0;
    width: 46px;
    height: 46px;
    background: map-get($palette, 'black');
    border: $border-dark;
    padding: 0;
    cursor: pointer;

    &:hover {
      background: map-get($palette, 'primary');
    }
  }

  &__search-button-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

  &__tab-limit-error {
    position: absolute;
    top: 46px;
  }
}
</style>
