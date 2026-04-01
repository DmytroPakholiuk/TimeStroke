<script setup lang="ts">
  import {useFrameStore} from "~/store/frames";

  const mouseIsDown = ref(false);
  let superPointsDrawn = 0;
  let drawingStartTime;
  let canvas;
  let context;
  let currX = 0;
  let currY = 0;
  let prevX = 0;
  let prevY = 0;
  const frameStore = useFrameStore()

  const props = defineProps({
    lineWidth: {
      type: Number,
      default: 1,
    },
    superDotWidth: {
      type: Number,
      default: 3,
    },
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
    canvas = document.getElementById('mainDraw');
    context = canvas.getContext("2d");
    window.addEventListener('super-dot', handleSuperDot);
  })

  onBeforeUnmount(() => {
    window.removeEventListener('super-dot', handleSuperDot);
  })

  async function handleSuperDot(event) {
    const { x, y, frameNo, drawTime } = event.detail;

    // імітація асинхронності
    await new Promise(resolve => setTimeout(resolve, 0));

    if (!frameStore.superDots[superPointsDrawn + frameNo]) {
      if ((superPointsDrawn + frameNo) % frameStore.animatingOn == 0) {
        frameStore.addSuperDot(superPointsDrawn + frameNo, {
          x,
          y,
          frameNo,
          drawTime
        })
        drawSuperDot(x, y);
      }
    }
    // console.log(frameStore.superDots, superPointsDrawn, frameNo)
  }

  function drawSuperDot(x: number, y: number) {
    context.beginPath();
    context.fillStyle = "blue";
    context.fillRect(
        x - Math.floor(props.superDotWidth / 2),
        y - Math.floor(props.superDotWidth / 2),
        props.superDotWidth,
        props.superDotWidth
    );
    context.closePath();
  }

  function canvasStartDrawing($event) {
    if (!frameStore.isDrawingLayerSelected) {
      return;
    }

    prevX = currX;
    prevY = currY;
    currX = $event.clientX - canvas.getBoundingClientRect().left;
    currY = $event.clientY - canvas.getBoundingClientRect().top;

    mouseIsDown.value = true;
    drawingStartTime = Date.now();

    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(
        Math.floor(props.lineWidth / 2),
        Math.floor(props.lineWidth / 2),
        props.lineWidth,
        props.lineWidth
    );
    context.closePath();
  }

  function canvasStopDrawing() {
    mouseIsDown.value = false;
    const keys = Object.keys(frameStore.superDots).map(Number);
    superPointsDrawn = Math.max(...keys);
  }

  function canvasMouseMove($event) {
    if (mouseIsDown.value) {
      prevX = currX;
      prevY = currY;
      currX = $event.clientX - canvas.getBoundingClientRect().left;
      currY = $event.clientY - canvas.getBoundingClientRect().top;
      draw();

      const drawTime = Date.now();
      const frameNo = Math.floor((drawTime - drawingStartTime) / (1000 / frameStore.baseFps))
      if (! frameStore.superDots[superPointsDrawn + frameNo]) {
        window.dispatchEvent(new CustomEvent('super-dot', {
          detail: {
            x: currX,
            y: currY,
            frameNo,
            drawTime,
          }
        }));
      }
    }
  }

  function draw() {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = "red";
    context.lineWidth = props.lineWidth;
    context.stroke();
    context.closePath();
  }

  function clearCanvas() {
    context.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
    frameStore.superDots = {};
    superPointsDrawn = 0;
  }

  defineExpose({
    clearCanvas
  })
</script>

<template>
  <canvas
      id="mainDraw"
      :width="canvasWidth"
      :height="canvasHeight"
      :class="`w-${canvasWidth/4} h-${canvasHeight/4} border-solid border-red-600 border-2 bg-gray-100`"
      @mousedown="canvasStartDrawing"
      @mouseup="canvasStopDrawing"
      @mouseleave="canvasStopDrawing"
      @mouseout="canvasStopDrawing"
      @mousemove="canvasMouseMove"
  />
</template>

<style scoped>

</style>