<script setup lang="ts">

import {useFrameStore} from "~/store/frames";

let canvas;
let context;
let bufferCanvas;
let bufferCtx;
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
  canvas = document.getElementById('previewCanvas');
  context = canvas.getContext("2d");
  bufferCanvas = document.createElement('canvas');
  bufferCtx = bufferCanvas.getContext('2d');
})

watch(
    () => frameStore.chosenSuperPoint,
    (newValue) => drawFrame(newValue)

)

function clearCanvas() {
  context.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
}

async function drawFrame(frameNo) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const frame = frameStore.superDots[frameNo];
  if (!frame) return;

  const img = await createImageBitmap(frameStore.sprite);

  handleOnionSkin(frameNo, img);

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

function handleOnionSkin(originalFrameNo, image) {
  for (let i = 1; i <= frameStore.onionSkinSize; i++) {
    const previousFrame = frameStore.superDots[originalFrameNo - i];
    if (!previousFrame) continue;

    const w = image.width * frameStore.spriteScalePercent / 100;
    const h = image.height * frameStore.spriteScalePercent / 100;

    const x = previousFrame.x - w / 2;
    const y = previousFrame.y - h / 2;

    const alpha = Math.pow(0.6, i);
    drawTintedImage(
        context,
        image,
        x,
        y,
        w,
        h,
        'red',
        alpha
    );
  }
  for (let i = 1; i <= frameStore.onionSkinSize; i++) {
    const previousFrame = frameStore.superDots[originalFrameNo + i];
    if (!previousFrame) continue;

    const w = image.width * frameStore.spriteScalePercent / 100;
    const h = image.height * frameStore.spriteScalePercent / 100;

    const x = previousFrame.x - w / 2;
    const y = previousFrame.y - h / 2;

    const alpha = Math.pow(0.6, i);
    drawTintedImage(
        context,
        image,
        x,
        y,
        w,
        h,
        'green',
        alpha
    );
  }
}

function drawTintedImage(ctx, image, x, y, w, h, color, alpha) {
  bufferCanvas.width = w;
  bufferCanvas.height = h;

  // 1. чистимо buffer
  bufferCtx.clearRect(0, 0, w, h);

  // 2. малюємо оригінал
  bufferCtx.drawImage(image, 0, 0, w, h);

  // 3. tint тільки по непрозорих пікселях
  bufferCtx.globalCompositeOperation = 'source-in';
  bufferCtx.fillStyle = color;
  bufferCtx.fillRect(0, 0, w, h);

  // 4. малюємо на основний canvas
  ctx.globalAlpha = alpha;
  ctx.drawImage(bufferCanvas, x, y);
  ctx.globalAlpha = 1;
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