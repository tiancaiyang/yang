<template>
  <div class="my_order">
    <h2>我的订单</h2>
    <!-- 导航栏 和 搜索区域 -->
    <div class="my_order_top">
      <!-- 订单状态导航 -->
      <div class="top_nav">
        <ul>
          <router-link to="/one/user/OrderPerson/OrderAll" tag="li" active-class="is-active">全部订单</router-link>
          <router-link to="/one/user/OrderPerson/OrderWaitingPay" tag="li" active-class="is-active">待付款({{ orderNum.count1 }})</router-link>
          <router-link to="/one/user/OrderPerson/OrderDeliverGoods" tag="li" active-class="is-active">待发货({{ orderNum.count2 }})</router-link>
          <router-link to="/one/user/OrderPerson/OrderWaitingReceive" tag="li" active-class="is-active">待收货({{ orderNum.count3 }})</router-link>
          <router-link to="/one/user/OrderPerson/OrderConsumption" tag="li" active-class="is-active">待消费({{ orderNum.count7 }})</router-link>
          <router-link to="/one/user/OrderPerson/OrderReturnGoods" tag="li" active-class="is-active">售后/退换货</router-link>
        </ul>
      </div>
      <!-- 订单检索框 -->
      <!-- <div class="search_box">
        <el-input placeholder="请输入内容" size="medium">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div> -->
    </div>
    <!-- 订单盒子 -->
    <div class="order_list_box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Getordernum } from '../../../api/index.js'
export default {
  data () {
    return {
      orderNum:[],//数量角标
    }
  },
  created(){
    this.getOrderNUm()
  },
  methods: {
    getOrderNUm(){
      Getordernum().then(res=>{
        if(res.code == 0){
          console.log(res)
          this.orderNum = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my_order {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  h2 {
    font-size: 24px;
    color: #666;
    margin: 8px 0 30px 0;
    line-height: 36px;
  }
  // 导航栏 和 搜索区域
  .my_order_top {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 订单状态导航
    .top_nav {
      ul {
        display: flex;
        li {
          cursor: default;
          padding: 0 20px;
          position: relative;
          font-size: 16px;
          color: #666;
        }
        li:after {
          content: "";
          width: 1px;
          height: 14px;
          position: absolute;
          top: 2px;
          right: 0;
          background-color: #b0b0b0;
        }
        li:last-child:after {
          display: none;
        }
        li:first-child {
          padding-left: 0;
        }
        li:last-child {
          padding-right: 0;
        }
        .is-active {
          color: #e51818;
        }
      }
    }
    // 订单检索框
    .search_box {
      width: 245px;
      height: 40px;
    }
  }
}
</style>
