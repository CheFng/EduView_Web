<template>
    <dv-full-screen-container class="container">
        <div class="box left">
            <dv-border-box-8 class="border-box">
                <dv-scroll-board :config="config2" class="charts" style="height:380px" />
            </dv-border-box-8>
            <dv-border-box-1 class="border-box">
                <dv-scroll-ranking-board :config="config3" class="charts" style="height:300px"/>
            </dv-border-box-1>
            
        </div>
        <div class="box center">

        </div>
        <div class="box right">
            <dv-border-box-1 class="border-box">
                <dv-scroll-ranking-board :config="config3" class="charts" style="height:300px" />
            </dv-border-box-1>
        </div>
    </dv-full-screen-container>
</template>
<script>
import { config1, config2, config3 } from "./config.js"
export default {
  name: 'map',
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