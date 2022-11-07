<template>
  <div class="container">
    <div class="box left">
      <dv-decoration-7 class="btn-box">
        <!--按钮盒子-->
        <button class="button" @click="change(0)">
          <dv-decoration-11 id="btn1" class="btn">首页可视化</dv-decoration-11>
        </button>
        <button class="button" @click="change(1)">
          <dv-decoration-11 id="btn2" class="btn">面积可视化</dv-decoration-11>
        </button>
      </dv-decoration-7>
      <!--左列box1-->
      <dv-border-box-8 class="border-box">
        <dv-scroll-board v-if="0===number" :config="config2" class="charts" style="height:250px" />
        <dv-scroll-ranking-board v-if="1===number" :config="config3" class="charts" style="height:250px" />
      </dv-border-box-8>
      <!--左列box2-->
      <dv-border-box-1 class="border-box">
        <dv-scroll-board v-if="0===number" :config="config2" class="charts" style="height:250px" />
        <dv-scroll-ranking-board v-if="1===number" :config="config3" class="charts" style="height:250px" />
      </dv-border-box-1>
    </div>
    <div class="box center">
      <!--中间列-->
      <dv-border-box-11 title="数据可视化平台">
        <br>
        <ChinaMap class="charts" />
      </dv-border-box-11>
    </div>
    <div class="box right">
      <dv-decoration-7 class="btn-box">
        <button class="button" @click="change(2)">
          <dv-decoration-11 id="btn1" class="btn">设备可视化</dv-decoration-11>
        </button>
        <button class="button" @click="change(3)">
          <dv-decoration-11 id="btn2" class="btn">人数可视化</dv-decoration-11>
        </button>
      </dv-decoration-7>
      <!--右列box1-->
      <dv-border-box-1 class="border-box">
        <MixChart v-if="0===number" id="Mix" class="charts" style="height:250px" />
        <LineChart v-if="1===number" id="Line" class="charts" style="height:250px" />
      </dv-border-box-1>
      <!--右列box2-->
      <dv-border-box-8 class="border-box">
        <dv-scroll-board v-if="0===number" :config="config2" class="charts" style="height:250px" />
        <dv-scroll-ranking-board v-if="1===number" :config="config3" class="charts" style="height:250px" />
      </dv-border-box-8>
    </div>
  </div>
</template>
<script>
import { config1, config2, config3, config4 } from './config.js'
import ChinaMap from './chinamap/chinamap'
import MixChart from '@/views/charts/mix-chart'
import LineChart from '@/views/charts/line'
export default {
  name: 'MapShow',
  components: { LineChart: LineChart, MixChart: MixChart, ChinaMap: ChinaMap },
  data() {
    return {
      number: 0,
      config1,
      config2,
      config3,
      config4
    }
  },
  methods: {
    change(num) {
      this.number = num
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #01132c;
}
.left,
.right {
  width: 25%;
}
.center {
  width: 50%;
}
.box {
  display: flex;
  flex-direction: column;
}
.btn-box {
  height: 120px;
}
.button {
  background-color: transparent;
  border-style: none;
}
.btn {
  width: 130px;
  height: 45px;
  color: #fff;
}
.charts {
  width: 90%;
  margin: 5%;
}
</style>
