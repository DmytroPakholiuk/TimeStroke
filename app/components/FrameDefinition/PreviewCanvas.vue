<script setup lang="ts">

import {useFrameStore} from "~/store/frames";

let canvas;
let context;
const frameStore = useFrameStore()
let previewFrame = 0;
let lastTime = 0;
let currentPreviewFrame = 0;


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
  canvas = document.getElementById('previewCanvas');
  context = canvas.getContext("2d");
})

watch(
    () => frameStore.chosenSuperPoint,
    (newValue, oldValue) => drawFrame(newValue)

)

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

async function drawFrame(frameNo) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const frame = frameStore.superDots[frameNo];
  console.log(frame, frameStore.sprite);
  if (!frame) return;

  const img = await createImageBitmap(frameStore.sprite);

  // 1. малюємо картинку (якщо є)
  if (frameStore.sprite) {
    context.drawImage(
        img,
        frame.x - (img.width * frameStore.spriteScalePercent / 100) / 2,
        frame.y - (img.height * frameStore.spriteScalePercent / 100) / 2,
        img.width * frameStore.spriteScalePercent / 100,
        img.height * frameStore.spriteScalePercent / 100,
    );
  }
}

defineExpose({
  clearCanvas
})
</script>

<template>
  <canvas
    id="previewCanvas"
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
      ${frameStore.isFrameLayerSelected ? '' : 'hidden'}
      border-solid border-green-600 border-2
      bg-transparent
     `"
  />
</template>

<style scoped>

</style>