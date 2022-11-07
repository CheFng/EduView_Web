<template>
  <div class="container">
    <div class="box top">
      <dv-border-box-1 class="border-box">
        数据可视化系统
      </dv-border-box-1>
    </div>
    <div class="box main">
      <div class="box left">
        <dv-border-box-8 class="border-box">
          <dv-scroll-board :config="config2" class="charts" style="height:380px" />
        </dv-border-box-8>
        <dv-border-box-1 class="border-box">
          <dv-scroll-ranking-board :config="config3" class="charts" style="height:300px"/>
        </dv-border-box-1>       
      </div>
      <div class="box center">
        数据可视化系统
      </div>
      <div class="box right">
        <dv-border-box-1 class="border-box">
          <dv-scroll-ranking-board :config="config3" class="charts" style="height:300px" />
        </dv-border-box-1>
      </div>  
    </div>
    
  </div>
</template>
<script>
import { config1, config2, config3 } from "./config.js"
export default {
  name: 'mapShow',
  data() {
    return {
      config1,
      config2,
      config3,
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
.top{

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