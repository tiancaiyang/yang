<template>
<div class="add_bankcard">
  <header-top></header-top>
  <Header></Header>
  <!-- 面包屑导航 -->
  <!-- <div class="user_center_navbtn banxin">
      <a>首页</a>
      <span class="el-icon-arrow-right"></span>
      <a>个人中心</a>
      <span class="el-icon-arrow-right"></span>
      <a>我的个人中心</a>
  </div> -->
  <div class="add_bankcard_box banxin">
    <h2>添加银行卡</h2>
    <!-- 添加银行卡的表单 -->
    <div class="add_form">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="真实姓名" class="form_realname">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号" class="form_idcode">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" class="form_bankcode">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号码" class="form_tel">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="form_yzcode">
          <el-input style="width:168px"></el-input><el-button style="height:42px;margin-left:10px">获取验证码</el-button><el-button style="height:42px;margin-left:10px">重新发送</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="ok_btn" @click="GoBack">确认添加</el-button>
        </el-form-item>
      </el-form>
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
    GoBack () {
      this.$router.push({name: 'UserBankcard'})
    }
  }
}
</script>

<style lang="scss" scoped>
.add_bankcard {
  background-color: #f5f5f5;
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
  .add_bankcard_box {
    background-color: #fff;
    height: 743px;
    h2 {
      font-size: 24px;
      color: #666;
      padding: 30px 0;
      margin: 0 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    .add_form {
      width: 644px;
      height: 487px;
      margin: 85px auto;
      box-sizing: border-box;
      .form_realname,
      .form_idcode,
      .form_tel {
        width: 437px;
      }
      .form_yzcode {
        width: 592px;
      }
      .ok_btn {
        width: 210px;
        height: 52px;
        background-color: #e51818;
        margin-top: 90px;
        color: #fff;
      }
    }
  }
}
</style>
