<script setup lang="ts">
import { ref } from 'vue'
import VolumeHighIcon from 'vue-material-design-icons/VolumeHigh.vue'

type PropTypes = {
  audioSrc: 'string'
}

const props = defineProps<PropTypes>()
const isPlaying = ref(false)

const audio = ref<HTMLAudioElement | null>(null)

const playSound = () => {
  if (props.audioSrc) {
    audio.value = new Audio(props.audioSrc)
    isPlaying.value = true
    audio.value.play()
    audio.value.addEventListener('ended', () => {
      isPlaying.value = false
    })
  }
}
</script>

<template>
  <button
    v-if="props.audioSrc"
    class="play-sound-button"
    :class="{ 'play-sound-button--playing': isPlaying }"
    @click="playSound"
    @keydown.enter="playSound"
  >
    <VolumeHighIcon
      class="play-sound-button__icon"
      :class="{ 'play-sound-button__icon--playing': isPlaying }"
    />
  </button>
</template>

<style scoped lang="scss">
.play-sound-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  animation: pulse 1s infinite;
  transition: all 0.1s ease-in-out;

  &--playing {
    transform: scale(1.1);
  }

  &__icon {
    position: relative;
    top: 0.1rem;
  }
}
</style>
