<script setup lang="ts">
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'
import { ref } from 'vue'
import {useFrameStore} from "~/store/frames";

const radioStateSingle = ref('default')

const frameStore = useFrameStore()

function selectDrawingLayer() {
  frameStore.isDrawingLayerSelected = true;
  frameStore.isMotionLayerSelected = false;
  frameStore.isFrameLayerSelected = false;
}

function selectMotionLayer() {
  frameStore.isDrawingLayerSelected = false;
  frameStore.isMotionLayerSelected = true;
  frameStore.isFrameLayerSelected = false;
}

function selectFrameLayer() {
  frameStore.isDrawingLayerSelected = false;
  frameStore.isMotionLayerSelected = false;
  frameStore.isFrameLayerSelected = true;
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
          :class="frameStore.isDrawingLayerSelected ? 'bg-red-500 text-white hover:text-black' : ''"
        >
          Drawing layer
          <span :hidden="!frameStore.isDrawingLayerSelected">
            🖼
          </span>
        </form-ui-button>
      </RadioGroupItem>
    </div>
    <div class="flex items-center">
      <RadioGroupItem
          @select="selectFrameLayer"
      >
        <form-ui-button
            :class="frameStore.isFrameLayerSelected ? 'bg-green-500 text-white hover:text-black' : ''"
        >
          Frame layer
          <span :hidden="!frameStore.isFrameLayerSelected">
            🎭
          </span>
        </form-ui-button>
      </RadioGroupItem>
    </div>
    <div class="flex items-center">
      <RadioGroupItem
          @select="selectMotionLayer"
      >
        <form-ui-button
            :class="frameStore.isMotionLayerSelected ? 'bg-orange-500 text-white hover:text-black' : ''"
        >
          Motion layer
          <span :hidden="!frameStore.isMotionLayerSelected">
            📊
          </span>
        </form-ui-button>
      </RadioGroupItem>
    </div>
  </RadioGroupRoot>
</template>

<style scoped>

</style>