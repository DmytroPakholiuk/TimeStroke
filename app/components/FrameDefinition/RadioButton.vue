<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui'
import { ref } from 'vue'

const radioStateSingle = ref('default')

const isDrawingLayerSelected = ref(true)
const isMotionLayerSelected = ref(false)
const isFrameLayerSelected = ref(false)

function selectDrawingLayer($event) {
  isDrawingLayerSelected.value = true;
  isMotionLayerSelected.value = false;
  isFrameLayerSelected.value = false;
  console.log($event)
}

function selectMotionLayer($event) {
  isDrawingLayerSelected.value = false;
  isMotionLayerSelected.value = true;
  isFrameLayerSelected.value = false;
}

function selectFrameLayer($event) {
  isDrawingLayerSelected.value = false;
  isMotionLayerSelected.value = false;
  isFrameLayerSelected.value = true;
}

</script>

<template>
  <RadioGroupRoot
      v-model="radioStateSingle"
      class="flex flex-row"
      default-value="default"
      aria-label="View density"
  >
    <div class="flex items-center">
      <RadioGroupItem
          value="default"
          @select="selectDrawingLayer"
      >
        <form-ui-button
          :class="isDrawingLayerSelected ? 'bg-red-500 text-white hover:text-black' : ''"
        >
          Drawing layer
          <span :hidden="!isDrawingLayerSelected">
            🖼
          </span>
        </form-ui-button>
      </RadioGroupItem>
    </div>
    <div class="flex items-center">
      <RadioGroupItem
          @select="selectMotionLayer"
      >
        <form-ui-button
            :class="isMotionLayerSelected ? 'bg-blue-500 text-white hover:text-black' : ''"
        >
          Motion layer
          <span :hidden="!isMotionLayerSelected">
            📊
          </span>
        </form-ui-button>
      </RadioGroupItem>
    </div>
    <div class="flex items-center">
      <RadioGroupItem
          @select="selectFrameLayer"
      >
        <form-ui-button
            :class="isFrameLayerSelected ? 'bg-green-500 text-white hover:text-black' : ''"
        >
          Frame layer
          <span :hidden="!isFrameLayerSelected">
            🎭
          </span>
        </form-ui-button>
      </RadioGroupItem>
    </div>
  </RadioGroupRoot>
</template>

<style scoped>

</style>