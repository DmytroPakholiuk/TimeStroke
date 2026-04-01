<script setup lang="ts">
import {useFrameStore} from "~/store/frames";

let canvas;
let context;
const frameStore = useFrameStore()

const props = defineProps({
  canvasHeight: {
    type: Number,
    default: 400
  },
  canvasWidth: {
    type: Number,
    default: 400
  },
})

onMounted(() => {
  canvas = document.getElementById('motionCanvas');
  context = canvas.getContext("2d");
})

function clearCanvas() {
  context.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
}

function previewLoop(time) {
  if (!frameStore.isMotionLayerSelected) return;


  // if (time - lastTime > 1000 / FPS) {
  //   drawFrame(previewFrame);
  //   previewFrame++;
  //   lastTime = time;
  // }

  requestAnimationFrame(previewLoop);
}


</script>

<template>
  <canvas
      id="motionCanvas"
      style="
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    "
      :width="canvasWidth"
      :height="canvasHeight"
      :class="`
      w-${canvasWidth/4}
      h-${canvasHeight/4}
      ${frameStore.isMotionLayerSelected ? '' : 'hidden'}
      border-solid border-orange-600 border-2
      bg-transparent
     `"
  />

</template>

<style scoped>

</style>