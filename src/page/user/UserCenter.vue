<template>
  <div class="user_center">
    <header-top></header-top>
    <Header></Header>
    <div class="user_center_box banxin">
      <!-- 头部面包屑 -->
      <!-- <div class="user_center_navbtn">
        <a>首页</a>
        <span class="el-icon-arrow-right"></span>
        <a>个人中心</a>
        <span class="el-icon-arrow-right"></span>
        <a>我的个人中心</a>
      </div> -->
      <!-- 主要内容部分 -->
      <div class="user_center_banner">
        <!-- 左边的导航栏 -->
        <div class="nav_list_btn">
          <dl>
            <dt>订单中心</dt>
            <router-link to="/one/user/OrderPerson/OrderAll" tag="dd" active-class="dd_active">我的订单</router-link>
            <router-link to="/one/user/UserEvaluate" tag="dd" active-class="dd_active">评价晒单</router-link>
          </dl>
          <dl>
            <dt>我的钱包</dt>
            <router-link to="/one/user/UserCoupon" tag="dd" active-class="dd_active">优惠券</router-link>
            <router-link to="/one/user/UserBankcard" tag="dd" active-class="dd_active">银行卡</router-link>
            <router-link to="/one/user/UserShopPoint" tag="dd" active-class="dd_active">积分明细</router-link>
          </dl>
          <dl>
            <dt>个人中心</dt>
            <router-link to="/one/user/MyCenter" tag="dd" active-class="dd_active">我的个人中心</router-link>
            <router-link to="/one/user/MyCollection" tag="dd" active-class="dd_active">我的收藏</router-link>
            <router-link to="/one/user/BrowseHistory" tag="dd" active-class="dd_active">浏览记录</router-link>
            <router-link to="/one/user/NewsNotification" tag="dd" active-class="dd_active">消息通知</router-link>
          </dl>
          <dl>
            <dt>账户设置</dt>
            <router-link to="/one/user/PersonalInformation" tag="dd" active-class="dd_active">个人信息</router-link>
            <router-link to="/one/user/UserAddress" tag="dd" active-class="dd_active">收货地址</router-link>
          </dl>
          <dl>
            <dt>常用服务</dt>
            <router-link to="/one/user/ApplyBusiness" tag="dd" active-class="dd_active">商家申请</router-link>
            <router-link to="/one/user/UserFeedback" tag="dd" active-class="dd_active">意见反馈</router-link>
            <router-link to="/one/user/AboutUs" tag="dd" active-class="dd_active">关于我们</router-link>
          </dl>
        </div>
        <!-- 右边相应的内容区域 -->
        <div class="nav_right_content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.user_center {
  background-color: #f5f5f5;
  .user_center_box {
    // 面包屑导航
    // .user_center_navbtn {
    //   height: 66px;
    //   display: flex;
    //   align-items: center;
    //   font-size: 16px;
    //   color: #666;
    //   span {
    //     margin: 0 5px;
    //   }
    // }
    // 主要内容部分
    .user_center_banner {
      margin-top: 20px;
      display: flex;
      // 左边的导航栏
      .nav_list_btn {
        margin-right: 20px;
        height: 1052px;
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
      }
    }
  }
}
</style>
