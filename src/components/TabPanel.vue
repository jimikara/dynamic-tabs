<script setup lang="ts">
import { useTabStore } from '@/store/tabs'
import Loader from '@/components/Loader.vue'
import PlaySoundButton from './PlaySoundButton.vue'

const store = useTabStore()
</script>

<template>
  <div class="tab-panel">
    <template v-if="Boolean(store.activeTab.result)">
      <div
        v-for="(item, index) in store.activeTab.result"
        class="tab-panel__result"
        :class="{
          'tab-panel__result--multiple':
            store.activeTab.result.length > 1 &&
            index !== store.activeTab.result.length - 1
        }"
      >
        <section class="tab-panel__main-heading-container">
          <h2 class="tab-panel__main-heading">
            {{ item.word }}
            <sup
              v-if="store.activeTab.result.length > 1"
              class="tab-panel__index"
              >{{ index + 1 }}</sup
            >
          </h2>
          <p class="tab-panel__phonetic">
            {{ item.phonetic }}
          </p>
          <!-- <audio :src="item.phonetics[0].audio">PP</audio> -->
          <PlaySoundButton
            :audio-src="item.phonetics[0].audio"
            class="tab-panel__play-sound-button"
          />
        </section>
        <section class="tab-panel__meanings">
          <!-- loop over meanings -->
          <div v-for="meaning in item.meanings" class="tab-panel__meaning">
            <p class="tab-panel__part-of-speech">{{ meaning.partOfSpeech }}</p>
            <ol>
              <li
                v-for="definition in meaning.definitions"
                class="tab-panel__meaning-list-item"
              >
                {{ definition.definition }}
              </li>
            </ol>
          </div>
        </section>
      </div>
    </template>
    <div v-else>
      <p class="tab-panel__empty-state">
        Sorry, no definitions found for the word you were looking for
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-panel {
  min-height: calc(100vh - 284px);
  padding: 4.8rem;
  border-left: $border-dark;
  border-right: $border-dark;
  border-top: $border-dark;
  background: #fff;
  position: relative;
  font-family: 'Lora', serif;

  &__loader {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 12rem;
  }

  &__result {
    margin-bottom: 4.8rem;

    &--multiple {
      border-bottom: 2px solid map-get($palette, 'midgray');
      padding-bottom: 3.2rem;
    }
  }

  &__main-heading-container {
    margin-bottom: 2.4rem;
    display: flex;
    align-items: baseline;
  }

  &__main-heading {
    // display: inline-block;
    font-size: 3.2rem;
    margin: 0;
    text-transform: capitalize;
  }

  &__index {
    font-size: 40%;
    top: -2rem;
    // color: map-get($palette, 'midgray');
  }

  &__phonetic {
    // display: inline-block;
    font-size: 2.4rem;
    margin: 0;
    margin-left: 1.2rem;
    color: #555; // Todo: use palette
  }

  &__play-sound-button {
    margin-left: 1.2rem;
    position: relative;
    top: 0.2rem;
  }

  &__part-of-speech {
    font-size: 2rem;
    font-weight: 500;
    // font-style: italic;
    margin-bottom: 2.4rem;
  }

  &__meanings {
    font-size: 1.6rem;
    line-height: 1.6;
  }

  &__meaning {
    margin-bottom: 3.2rem;
  }

  &__meaning-list-item {
    margin-bottom: 2.4rem;
  }

  &__empty-state {
    font-size: 2.4rem;
    text-align: center;
    margin-top: 12rem;
  }
}
</style>
