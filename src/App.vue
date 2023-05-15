<script setup lang="ts">
import EmptyState from '@/components/EmptyState.vue'
import Tabs from '@/components/Tabs.vue'
import TabPanel from '@/components/TabPanel.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useTabStore } from '@/store/tabs'

const tabStore = useTabStore()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="site-name">Dynamic Tabs</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <SearchBar />
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div v-if="tabStore.tabs.length > 0 || tabStore.isLoading" class="row">
        <div class="col-md-12">
          <Tabs />
        </div>
      </div>
      <div v-if="tabStore.tabs.length > 0" class="row">
        <div class="col-md-12">
          <TabPanel />
        </div>
      </div>
      <template v-if="tabStore.tabs.length <= 0 && !tabStore.isLoading">
        <div class="row">
          <div class="col-md-12"><EmptyState /></div>
        </div>
      </template>
    </div>
  </main>
  <footer class="footer">
    <div class="footer__container container">
      <div class="row">
        <div class="col-md-12">
          &copy; Jimmy Saul {{ new Date().getFullYear() }}
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.header {
  display: flex;
  padding: 2.4rem 0;
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

.footer {
  width: 100%;
  height: 3rem;
  position: fixed;
  background: map-get($palette, 'black');
  color: white;
  bottom: 0;

  &__container {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
