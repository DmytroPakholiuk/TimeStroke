<script setup lang="ts">

import {useFrameStore} from "~/store/frames";
import JSZip from "jszip";

const frameStore = useFrameStore();

let canvas;
let context;
let previewStart = 0;
let allFrames = null;
let startTime = null;
let endTime = null;
let img = null
let duration = null
let defaultSpriteBitmap = null

onMounted(() => {
  canvas = document.getElementById('motionCanvas');
  context = canvas.getContext("2d");
  loadDefaultSprite();
})

async function loadDefaultSprite() {
  const res = await fetch('/default-sprite.png')
  const blob = await res.blob()
  defaultSpriteBitmap = await createImageBitmap(blob)
}

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

async function exportZip() {
  const zip = new JSZip()

  const frames = Object.values(frameStore.superDots)
  if (!frames.length) return

  const startTime = Math.min(...frames.map(f => f.drawTime))
  const endTime = Math.max(...frames.map(f => f.drawTime))
  const duration = endTime - startTime

  const FPS = 24
  const totalFrames = Math.floor((duration / 1000) * FPS)

  for (let i = 0; i < totalFrames; i++) {
    const time = (i / FPS) * 1000

    drawFrameAtTime(time)

    const blob = await new Promise(resolve =>
        canvas.toBlob(resolve, 'image/png')
    )

    zip.file(`frame_${String(i).padStart(4, '0')}.png`, blob)
  }

  const content = await zip.generateAsync({ type: 'blob' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(content)
  link.download = 'animation.zip'
  link.click()
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

async function exportGif() {

}

async function exportMp4() {

}

async function drawFrame(frameNo) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const frame = frameNo;
  if (!frame) return;

  if (img) {
    context.drawImage(
        img,
        frame.x - (img.width * frameStore.spriteScalePercent / 100) / 2,
        frame.y - (img.height * frameStore.spriteScalePercent / 100) / 2,
        img.width * frameStore.spriteScalePercent / 100,
        img.height * frameStore.spriteScalePercent / 100,
    );
  }
}

</script>

<template>
  <canvas
      id="exportCanvas"
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
      border-solid border-purple-600 border-2
      bg-transparent
     `"
  />
</template>

<style scoped>

</style>