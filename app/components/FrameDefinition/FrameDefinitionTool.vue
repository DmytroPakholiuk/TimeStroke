<script setup lang="ts">
import DrawingField from "~/components/FrameDefinition/DrawingField.vue";
import PreviewCanvas from "~/components/FrameDefinition/PreviewCanvas.vue";
import {useFrameStore} from "~/store/frames";
import FrameListbox from "~/components/FrameDefinition/FrameListbox.vue";
import MotionCanvas from "~/components/FrameDefinition/MotionCanvas.vue";

const canvasRef = ref(null);
const previewCanvasRef = ref(null);
const motionCanvasRef = ref(null);
const lineWidth = ref(1);
const superDotWidth = ref(3);
const canvasHeight = ref(400);
const canvasWidth = ref(500);
const frameStore = useFrameStore();

const toggleGroupItemClasses
    = 'hover:bg-red-200 hover:text-black text-mauve11 data-[state=on]:bg-red-700 data-[state=on]:text-white flex h-[35px] w-[70px] items-center justify-center text-base leading-4 first:rounded-l-[7px] last:rounded-r-[7px] focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none '

function clearCanvas() {
  if (canvasRef.value) {
    canvasRef.value.clearCanvas()
    previewCanvasRef.value.clearCanvas()
    motionCanvasRef.value.clearCanvas()
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
    <div class="flex">
      <div class="relative inline-block">
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
          <preview-canvas
              ref="previewCanvasRef"
              :canvas-height="canvasHeight"
              :canvas-width="canvasWidth"
              class="mx-auto absolute inset-0 pointer-events-none"
          />
        </div>
        <div>
          <motion-canvas
              ref="motionCanvasRef"
              :canvas-height="canvasHeight"
              :canvas-width="canvasWidth"
              class="mx-auto absolute inset-0 pointer-events-none"
          />
        </div>
      </div>
      <div>
        <frame-listbox class="ml-5" />
      </div>
    </div>
    <div>
      <div class="flex justify-between">
        <form-ui-button @click="clearCanvas">
          Clear
        </form-ui-button>

        <frame-definition-radio-button/>
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

    <div>
      <div class="flex justify-between">
        <div>
          Animating on:
          <ToggleGroupRoot
              v-model="frameStore.animatingOn"
              type="single"
              class="flex border shadow-sm rounded-lg w-50"
          >
            <ToggleGroupItem value="1" :class="toggleGroupItemClasses">
              Ones
            </ToggleGroupItem>
            <ToggleGroupItem value="2" :class="toggleGroupItemClasses">
              Twos
            </ToggleGroupItem>
            <ToggleGroupItem value="3" :class="toggleGroupItemClasses">
              Threes
            </ToggleGroupItem>
          </ToggleGroupRoot>
        </div>
        <div>
          <UFileUpload v-model="frameStore.sprite" accept="image/png" class="">

          </UFileUpload>
        </div>
      </div>
    </div>

    <div class="flex justify-between">
      <div>
        Onion skin frames:
        <ToggleGroupRoot
            v-model="frameStore.onionSkinSize"
            type="single"
            class="flex border shadow-sm rounded-lg w-50"
        >
          <ToggleGroupItem value="0" :class="toggleGroupItemClasses">
            0
          </ToggleGroupItem>
          <ToggleGroupItem value="1" :class="toggleGroupItemClasses">
            1
          </ToggleGroupItem>
          <ToggleGroupItem value="2" :class="toggleGroupItemClasses">
            2
          </ToggleGroupItem>
          <ToggleGroupItem value="3" :class="toggleGroupItemClasses">
            3
          </ToggleGroupItem>
        </ToggleGroupRoot>
      </div>
      <div>
        <div>
          Sprite Scale: <span class="text-red-500">{{frameStore.spriteScalePercent[0] ?? 100}}%</span>
          <form-slider
              v-model="frameStore.spriteScalePercent"
              :max="400"
              :min="0"
              :step="10"
          />
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>