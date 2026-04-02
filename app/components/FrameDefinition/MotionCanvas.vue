<script setup lang="ts">
import {useFrameStore} from "~/store/frames";
import JSZip from 'jszip'

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
let duration = null
let defaultSpriteBitmap = null

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
  loadDefaultSprite();
})

async function loadDefaultSprite() {
  const res = await fetch('/default-sprite.png')
  const blob = await res.blob()
  defaultSpriteBitmap = await createImageBitmap(blob)
}

function clearCanvas() {
  context.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
  stopPreview()
}

async function startPreview() {
  if (isPlaying.value) return

  if (frameStore.sprite) {
    img = await createImageBitmap(frameStore.sprite);
  } else {
    img = defaultSpriteBitmap;
  }

  allFrames = Object.values(frameStore.superDots);
  startTime = Math.min(...allFrames.map(f => f.drawTime));
  endTime = Math.max(...allFrames.map(f => f.drawTime));
  duration = endTime - startTime;

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
  context.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
}

function loop(now) {
  if (!isPlaying.value) return

  const elapsed = now - previewStart;
  const loopedTime = elapsed % duration;

  drawFrameAtTime(loopedTime);

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

async function exportVideo() {
  if (frameStore.sprite) {
    img = await createImageBitmap(frameStore.sprite);
  } else {
    img = defaultSpriteBitmap;
  }

  const stream = canvas.captureStream()
  const recorder = new MediaRecorder(stream, {
    mimeType: 'video/webm'
  })

  const chunks = []

  recorder.ondataavailable = e => {
    if (e.data.size > 0) chunks.push(e.data)
  }

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'animation.webm'
    a.click()
  }

  recorder.start()

  await playAndRecord()

  recorder.stop()
}

function playAndRecord() {
  return new Promise(resolve => {
    const frames = Object.values(frameStore.superDots)
    const startTime = Math.min(...frames.map(f => f.drawTime))
    const endTime = Math.max(...frames.map(f => f.drawTime))
    const duration = endTime - startTime

    const previewStart = performance.now()

    function loop(now) {
      const elapsed = now - previewStart
      const loopedTime = elapsed % duration

      drawFrameAtTime(loopedTime)

      if (elapsed >= duration) {
        resolve()
        return
      }

      requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)
  })
}

defineExpose({
  clearCanvas,
  startPreview,
  pausePreview,
  stopPreview,
  exportVideo,
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