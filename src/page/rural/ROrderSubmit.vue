<template>
  <div class="order_box">
    <header-top></header-top>
    <!-- 提交头部 -->
    <div class="outHeader">
      <div class="header banxin">
        <div class="header_l">
          <span @click="goHome">乡村互联</span>
          <span>提交详情</span>
        </div>
        <!-- <div class="header_r">
        <el-steps :space="200" :active="1" finish-status="success" class="elstep">

          <el-step title="确认订单信息"></el-step>
          <el-step title="支付"></el-step>
          <el-step title="成功提交订单"></el-step>
        </el-steps>
      </div> -->
      </div>
    </div>
    <!-- 提交主体 -->
    <div class="order_main banxin">
      <div class="main_l">
        <!-- 商品信息 -->
        <div class="storeInfo">
          <h1>商品信息</h1>
          <div class="store_news">
            <div class="news_title">
              <span>【{{brand_store_name}}】{{title}}</span>
              <a href="javascript:;" @click="getHidden()">详情<i class="el-icon-arrow-down"></i></a>

            </div>
            <div class="rules" v-show="hidden">
              <ul v-html="content">
              </ul>
            </div>

            <div class="order_time">
              <span class="el-icon el-icon-star-on "></span>
              <span class="time">住宿时间 : </span>
              <span class="timer">{{ stay_begin | formatDate}} 至 {{ stay_end |formatDate}}</span>
              <span class="total">共{{stay_day ==0?0:stay_day}}晚</span>
            </div>

            <div class="room_count">
              <span class="el-icon el-icon-star-on "></span>
              <span class="count">房间数量 : </span>
              <el-input-number v-model="value" controls-position="right" :min="1" :max="100"></el-input-number>
            </div>
          </div>
        </div>
        <!-- 预约信息 -->
        <div class="orderInfo">
          <h1>预约信息</h1>
          <div class="orderInfo_room">
            <el-form ref="form" :model="form" label-position="left" label-width="100px" :rules="rules">
              <el-form-item label="联系人 :" prop="link_name">
                <el-input placeholder="" v-model="form.link_name">
                </el-input>
              </el-form-item>
              <el-form-item label="联系方式 :" prop="mobile">
                <el-input placeholder="" v-model="form.mobile"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 取消规则 -->
        <div class="cancleInfo">
          <h1>取消规则</h1>
          <div class="cancle_room">
            <p>{{use_rule}}</p>
          </div>
        </div>
      </div>
      <!-- 结算信息 -->
      <div class="main_r">
        <h1>结算信息</h1>
        <ul>
          <li>
            <span>总额:</span>
            <span class="price_color">¥{{ price}}</span>
          </li>
          <li>
            <span>优惠券:</span>
            <span>-¥{{discount_price ==0?0:discount_price}}</span>
          </li>
          <li>
            <span>满减:</span>
            <span>-¥{{discount_price ==0?0:discount_price}}</span>
          </li>
          <li>
            <span>合计:</span>
            <span class="price_total">¥{{price * value}}</span>
          </li>
        </ul>

        <a href="javascript:;">
          <input type="button" value="立即提交" class="btnSubmit" @click="getruralxcSubmitOrder">
        </a>

      </div>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
  import {
    ruralxcSubmitOrder,
    b2cAddressList,
    rurallocalSubmit
  } from "../../api/index.js"
  export default {
    data() {
      return {
        form: {
          link_name: '',
          mobile: '',
        },
        rules: {
          link_name: [{
              required: true,
              message: '请输入联系人姓名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度要在3~5位'
            }, {
              pattern: /^[\u4E00-\u9FA5]+$/,
              message: '用户名只能为中文'
            }
          ],
          mobile: [{
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
              pattern: /^1(3|4|5|7|8)\d{9}$/,
              message: '请输入正确的手机格式'
            }
          ],
        },
        value: 1,
        flag: false,
        hidden: true, //详情隐藏显示问题
        price: this.$route.query.price, //价格
        title: this.$route.query.title, //标题
        discount_price: this.$route.query.discount_price, //特价
        brand_store_name: this.$route.query.brand_store_name, //店铺名
        content: this.$route.query.content, //规则
        product_id: this.$route.query.product_id, //商品id
        class_id: this.$route.query.class_id, //分类id
        price_total: '', //总价
        num_total: '', //总数
        use_rule: this.$route.query.use_rule, //退订规则
        pay_type: '', //	支付方式接口返回pay_type
        activity_type: this.$route.query.activity_type, //活动类型 0 普通商品 1特价
        brand_member_id: this.$route.query.brand_member_id, //店铺id
        // link_name: '', //联系人
        // mobile: '', //联系电话
        stay_begin: this.$route.query.stay_begin, //住宿开始日期 或 旅游出行日期
        stay_end: this.$route.query.stay_end, //住宿结束日期
        stay_day: this.$route.query.stay_day, //住宿天数
        order_no: '', //订单号
        // identity: '', //身份认证
        // isToken: false,
      }
    },
    // 时间戳格式
    filters: {
      formatDate: function (value) {
        if (value == 0) {
          return 0;
        } else {
          let date = new Date(value);
          let y = date.getFullYear();
          let MM = date.getMonth() + 1;
          MM = MM < 10 ? ('0' + MM) : MM;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          let h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          let m = date.getMinutes();
          m = m < 10 ? ('0' + m) : m;
          let s = date.getSeconds();
          s = s < 10 ? ('0' + s) : s;
          return y + '-' + MM + '-' + d;
        }


      }
    },

    created() {
      localStorage.setItem("start", this.stay_begin);
      localStorage.setItem("end", this.stay_end);
      // 检测是否登录
      // var token = localStorage.getItem('token');
      // if (token) {
      //   this.isToken = true
      // } else {
      //   this.isToken = false
      // }
      // this.identity = localStorage.getItem('identity');
    },
    mounted() {

    },
    methods: {
      // 详情隐藏
      getHidden() {
        this.hidden = !this.hidden;
      },
      // 回首页
      goHome() {
        this.$router.push('/rural');
      },
      // 乡村乐提交订单
      getruralxcSubmitOrder() {
        // 先 判断是否登录
        // if (this.identity) {
        if (this.stay_begin == "" || this.stay_end == '') {
          this.$message({
            message: '请去输入的时间',
            type: 'error'
          })
        } else if (this.form.mobile == '' || this.form.link_name == '') {
          this.$message({
            message: '请输入手机号或者联系人',
            type: 'error'
          })
        } else {
          let params = {
            product_id: this.product_id,
            activity_type: this.activity_type,
            stay_begin: this.stay_begin,
            stay_end: this.stay_end,
            stay_day: this.stay_day,
            brand_member_id: this.brand_member_id,
            class_id: this.class_id,
            price_total: this.price * this.value,
            num_total: this.value,
            pay_type: this.pay_type,
            link_name: this.form.link_name,
            mobile: this.form.mobile,
          }
          ruralxcSubmitOrder(params).then(res => {
            if (res.code === 0) {
              this.order_no = res.data.order_no;
              let params = {
                order_no: this.order_no,
                price_total: this.price * this.value,
                form: 0,
                tute: 1,
              }
              this.$router.push({
                name: 'CChoicePay',
                query: params
              })
            }
          })
        }
        // }
        // else {
        //   this.$message({
        //     message: '您还未登录',
        //     type: 'warning'
        //   });
        // }


      },

    }
  }

</script>
<style lang="scss" scoped>
  .order_box {
    background: #eaeaea;

    .outHeader {
      background-color: #fff;

      .header {
        // min-height: 1000px;
        height: 120px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;

        .header_l {

          font-family: HYRunYuan-GEW;
          font-size: 44px;
          color: #0e7d4a;

          span:first-child {
            display: inline-block;
            margin-top: 43px;
            font-family: HYRunYuan-GEW;
            font-size: 44px;
            color: #0e7d4a;

            &:hover {
              cursor: pointer;
            }
          }

          span:last-child {
            margin-left: 32px;
            display: inline-block;
            margin-top: 55px;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            color: #333333;
          }
        }

        .header_r {
          width: 504px;
          height: 54px;
          margin-top: 43px;

        }
      }
    }

    .order_main {
      margin-top: 53px;
      display: flex;
      justify-content: space-between;

      width: 1200px;

      // background: #000;

      .main_l {
        width: 818px;

        .storeInfo {

          width: 818px;
          height: 534px;
          background-color: #ffffff;
          border-radius: 10px;
          border: solid 1px #eaeaea;

          h1 {
            margin-left: 39px;
            margin-top: 35px;
            margin-bottom: 35px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            color: #333333;
          }

          .store_news {
            margin-left: 39px;
            width: 751px;
            height: 300px;
            border-top: 1px solid #eaeaea;

            // background: red;
            .news_title {
              margin-top: 28px;



              span {
                margin-left: -14px;
                font-family: MicrosoftYaHei-Bold;
                font-size: 28px;
                margin-right: 34px;
                color: #333333;
              }

              a {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                color: #1d9e6e;

              }
            }



            .rules {
              ul {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                width: 307px;
                height: 160px;
                margin: 44px 0 57px 0;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                color: #999999;

                & /deep/ p {
                  display: none;
                }

                & /deep/ table {
                  tr {
                    line-height: 30px;
                  }
                }

              }
            }

            .order_time {
              margin-top: 20px;
              height: 17px;

              .el-icon {

                font-size: 12px;
                color: #ff6600;
              }

              .time {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #666666;
              }

              .timer {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #000000;
              }

              .total {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #666666;
              }
            }

            .room_count {
              margin-top: 30px;

              .el-icon {
                font-family: MicrosoftYaHei;
                font-size: 12px;
                color: #ff6600;
              }

              .count {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #666666;
              }

              el-input-number {
                margin-left: 10px;
              }


            }
          }
        }

        .orderInfo {
          margin: 26px 0 30px 0;
          width: 820px;
          height: 300px;
          background-color: #ffffff;
          border-radius: 10px;
          border: solid 1px #eaeaea;
          box-sizing: border-box;

          h1 {
            margin: 35px 0 34px 38px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            color: #333333;
          }

          .orderInfo_room {
            width: 751px;
            height: 200px;
            margin-left: 38px;
            // background-color: red;
            border-top: 1px solid #eaeaea;
            overflow: hidden;

            .el-form {
              margin-top: 20px;
              width: 300px;
              height: 48px;

              & /deep/ .el-form-item__label:before {
                content: '★';
                // font-size: 20px;
              }
            }


          }
        }

        .cancleInfo {
          width: 820px;
          background-color: #ffffff;
          border-radius: 10px;
          margin-bottom: 160px;
          border: solid 1px #eaeaea;
          box-sizing: border-box;

          h1 {
            margin: 35px 0 34px 38px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            color: #333333;
          }

          .cancle_room {
            width: 751px;
            border-top: 1px solid #eaeaea;
            padding: 34px 0 0 31px;
            margin-left: 38px;
            box-sizing: border-box;

            p {
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 36px;
              letter-spacing: 0px;
              color: #666666;
            }
          }
        }
      }

      .main_r {
        width: 348px;
        height: 478px;
        background-color: #ffffff;
        border-radius: 10px;
        border: solid 1px #eaeaea;
        // background-color: green;

        h1 {
          margin: 35px 0 34px 38px;
          width: 96px;
          height: 24px;
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          color: #333333;
        }

        ul {
          margin-left: 38px;
          padding-top: 31px;
          box-sizing: border-box;
          width: 271px;

          // background-color: red;
          li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 18px;

            span:first-child {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #666666;
            }

            span:last-child {
              width: 42px;
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ff6913;
            }

            .price_color {
              color: #333 !important;
            }

            .price_total {
              font-size: 24px !important;
              margin-right: 16px;
            }
          }

          li:last-child {
            margin-top: 110px;
          }
        }

        .btnSubmit {
          margin: 0 0 0 38px;
          outline: none;
          border: none;
          width: 288px;
          height: 68px;
          background-color: #ff6913;
          border-radius: 10px;
          font-family: MicrosoftYaHei;
          font-size: 20px;
          color: #ffffff;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

</style>
