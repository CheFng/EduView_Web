<template>
    <div class="app-container documentation-container">
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
  </div>
</template>