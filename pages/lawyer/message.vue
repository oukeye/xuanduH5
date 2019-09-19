<template>
  <div class="lawyerMessageWrapper">
    <div class="title">留言咨询</div>
    <div class="subTitle">请填写您的诉求,律师会尽快和您联系。</div>
    <div class="messageForm">
      <div class="item">
        <div class="label">请输入您的姓名</div>
        <div class="val">
          <input type="text" class="valInput" v-model="formData.name" placeholder="您的姓名">
        </div>
      </div>
      <div class="item">
        <div class="label">请输入您的手机号</div>
        <div class="val">
          <input type="text" v-model="formData.tel" class="valInput" placeholder="您的手机号">
        </div>
      </div>
      <div class="item">
        <div class="label">请描述事情经过</div>
        <div class="textareaBox">
          <textarea cols="30" rows="10"  v-model="formData.description" class="valTextarea" placeholder="请描述事情经过"></textarea>
        </div>
      </div>
      <div class="item">
        <div class="submitBtn" @click="handleCreateLawyerMessage()">提交信息</div>
      </div>
    </div>

    <loading-box :show="loading"/>
  </div>

</template>

<script>
  import loading from '@/components/loading'
  import {createLawyerMessage} from '@/api/lawyer'
  import {Toast, MessageBox} from 'mint-ui'
  import isPoneAvailable from '@/utils/isPoneAvailable'
  const formData={
    name:'',
    tel:'',
    description:''
  }
  export default {
    name: "lawyerMessage",
    components: {
      loading
    },
    head:{
      title:'专业法律咨询'
    },
    data() {
      return {
        loading:false,
        formData:Object.assign({},formData)
      }
    },
    created() {
      // this.fetchLawyerList();
    },
    mounted() {
    },
    methods: {
      initFormData(){
        this.formData = Object.assign({},formData);
      },
      handleCreateLawyerMessage(){
        if(!this.formData.name){
          Toast({
            message: '请输入姓名',
          });
          return;
        }
        if(!this.formData.tel ){
          Toast({
            message: '请输入您到手机号码',
          });
          return;
        }
        if(!isPoneAvailable(this.formData.tel)){
          Toast({
            message: '请输入正确的手机号码',
          });
          return;
        }
        if(!this.formData.description){
          Toast({
            message: '请描述事情经过',
          });
          return;
        }
        this.createLawyerMessage();
      },
      createLawyerMessage() {

        this.loading = true;

        createLawyerMessage(this.formData).then((res) => {
          let resData = res.data;
          if (resData.code == 0) {
            this.initFormData();
            Toast({
              message: '留言成功',
            });
          }else{
            Toast({
              message: resData.msg,
            });
          }

        }).catch((re) => {
          Toast({
            message: re,
          });
        }).finally(()=>{
          this.loading = false;
        });
      },

    }
  }

</script>

<style lang="less" scoped>
  .lawyerMessageWrapper {
    padding:13px;
  }

  .title {
    line-height: 24px;
    font-size: 24px;
    font-family: FZLanTingHei-R-GBK;
    font-weight: bold;
    font-style: italic;
    color: rgba(0, 0, 0, 1);
    padding-top: 13px;
  }

  .subTitle {
    line-height: 15px;
    font-size: 15px;
    font-family: FZLanTingHei-R-GBK;
    font-weight: 400;
    font-style: italic;
    color: rgba(0, 0, 0, 1);
    padding-top: 12px;
  }

  .messageForm{
    margin-top:20px;
    .item{
      margin-bottom:20px;
      .label{
        line-height: 12px;
        font-size:12px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(0,0,0,1);
      }
      .val{
        width:350px;
        height:36px;
        background:rgba(0,0,0,0);
        border:1px solid rgba(0, 0, 0, 1);
        border-radius:5px;
        margin-top:7px;
        .valInput{
          border:none;
          background-color: transparent;
          padding:0 10px;
          width: 100%;
          height: 100%;
          outline: none;
        }
      }
      .textareaBox{
        width:350px;
        height:243px;
        background:rgba(0,0,0,0);
        border:1px solid rgba(0, 0, 0, 1);
        border-radius:5px;
        margin-top:7px;
        .valTextarea{
          border:none;
          background-color: transparent;
          padding:4px 10px;
          width: 100%;
          height: 100%;
          outline: none;
        }
      }

      .submitBtn{
        width:153px;
        height: 28px;
        line-height: 28px;
        font-size:15px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        background: #2424EB;
        text-align: center;
        margin: 0 auto;
        margin-top:42px;
      }
    }
  }

</style>
