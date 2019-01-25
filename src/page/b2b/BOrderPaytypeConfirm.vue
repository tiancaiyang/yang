<template>
  <div class="body_common">
    <header-top></header-top>
    <Header></Header>
    <div class="body_box">
      <div class="body_box_content banxin clearfix">
        <div class="payInfo">
          <div class="payInfoTop">
            <h3>
              <img src="../../assets/common/checked.png">
              订单提交成功,现在只差最后一步啦！
            </h3>
            <p>请尽快完成订单,我们将会为您保留支付页面方便支付</p>
          </div>
          <div class="payInfoBottom" v-if="this.from == 0">
            <a href="javascript:void(0);" class="fr">我的订单>></a>
            <p v-for="item in productData" :key="item.index">{{ item.title }} {{ item.product_attr }} 数量: X {{ item.num
              }}</p>
            <p v-if="comment !== null && comment.length != 0">备注：{{ comment }}</p>
          </div>
          <div class="payInfoBottom" v-if="this.from == 1">
            <router-link to="/one/user/OrderPerson/OrderAll" tag="a" class="fr">我的订单>></router-link>
            <div v-for="item in productDataMore" :key="item.index">
              <h3>{{ item.brand_store_name }}</h3>
              <div v-for="items in item.product" :key="items.index">
                <p>{{ items.title }} {{ items.product_attr }} X {{ items.num }}</p>
              </div>
              <div v-for="gift in item.gifts" :key="gift.index">
                <p>赠品：{{ gift.title }} X {{ gift.num }}</p>
              </div>
              <p>{{item.comment}}</p>
            </div>
          </div>
          <p class="address_box">收货信息：{{ AddressData.area }}{{ AddressData.address }} &nbsp;&nbsp;&nbsp;&nbsp;{{
            AddressData.name }}&nbsp;&nbsp;{{ AddressData.mobile }}</p>
        </div>
        <div class="changePay">
          <h3>支付金额: <b>￥{{allPrice}}</b></h3>
          <ul class="changePay-UL">
            <li v-for="items in payTypeList" :key="items.index">
              <el-radio v-model="radio" :label="items.pay_type" class="payRadio" @change="haha(radio)">
                <img :src="items.logo">
              </el-radio>
              <span class="payName">{{items.name}}</span>
            </li>
          </ul>
          <!-- 银行卡列表显示区域 -->
          <ul class="changePay-UL" v-if="typeNum == 4 && bankCardData.length > 0">
            <li v-for="(item, index) in bankCardData" :key="index">
              <el-radio v-model="radio2" :label="item.id" class="payRadio" @change="getBrandPayType(item.id)">
                <img :src="item.bank_icon">
              </el-radio>
              <span class="payName">{{item.plantBankName}}</span>
              <span class="bank_num">**** **** **** {{item.accNo}}</span>
              <div class="fr brandNUm" v-if="brandindex == item.id">
                <el-input v-model="brandNum" size="medium" class="brandNum_input" placeholder="请输入验证码"></el-input>
                <div class="scodeDiv">
                  <identify-code ref="timerbtn" class="identify" v-on:run="sendCode(item.id)"></identify-code>
                </div>
              </div>
            </li>
          </ul>
          <ul class="changePay-UL" v-if="typeNum == 4 && bankCardData.length == 0">
            <li>您还没有绑定银行卡，请去绑定银行卡</li>
          </ul>
          <el-button class="add_address" @click="addBankCard()"><span class="el-icon-plus"></span>添加银行卡</el-button>
          <div class="submitOrder clearfix">
            <a class="fr" @click="goPay()">提交订单</a>
          </div>
        </div>
      </div>
      <div class='popContainer' v-if="codeFlag">
        <div id="qrcode" ref="qrcode">
          <span class="iconfont icon-guanbi" @click="closeQrcode">
          </span>
          <p>请用微信扫描二维码支付</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
  import {
    confirmOrderPayType,
    b2bGetGoodsDefault,
    b2bDefaultAddress,
    b2bGetMoreGoodsDefault,
    aliPay, // 支付宝支付
    wechatPay, // 微信支付
    b2bUpdateOrderStatus, // 货到付款
    bankCardPay,
    bankCardList,
    bankSendCode
  } from "../../api/index.js";
  // import HeaderTwo from '../../components/headerTwo'
  import IdentifyCode from "../../components/identifyCode.vue";
  import QRCode from "qrcodejs2";
  export default {
    data() {
      return {
        radio: "1",
        radio2: "",
        typeNum: "1",
        brandindex: "", //银行卡选中
        brandNum: "", //银行卡验证码
        bankCardData: [],
        token: localStorage.getItem("token"), // token
        orderOn: this.$route.query.order_no,
        allPrice: this.$route.query.price_total ,
        from: this.$route.query.form,
        productData: [], //商品
        productDataMore: [], //多商品
        payTypeList: [], // 支付方式数据
        comment: "", //但商品备注
        codeFlag: false, // 微信支付 遮罩层是否显示的标志
        qrcode_url: "",
        AddressData: []
      };
    },

    components: {
      QRCode,
      IdentifyCode
    },
    created() {
      this.getPayTypeList();
      this.getOrderInfo();
      this.getAddressData();
      this.getBankList();
    },
    updated() {
      // this.getBankList();
    },
    methods:{
      // 得到地址数据
      getAddressData() {
        let params = {
          base_type: 1
        };
        b2bDefaultAddress(params).then(res => {
          if (res.code == 0) {
            this.AddressData = res.data;
          }
        });
      },
      // 获取订单详情
      getOrderInfo() {
        let params = {
          order_no: this.orderOn
        };
        if (this.from == 0) {
          b2bGetGoodsDefault(params).then(res => {
            if (res.code == 0) {
              this.productData = res.data.product;
            }
          });
        } else if (this.from == 1) {
          b2bGetMoreGoodsDefault(params).then(res => {
            if (res.code == 0) {
              this.productDataMore = res.data;
            }
          });
        }
      },
      // 获取支付方式的列表
      getPayTypeList() {
        let params = {
          base_type: 1
        };
        confirmOrderPayType(params).then(res => {
          if (res.code == 0) {
            this.payTypeList = res.data;
          }
        });
      },
      haha(value) {
        this.typeNum = value;
      },
      // 获取银行卡的选中
      getBrandPayType(brandindex) {
        this.brandindex = brandindex;
      },
      // 获取银行卡列表
      getBankList() {
        let params = {
          token: this.token
        };
        var fd = new FormData();
        fd.append("token", this.token);
        bankCardList(fd).then(res => {
          if (res.code == 0) {
            this.bankCardData = res.data;
            console.log(res)
          }
        });
      },
      // 银行卡发送验证码
      sendCode: function (id) {
        this.$refs.timerbtn[0].setDisabled(true); //设置按钮不可用
        let fd = new FormData();
        fd.append("token", this.token);
        fd.append("kjid", id);
        fd.append("order_no", this.orderOn);
        fd.append("type", 0);
        bankSendCode(fd).then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$refs.timerbtn[0].start(); //启动倒计时
          } else {

        }
        })
      },
      // 添加银行卡
      addBankCard() {
        this.token =
          "http://test.silutianyu.com/api/PayPingAnKj/UnionAPI_Add_Card.php" +
          "?" + "token=" + this.token + "&is_list= 1" + "&order_no =" + this.orderOn + "&price_total=" + this.allPrice +
          '&form=0' + '&type=1';
        window.location.href = this.token;
      },
      // 去支付
      goPay() {
        let params = {
          order_no: this.orderOn,
          type: 1
        };
        if (this.radio == 1) {
          // 支付宝支付
          aliPay(params).then(res => {
            if (res.code == 0) {
              const div = document.createElement("div");
              div.innerHTML = res.data;
              document.body.appendChild(div);
              // document.forms.alipaysubmit.setAttribute('target', '_blank') // 在新的页面打开
              document.forms.alipaysubmit.submit();
            }
          });
        } else if (this.radio == 2) {
          // 微信支付
          wechatPay(params).then(res => {
            if (res.code == 0) {
              let qrcode = new QRCode("qrcode", {
                width: 200,
                height: 200,
                text: res.data.code_url
              });
            }
          });
          this.codeFlag = true;
        } else if (this.radio == 3) {
          // 货到付款
          b2bUpdateOrderStatus(params).then(res => {
            console.log(res)
            if (res.code == 0) {
              console.log(res)
              this.$router.replace({
                name: 'BCodCallBackPage'
              })
            } else {
              this.$message.error(res.msg);
            }
          });
        } else if (this.radio == 4) {
          // 银行卡支付
          let fd = new FormData();
          fd.append("token", this.token);
          fd.append("order_no", this.orderOn);
          fd.append("type", 1);
          fd.append("kjid", this.radio2);
          fd.append("code", this.brandNum);
          bankCardPay(fd).then(res => {
            if (res.data == 0) {} else {
              this.$message.error('res.msg');
            }
          });
        }
      },
      // 关闭微信支付二维码的遮罩层
      closeQrcode() {
        this.codeFlag = false;
      }
    }
    }


</script>

<style lang="scss" scoped>
  .body_common {
    .body_box {
      background-color: #f5f5f5;
      padding-bottom: 80px;

      // 微信遮罩层
      .popContainer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        @include common_center;

        #qrcode {
          background-color: #fff;
          border-radius: 10px;
          width: 260px;
          height: 260px;
          text-align: center;
          position: relative;

          .iconfont {
            position: absolute;
            top: 8px;
            right: 8px;
            font-size: 12px;
          }

          p {
            margin-top: 10px;
          }

          & /deep/ img {
            margin-left: 30px;
            margin-top: 10px;
          }
        }
      }

      .body_box_content {
        padding-top: 40px;
        min-height: 1052px;
      }
    }
  }

  .payInfo {
    box-sizing: border-box;
    background-color: #fff;
    min-height: 220px;
    border: 1px solid #c4c4c4;
    padding: 30px 40px;

    a {
      color: #666;
      font-size: 12px;
    }

    .address_box {
      margin-top: 10px;
    }

    .payInfoTop {
      border-bottom: 1px solid #eee;

      h3 {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        img {
          margin-right: 20px;
        }
      }

      p {
        font-size: 14px;
        color: #333;
        margin-bottom: 20px;
      }
    }

    .payInfoBottom {
      padding-top: 20px;

      >div {
        padding-top: 10px;

        p {
          color: #333;
          font-size: 12px;
          line-height: 24px;
        }
      }
    }
  }

  .changePay {
    margin-top: 30px;
    border: 1px solid #c4c4c4;
    padding: 30px 40px;
    background-color: #fff;

    h3 {
      color: #333;
      font-size: 18px;

      b {
        color: #e51818;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .changePay-UL {
      margin-top: 30px;
      margin-bottom: 30px;
      border-top: 1px solid #c4c4c4;
      box-sizing: border-box;

      li {
        padding: 20px 30px;
        display: flex;
        align-items: center;
        border: 2px solid #fff;

        .payRadio {
          color: #e51818;

          img {
            width: 36px;
            height: 36px;
            margin: 0 30px 0 50px;
            vertical-align: middle;
          }
        }

        .payName {
          color: #333;
          font-size: 18px;
        }

        .bank_num {
          color: #333;
          font-size: 18px;
          margin-left: 80px;
        }
      }

      li:hover {
        border: 2px solid #f6b37f;
      }

      .brandNUm {
        position: relative;
        margin-left: 200px;

        .brandNum_input {
          & /deep/ .el-input__inner {
            width: 350px;
            height: 36px;
            border-radius: 4px;
          }
        }

        >.scodeDiv {
          position: absolute;
          top: 0;
          right: 0;
          // background-color: #e51818;
          color: #fff;
          // padding: 9.3px 6px;
          border-radius: 4px;

          & /deep/ .sub_btn {
            border: 0;
            background-color: #e51818;
            border-radius: 2px;
          }
        }
      }
    }

    .submitOrder {
      margin: 80px 0;

      a {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        padding: 20px 50px;
        background-color: #e51818;
      }
    }
  }

</style>
