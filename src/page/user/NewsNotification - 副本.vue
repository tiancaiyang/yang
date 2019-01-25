<template>
  <div class="news_notification">
    <h2>消息通知</h2>
    <!-- 消息导航栏 -->
    <ul class="news_nav">
      <li v-for="(item, index) in tabs" :key="index" @click="tab(index)" :class="{active:index==num}">{{item}}</li>
    </ul>
    <!-- 消息列表显示区域 -->
    <ul class="news_content">
      <li v-for="(itemCon, index) in tabcons" :key="index" v-show="num == index">
        <!-- <div class="content_box_left">
          <p class="left_title">交易物流</p>
          <p class="left_detail">【物流更新】快递单号1056已从河南郑州发货至四川成都。</p>
          <p class="left_time">2018 / 07 / 24</p>
        </div>
        <div class="content_btn_box">
          <a><span class="el-icon-delete"></span> 删除</a>
          <a>查看订单详情 <span class="el-icon-arrow-right"></span></a>
        </div> -->
        {{itemCon}}
      </li>
      <li>
        <div class="content_box_left">
          <p class="left_title">系统通知</p>
          <p class="left_detail">亲爱的用户,您有一张88-10元限购 [小盒仙生鲜官方旗舰店] 店铺商品的东券可以领取哟~  活动时间：2018-10-15 00:00:00 至 2018-10-16 23:59:00</p>
          <p class="left_time">2018 / 07 / 24</p>
        </div>
        <div class="content_btn_box">
          <a><span class="el-icon-delete"></span> 删除</a>
          <a>查看消息详情 <span class="el-icon-arrow-right"></span></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { GetMessageList } from '../../api/index.js'
export default {
  data () {
    return {
      tabs: ['全部消息', '系统通知', '交易物流', '优惠中心', '活动推荐'],
      tabcons: ['全部消息', '系统通知', '交易物流', '优惠中心', '活动推荐'],
      num: 0
    }
  },
  created(){
    this.getMessageData()
  },
  mounted () {

  },
  methods: {
    // tab栏切换
    tab (index) {
      this.num = index
    },
    // 获取消息列表
    getMessageData(){
      GetMessageList().then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.news_notification {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  min-height: 1052px;
  h2 {
    font-size: 24px;
    line-height: 36px;
    color: #666;
    margin-bottom: 55px;
  }
  // 消息导航栏
  .news_nav {
    display: flex;
    padding-bottom: 30px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 30px;
    li {
      color: #666;
      font-size: 16px;
      position: relative;
      padding: 0 20px;
    }
    li:hover {
      color: #4e94f4;
    }
    li:after {
      content: "";
      width: 1px;
      height: 17px;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #b0b0b0;
    }
    li:first-child {
      padding-left: 0;
    }
    li:last-child:after {
      display: none;
    }
    .active {
      color: #e51818;
    }
  }
  // 消息列表显示区域
  .news_content {
    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed #e0e0e0;
      margin-bottom: 30px;
      .content_box_left {
        width: 710px;
        .left_title {
          font-size: 20px;
          color: #666;
          margin-bottom: 20px;
        }
        .left_detail {
          font-size: 16px;
          color: #333;
          margin-bottom: 20px;
          line-height: 26px;
        }
        .left_time {
          font-size: 14px;
          color: #999;
          padding-bottom: 30px;
        }
      }
      .content_btn_box {
        position: relative;
        a:first-child {
          display: block;
          font-size: 14px;
          color: #999;
        }
        a:last-child {
          width: 105px;
          font-size: 14px;
          color: #4e94f4;
          position: absolute;
          bottom: 30px;
          right: -5px;
        }
      }
    }
  }
}
</style>
