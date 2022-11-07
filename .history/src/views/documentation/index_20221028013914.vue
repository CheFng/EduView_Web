<template>
  <div class="app-container documentation-container">
    <mapShow></mapShow>
  </div>
</template>

<script>
import { mapShow } from "./map/map"
export default {
  name: 'Documentation',
  components: { mapShow },
  data() {
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
