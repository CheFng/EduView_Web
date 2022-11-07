<template>
  <div class="container">
    <div class="box left">
      <!--按钮盒子-->
      <dv-decoration-3 style="width:250px;height:20px;" />
      <dv-decoration-7 class="btn-box">
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
        <dv-scroll-board v-if="2===number" :config="config2" class="charts" style="height:250px" />
        <dv-scroll-ranking-board v-if="3===number" :config="config3" class="charts" style="height:250px" />
      </dv-border-box-8>
      <br>
      <!--左列box2-->
      <dv-border-box-1 class="border-box">
        <dv-scroll-board v-if="0===number" :config="config2" class="charts" style="height:250px" />
        <dv-scroll-ranking-board v-if="1===number" :config="config3" class="charts" style="height:250px" />
        <dv-scroll-board v-if="2===number" :config="config2" class="charts" style="height:250px" />
        <dv-scroll-ranking-board v-if="3===number" :config="config3" class="charts" style="height:250px" />
      </dv-border-box-1>
    </div>
    <div class="box center">
      <!--中间列-->
      <dv-border-box-11 title="数据可视化平台" style="height:675px">
        <dv-decoration-10 style="width:90%;height:5px;" />
        <br>
        <dv-decoration-5 :color="['#7796f2','#7796f2']" :dur="3" style="width:300px;height:40px;margin: auto" />
        <dv-border-box-10 style="width:80%;height:auto;margin:auto">
          <ChinaMap v-if="0===number" class="charts" />
        </dv-border-box-10>
      </dv-border-box-11>
    </div>
    <div class="box right">
      <!--按钮盒子-->
      <dv-decoration-1 style="width:200px;height:20px;" />
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
        <MixChart v-if="2===number" id="Mix" class="charts" style="height:250px" />
        <LineChart v-if="3===number" id="Line" class="charts" style="height:250px" />
      </dv-border-box-1>
      <br>
      <!--右列box2-->
      <dv-border-box-8 class="border-box">
        <dv-scroll-board v-if="0===number" :config="config2" class="charts" style="height:250px" />
        <dv-scroll-ranking-board v-if="1===number" :config="config3" class="charts" style="height:250px" />
        <dv-scroll-board v-if="2===number" :config="config2" class="charts" style="height:250px" />
        <dv-scroll-ranking-board v-if="3===number" :config="config3" class="charts" style="height:250px" />
      </dv-border-box-8>
    </div>
  </div>
</template>
<script>
import { config1, config2, config3 } from './config.js'
import ChinaMap from './chinamap/chinamap'
import MixChart from '@/views/charts/mix-chart'
import LineChart from '@/views/charts/line'
import { fetchListAll } from '@/api/asset'
export default {
  name: 'MapShow',
  components: { LineChart: LineChart, MixChart: MixChart, ChinaMap: ChinaMap },
  data() {
    return {
      number: 0,
      list: {},
      config1,
      config2,
      config3
    }
  },
  created() {
    this.setConfig()
  },
  methods: {
    change(num) {
      this.number = num
    },
    getData() {
      return Promise.resolve(
        fetchListAll().then((response) => {
          var res = response.data
          console.log(response.data)
          return res
        })
      )
    },
    setConfig() {
      this.getData().then((res) => {
        var count = 0
        var arr = []
        res.forEach((item) => {
          arr[count] = []
          for (var key in item) {
            arr[count].push(item[key])
          }
          count = count + 1
        })
        console.log(arr)
        const nowData = this.config2
        nowData.data = arr
        this.config2 = { ...nowData }
      })
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
  background-image: url('~@/assets/bg_images/bg.jpg');
  background-size: cover;
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
.border-box {
  height: 280px;
}
.btn-box {
  height: 20px;
  margin: 5%;
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
