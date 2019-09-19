<template>
  <div class="loading" v-if="show">
    <div class="iconWrapper">
      <div class="icon"></div>
      <div class="text">加载中...</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      show:{
        default(){
          return false
        }
      }
    }
  }
</script>
<style lang="less" scoped="">
  @import "../../assets/less/mixins.less";
  .loading{
    width: 100%;
    height: 100%;
    line-height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    color: #fff;
    z-index: 99999999;
    background: rgba(10, 10, 10, 0.6);
    display: table;
    .iconWrapper {
      padding:5px 10px;
      background: rgba(51, 51, 51, 0.84);
      border-radius:5px;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      .translate3d(-50%, -50%, 0);
      .icon {
        width:30px;
        height:30px;
        margin: 0 auto;
        background: url('../../assets/images/loading_60_60.png') no-repeat center;
        background-size: 30px 30px;
        opacity: 0.6;
        .animation(spin 1.2s linear infinite);
      }
      .text {
        color: #ffffff;
        font-size:12px;
        text-align: center;
      }

    }
  }
</style>
