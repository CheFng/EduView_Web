<template>
  <div class="app-container documentation-container">
    <component :is = "map" />
  </div>
</template>

<script>
import { map } from "./map/map"
export default {
  name: 'Documentation',
  components: { map },
  data() {
    return {
        currentMap: 'map'
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
