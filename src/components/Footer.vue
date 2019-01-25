<template>
  <div class="footer_box">
    <div class="footer banxin">
      <!-- 三个方面 -->
      <div class="footer_box_top">
        <ul>
          <li>
            <img src="../assets/common/quality.png">
            <span>品质保障 放心选购</span>
          </li>
          <li>
            <img src="../assets/common/logistics.png">
            <span>多仓直发 及时配送</span>
          </li>
          <li>
            <img src="../assets/common/low.png">
            <span>低价精选 物美价廉</span>
          </li>
        </ul>
      </div>
      <div class="footer_box_bottom">
        <dl>
          <!-- 新手指南 -->
          <dt>新手指南</dt>
          <dd><router-link to="/copyCommon/NCommonProblem" tag="a">注册新会员</router-link></dd>
          <dd><router-link to="/copyCommon/NShopProcess" tag="a"> 购物流程</router-link></dd>
          <dd><router-link to="/copyCommon/NOrderOperation" tag="a"> 订单操作</router-link></dd>
          <!-- <dd><router-link to="/copyCommon/NOnlinePayment" tag="a"> 在线支付</router-link></dd> -->
        </dl>
        <dl>
          <!-- 配送方式 -->
          <dt>物流配送</dt>
          <dd><router-link to="/copyCommon/NCashOnDelivery" tag="a"> 配送服务查询</router-link></dd>
          <dd><router-link to="/copyCommon/NDistributionPayment" tag="a"> 配送费收取标准</router-link></dd>
          <dd><router-link to="/copyCommon/NPaymentMethod" tag="a"> 验货签收</router-link></dd>
          <!-- <dd><router-link to="/copyCommon/NSignInspection" tag="a"> 签收验货</router-link></dd> -->
        </dl>
        <dl>
          <!-- 购物指南 -->
          <dt>支付方式</dt>
          <dd><router-link to="/copyCommon/NSCommonProblem" tag="a"> 支付宝支付</router-link></dd>
          <dd><router-link to="/copyCommon/NLogisticsDistribution" tag="a"> 微信支付</router-link></dd>
          <dd><router-link to="/copyCommon/NRegisteredMember" tag="a"> 银行卡支付</router-link></dd>
          <dd><router-link to="/copyCommon/NIntegralRule" tag="a"> 货到付款</router-link></dd>
        </dl>
        <dl>
          <!-- 售后服务 -->
          <dt>售后服务</dt>
          <dd><router-link to="/copyCommon/NReturnPrinciple" tag="a"> 售后政策</router-link></dd>
          <dd><router-link to="/copyCommon/NShopGuarantee" tag="a"> 退换货原则</router-link></dd>
          <dd><router-link to="/copyCommon/NRefundInstruction" tag="a"> 退款说明</router-link></dd>
          <dd><router-link to="/copyCommon/NCustomerTelephone" tag="a"> 客服电话</router-link></dd>
        </dl>
        <dl>
          <!-- 联系我们 -->
          <dt>联系我们</dt>
          <dd><router-link to="/copyCommon/NAboutUs" tag="a"> 在线招商</router-link></dd>
          <dd><router-link to="/copyCommon/NOnlinePromotion" tag="a"> 品牌入驻</router-link></dd>
          <dd><router-link to="/copyCommon/NFeedback" tag="a"> 意见反馈</router-link></dd>
          <!-- <dd><router-link to="/copyCommon/NBrandEntry" tag="a"> 品牌入驻</router-link></dd> -->
        </dl>
        <div class="bottom_right">
          <img src="../assets/common/tel.png">
          <p class="tel">0371-67618866</p>
          <p class="time">周一至周六 9:00-18:00</p>
          <p class="last_p">(仅收市话费)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer_box {
  width: 100%;
  background-color: #fff;
  margin-top: 80px;
  .footer {
    .footer_box_top {
      padding: 40px 0;
      border-bottom: 1px solid #e0e0e0;
      ul {
        display: flex;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 33%;
          span {
            margin-left: 16px;
            font-size: 20px;
            color: #666;
            font-weight: normal;
          }
        }
      }
    }
    .footer_box_bottom {
      margin-top: 40px;
      margin-bottom: 20px;
      display: flex;
      dl {
        padding-right: 120px;
        dt {
          font-size: 16px;
          color: #333;
          padding-bottom: 40px;
        }
        dd {
          font-size: 14px;
          color: #999;
          padding-bottom: 30px;
        }
      }
      dl:nth-child(5) {
        border-right: 1px solid #e0e0e0;
      }
      .bottom_right {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 38px;
        img {
          margin-bottom: 30px;
        }
        .tel {
          font-size: 24px;
          color: #ff7724;
          padding-bottom: 30px;
        }
        .time,
        .last_p {
          font-size: 14px;
          line-height: 20px;
          color: #999;
        }
      }
    }
  }
}
</style>
