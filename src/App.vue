<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '@/components/Tabs.vue'
import TabPanel from '@/components/TabPanel.vue'
import SearchBar from '@/components/SearchBar.vue'
import EmptyState from '@/components/EmptyState.vue'
import Loader from '@/components/Loader.vue'
import { useTabStore } from '@/store/tabs'

const isLoading = ref(true)

const store = useTabStore()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="site-name">Dynamic Tabs</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <SearchBar />
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div v-if="store.tabs.length > 0 || store.isLoading" class="row">
        <div class="col-md-12">
          <Tabs />
        </div>
      </div>
      <div v-if="store.tabs.length > 0" class="row">
        <div class="col-md-12">
          <TabPanel />
        </div>
      </div>
      <template v-if="store.tabs.length <= 0 && !store.isLoading">
        <div class="row">
          <div class="col-md-12"><EmptyState /></div>
        </div>
      </template>
    </div>
  </main>
</template>

<style lang="scss">
.header {
  display: flex;
  padding: 2.4rem;
  justify-content: center;
  background: #fff;
  border-top: 0.5rem solid map-get($palette, 'primary');
}

.site-name {
  font-family: 'Roboto Slab', serif;
  font-size: 3rem;
}

.page {
  display: flex;
  justify-content: center;
}
</style>
