<template>
  <div class="documentation-container">
    <mapShow></mapShow>
  </div>
</template>

<script>
import mapShow from './map/map'
export default {
  name: 'Documentation',
  components: { 'mapShow': mapShow },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 0;
  display: flex;
}
</style>
