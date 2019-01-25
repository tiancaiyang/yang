<template>
  <div class="accountDiv banxin">
    <!-- 订单完成状态 -->
    <div class="accountInfo">
      <div class="accountInfoTop">
        <h3>
          <img src="../../../assets/common/checked.png" alt="">
          当前订单状态：交易成功
        </h3>
      </div>
      <div class="accountInfoBottom">
        <p class="prompt">温馨提醒:</p>
        <p class="promptInfo">交易已经成功，如果您未收到货物，或者收到货物无法正常使用，请及时<b @click="contactSeller(OrderProductList.brand_member_id)">联系卖家</b>或者<b @click="applyRefund">退款退货</b>处理。</p>
        <p class="promptInfo">你还可以去评价晒单进行评价</p>
        <a @click="deleteOne">删除订单</a>
      </div>
    </div>
    <!-- 物流信息 -->
    <div class="infoDiv" v-if="this.orderType != 1">
      <h4>物流信息</h4>
      <div class="info">
        <p>发货时间: {{ OrderProductList.send_time}}</p>
        <p>物流公司: {{ expressData.com}}</p>
        <p>物流单号: {{ expressData.nu}}</p>
        <p>物流跟踪:</p>
        <div class="logisticInfo">
          <div class="track-rcol">
            <div class="track-list">
              <ul>
                <li :class="index == 0? 'first':''" v-for="(item,index) in expressData.data" :key="item.index">
                  <i class="node-icon"></i>
                  <span class="time">{{ item.time }}</span>
                  <span class="txt">{{ item.context }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="infoDiv">
      <h4>订单信息</h4>
      <div class="info">
        <p>收货地址: {{ addressList.name }} {{ addressList.mobile }} {{ addressList.area }}{{ addressList.address }}</p>
        <p>订单编号: {{ OrderProductList.order_no}}</p>
        <p>支付方式: {{ OrderProductList.pay_type | payType }}</p>
        <p>下单时间: {{ OrderProductList.create_time}}</p>
        <p>买家留言: {{ OrderProductList.comment }}</p>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="goodsInfo">
      <div class="table_box">
          <div class="tableProduct">
            <div class="tableProduct_shopName">
              <h3>{{ OrderProductList.brand_store_name }} </h3>
            </div>
            <table>
              <thead>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>金额</th>
              </thead>
              <tbody>
                <tr v-for="items in OrderProductList.product" :key="items.index">
                  <td>
                    <div class="imgBox fl">
                      <img :src="items.thumb" alt="">
                    </div>
                    <div class="title">
                      <p>{{ items.title }}</p>
                      <p>{{ items.product_attr }}</p>
                    </div>
                  </td>
                  <td>{{ items.price }}</td>
                  <td>{{ items.num }}</td>
                  <td >
                    {{ items.price*items.num  | strip }}
                  </td>
                </tr>
                <!-- 赠品 -->
                <tr v-if="giftList.length != 0"><td>赠品</td></tr>
                <tr v-for="giftData in giftList" :key="giftData.index">
                  <td>
                    <div class="imgBox fl">
                      <img :src="giftData.thumb" alt="">
                    </div>
                    <div class="title">
                      <p>{{ giftData.title }}</p>
                    </div>
                  </td>
                  <td></td>
                  <td>{{ giftData.num }}</td>
                </tr>
                <tr class="tr_bottom">
                  <td>运费</td>
                  <td></td>
                  <td></td>
                  <td class="tr_bottom_td">{{ OrderProductList.trans_expenses}}</td>
                </tr>
                <tr class="tr_bottom">
                  <td>优惠券</td>
                  <td></td>
                  <td></td>
                  <td class="tr_bottom_td">-{{ OrderProductList.price_discount}}</td>
                </tr>
                <tr class="tr_bottom" v-if="orderType ==1">
                  <td>满减</td>
                  <td></td>
                  <td></td>
                  <td class="tr_bottom_td">-{{ OrderProductList.price_reduction}}</td>
                </tr>
                <tr class="tr_bottom">
                  <td>总价</td>
                  <td></td>
                  <td></td>
                  <td class="tr_bottom_td">{{ OrderProductList.price_total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
    <div class="infoBottom">
      <p class="fr">实付款: <b>￥{{ OrderProductList.price_total }}</b></p>
    </div>
  </div>
</template>

<script>
import {
  b2cOrderInfo,
  b2bOrderInfo,
  orderInfoCellPhone,
  getLogisticsDetails,
  ruralgetXcOrderDetail
} from '../../../api/index.js'
export default {
  data () {
    return {
      orderNo: this.$route.query.orderNo,
      orderType: this.$route.query.orderType,
      orderStatus: this.$route.query.orderStatus,
      OrderProductList:[],
      addressList:[],
      expressData:[],
      giftList:[]
    }
  },
  created () {
    this.getOrderInfoData()
    this.logisticsDetails()
  },
  methods: {
    getOrderInfoData(){
      if(this.orderType == 1){
        let params = {
          order_no : this.orderNo
        }
        b2bOrderInfo(params).then(res=>{
         if(res.code == 0){
            this.OrderProductList = res.data
            this.addressList = res.data.address
            this.giftList = res.data.gifts
          }
        })
      }else if(this.orderType == 2){
        let params = {
          order_no : this.orderNo
        }
        b2cOrderInfo(params).then(res=>{
          if(res.code == 0){
            this.OrderProductList = res.data
            this.addressList = res.data.address
          }
        })
      }else if(this.orderType == 3){
        let params = {
          order_no : this.orderNo
        }
        ruralgetXcOrderDetail(params).then(res=>{
          if(res.code == 0){
            this.OrderProductList = res.data
            this.addressList = res.data.address
          }
        })
      }
    },
     // 获取物流详情
    logisticsDetails(){
      let params = {
        order_no : this.orderNo
      }
      getLogisticsDetails(params).then(res=>{
        if(res.code == 0){
          this.expressData = res.data
        }
      })
    },
    //联系卖家
    contactSeller(brandMemberId){
      let params = {
        brand_member_id: brandMemberId,
        type: this.orderType
      }
      orderInfoCellPhone(params).then(res=>{
        if(res.code == 0){
          this.$message({
            showClose: true,
            message: res.data.brand_store_name+':'+ res.data.mobile,
            type: 'success'
          });
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
    // 去申请退款页面
    applyRefund(){
        let params = {
        orderNo : this.orderNo,
        orderType : this.orderType
      }
      this.$router.push({name:'orderReturnGoodsList',query:params})
    }
  }
}
</script>

<style scoped lang="scss">
.accountDiv {
  .accountInfo {
    box-sizing: border-box;
    background-color: #fff4e8;
    height: 257px;
    border: 1px solid #ffc07b;
    padding: 30px 40px;
    a {
      color: #666;
      font-size: 12px;
    }
    .accountInfoTop {
      border-bottom: 1px solid #eee;
      h3 {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
        img{
          vertical-align: middle;
        }
      }
      p {
        font-size: 14px;
        color: #333;
        margin-bottom: 20px;
      }
    }
    .accountInfoBottom {
      padding-top: 20px;
      p {
        font-size: 12px;
        margin-bottom: 20px;
      }
      .prompt {
        color: #e51818;
        font-size: 12px;
        font-weight: bold;
      }
      .promptInfo {
        color: #333;
        b {
          color: #2a51a0;
          font-weight: bold;
          font-size: 12px;
          vertical-align: top;
          cursor: pointer;
        }
      }
      a {
        font-size: 16px;
        font-weight: bold;
        color: #e51818;
        border: 2px solid #e51818;
        padding: 10px 20px;
        display: inline-block;
      }
    }
  }
  .infoDiv {
    padding: 20px 0;
    border: 1px solid #eee;
    border-top: 0;
    h4 {
      font-size: 16px;
      color: #999;
      padding: 0 0 20px 40px;
    }
    .info {
      padding: 40px 40px 0;
      font-size: 16px;
      color: 333;
      border-top: 1px solid #eee;
      p {
        margin-bottom: 20px;
        b {
          font-weight: bold;
          color: #e51818;
        }
      }
    }
  }
  .goodsInfo {
    margin-top: 30px;
    .table_box {
      margin-top: 20px;
      border: 1px solid #e0e0e0;
      .tableProduct{
            .tableProduct_shopName{
                padding: 20px 0 20px 20px;
              h3{
                img{
                  width: 50px;
                  height: 25px;
                  vertical-align: middle;
                }
              }
            }
            table{
              thead{
                font-size: 14px;
                color:#666;
                height: 40px;
                line-height: 40px;
                text-align: left;
                background-color: #fff4e8;
                th{
                  &:nth-child(1){
                    width: 480px;
                    padding-left: 20px;
                  }
                  &:nth-child(2){
                    width: 220px;
                  }
                  &:nth-child(3){
                    width: 220px;
                  }
                  &:nth-child(4){
                    width: 220px;
                  }
                  &:nth-child(5){
                    width: 220px;
                  }
                }
              }
              tbody{
                tr{
                  color: #333;
                  height: 60px;
                  line-height: 60px;
                  td{
                    &:nth-child(1){
                      padding-left: 20px;
                      .title{
                        p{
                          line-height: 20px;
                        }
                      }
                    }
                    .imgBox{
                      width: 60px;
                      height: 60px;
                      margin-right: 10px;
                      @include common_center;
                      img{
                        max-width: 100%;
                        max-height: 100%;
                      }
                    }
                  }
                }
                .tr_bottom{
                  .tr_bottom_td{
                    color: #e51818;
                    font-weight: bold;
                  }
                }
              }
            }
      }
    }
  }
  .infoBottom{
    height: 115px;
    line-height: 115px;
    margin-top: 30px;
    padding-right: 40px;
    border: 1px solid #eee;
    background-color: #f7f7f7;
    p{
      color: #333;
      font-size: 12px;
      b{
        color: #e51818;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
  // 进度条
  .logisticInfo {
    .track-rcol {
      width: 100%;
    }
		.track-list{
      margin: 20px;

      padding-left: 5px;
      position: relative;
    }
		.track-list li{
      position: relative;
      padding: 9px 0 0 25px;
      line-height: 18px;
      border-left: 1px solid #d9d9d9;
      color: #999;
    }
		.track-list li.first{
      color: #e81515;
      padding-top: 0;
      border-left-color: #fff;
    }
		.track-list li .node-icon{
      position: absolute;
      left: -6px;
      top: 63%;
      width: 10px;
      height: 10px;
      background-color: #ddd;
      border-radius: 50%;
    }
		.track-list li.first .node-icon{
      background-color: #e81515;
      z-index: 2;
    }
		.track-list li .time{
      margin-right: 20px;
      position: relative;
      top: 4px;
      display: inline-block;
      vertical-align: middle;
    }
		.track-list li .txt{
      max-width: 100%;
      position: relative;
      top: 4px;
      display: inline-block;
      vertical-align: middle;
    }
		.track-list li.first .time{
      margin-right: 20px;
    }
		.track-list li.first .txt{
      max-width: 100%;
    }
  }
}
</style>
