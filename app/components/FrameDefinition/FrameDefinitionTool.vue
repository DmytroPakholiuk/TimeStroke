<script setup lang="ts">
import DrawingField from "~/components/FrameDefinition/DrawingField.vue";
const canvasRef = ref(null);
const lineWidth = ref(1);
const superDotWidth = ref(3);
const canvasHeight = ref(400);
const canvasWidth = ref(500);

function clearCanvas() {
  if (canvasRef.value) {
    canvasRef.value.clearCanvas()
  }
}

function updateCanvasHeight(newVal) {
  canvasHeight.value = newVal;
}

function updateCanvasWidth(newVal) {
  canvasWidth.value = newVal;
}



</script>

<template>
  <div class="container mx-auto mt-5">
    <div>
      <drawing-field
          ref="canvasRef"
          :line-width="lineWidth"
          :super-dot-width="superDotWidth"
          :canvas-height="canvasHeight"
          :canvas-width="canvasWidth"
          class="mx-auto"
      />
    </div>
    <div>
      <div class="flex justify-between">
        <form-ui-button @click="clearCanvas">
          Clear
        </form-ui-button>

        <frame-definition-radio-button></frame-definition-radio-button>
      </div>
      <div class="flex justify-between">
        <div>
          Canvas Height: <span class="text-red-500">{{canvasHeight[0] ?? canvasHeight}}</span>
          <form-slider
              :max="900"
              :min="300"
              :step="1"
              @update-slider="updateCanvasHeight"
          />
        </div>
        <div>
          Canvas Width: <span class="text-red-500">{{canvasWidth[0] ?? canvasWidth}}</span>
          <form-slider
              :max="900"
              :min="300"
              :step="1"
              @update-slider="updateCanvasWidth"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>