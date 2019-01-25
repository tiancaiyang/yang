<template>
  <div class="user_center">
    <header-top></header-top>
    <Header></Header>
    <div class="user_center_box banxin">
      <!-- 头部面包屑 -->
      <!-- <div class="user_center_navbtn">
                <a>首页</a>
                <span class="el-icon-arrow-right"></span>
                <a>新手指南</a>
                <span class="el-icon-arrow-right"></span>
                <a>常见售后问题</a>
            </div> -->
      <!-- 主要内容部分 -->
      <div class="user_center_banner">
        <!-- 左边的导航栏 -->
        <div class="nav_list_btn">
          <dl>
            <dt>新手指南</dt>
            <router-link to="/copyCommon/NCommonProblem" tag="dd" active-class="dd_active">注册新会员</router-link>
            <router-link to="/copyCommon/NShopProcess" tag="dd" active-class="dd_active">购物流程</router-link>
            <router-link to="/copyCommon/NOrderOperation" tag="dd" active-class="dd_active">订单操作</router-link>
            <!-- <router-link to="/copyCommon/NOnlinePayment" tag="dd" active-class="dd_active">在线支付</router-link> -->
          </dl>
          <dl>
            <dt>物流配送</dt>
            <router-link to="/copyCommon/NCashOnDelivery" tag="dd" active-class="dd_active">配送服务查询</router-link>
            <router-link to="/copyCommon/NDistributionPayment" tag="dd" active-class="dd_active">配送费收取标准</router-link>
            <router-link to="/copyCommon/NPaymentMethod" tag="dd" active-class="dd_active">验货签收</router-link>
            <!-- <router-link to="/copyCommon/NSignInspection" tag="dd" active-class="dd_active">签收验货</router-link> -->
          </dl>
          <dl>
            <dt>支付方式</dt>
            <router-link to="/copyCommon/NSCommonProblem" tag="dd" active-class="dd_active">支付宝支付</router-link>
            <router-link to="/copyCommon/NLogisticsDistribution" tag="dd" active-class="dd_active">微信支付</router-link>
            <router-link to="/copyCommon/NRegisteredMember" tag="dd" active-class="dd_active">银行卡支付</router-link>
            <router-link to="/copyCommon/NIntegralRule" tag="dd" active-class="dd_active">货到付款</router-link>
          </dl>
          <dl>
            <dt>售后服务</dt>
            <router-link to="/copyCommon/NReturnPrinciple" tag="dd" active-class="dd_active">售后政策</router-link>
            <router-link to="/copyCommon/NShopGuarantee" tag="dd" active-class="dd_active">退换货原则</router-link>
            <router-link to="/copyCommon/NRefundInstruction" tag="dd" active-class="dd_active">退款说明</router-link>
            <router-link to="/copyCommon/NCustomerTelephone" tag="dd" active-class="dd_active">客服电话</router-link>
          </dl>
          <dl>
            <dt>联系我们</dt>
            <router-link to="/copyCommon/NAboutUs" tag="dd" active-class="dd_active">在线招商</router-link>
            <router-link to="/copyCommon/NOnlinePromotion" tag="dd" active-class="dd_active">品牌入驻</router-link>
            <router-link to="/copyCommon/NFeedback" tag="dd" active-class="dd_active">意见反馈</router-link>
            <!-- <router-link to="/copyCommon/NBrandEntry" tag="dd" active-class="dd_active">品牌入驻</router-link> -->
          </dl>
        </div>
        <!-- 右边相应的内容区域 -->
        <div class="nav_right_content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <quick-bar />
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
  import QuickBar from '../../components/quickBar'
  export default {
    data() {
      return {

      }
    },
    components: {
      QuickBar
    }
  }

</script>

<style scoped lang="scss">
  .user_center {
    background-color: #f5f5f5;

    .user_center_box {
      margin-top: 20px;

      // 面包屑导航
      .user_center_navbtn {
        height: 66px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #666;

        span {
          margin: 0 5px;
        }
      }

      // 主要内容部分
      .user_center_banner {
        display: flex;

        // 左边的导航栏
        .nav_list_btn {
          margin-right: 20px;
          // height: 1052px;
          width: 232px;
          padding: 40px 0 50px 50px;
          box-sizing: border-box;
          background-color: #fff;

          dl {
            margin-bottom: 60px;

            dt {
              font-size: 20px;
              color: #333;
            }

            dd {
              margin-top: 30px;
              font-size: 16px;
              color: #666;
              cursor: default;
            }

            .dd_active {
              color: #e51818;
            }

            dd:hover {
              color: #e51818;
            }
          }

          dl:last-child {
            margin-bottom: 0;
          }
        }

        // 右边相应的内容区域
        .nav_right_content {
          width: 948px;
          padding: 20px;
          background-color: #fff;
        }
      }
    }

    & /deep/ .quick_bar {
      .quick_Ul {
        li {
          &:nth-of-type(-n+ 3) {
            display: none;
          }
        }
      }
    }
  }

</style>
