<template>
<div class="haha">
  <div class="my_order_content">
    <div class="my_order_content_box">
        <!-- 订单商品盒子 -->
        <div class="order_goods_box"  v-for="item in orderList" :key="item.index">
          <!-- 订单商品列表 -->
          <ul class="order_goods_list">
            <li>
              <div class="imgbox"><img :src="item.thumb"></div>
              <div class="goods_detail_box">
                <p class="goods_detail_txt">{{ item.title }}</p>
                <p class="goods_detail_num">券码: {{ item.ticket }}</p>
                <p class="goods_detail_price">有效期： <span v-if="item.class_id == 3">{{ item.stay_begin }}至</span>{{ item.stay_end }}&nbsp;&nbsp;<span v-if="item.class_id == 3">{{ item.stay_day }}</span></p>
              </div>
            </li>
          </ul>
          <!-- 订单按钮 -->
          <div class="order_btn_box">
            <a class="baseColor" @click="applyRefund(item.order_no,item.order_type)">申请退款</a>
            <a class="gray" @click="goOrderInfo(item.order_no,item.order_type,item.order_status)" >订单详情</a>
          </div>
        </div>
    </div>
  </div>
  <div class="orderNull" v-if="orderList.length == 0">
    <p class="iconfont icon-wudingdan"></p>
    <p>暂无订单，快去逛逛吧！</p>
  </div>
  <div v-if="orderList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
</div>
</template>

<script>
import { ruralgetxcorder } from '../../../api/index.js'
export default {
  data () {
    return {
      orderList:[],//订单列表
      page:0,
      limit:10,
      totalPage:0,
    }
  },
  created(){
    this.getOrderList()
  },
  methods: {
     //获取当前页码
    getCurrentPage(pageNum){
      this.page = pageNum-1;
      this.getOrderList()
    },
    // 获取订单列表
    getOrderList(){
      let params = {
        page: this.page,
        limit: this.limit
      }
      ruralgetxcorder(params).then(res=>{
        if(res.code == 0){
          this.orderList = res.data.list
          this.totalPage = parseInt(res.data.total_num)
        }
      })
    },
    // 订单详情
    goOrderInfo(orderNo,orderType,orderStatus){
      let params = {
        orderNo: orderNo,
        orderType: orderType,
        orderStatus: orderStatus,
      }
      this.$router.push({name: 'ROrderDetails',query:params})//乡村互联订单详情
    },
    // 去申请退款商品列表页面
    applyRefund(orderNo,orderType){
      let params = {
        orderNo : orderNo,
        orderType : orderType
      }
      this.$router.push({name:'orderReturnGoodsList',query:params})
    }
  }
}
</script>

<style lang="scss" scoped>
// 订单盒子
  .my_order_content {
    .my_order_content_box {
      margin-bottom: 20px;
      // 订单商品盒子
      .order_goods_box {
        width: 906px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        border-bottom: 2px dashed #e0e0e0;
        // 订单商品列表
        .order_goods_list {
          // width: 445px;
          li {
            height: 110px;
            display: flex;
            margin-bottom: 20px;
            .imgbox{
              width: 168px;
              height: 110px;
              margin-right: 19px;
              @include common_center;
              img{
                max-width: 100%;
                max-height: 100%;
              }
            }
            .goods_detail_box {
              // width: 331px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .goods_detail_txt {
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient: vertical;
                line-height: 24px;
                font-size: 18px;
                color: #333;
              }
              .goods_detail_num{
                color:#23b57e;
              }
              .goods_detail_price {
                font-size: 16px;
                color: #999;
              }
            }
          }
        }
        //赠品
        .giftList{
          margin: 20px 0;
        }
        // 订单按钮
        .order_btn_box {
          width: 153px;
          font-size: 16px;
          a {
            display: block;
            height: 45px;
            text-align: center;
            line-height: 45px;
          }
          .baseColor {
            background-color: #e51818;
            margin-bottom: 20px;
            color: #fff;
          }
          .gray {
            border: 1px solid #e0e0e0;
            color: #666;
          }
        }
      }
    }
  }
  .orderNull{
    text-align: center;
    margin-top: 50px;
    .icon-wudingdan{
      height: 100px;
      font-size: 80px;
    }
    p{
      font-size: 18px;
      color: #bbb;
      margin-bottom: 10px;
    }
  }
</style>
