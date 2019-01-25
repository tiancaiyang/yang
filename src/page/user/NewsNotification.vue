<template>
  <div class="news_notification">
    <h2>消息通知</h2>
    <!-- 消息导航栏 -->
    <ul class="news_nav">
      <li v-for="(item, index) in tabs" :key="index" @click="tab(index)" :class="{active:index==newsType}">
        {{item}}
      </li>
    </ul>
    <!-- 消息列表显示区域 -->
    <ul class="news_content">
      <li v-for="(items) in messageList" :key="items.index">
        <div class="content_box_left">
          <p class="left_title">{{ items.type_title }}<span v-if="checked ==0" class="icon"></span> </p>
          <p class="left_detail">{{ items.title }}</p>
          <p class="left_time">{{ items.create_time }}</p>
        </div>
        <div class="content_btn_box">
          <a @click="DeleteMessageData(items.message_id)"><span class="el-icon-delete"></span> 删除</a>
          <a v-if="items.has_detail == 1" @click="goDetails(items.new_type)">查看订单详情<span class="el-icon-arrow-right"></span></a>
        </div>
      </li>
    </ul>
    <!-- 无消息通知显示 -->
    <div class="orderNull" v-if="messageList.length == 0">
      <p class="iconfont icon-wuxiaoxi"></p>
      <p>当前没有新的通知</p>
    </div>
  </div>
</template>

<script>
  import {
    GetMessageList,
    DeleteMessage
  } from '../../api/index.js'
  export default {
    inject: ['reload'],
    data() {
      return {
        tabs: ['全部消息', '系统通知', '交易物流', '活动推荐', '优惠中心'],
        num: 0,
        messageList: [], //消息数据列表
        newsType: 0,
        new_type: '', //信息类型
        checked:'0',
      }
    },
    created() {
      this.getMessageData()
    },
    mounted() {

    },
    methods: {
      // tab栏切换
      tab(index) {
        this.newsType = index
        this.getMessageData()
      },
      // 获取消息列表
      getMessageData() {
        let params = {
          news_type: this.newsType
        }
        GetMessageList(params).then(res => {
          console.log(res);
          if (res.code == 0) {
            this.messageList = res.data;
          } else if (res.code == 1) {
            this.$message.error(res.msg);
          }
        })
      },
      // 删除消息
      DeleteMessageData(messageId) {
        let params = {
          message_id: messageId
        }
        DeleteMessage(params).then(res => {
          if (res.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            // 再次刷新页面
            this.reload()
          }
        })
      },
      // 去详情
      goDetails(type) {
        if (type == 1) {
          this.$router.push("NewsNotification");
           this.checked = 1;
        } else if (type == 2) {
          this.newsType = 2;
           this.checked = 1;
        } else if (type == 3) {
          this.$router.push("/b2b/BCombination");
           this.checked = 1;
        } else if (type == 4) {
          this.$router.push("UserCoupon");
           this.checked = 1;
        } else if (type == 5) {
          this.$router.push("/b2b/BLimitTimeSell");
           this.checked = 1;
        } else if (type == 6) {
          this.$router.push("/b2b/BGoodSale");
           this.checked = 1;
        } else if (type == 7) {
          this.$router.push("/CSeckillTime");
           this.checked = 1;
        } else if (type == 9) {
          this.$router.push("/CGoodSale");
           this.checked = 1;
        } else if (type == 10) {
          this.$router.push("/OrderPerson/OrderReturnGoods");
           this.checked = 1;
        }
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
        cursor: pointer;
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
            position: relative;

            .icon {
              position: absolute;
              height: 8px;
              width: 8px;
              border-radius: 50%;
              background-color: #e51818;
            }
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

  .orderNull {
    text-align: center;
    margin-top: 50px;

    .icon-wuxiaoxi {
      height: 100px;
      font-size: 80px;
    }

    p {
      font-size: 18px;
      color: #bbb;
      margin-bottom: 10px;
    }
  }

</style>
