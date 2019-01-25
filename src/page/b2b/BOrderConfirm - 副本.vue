<template>
  <div class="order_confirm">
    <header-top></header-top>
    <Header></Header>
    <!-- 确认订单内容显示区域 -->
    <div class="order_confirm_box banxin">
      <!-- 选择收货地址部分 -->
      <div class="choice_address">
        <h2>收货地址</h2>
        <!-- 地址列表 -->
        <ul class="address_list_all">
          <li class="address_active">
            <p class="address_list_top">
              <span>{{AddressData.name}} 收</span>
              <a>默认地址</a>
            </p>
            <div class="address_box">
              <p>{{AddressData.area}}</p>
              <p>{{AddressData.address}}</p>
              <p>{{AddressData.mobile}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 确认订单信息部分 -->
      <div class="order_ok">
        <h2>确认商品信息</h2>
        <!-- 商品信息的表格 -->
        <!-- 从立即购买 -->
        <div
          class="table_box"
          v-if="this.$route.query.from == 0"
        >
          <div class="tableProduct">
            <table>
              <thead>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>金额</th>
              </thead>
              <tbody>
                <tr
                  v-for="item in productList"
                  :key="item.index"
                >
                  <td>
                    <div class="imgBox fl">
                      <img :src="item.selectImg">
                    </div>
                    <div class="title">
                      <p>{{item.title}}</p>
                      <p>{{item.product_attr}}</p>
                    </div>
                  </td>
                  <td>{{item.price}}</td>
                  <td>
                    <el-input-number
                      v-model="item.num"
                      @change="handleChange"
                      :min="1"
                      :max="parseInt(item.changeNum)"
                      size="mini"
                      class="el_input_num"
                    ></el-input-number>
                  </td>
                  <td>
                    {{totalPrice | numFilter}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="user_message">
            给卖家留言:<el-input
              placeholder="选填, 最多100个字"
              class="message_input"
              maxlength="100"
              v-model="userMsg"
            ></el-input> {{userMsg.length}}/100
          </div>
        </div>
        <!-- 从购物车来 -->
        <div
          class="table_box"
          v-if="this.$route.query.from == 1"
        >
          <div
            class="tableProduct"
            v-for="(item, index) in cartProductList"
            :key="index"
          >
            <div class="tableProduct_shopName">
              <h3><img
                  :src="item.head_img"
                  alt=""
                >{{ item.shop_name }} </h3>
            </div>
            <table>
              <thead>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>金额</th>
              </thead>
              <tbody>
                <tr
                  v-for="items in item.goods"
                  :key="items.index"
                >
                  <td>
                    <div class="imgBox fl">
                      <img :src="items.thumb">
                    </div>
                    <div class="title">
                      <p>{{ items.title }}</p>
                      <p>{{ items.options.product_attr }}</p>
                    </div>
                  </td>
                  <td>{{ items.price }}</td>
                  <td>
                    <el-input-number
                      v-model="items.num"
                      @change="handleChange"
                      size="mini"
                      :min="1"
                      :max="parseInt(items.changeNum)"
                      class="el_input_num"
                    ></el-input-number>
                  </td>
                  <td>
                    {{ items.price*items.num | numFilter }}
                  </td>
                </tr>
                <tr class="tr_bottom">
                  <td>总价</td>
                  <td></td>
                  <td></td>
                  <td
                    class="tr_bottom_td"
                    v-html="everyShopMoney(index)"
                  ></td>
                </tr>
              </tbody>
            </table>
            <div class="user_message">
              给卖家留言:<el-input
                maxlength="100"
                placeholder="选填, 最多100个字"
                v-model="cartShop[item.shop_id]"
                class="message_input"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="total_message">
          <div class="total_message_box">
            <p v-if="from == 0"><span>应付款:</span> ¥ {{ totalPrice | numFilter }}</p>
            <p v-if="from == 1"><span>应付款:</span> ¥ {{ allShopPrice | numFilter }}</p>
            <p><span>寄送至:</span> {{AddressData.area}} {{AddressData.address}}</p>
            <p><span>收货人:</span> {{AddressData.name}} {{AddressData.mobile}}</p>
          </div>
          <el-button
            class="send_order"
            @click="submitOrder"
          >提交订单</el-button>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import {
  b2bDefaultAddress,
  b2bBuyNow,
  b2bBusinessCartConfirmOrder,
  b2bBusinessCartSubmitOrder
} from "../../api/index.js";
export default {
  inject: ["reload"],
  data() {
    return {
      productList: [], // 商品列表
      num1: "", // 商品数量选择
      totalPrice: 0, // 总金额
      userMsg: "", // 用户留言
      AddressData: [], // 默认地址的数据
      addressId: "", // 地址 id
      from: "", // 判断 上一级页面是 商品详情还是购物车
      cid: "", // 从购物车拿到的订单号
      cartProductList: [], // 购物车传过来的数据
      allShopPrice: 0, //购物车总金额
      cartShop: [] //购物车备注
    };
  },
  created() {
    this.getAddressData(); // 默认地址
    this.from = this.$route.query.from;
    if (this.from == 0) {
      this.productList.push(this.$route.query); // 接收从商品详情页面传过来的参数
      this.num1 = this.$route.query.num;
      this.totalPrice = this.stripFun(this.num1 * this.$route.query.price);
    } else if (this.from == 1) {
      this.cid = this.$route.query.cid;
      this.getCartSubmitOrder();
    }
  },
  methods: {
    // 得到地址数据
    getAddressData() {
      let params = {
        base_type: 1
      };
      b2bDefaultAddress(params).then(res => {
        console.log(123);
        if (res.code == 0) {
          this.AddressData = res.data;
          this.addressId = res.data.address_id;
        }
      });
    },
    // 商品数量加减键
    handleChange() {
      this.num1 = this.$route.query.num;
      this.totalPrice = this.stripFun(this.num1 * this.$route.query.price);
      if (this.$route.query.from == 1) {
        this.cartNum();
      }
    },
    // 从购物车提交的订单获取到的数据
    getCartSubmitOrder() {
      let params = {
        cart_id: this.cid
      };
      b2bBusinessCartConfirmOrder(params).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.cartProductList = res.data;
          this.cartNum();
        }
      });
    },
    // 购物车每个店铺商品总金额
    everyShopMoney(index) {
      var that = this;
      var everyStoreMoney = 0,
        list = that.cartProductList[index]["goods"];
      var transExpenses = that.cartProductList[index]["trans_expenses"];
      list.forEach(function(item, index, arr) {
        everyStoreMoney += parseFloat(item.num) * parseFloat(item.price);
      });
      return everyStoreMoney;
    },
    //购物车总金额
    cartNum() {
      var that = this;
      this.allShopPrice = 0;
      for (var i = 0, len = that.cartProductList.length; i < len; i++) {
        var list = that.cartProductList[i]["goods"];
        list.forEach(item => {
          that.allShopPrice += parseFloat(item.num) * parseFloat(item.price);
        });
      }
    },
    // 提交订单
    submitOrder() {
      if (this.from == 0) {
        let params = {
          product_id: this.$route.query.product_id,
          price_total: this.totalPrice,
          num_total: this.num1,
          address_id: this.addressId,
          spec: this.$route.query.spec,
          product_attr: this.$route.query.product_attr,
          brand_member_id: this.$route.query.brand_member_id,
          brand_member_pos_id: this.$route.query.brand_member_pos_id, // 业务员id
          limit_price: this.$route.query.limit_price, // 品牌商最低购买限制
          comment: this.userMsg, // 用户备注
          activity_type: this.$route.query.activity_type,
          activity_id: this.$route.query.activity_id
        };
        b2bBuyNow(params).then(res => {
          if (res.code == 0) {
            let params = {
              order_no: res.data.order_no,
              price_total: res.data.price_total,
              from: 0
            };
            this.$router.push({ name: "BOrderPaytypeConfirm", query: params });
          }
        });
      } else if (this.from == 1) {
        let params = {
          price_total: this.allShopPrice,
          address_id: this.addressId,
          cart_id: this.cid,
          comment: this.cartShop
        };
        b2bBusinessCartSubmitOrder(params).then(res => {
          if (res.code == 0) {
            let params = {
              order_no: res.data.order_no,
              price_total: res.data.price_total,
              from: 1
            };
            this.$router.push({ name: "BOrderPaytypeConfirm", query: params });
          }
        });
      }
    },
    stripFun(num, precision = 12) {
      return +parseFloat(num.toPrecision(precision));
    }
  }
};
</script>

<style lang="scss" scoped>
.order_confirm {
  background-color: #f5f5f5;
  min-height: 906px;
  .order_confirm_box {
    min-height: 906px;
    margin-top: 20px;
    background-color: #fff;
    padding: 53px 60px 68px 58px;
    box-sizing: border-box;
    // 选择收货地址
    .choice_address {
      h2 {
        height: 35px;
        border-bottom: 1px solid #dbdbdb;
        font-size: 18px;
        color: #333;
        font-weight: 700;
      }
      // 地址列表
      .address_list_all {
        margin-top: 18px;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 344px;
          height: 160px;
          padding: 0 18px;
          box-sizing: border-box;
          border: 1px solid #000;
          margin-right: 25px;
          margin-bottom: 20px;
          .address_list_top {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e7e7e7;
            span {
              font-size: 16px;
              color: #333;
              font-weight: 700;
            }
            a {
              font-size: 14px;
              color: #666;
            }
          }
          .address_box {
            margin-bottom: 20px;
            p {
              font-size: 12px;
              color: #333;
              margin-top: 10px;
            }
          }
        }
        .address_active {
          background: url("../../assets/images/b2c/choice.png") no-repeat;
          background-position: right bottom;
          border: 4px solid #e22319;
          box-sizing: border-box;
        }
      }
    }
    // 确认商品信息
    .order_ok {
      margin-top: 40px;
      h2 {
        height: 35px;
        border-bottom: 1px solid #dbdbdb;
        font-size: 18px;
        color: #333;
        font-weight: 700;
      }
      .table_box {
        margin-top: 20px;
        .tableProduct {
          border: 1px solid #e0e0e0;
          margin-top: 20px;
          .tableProduct_shopName {
            padding: 20px;
            h3 {
              img {
                width: 50px;
                height: 25px;
                vertical-align: middle;
                padding-right: 20px;
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
                  width: 530px;
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
            }
          }
        }
        .user_message {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #333;
          margin: 30px 20px;
          .message_input {
            width: 662px;
            background-color: #f3f3f3;
            margin: 0 20px;
          }
        }
      }
      .total_message {
        margin-top: 30px;
        height: 194px;
        position: relative;
        .total_message_box {
          width: 673px;
          height: 146px;
          border: 2px solid #e22319;
          padding: 25px 30px 0 0;
          box-sizing: border-box;
          position: absolute;
          right: 0;
          top: 0;
          p {
            font-size: 14px;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span {
              font-size: 16px;
              font-weight: 700;
              margin-right: 10px;
            }
          }
          p:first-child {
            font-size: 24px;
            color: #e51818;
            font-weight: 700;
            margin-bottom: 25px;
            span {
              font-size: 16px;
              color: #333;
            }
          }
          p:nth-child(2) {
            margin-bottom: 10px;
          }
        }
        .send_order {
          width: 161px;
          height: 48px;
          background-color: #e51818;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          position: absolute;
          top: 145px;
          right: 0;
        }
      }
    }
  }
}
</style>
