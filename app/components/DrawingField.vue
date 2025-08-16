<script setup lang="ts">
  const mouseIsDown = ref(false);
  const canvasHeight = ref(400);
  const canvasWidth = ref(400);
  const lineWidth = 2;
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

  function canvasStartDrawing($event) {
    prevX = currX;
    prevY = currY;
    currX = $event.clientX - canvas.getBoundingClientRect().left;
    currY = $event.clientY - canvas.getBoundingClientRect().top;
    // currX = 20;
    // currY = 20;

    console.log($event.clientX, canvas.getBoundingClientRect().left)
    console.log($event.clientY, canvas.getBoundingClientRect().top)

    mouseIsDown.value = true;

    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(currX, currY, 2, 2);
    context.closePath();
  }

  function canvasStopDrawing() {
    mouseIsDown.value = false;
  }

  function canvasMouseMove($event) {
    if (mouseIsDown.value) {
      prevX = currX;
      prevY = currY;
      currX = $event.clientX - canvas.getBoundingClientRect().left;
      currY = $event.clientY - canvas.getBoundingClientRect().top;
      // currX = 20;
      // currY = 20;
      draw();
    }
  }

  function draw() {
    // added parameter ctx
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