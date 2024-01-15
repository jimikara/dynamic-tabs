<script setup lang="ts"></script>

<template>
  <div class="empty-state">
    <p>Enter a word to search for dictionary definitions</p>
    <p>Drag tabs to reorder them</p>
    <p>
      Built according to the
      <a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
        >ARIA APG Tabs pattern</a
      >
    </p>
  </div>
</template>

<style scoped lang="scss">
.empty-state {
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 2rem;
  padding: 2.4rem 0;
  border-bottom: 2px solid map-get($palette, 'midgray');

  a {
    color: darken(map-get($palette, 'primary'), 15%);
    transition: color 0.1s ease-in-out;

    &:hover {
      color: darken(map-get($palette, 'primary'), 25%);
    }
  }
}
</style>
