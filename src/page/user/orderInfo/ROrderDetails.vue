<template>
  <div class="order_home ">
    <header-top></header-top>
    <div class="order_title ">
      <div class="box banxin">
        <span>乡村互联</span>
        <span>订单详情</span>
      </div>
    </div>  
    <div class="order_main banxin">
      <h1 class="waitPay">{{ OrderDetailsList.order_status | orderStatus }}</h1>
      <div class="rPrderInfoBox">
        <table class="orderInfo">
          <caption>订单信息</caption>
          <thead>
            <th>订单号</th>
            <th>创建时间</th>
            <th>订单优惠</th>
            <th>合计金额</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr>
              <td>{{OrderDetailsList.order_no}}</td>
              <td>{{OrderDetailsList.create_time}}</td>
              <td>
                <p>满减-¥{{OrderDetailsList.price_reduction}}</p>
                <p>优惠券-¥{{OrderDetailsList.price_discount}}</p>
              </td>
              <td>应付 ¥ {{OrderDetailsList.goods_price_total}}</td>
              <td>
                <el-button v-if="OrderDetailsList.order_status == 2" class="operationBtn baseBtn">去付款</el-button>
                <el-button v-if="OrderDetailsList.order_status == 2" type="warning operationBtn" @click="getOrderInfoCancel">取消订单</el-button>
                <el-button v-if="OrderDetailsList.order_status == 0" type="warning operationBtn" @click="deleteOne">删除订单</el-button>
                <el-button v-if="OrderDetailsList.order_status == 1" type="warning operationBtn" @click="deleteOne">删除订单</el-button>
                <el-button v-if="OrderDetailsList.order_status == 7" class="operationBtn baseBtn" @click="applyRefund">申请退款</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rPrderInfoBox">
        <table class="orderInfo">
          <caption>商品信息</caption>
          <thead>
            <th>商品名称</th>
            <th>有效时间</th>
            <th>数量</th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="item in OrderDetailsList.product" :key="item.index">
              <td>{{item.title}}</td>
              <td>{{OrderDetailsList.stay_begin}}至{{OrderDetailsList.stay_end}}</td>
              <td>{{item.num}}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rPrderInfoBox">
        <table class="orderInfo">
          <caption>预约信息</caption>
          <thead>
            <th>姓名</th>
            <th>电话</th>
            <th class="quanth">券码</th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>{{OrderDetailsList.link_name}}</td>
              <td>{{OrderDetailsList.mobile}}</td>
              <td class="quan">{{OrderDetailsList.ticket}}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rPrderInfoBox">
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
    ruralgetXcOrderDetail,
    orderInfoCancel,
    orderInfodeleteOne
  } from '../../../api/index.js'
  export default {
    data() {
      return {
        orderNo: this.$route.query.orderNo,
        orderType: this.$route.query.orderType,
        orderStatus: this.$route.query.orderStatus,
        OrderDetailsList:[],//数据列表
      }
    },
    created() {
      this.getOrderDetail()
    },
    methods: {
      goPay(){
        this.$router.push({ path:"./ROrderSubmit",query:{order_no:this.order_no,}})
      },
      // 获取订单数据
      getOrderDetail() {
        let params = {
          order_no: this.orderNo
        }
        ruralgetXcOrderDetail(params).then(res => {
          console.log(res);
          if(res.code ===0 ){
            this.OrderDetailsList = res.data
          }
        })
      },
      // 取消订单
      getOrderInfoCancel(){
        let params = {
          order_no: this.orderNo,
          type : this.orderType
        }
        orderInfoCancel(params).then(res=>{
          if(res.code == 0){
            this.$alert('确定取消订单吗？', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  showClose: true,
                  message: '取消成功',
                  type: 'success'
                });
              }
            });
            this.getOrderDetail()
          }
        })
      },
      // 删除订单
      deleteOne(){
        let params = {
            order_no: this.orderNo,
            type: this.orderType
        }
        orderInfodeleteOne(params).then(res=>{
            if(res.code == 0){
              this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
              });
              this.$router.push({name: 'OrderAll'})
            }
        })
      },
      // 去申请退款商品列表页面
      applyRefund(){
        let params = {
          orderNo: this.orderNo,
          orderType: this.orderType
        }
        this.$router.push({name:'orderReturnGoodsList',query:params})
      }
    },
  }
</script>
<style lang="scss" scoped>
  .order_home {
    background-color: #e5e5e5;
    .order_title {
      background-color: #fff;
      .box {
        span:first-child {
          margin-top: 34px;
          margin-bottom: 36px;
          display: inline-block;
          font-weight: bold;
          font-size: 30px;
          color: #0e7d4a;
        }
        span:last-child {
          margin-left: 32px;
          margin-top: 50px;
          font-size: 20px;
          color: #333333;
        }
      }
    }
    .order_main {
      margin-bottom: 180px;
      .waitPay {
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #1d9e6e;
      }
      .rPrderInfoBox{
        background-color: #fff;
        padding: 20px 0;
        margin-bottom: 30px;
        border-radius: 10px;
      }
      // 订单信息
      .orderInfo {
        width: 100%;
        caption {
          text-align: left;
          padding:0 0 20px 20px;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #333;
          background-color: #fff;
        }
        th{
          width: 20%;
          color: #999;
          font-weight: bold;
        }
        .quanth{
          color: #666;
        }
        tr {
          td {
            padding: 20px 0;
            text-align: center;
            font-size: 18px;
            color: #333;
            p{
              margin-bottom: 10px;
            }
            .operationBtn{
              border-radius: 4px;
              padding: 10px 20px;
            }
            .baseBtn{
              color: #fff;
              background-color: #1d9e6e;
            }
          }
          .quan{
            font-weight: bold;
            color:#1d9e6e;
          }
        }
      }
      // 取消规则
      .cancleInfo {
        padding-left: 20px;
        h1 {
          font-size: 24px;
          color: #333;
        }
        .cancleul {
          border-top: solid 1px #eaeaea;
          margin-top: 20px;
          li {
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
