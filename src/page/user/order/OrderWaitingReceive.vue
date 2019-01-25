<template>
<div class="haha">
  <ul class="my_order_content" v-for="item in orderList" :key="item.index">
    <li class="my_order_content_box">
        <!-- 订单盒子的上半部分 -->
        <div class="content_box_top">
          <p class="order_title">{{ item.order_status | orderStatus}}</p>
          <div class="order_status">
            <ul>
              <li>{{ item.create_time }}</li>
              <li>订单号: {{ item.order_no }}</li>
              <li v-if="item.order_type == 3">{{ item.class_id | classId }}</li>
              <li>{{ item.brand_store_name }}</li>
              <li>{{ item.pay_type | payType }}</li>
            </ul>
            <p class="total_price">总金额:&nbsp;<span>{{ item.price_total }}</span>&nbsp;元</p>
          </div>
        </div>
        <!-- 订单商品盒子 -->
        <div class="order_goods_box">
          <div>
            <!-- 订单商品列表 -->
            <ul class="order_goods_list">
              <li v-for="items in item.product" :key="items.index">
                <img :src="items.thumb">
                <div class="goods_detail_box">
                  <p class="goods_detail_txt">{{ items.title }}</p>
                  <p class="goods_detail_price">¥&nbsp;{{ items.price }} &nbsp; ×{{ items.num}}</p>
                </div>
              </li>
            </ul>
            <!-- 赠品 -->
            <p class="giftList" v-if="item.gift.length != 0">赠品：</p>
            <ul class="order_goods_list" v-if="item.gift.length != 0">
              <li v-for="gifts in item.gift" :key="gifts.index">
                <img :src="gifts.thumb">
                <div class="goods_detail_box">
                  <p class="goods_detail_txt">{{ gifts.title }}</p>
                  <p class="goods_detail_price"> ×{{ gifts.num}}</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- 订单按钮 -->
          <div class="order_btn_box">
            <a @click="ConfirmReceipt(item.order_no,item.order_type)" class="baseColor">确认收货</a>
            <a @click="goOrderInfo(item.order_no,item.order_type,item.order_status)" class="gray">订单详情</a>
          </div>
        </div>
    </li>
  </ul>
  <div class="orderNull" v-if="orderList.length == 0">
    <p class="iconfont icon-wudingdan"></p>
    <p>暂无订单，快去逛逛吧！</p>
  </div>
  <div v-if="orderList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
</div>
</template>

<script>
import { GetPersonalOrderList ,confirmReceipt,Getordernum} from '../../../api/index.js'
export default {
  inject :['reload'],
  data () {
    return {
      orderList:[],//订单列表
      page:0,
      limit:10,
      totalPage:0,//总条数
    }
  },
  created(){
    this.getOrderNUm()
    this.getOrderList()
  },
  methods: {
    // 数量角标
    getOrderNUm(){
      Getordernum().then(res=>{
        if(res.code == 0){
          this.totalPage = parseInt(res.data.count3)
        }
      })
    },
     //获取当前页码
    getCurrentPage(pageNum){
      this.page = pageNum-1;
      this.getOrderList()
    },
    // 获取订单列表
    getOrderList(){
      let params = {
        status : 4,
        page : this.page,
        limit: this.limit
      }
      GetPersonalOrderList(params).then(res=>{
        if(res.code == 0){
          this.orderList = res.data
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
      this.$router.push({name: 'orderInfoDeliverGoods',query:params})//待收货
    },
    // 确认收货
    ConfirmReceipt(orderNo,orderType){
      this.$confirm('是否确认收货', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          order_no:orderNo,
          type:orderType
        }
        confirmReceipt(params).then(res=>{
          if(res.code == 0){
            // 再次刷新页面
            this.reload()
            this.$message({
              showClose: true,
              message: '收货成功',
              type: 'success'
            });
          }
        })
      });  
    },
  }
}
</script>

<style lang="scss" scoped>
// 订单盒子
  .my_order_content {
    .my_order_content_box {
      border: 1px solid #e51818;
      background-color: #fff6f6;
      margin-bottom: 20px;
      // 订单盒子的上半部分
      .content_box_top {
        border-bottom: 1px solid #f28787;
        padding: 20px;
        box-sizing: border-box;
        .order_title {
          font-size: 20px;
          color: #e51818;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        .order_status {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          ul {
            display: flex;
            li {
              padding: 0 10px;
              position: relative;
              font-size: 14px;
              color: #999;
            }
            li:first-child {
              padding-left: 0;
            }
            li:last-child {
              padding-right: 0;
            }
            li:after {
              content: "";
              width: 1px;
              height: 14px;
              position: absolute;
              top: 0;
              right: 0;
              background-color: #999;
            }
            li:last-child:after {
              display: none;
            }
          }
          .total_price {
            display: flex;
            align-items: flex-end;
            font-size: 16px;
            color: #999;
            span {
              font-size: 32px;
              color: #333;
            }
          }
        }
      }
      // 订单商品盒子
      .order_goods_box {
        width: 906px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        // 订单商品列表
        .order_goods_list {
          width: 445px;
          li {
            height: 88px;
            display: flex;
            margin-bottom: 40px;
            img {
              width: 88px;
              height: 88px;
              margin-right: 19px;
            }
            .goods_detail_box {
              width: 331px;
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
                font-size: 14px;
                color: #666;
              }
              .goods_detail_price {
                font-size: 16px;
                color: #333;
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
