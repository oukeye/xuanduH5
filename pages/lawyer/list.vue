<template>
  <div class="lawyerListWrapper">
    <div class="title">专业法律咨询</div>
    <div class="subTitle">您的专属律师,用法律捍卫您的权益</div>
    <div class="lawyerList" id="lawyerList">
      <div class="lawyerItem" v-for="(item,index) in lawyerList" :key="index">
        <div class="album" :style="{backgroundImage:`url(${item.album[0].url})`}"></div>
        <div class="name">{{item.name}}</div>
        <div class="profiles">{{item.profiles}}</div>
        <a class="phoneBtn" :href="`tel://${item.tel}`">
          免费电话咨询
        </a>
      </div>

      <div class="infinite-scroll" v-show="loading">
        <loading class="loading"></loading>
        <span class="infinite-scroll-text">{{tips}}</span>
      </div>

    </div>
    <div class="messageWrapper">
      <div class="messageBtn" @click="handleNavMessagePage()">
        <span class="txt">留言咨询</span></div>
    </div>
  </div>

</template>

<script>
  import loading from '@/components/loading'
  import {fetchLawyerList} from '@/api/lawyer'

  export default {
    name: "lawyerList",
    components: {
      loading
    },
    head:{
      title:'专业法律咨询'
    },
    data() {
      return {
        REQUIRE: true,
        loading: false,
        tips: '努力加载中...',
        lawyerList: [],
        lawyerData: {
          current_page: 1,
          data: [],
          last_page: 1,
          per_page: "10",
          total: 0
        },
        params: {
          page: 1,
          pageSize: 10,
          status: 1
        },
      }
    },
    created() {
      this.fetchLawyerList();
    },
    mounted() {
      // 添加滚动事件，检测滚动到页面底部
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      fetchLawyerList() {

        if (this.params.page > this.lawyerData.last_page) {
          return;
        }

        // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
        this.REQUIRE = false;
        this.loading = true;
        this.tips = '努力加载中...';

        fetchLawyerList(this.params).then((res) => {
          let resData = res.data;
          this.lawyerData = resData.data;
          if (resData.current_page == 1) {
            this.lawyerList = resData.data.data

          } else {
            this.lawyerList = this.lawyerList.concat(resData.data.data);
          }
          // 请求的数据加载完成后，再次滚动到底部时，允许请求前一天数据
          this.$nextTick(() => {
            this.REQUIRE = true;
            this.loading = false;
          });
        }).catch(() => {
          this.tips = '连接失败，请稍后重试';
          // 请求失败时，将 REQUIRE 置为 true，滚动到底部时，再次请求
          this.REQUIRE = true;
        });
      },
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //屏幕的高度
        let prodListHeight = document.querySelector('#lawyerList').offsetHeight - h - 20;
        if (scrollTop > prodListHeight && this.REQUIRE) {
          if (this.params.page > this.lawyerData.last_page) {
            return;
          }
          this.params.page += 1;
          this.fetchLawyerList();
        }

      },
      handleNavMessagePage(){
        this.$router.push({path:'/lawyer/message'});
      }
    }
  }

</script>

<style lang="less" scoped>
  .lawyerListWrapper {
    padding-bottom: 50px;
  }

  .title {
    line-height: 24px;
    font-size: 24px;
    font-family: FZLanTingHei-R-GBK;
    font-weight: bold;
    font-style: italic;
    color: rgba(0, 0, 0, 1);
    padding-left: 12px;
    padding-top: 13px;
  }

  .subTitle {
    line-height: 15px;
    font-size: 15px;
    font-family: FZLanTingHei-R-GBK;
    font-weight: 400;
    font-style: italic;
    color: rgba(0, 0, 0, 1);
    padding-left: 12px;
    padding-top: 12px;
  }

  .lawyerList {
    padding: 18px 7px 0px 7px;

    .lawyerItem {
      width: 172px;
      height: 305px;
      display: inline-block;
      vertical-align: middle;
      background-color: #FAEBEB;
      margin-bottom: 17px;

      &:nth-child(odd) {
        margin-right: 17px;
      }

      .album {
        width: 100%;
        height: 213px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .name {
        line-height: 15px;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-top: 9px;
        padding: 0 5px;
      }

      .profiles {
        line-height: 12px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-top: 6px;
        padding: 0 5px;

      }

      .phoneBtn {
        display: block;
        width: 153px;
        height: 28px;
        line-height: 28px;
        background: rgba(66, 64, 65, 1);
        text-align: center;
        margin: 0 auto;
        margin-top: 17px;
        margin-bottom: 7px;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-decoration: none;
      }
    }
  }

  .infinite-scroll {
    margin: 0 auto;
    text-align: center;

    .loading {
      margin: 0 auto;
    }

    .infinite-scroll-text {
      font-size: 14px;
      color: #7f828b;
    }

  }

  .messageWrapper {
    height: 50px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    transform: translateZ(0);
    padding: 10px 0;

    .messageBtn {
      margin: 0 auto;
      width: 153px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #2424EB;

      .txt {
        display: inline-block;
        vertical-align: middle;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        padding-left:18px;
        position: relative;
        &:after{
          content: '';
          display: block;
          width:14px;
          height: 14px;
          background: url('../../assets/images/lawyerList/message@2x.png');
          background-size: 100%;
          position: absolute;
          left:0;
          top:50%;
          transform: translate3d(0,-50%,0);
          z-index: 1;
        }
      }
    }
  }

</style>
