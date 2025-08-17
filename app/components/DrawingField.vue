<script setup lang="ts">
  const mouseIsDown = ref(false);
  const canvasHeight = ref(400);
  const canvasWidth = ref(400);
  const lineWidth = 1;
  const superDotWidth = 3;
  const superDots = [];
  let drawingStartTime;
  let canvas;
  let context;

  let currX = 0;
  let currY = 0;
  let prevX = 0;
  let prevY = 0;

  onMounted(() => {
    canvas = document.getElementById('mainDraw');
    context = canvas.getContext("2d");
  })

  function putSuperDot(x: number, y: number) {
    context.beginPath();
    context.fillStyle = "blue";
    context.fillRect(
        x - Math.floor(superDotWidth / 2),
        y - Math.floor(superDotWidth / 2),
        superDotWidth,
        superDotWidth
    );
    context.closePath();
  }

  function canvasStartDrawing($event) {
    prevX = currX;
    prevY = currY;
    currX = $event.clientX - canvas.getBoundingClientRect().left;
    currY = $event.clientY - canvas.getBoundingClientRect().top;

    mouseIsDown.value = true;
    drawingStartTime = Date.now();

    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(
        Math.floor(lineWidth / 2),
        Math.floor(lineWidth / 2),
        lineWidth,
        lineWidth
    );
    context.closePath();
  }

  function canvasStopDrawing() {
    mouseIsDown.value = false;
    superDots.length = 0;
  }

  function canvasMouseMove($event) {
    if (mouseIsDown.value) {
      prevX = currX;
      prevY = currY;
      currX = $event.clientX - canvas.getBoundingClientRect().left;
      currY = $event.clientY - canvas.getBoundingClientRect().top;
      draw();

      const drawTime = Date.now();
      const frameNo = Math.floor((drawTime - drawingStartTime) / (1000 / 24))
      if (! superDots[frameNo]) {
        superDots[frameNo] = {
          x: currX,
          y: currY,
        }
        putSuperDot(currX, currY)
      }
    }
  }

  function draw() {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = "red";
    context.lineWidth = lineWidth;
    context.stroke();
    context.closePath();
  }


</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>

</style>