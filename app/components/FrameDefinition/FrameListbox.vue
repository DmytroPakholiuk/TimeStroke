<script setup lang="ts">

import {useFrameStore} from "~/store/frames";

const frameStore = useFrameStore();

</script>

<template>
  <ListboxRoot v-model="frameStore.chosenSuperPoint" class=" flex flex-col rounded-lg border dark:border-stone-900 overflow-hidden bg-white text-grass9 mx-auto ">
    <ListboxContent class="p-[5px] w-48 h-72 overflow-auto">
      <ListboxGroup>
        <ListboxGroupLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
          Points
        </ListboxGroupLabel>
        <ListboxItem
            v-for="superDot in Object.values(frameStore.superDots)"
            :key="superDot.frameNo"
            :value="superDot.frameNo"
            class="w-full flex items-center px-[25px] h-[25px] leading-none text-xs relative text-grass9 select-none outline-none data-[highlighted]:ring-grass9 data-[highlighted]:ring-1 focus:ring-grass9 focus:ring-1  data-[state=checked]:bg-red-600 data-[state=checked]:text-white data-[disabled]:opacity-50 rounded"
        >
          <span>{{`${superDot.frameNo}` + ' - x: ' + superDot.x + ' - y: ' + superDot.y}}</span>
        </ListboxItem>
      </ListboxGroup>
    </ListboxContent>
  </ListboxRoot>
</template>

<style scoped>

</style>