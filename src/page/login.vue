<template>
  <div class="login">
    <header-two />
    <div class="login_banner_box">
      <div class="login_banner banxin">
        <div class="form_box">
          <div class="form_box_two">
            <h3>账户登录</h3>
            <!-- 表单部分 -->
            <el-form ref="form" :model="form" :rules="rules" class="form_content">
              <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="账户" prefix-icon="iconfont icon-zhanghu-copy" class="input_box"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="密码" prefix-icon="iconfont icon-mima-copy" type="password" class="input_box" @keyup.enter.native="submitForm('form')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm('form')">登录</el-button>
              </el-form-item>
            </el-form>
            <!-- 忘记密码跟立即注册部分 -->
            <div class="form_box_bottom">
              <router-link to="/two/forgetPassWord" tag="a">忘记密码</router-link>
              <router-link to="/two/register" tag="a"><span></span>立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-two />
  </div>
</template>

<script>
import HeaderTwo from '../components/HeaderTwo'
import FooterTwo from '../components/FooterTwo'
import {checkUser} from '../api/index.js'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入合法手机号'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {pattern: /^(\w){6,20}$/, message: '只能输入6-20个字母、数字、下划线'}
        ]
      }
    }
  },
  components: {
    HeaderTwo,
    FooterTwo
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          checkUser(this.form).then(res => {
            if(res.code === 0) {
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('identity', res.data.identity)
              this.$router.push({name: 'CHomePage'})
            } else {
              this.$message({
                message: res.msg,
                type: 'warning',
                center: true
              })
            }
          })
        } else {

        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .login_banner_box {
    width: 100%;
    height: 578px;
    background: url('../assets/images/login/bg_img.png');
    .login_banner {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .form_box {
        width: 405px;
        height: 438px;
        background-color: #fff8f0;
        .form_box_two {
          margin-top: 40px;
          padding: 0 27px;
          background-color: #fff;
          h3 {
            font-size: 20px;
            color: #6b6b6b;
            padding-top: 20px;
            margin-bottom: 30px;
          }
          // form 表单区域
          .form_content {
            .input_box {
              & /deep/ input:-webkit-autofill {
                z-index: 100;
                -webkit-box-shadow: 0 0 0px 1000px white inset;
              }
              & /deep/ .el-input__inner {
                padding: 0;
                height: 49px;
                padding-left: 60px;
                border-color: #b8b8b8;
                background-color: #fff;
              }
              & /deep/ .el-input__prefix {
                width: 49px;
                height: 49px;
                left: 0;
                background-color: #f1f1f1;
                border: 1px solid #b3b3b3;
                padding-top: 4px;
                box-sizing: border-box;
                >.el-input__icon {
                  font-size: 19px;
                  color: #bfbfbf;
                }
              }
            }
          }
          // 忘记密码 和 立即注册 部分
          .form_box_bottom {
            display: flex;
            justify-content: space-between;
            padding: 30px 5px 60px 5px;
            a:first-child {
              font-size: 14px;
              color: #666;
            }
            a:last-child {
              font-size: 14px;
              color: #b61d1d;
              span {
                display: inline-block;
                width: 15px;
                height: 15px;
                background: url('../assets/images/login/arrow.png');
                background-size: cover;
                margin-right: 3px;
                vertical-align: top;
              }
            }
          }
          button {
            border: 0;
            width: 100%;
            height: 49px;
            background-color: #e51818;
            color: #fff;
            font-size: 20px;
            margin-top: 28px;
          }
        }
      }
    }
  }
}
</style>
