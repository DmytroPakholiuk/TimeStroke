<script setup lang="ts">

import {SliderRange, SliderRoot, SliderThumb, SliderTrack} from "reka-ui";

const valueModel = ref(null)

const props = defineProps({
  max: {
    type: Number,
    default: 100,
  },
  min: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  }
})

const emitValue = (newValue) => {
  // Emit event to parent
  emit('update-slider', newValue)
}

watch(valueModel, emitValue)

const emit = defineEmits(['update-slider'])

</script>

<template>
  <SliderRoot
      v-model="valueModel"
      class="relative flex items-center select-none touch-none w-[200px] h-5 m-5"
      :max="props.max"
      :min="props.min"
      :step="props.step"
  >
    <SliderTrack class="bg-stone-500/30 relative grow rounded-full h-2">
      <SliderRange class="absolute bg-grass8 rounded-full h-full" />
    </SliderTrack>
    <SliderThumb
        class="block w-6 h-6 bg-gray-500 rounded-full hover:bg-red-500 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
        aria-label="Volume"
    />
  </SliderRoot>
</template>

<style scoped>

</style>