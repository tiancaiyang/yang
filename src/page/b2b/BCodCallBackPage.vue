<template>
  <div class="callBack">
    <div class="prompt_msg banxin">
      <div class="img_box">
        <img src="../../assets/images/evaluate_ok.png">
      </div>
      <h2>订单提交成功, 请您耐心等待,商家会尽快处理您的订单</h2>
    </div>
    <div class="button_box banxin">
      <el-button class="back_page" @click="goBack()">返回商家</el-button>
      <el-button class="go_order" @click="goOrder()">查看订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    // 回到商品详情
    goBack() {
      this.$router.go(-2);
    },
    // 去到查看订单页面
    goOrder() {
      this.$router.replace({name: 'OrderDeliverGoods'});
    }
  }
}
</script>

<style lang="scss" scoped>
.callBack {
  .prompt_msg {
    @include common_center;
    padding-top: 100px;
    .img_box {
      width: 50px;
      height: 50px;
      img {
        max-width: 50px;
        max-height: 50px;
      }
    }
    h2 {
      padding-left: 20px;
      font-size: 30px;
      font-weight: 900px;
    }
  }
  .button_box {
    padding-top: 80px;
    @include common_center;
    button {
      width: 150px;
      height: 50px;
      margin-left: 80px;
      font-size: 16px;
      background-color: #e51818;
      color: #fff;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
