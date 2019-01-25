<template>
  <div class="accountDiv banxin">
    <!-- 订单待发货状态 -->
    <div class="accountInfo">
      <div class="accountInfoTop">
        <h3>
          <img src="../../../assets/common/checked.png" alt="">
          订单提交成功,现在只差最后一步啦！
        </h3>
      </div>
      <div class="accountInfoBottom">
        <p class="prompt">温馨提醒:</p>
        <p class="promptInfo">如果卖家存在违背发货时间承诺的情况，或者您也不想再要货物，您可以
          <b @click="contactSeller(OrderProductList.brand_member_id)">联系卖家</b> 或者
          <b v-if="orderType != 1 || OrderProductList.pay_type !=3" @click="applyRefund()">申请退款</b>
          <b v-if="orderType == 1 && OrderProductList.pay_type ==3" @click="getOrderInfoCancel">取消订单</b>
        </p>
        <a @click="ReminderShipment">提醒发货</a>
      </div>
    </div>
    <!-- 物流信息 -->
    <div class="infoDiv" v-if="this.orderType != 1">
      <h4>物流信息</h4>
      <div class="info">
        {{ expressData.content }}
        <p v-if="orderType == 3">暂无物流信息</p>
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
                <td>
                  {{ items.price*items.num | strip }}
                </td>
              </tr>
              <!-- 赠品 -->
              <tr v-if="giftList.length != 0">
                <td>赠品</td>
              </tr>
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
    reminderShipment,
    orderInfoCellPhone,
    orderInfoCancel,
    ruralgetXcOrderDetail
  } from '../../../api/index.js'
  export default {
    data() {
      return {
        orderNo: this.$route.query.orderNo,
        orderType: this.$route.query.orderType,
        orderStatus: this.$route.query.orderStatus,
        OrderProductList: [],
        addressList: [],
        expressData: [],
        giftList: [],
        activity_type: '',
        product: [], //产品
      }
    },
    created() {
      this.getOrderInfoData()
    },
    methods: {
      getOrderInfoData() {
        if (this.orderType == 1) {
          let params = {
            order_no: this.orderNo
          }
          b2bOrderInfo(params).then(res => {
            console.log(res)
            if (res.code == 0) {
              this.product = res.data.product;
              this.activity_type = res.data.activity_type;
              this.OrderProductList = res.data
              this.addressList = res.data.address
              this.giftList = res.data.gifts
            }
          })
        } else if (this.orderType == 2) {
          let params = {
            order_no: this.orderNo
          }
          b2cOrderInfo(params).then(res => {
            if (res.code == 0) {
              this.OrderProductList = res.data
              this.addressList = res.data.address
              this.expressData = res.data.express
            }
          })
        } else if (this.orderType == 3) { //乡村互联
          let params = {
            order_no: this.orderNo
          }
          ruralgetXcOrderDetail(params).then(res => {
            if (res.code == 0) {
              this.OrderProductList = res.data
              this.addressList = res.data.address
            }
          })
        }
      },
      //联系卖家
      contactSeller(brandMemberId) {
        let params = {
          brand_member_id: brandMemberId,
          type: this.orderType
        }
        orderInfoCellPhone(params).then(res => {
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: res.data.brand_store_name + ':' + res.data.mobile,
              type: 'success'
            });
          }
        })
      },
      // 提醒发货
      ReminderShipment() {
        let params = {
          order_no: this.orderNo,
          type: this.orderType
        }
        reminderShipment(params).then(res => {
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: '提醒成功',
              type: 'success'
            });
          }
        })
      },
      // 取消订单
      getOrderInfoCancel() {
        let params = {
          order_no: this.orderNo,
          type: this.orderType
        }
        orderInfoCancel(params).then(res => {
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: '取消成功',
              type: 'success'
            });
            let param = {
              orderNo: this.orderNo,
              orderType: this.orderType,
              orderStatus: this.orderStatus,
            }
            this.$router.push({
              name: 'orderInfoDel',
              query: param
            }) //已取消
          }
        })
      },
      // 去申请退款商品列表页面
      applyRefund() {
        if (this.activity_type == 3) {
          // 拿到退款详情号
          let detailId = [];
          this.product.forEach(item => {
            detailId.push(item.detail_id)
          })
          let detail = detailId.join(',');
          console.log(detail);
          let params = {
            orderNo: this.orderNo,
            orderType: this.orderType,
            detailId: detail
          }
          this.$router.push({
            path: '/BReturnGoods',
            query: params
          });
        } else {
          let params = {
            orderNo: this.orderNo,
            orderType: this.orderType
          }
          this.$router.push({
            name: 'orderReturnGoodsList',
            query: params
          })
        }

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

          img {
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
          font-size: 16px;
          margin-bottom: 20px;
        }

        .prompt {
          color: #e51818;
          font-size: 16px;
          font-weight: bold;
        }

        .promptInfo {
          color: #333;

          b {
            color: #2a51a0;
            font-weight: bold;
            font-size: 16px;
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

          .logisticGW {
            color: #00f;
            vertical-align: top;
          }
        }
      }
    }

    .goodsInfo {
      margin-top: 30px;

      .table_box {
        margin-top: 20px;
        border: 1px solid #e0e0e0;

        .tableProduct {
          .tableProduct_shopName {
            padding: 20px 0 20px 20px;

            h3 {
              img {
                width: 50px;
                height: 25px;
                vertical-align: middle;
              }
            }
          }

          table {
            thead {
              font-size: 14px;
              color: #666;
              height: 40px;
              line-height: 40px;
              text-align: left;
              background-color: #fff4e8;

              th {
                &:nth-child(1) {
                  width: 480px;
                  padding-left: 20px;
                }

                &:nth-child(2) {
                  width: 220px;
                }

                &:nth-child(3) {
                  width: 220px;
                }

                &:nth-child(4) {
                  width: 220px;
                }

                &:nth-child(5) {
                  width: 220px;
                }
              }
            }

            tbody {
              tr {
                color: #333;
                height: 60px;
                line-height: 60px;

                td {
                  &:nth-child(1) {
                    padding-left: 20px;

                    .title {
                      p {
                        line-height: 20px;
                      }
                    }
                  }

                  .imgBox {
                    width: 60px;
                    height: 60px;
                    margin-right: 10px;
                    @include common_center;

                    img {
                      max-width: 100%;
                      max-height: 100%;
                    }
                  }
                }
              }

              .tr_bottom {
                .tr_bottom_td {
                  color: #e51818;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }

    .infoBottom {
      height: 115px;
      line-height: 115px;
      margin-top: 30px;
      padding-right: 40px;
      border: 1px solid #eee;
      background-color: #f7f7f7;

      p {
        color: #333;
        font-size: 12px;

        b {
          color: #e51818;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }

</style>
