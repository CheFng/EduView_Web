<template>
  <div class="container">
    <div class="box left">
      <dv-border-box-8 class="border-box">
        <dv-scroll-board :config="config2" class="charts" style="height:300px" />
      </dv-border-box-8>
      <dv-border-box-1 class="border-box">
        <dv-scroll-ranking-board :config="config3" class="charts" style="height:300px" />
      </dv-border-box-1>
    </div>
    <div class="box center">
      <dv-border-box-11 title="数据可视化平台">
        <dv-flyline-chart-enhanced :config="config4" class="charts" style="width:100%;height:100%;" />
      </dv-border-box-11>
    </div>
    <div class="box right">
      <dv-border-box-1 class="border-box">
        <dv-scroll-ranking-board :config="config3" class="charts" style="height:300px" />
      </dv-border-box-1>
      <dv-border-box-8>
        <LineChart class="charts" style="height: 200px" />
      </dv-border-box-8>
    </div>
  </div>
</template>
<script>
import { config1, config2, config3, config4 } from './config.js'
import LineChart from '@/views/charts/line'
export default {
  name: 'MapShow',
  components: { 'LineChart': LineChart },
  data() {
    return {
      config1,
      config2,
      config3,
      config4
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: #01132C;
}
.left,.right{
    width: 25%;
}
.center{
    width: 50%;
}
.box{
    display: flex;
    flex-direction: column;
}
.charts{
    width: 90%;
    margin: 5%;
}
</style>
