<script setup lang="ts">

import AppHeader from "~/layouts/default/AppHeader.vue";
import AppFooter from "~/layouts/default/AppFooter.vue";
</script>

<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<style scoped>

</style>