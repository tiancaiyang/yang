<template>
  <div class="body_common">
    <div class="body_box">
      <div class="body_box_content banxin clearfix">
        <div class="payInfo" v-if="this.$route.query.form == 0">
          <div class="payInfoTop">
            <h3><img class="payInfoTop_img" src="../../assets/common/checked.png" alt="">订单提交成功,现在只差最后一步啦！</h3>
            <p>请尽快完成订单,我们将会为您保留支付页面方便支付</p>
          </div>
          <div class="payInfoBottom">
            <router-link to="/one/user/OrderPerson/OrderAll" tag="a" class="fr">我的订单>></router-link>
            <p v-for="item in productData" :key="item.index">{{ item.title }} {{ item.product_attr }} 数量{{ item.num }}</p>
            <p v-if="comment !== null && comment.length != 0">备注：{{ comment }}</p>
            <p>收货信息：{{ addressData.area }}{{ addressData.address }} &nbsp;&nbsp;&nbsp;&nbsp;{{ addressData.name
              }}&nbsp;&nbsp;{{ addressData.mobile }}</p>
          </div>
        </div>
        <div class="payInfo" v-if="this.$route.query.form == 1">
          <div class="payInfoTop">
            <h3><img class="payInfoTop_img" src="../../assets/common/checked.png" alt="">订单提交成功,现在只差最后一步啦！</h3>
            <p>请尽快完成订单,我们将会为您保留支付页面方便支付</p>
          </div>
          <div class="payInfoBottom">
            <router-link to="/one/user/OrderPerson/OrderAll" tag="a" class="fr">我的订单>></router-link>
            <div v-for="item in productDataMore" :key="item.index">
              <h3>{{ item.brand_store_name }}</h3>
              <div v-for="items in item.product" :key="items.index">
                <p>{{ items.title }} {{ items.product_attr }} 数量{{ items.num }}</p>
              </div>
              <p>{{item.comment}}</p>
              <p>收货信息：{{ item.address.area }}{{ item.address.address }} &nbsp;&nbsp;&nbsp;&nbsp;{{ item.address.name
                }}&nbsp;&nbsp;{{ item.address.mobile }}</p>
            </div>
            <div v-for="item in productRdataMore" :key="item.index">
              <h3>{{ item.brand_store_name }}</h3>
              <div v-for="items in item.product" :key="items.index">
                <p>{{ items.title }} {{ items.product_attr }} 数量{{ items.num }}</p>
              </div>
              <p>{{item.comment}}</p>
              <p>收货信息：{{ item.address.area }}{{ item.address.address }} &nbsp;&nbsp;&nbsp;&nbsp;{{ item.address.name
                }}&nbsp;&nbsp;{{ item.address.mobile }}</p>
            </div>
          </div>
        </div>
        <div class="changePay">
          <h3>支付金额: <b>￥{{ allPrice }}</b></h3>
          <ul class="changePay-UL">
            <li v-for="item in payList" :key="item.index">
              <el-radio v-model="radio" :label="item.pay_type" class="payRadio" @change="getPayType(item.pay_type)"><img
                  :src="item.logo" alt=""></el-radio>
              <span class="payName">{{ item.name }}</span>
            </li>
          </ul>
          <!-- 银行卡列表显示区域 -->
          <ul class="changePay-UL" v-if="typeNum == 4">
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
          <el-button class="add_address" @click="addBankCard()">
            <span class="el-icon-plus"></span>添加银行卡</el-button>
          <div class="submitOrder clearfix">
            <a @click="payOrderMoney()" class="fr">提交订单</a>
          </div>
        </div>
      </div>
      <div class='popContainer' v-if="codeFlag">
        <div id="qrcode" ref="qrcode">
          <span class="iconfont icon-guanbi" @click="closeQrcode"></span>
          <p>请用微信扫描二维码支付</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    b2cOrderInfo,
    ruralgetXcOrderDetail,
    confirmOrderPayType,
    b2cGetPersonalOrder,
    aliPay,
    wechatPay,
    bankCardPay,
    bankCardList,
    bankSendCode
  } from "../../api/index.js";
  import QRCode from "qrcodejs2";
  import IdentifyCode from "../../components/identifyCode.vue";
  export default {
    data() {
      return {
        radio: "1",
        radio2: "", //银行卡支付选择
        brandindex: "", //银行卡选中
        brandNum: "", //银行卡验证码
        bankCardData: [],
        token: localStorage.getItem("token"), // token
        orderOn: this.$route.query.order_no,
        allPrice: this.$route.query.price_total,
        addressData: [], //地址
        productData: [], //商品
        productDataMore: [], //多商品
        productRdataMore: [], //多商品--特产
        payList: [], //支付列表
        comment: "", //但商品备注
        typeNum: 1,
        codeFlag: false, // 微信支付 遮罩层是否显示的标志
        qrcode_url: "",
        tute: "", //乡村互联标识特产商品标识
        orderNum: "" //判断订单类型
      };
    },
    components: {
      QRCode,
      IdentifyCode
    },
    created() {
      //乡村互联标识
      if (this.$route.query.tute) {
        this.tute = this.$route.query.tute;
      }
      this.chioseOrderNo();
      this.getOrderInfo();
      this.getPayMethod();
      // this.getBankList();
    },
    methods: {
      // 判断订单号
      chioseOrderNo() {
        var orderNoArr = this.orderOn.split(",");
        orderNoArr.forEach(item => {
          this.orderNum = item.substr(0, 1);
          if (this.orderNum == 2) {
            let params = {
              order_no: item
            };
            b2cOrderInfo(params).then(res => {
              if (res.code == 0) {
                this.productDataMore.push(res.data);
              }
            });
          } else if (this.orderNum == 3) {
            let params = {
              order_no: item
            };
            ruralgetXcOrderDetail(params).then(res => {
              if (res.code == 0) {
                this.productRdataMore.push(res.data);
              }
            });
          }
        });
      },
      //获取订单详情
      getOrderInfo() {
        let params = {
          order_no: this.orderOn
        };
        if (this.$route.query.form == 0) {
          //单个订单号
          //乡村互联标识
          if (this.tute == 1) {
            ruralgetXcOrderDetail(params).then(res => {
              console.log(res)
              if (res.code == 0) {
                this.productData = res.data.product;
                this.addressData = res.data.address;
                this.comment = res.data.comment;
              }
            });
          } else {
            b2cOrderInfo(params).then(res => {
              if (res.code == 0) {
                this.productData = res.data.product;
                this.addressData = res.data.address;
                this.comment = res.data.comment;
              }
            });
          }
        } else if (this.$route.query.form == 1) {
          //多个订单号
          // this.chioseOrderNo()
          //乡村互联标识
          // if(this.tute == 1){
          //     ruralgetXcOrderDetail(params).then(res=>{
          //         if(res.code == 0){
          //             this.productRdataMore=res.data
          //         }
          //     })
          // }else{
          //     b2cGetPersonalOrder(params).then(res=>{
          //         console.log(res)
          //         if(res.code == 0){
          //             this.productDataMore = res.data
          //         }
          //     })
          // }
        }
      },
      // 获取支付方式
      getPayMethod() {
        let params = {
          base_type: 2
        };
        confirmOrderPayType(params).then(res => {
          if (res.code == 0) {
            this.payList = res.data;
          }
        });
      },
      // 获取银行卡的选中
      getBrandPayType(brandindex) {
        this.brandindex = brandindex;
      },
      // 选中的支付类型
      getPayType(typeNum) {
        this.typeNum = typeNum;
      },

    // 银行卡发送验证码
    sendCode(id) {
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
          this.$refs.timerbtn[0].stop(); //停止倒计时
          this.$message.error(res.msg);
        }
      });
    },

      // 银行卡发送验证码
      sendCode(id) {
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
            this.$refs.timerbtn[0].stop(); //停止倒计时
          }
        });
      },

      // 添加银行卡
      addBankCard() {
        this.token = "http://test.silutianyu.com/api/PayPingAnKj/UnionAPI_Add_Card.php" + "?" + "token=" + this.token +
          "&is_list = 0" + "&order_no =" + this.orderOn +"&price_total="+this.allPrice + '&form=0' + '&type=2';
        window.location.href = this.token;
      },

      //提交支付
      payOrderMoney() {
        let params = {
          order_no: this.orderOn,
          type: 2
        };
        if (this.typeNum == 1) {
          //支付宝支付
          aliPay(params).then(res => {
            const div = document.createElement("div");
            div.innerHTML = res.data;
            document.body.appendChild(div);
            // document.forms.alipaysubmit.setAttribute('target', '_blank') // 在新的页面打开
            document.forms.alipaysubmit.submit();
          });
        } else if (this.typeNum == 2) {
          //微信支付
          wechatPay(params).then(res => {
            let qrcode = new QRCode("qrcode", {
              width: 200,
              height: 200,
              text: res.data.code_url
            });
          });
          this.codeFlag = true;
        } else if (this.typeNum == 4) {
          // 银行卡支付
          let fd = new FormData();
          fd.append("token", this.token);
          fd.append("order_no", this.orderOn);
          fd.append("type", 1);
          fd.append("kjid", this.radio2);
          fd.append("code", this.brandNum);
          bankCardPay(fd).then(res => {
            if (res.data == 0) {} else {
              this.$message.error("请先绑定银行卡");
            }
          });
        }
      },
      // 关闭遮罩层
      closeQrcode() {
        this.codeFlag = false;
      }
    }
  };

</script>

<style lang="scss" scoped>
  .body_common {
    .body_box {
      background-color: #f5f5f5;
      padding-bottom: 80px;

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

      .top_nav {
        height: 40px;

        .top_nav_box {
          line-height: 40px;
        }
      }

      .body_box_content {
        //   background-color: #fff;
        min-height: 1052px;
      }
    }
  }

  .payInfo {
    box-sizing: border-box;
    background-color: #fff;
    height: auto;
    border: 1px solid #c4c4c4;
    padding: 30px 40px;

    a {
      color: #666;
      font-size: 12px;
    }

    .payInfoTop {
      border-bottom: 1px solid #eee;

      h3 {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;

        .payInfoTop_img {
          vertical-align: middle;
          margin-right: 10px;
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

      p {
        color: #333;
        font-size: 12px;
        line-height: 24px;
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
      // border-top: 1px solid #c4c4c4;
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
