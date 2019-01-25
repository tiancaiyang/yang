<template>
<div class="center_nav">
  <!-- 头部面包屑 -->
  <div class="user_center_navbtn">
        <a>首页</a>
        <span class="el-icon-arrow-right"></span>
        <a>个人中心</a>
        <span class="el-icon-arrow-right"></span>
        <a>我的个人中心</a>
  </div>
  <div class="nav_list_box">
    <dl>
      <dt>订单中心</dt>
      <dd>我的订单</dd>
      <dd>评价晒单</dd>
    </dl>
    <dl>
      <dt>我的钱包</dt>
      <dd>优惠券</dd>
      <dd>银行卡</dd>
      <dd>积分明细</dd>
    </dl>
    <dl>
      <dt>个人中心</dt>
      <dd class="dd_active">我的个人中心</dd>
      <dd>我的收藏</dd>
      <dd>浏览记录</dd>
      <dd>消息通知</dd>
    </dl>
    <dl>
      <dt>账户设置</dt>
      <dd>个人信息</dd>
      <dd>收货地址</dd>
    </dl>
    <dl>
      <dt>常用服务</dt>
      <dd>商家申请</dd>
      <dd>意见反馈</dd>
      <dd>关于我们</dd>
    </dl>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.center_nav {
  .nav_list_box {
    margin-right: 20px;
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
    }

    dl:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
