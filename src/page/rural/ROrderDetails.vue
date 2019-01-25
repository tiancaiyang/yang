<template>
  <div class="order_home ">
    <header-top></header-top>

    <div class="order_title ">
      <div class="box banxin">
        <span>乡村互联</span>
        <span>订单详情</span>
      </div>

      <div class="order_main banxin">
        <h1 class="waitPay">待支付</h1>
        <table class="orderInfo">
          <caption>订单信息</caption>
          <tr>
            <td>订单号</td>
            <td>创建时间</td>
            <td>订单优惠</td>
            <td>合计金额</td>
            <td>操作</td>
          </tr>
          <tr>
            <td>{{OrderDetailsList.order_no}}</td>
            <td>{{OrderDetailsList.create_time}}</td>
            <td>满减-¥{{OrderDetailsList.price_reduction}} 优惠券-¥{{OrderDetailsList.price_discount}}</td>
            <td>应付 ¥ {{OrderDetailsList.goods_price_total}}</td>
            <td>
              <input type="button" value="去支付" class="pay">
              <input type="button" value="取消订单" class="cancle">
            </td>
          </tr>
        </table>
        <table class="shopInfo">
          <caption>商品信息</caption>
          <tr>
            <td>商品名称</td>
            <td>有效时间</td>
            <td>数量</td>
          </tr>
          <tr>
            <td>{{OrderDetailsList.title}}</td>
            <td>{{OrderDetailsList.end_time}}</td>
            <td>{{OrderDetailsList.num}}</td>

          </tr>
        </table>

        <table class="appoInfo">
          <caption>预约信息</caption>
          <tr>
            <td>姓名</td>
            <td>电话</td>
          </tr>
          <tr>
            <td>{{OrderDetailsList.link_name}}</td>
            <td>{{OrderDetailsList.link_mobile}}</td>
          </tr>
        </table>

        <div class="cancleInfo">
          <h1>取消规则</h1>
          <ul class="cancleul">
            <li>{{OrderDetailsList.use_rule}}</li>

          </ul>
        </div>
      </div>
    </div>

    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
  import {
    ruralgetXcOrderDetail
  } from '../../api/index.js'
  export default {
    data() {
      return {
        order_no: '1544170490919',
        // order_no: this.$route.query.order_no,
        OrderDetailsList:[],//订单详情数组

      }
    },
    methods: {

      goPay() {
        this.$router.push({
          path: "./ROrderSubmit",
          query: {
            order_no: this.order_no,
          }
        })
      },

      // 接受接口返回数据
      getruralgetXcOrderDetail() {
        let params = {
          order_no: this.order_no
        }
        ruralgetXcOrderDetail(params).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.OrderDetailsList = res.data;
            // console.log(this.order_no);
          }

        })
      }
    },
    // 页面初始化完毕
    created() {
      this.getruralgetXcOrderDetail()
    },

  }

</script>
<style lang="scss" scoped>
  .order_home {
    background-color: #e3e3e3;

    .order_title {
      width: 100%;
      // background-color: #e3e3e3;
      background-color: #ffffff;

      .box {
        span:first-child {
          margin-top: 43px;
          margin-bottom: 36px;

          display: inline-block;
          font-family: HYRunYuan-GEW;
          font-size: 44px;
          color: #0e7d4a;
        }

        span:last-child {
          margin-left: 32px;
          margin-top: 55px;
          font-family: MicrosoftYaHei;
          font-size: 20px;
          color: #333333;
        }
      }
    }

    .order_main {
      .waitPay {
        margin-top: 48px;
        margin-bottom: 30px;
        font-family: MicrosoftYaHei;
        font-size: 42px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #1d9e6e;
      }

      // 订单信息
      .orderInfo {
        text-align: center;
        width: 1199px;
        // background-color: #ffffff;
        border-radius: 10px;
        border-top: solid 1px #eaeaea;
        margin-left: 38px;

        caption {
          text-align-last: left;
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #333333;
          margin-top: 35px;
          margin-bottom: 35px;
        }

        tr {
          width: 1122px;

          td {
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            color: #999999;

            .pay {
              width: 90px;
              height: 36px;
              background-color: #1d9e6e;
              border-radius: 8px;
              border: 1px solid #ccc;
              outline: none;
              font-family: MicrosoftYaHei;
              font-size: 16px;
              color: #ffffff;
            }

            .cancle {
              width: 90px;
              height: 36px;
              background-color: #ff8800;
              border-radius: 8px;
              border: 1px solid #ccc;
              outline: none;
              font-family: MicrosoftYaHei;
              font-size: 16px;
              color: #ffffff;
            }
          }
        }
      }

      // 商品信息
      .shopInfo {
        text-align: center;
        width: 1199px;
        // background-color: #ffffff;
        border-radius: 10px;
        border-top: solid 1px #eaeaea;

        margin: 20px 0;
        margin-left: 38px;

        caption {
          text-align-last: left;
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #333333;
          margin-top: 35px;
          margin-bottom: 35px;
        }

        tr {
          width: 1122px;

          td {
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            color: #999999;
          }
        }
      }

      // 预约信息
      .appoInfo {
        text-align: center;
        width: 1199px;
        // background-color: #ffffff;
        border-radius: 10px;
        border-top: solid 1px #eaeaea;

        margin: 20px 0;
        margin-left: 38px;

        caption {
          text-align-last: left;
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #333333;
          margin-top: 35px;
          margin-bottom: 35px;
        }

        tr {
          width: 1122px;

          td {
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            color: #999999;
          }
        }
      }

      // 取消规则
      .cancleInfo {
        width: 1199px;
        height: 365px;
        background-color: #ffffff;
        border-radius: 10px;
        margin: 35px 0;
        margin-left: 38px;

        h1 {
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          color: #333333;


        }

        .cancleul {
          width: 1122px;
          border-top: solid 1px #eaeaea;
          margin-top: 20px;

          li {

            font-family: MicrosoftYaHei;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 36px;
            letter-spacing: 0px;
            color: #666666;

            &:first-child {
              margin-top: 20px;
            }
          }

        }
      }
    }


  }

</style>
