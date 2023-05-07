<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const randomValues = ref([1, 2, 3, 4, 5])
const drag = ref(false)

const deleteTab = (tab: number) => {
  if (!drag.value) {
    randomValues.value = randomValues.value.filter(el => el !== tab)
  }
  console.log(randomValues.value, tab)
}

const log = () => {
  console.log(randomValues.value)
}
</script>

<template>
  <draggable
    v-model="randomValues"
    item-key="element"
    @start="drag = true"
    @end="drag = false"
    @change="log"
  >
    <template #item="{ element }">
      <div class="box">
        {{ element }}
        <button @click="deleteTab(element)">X</button>
      </div>
    </template>
  </draggable>
</template>

<style scoped>
.box {
  background: lightpink;
  border-bottom: darkred 2px solid;
  width: 200px;
  padding: 12px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
</style>
