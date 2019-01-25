<template>
  <div class="forget_box">
    <header-two />
    <div class="forgetpw banxin">
      <!-- 步骤内容部分 -->
      <div class="step_content">
        <el-form
          ref="form"
          :model="form"
          label-position="left"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item
            label="手机号"
            prop="mobile"
            class="mobile_box"
          >
            <el-input
              placeholder=""
              v-model="form.mobile"
            ></el-input>
            <div class="identify_box">
              <identify-code
                ref="timerbtn"
                class="identify"
                v-on:run="sendCode"
              ></identify-code>
            </div>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="provingNum"
          >
            <el-input
              placeholder="请输入短信验证码"
              v-model="form.provingNum"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设置密码"
            prop="password"
          >
            <el-input
              v-model="form.password"
              id="password"
              :type="textpassword"
              @focus="sadasd()"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPassword"
          >
            <el-input
              v-model="form.checkPassword"
              :type="textpassword"
              @focus="sadasd()"
              @keyup.enter.native="submitForm('form')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('form')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer-two />
  </div>
</template>

<script>
import HeaderTwo from "../components/HeaderTwo";
import FooterTwo from "../components/FooterTwo";
import IdentifyCode from "../components/identifyCode.vue";
import { ForgetPassWord, RegisterCode } from "../api/index.js";
export default {
  data() {
    // 密码和确认密码一致的 处理
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      textpassword: "text",
      form: {
        mobile: "",
        provingNum: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度要在3~5" }
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        provingNum: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(\w){6,20}$/,
            message: "只能输入6-20个字母、数字、下划线"
          }
        ],
        checkPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  components: {
    HeaderTwo,
    FooterTwo,
    IdentifyCode
  },
  methods: {
    sadasd() {
      this.textpassword = "password";
    },
    // 点击注册
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            mobile: this.form.mobile,
            code: this.form.provingNum,
            password: this.form.password,
            repassword: this.form.checkPassword
          };
          ForgetPassWord(params).then(res => {
            if (res.code == 0) {
              this.$message({
                message: res.msg,
                type: "success",
                center: true
              });
              this.$router.push({name:'Login'})
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                center: true
              });
            }
          });
        } else {
          console.log("校验不通过");
        }
      });
    },
    // 验证码发送
    sendCode: function() {
      this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.form.mobile == "") {
        this.$message("请输入手机号码");
        this.$refs.timerbtn.setDisabled(false);
      } else if (!reg.test(this.form.mobile)) {
        this.$message("手机格式不正确");
        this.$refs.timerbtn.setDisabled(false);
      } else {
        let params = { mobile: this.form.mobile };
        RegisterCode(params).then(res => {
          if (res.code === 0) {
            this.$refs.timerbtn.start(); //启动倒计时
          } else {
            this.$refs.timerbtn.stop(); //停止倒计时
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.forget_box {
  .forgetpw {
    margin-top: 100px;

    // 步骤条部分
    .step_bar {
      border-bottom: 2px solid #aaa;

      ul {
        display: flex;
        justify-content: space-around;
        padding: 0 180px;
        margin-bottom: -2px;

        li {
          font-size: 18px;
          color: #999;
          display: flex;
          align-items: center;
          padding: 0 30px 10px;

          span {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 2px solid #d6d6d6;
            text-align: center;
            line-height: 18px;
            font-size: 14px;
            color: #ccc;
            border-radius: 50%;
            margin-right: 8px;
            margin-bottom: -2px;
          }
        }

        // 选中时 li 的样式
        .li_active {
          color: #e51818;
          border-bottom: 2px solid #e51818;
          padding-bottom: 10px;

          span {
            background-color: #e51818;
            border-color: #e51818;
            color: #fff;
          }
        }
      }
    }

    // 步骤内容部分
    .step_content {
      margin-top: 60px;
      display: flex;
      justify-content: center;

      form {
        width: 480px;
        & /deep/ input:-webkit-autofill {
          z-index: 100;
          -webkit-box-shadow: 0 0 0px 1000px white inset;
        }
        .mobile_box {
          position: relative;
          .identify_box {
            position: absolute;
            top: 2.4px;
            right: 6px;
            & /deep/ .sub_btn {
              border: 0;
              background-color: #e51818;
              border-radius: 2px;
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
  // 给底部加上顶部边框
  .footerTwo_box {
    border-top: 1px solid #ccc;
  }
}
</style>
