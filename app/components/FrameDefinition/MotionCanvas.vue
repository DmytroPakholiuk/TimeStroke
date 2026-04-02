<script setup lang="ts">
import {useFrameStore} from "~/store/frames";

let canvas;
let context;
const frameStore = useFrameStore()
let previewStart = 0;
let allFrames = null;
let startTime = null;
let endTime = null;
const isPlaying = ref(false)
let pausedAt = 0
let img = null

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

async function startPreview() {
  if (isPlaying.value) return

  img = await createImageBitmap(frameStore.sprite);

  allFrames = Object.values(frameStore.superDots);
  startTime = Math.min(...allFrames.map(f => f.drawTime));
  endTime = Math.max(...allFrames.map(f => f.drawTime));

  isPlaying.value = true

  // якщо після паузи — продовжуємо
  previewStart = performance.now() - pausedAt
  requestAnimationFrame(loop);
}

function pausePreview() {
  if (!isPlaying.value) return

  isPlaying.value = false

  pausedAt = performance.now() - previewStart
}

function stopPreview() {
  isPlaying.value = false
  pausedAt = 0
}

function getRelativeTime(drawTime) {
  return drawTime - startTime;
}

function loop(now) {
  if (!isPlaying.value) return

  const elapsed = now - previewStart;

  drawFrameAtTime(elapsed);

  requestAnimationFrame(loop);
}

function drawFrameAtTime(time) {
  const frames = Object.values(frameStore.superDots);

  // знайти найближчий кадр по часу
  let closest = null;
  let minDiff = Infinity;

  for (const frame of frames) {
    const t = frame.drawTime - startTime;
    const diff = Math.abs(t - time);

    if (diff < minDiff) {
      minDiff = diff;
      closest = frame;
    }
  }

  if (closest) {
    drawFrame(closest);
  }
}

async function drawFrame(frameNo) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const frame = frameNo;
  if (!frame) return;


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
  clearCanvas,
  startPreview,
  pausePreview,
  stopPreview,
})
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