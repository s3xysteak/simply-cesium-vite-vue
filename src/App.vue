<template>
  <div ref="earth" class="earth"></div>
</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import * as Cesium from 'cesium'

import 'cesium/Build/Cesium/Widgets/widgets.css'

const earth = ref()
const viewer = shallowRef()

onMounted(() => {
  viewer.value = new Cesium.Viewer(earth.value)
  viewer.value.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(120, 31.8, 100000)
  })
})
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.earth {
  height: 100vh;
  width: 100vw;
}
</style>
