<template>
<div class="personal_information">
  <h2>个人信息</h2>
  <!-- 头像部分 -->
  <div class="user_header_box">
    <div class="header_img">
      <span>头像 :</span>
      <img v-if="head_image == ''" src="../../assets/images/user/headerImg.png" id="img_show">
      <img v-else :src="head_image" id="img_show">
    </div>
    <div class="upload_btn_box">
      上传新头像
      <input type="file" class="upload_btn" ref="input_btn" @change='changeHeaderImg'>
    </div>
  </div>
  <!-- 用户名部分 -->
  <div class="user_name">
    <span>用户名: </span>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
    >
    <el-form-item
      prop="ncname"
      >      
      <el-input placeholder="请输入用户名" v-model="form.ncname" class="user_input"></el-input>
    </el-form-item>
    </el-form>
  </div>
  <div class="personal_btn">
    <el-button class="ok_btn" @click="changeUserName('form')">保存</el-button>
  </div>
</div>
</template>

<script>
import { getUserInfo,HeadImage ,getUserName} from '../../api/index.js'
export default {
  inject :['reload'],
  data () {
    return {
      birthdayDate: '',
      head_image:'',
      form:{
        ncname:'',
      },
      rules: {
        ncname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {pattern: /^(?!(\s+$))/, message: '昵称不能为空'}
        ],
      }  
    }
  },
  created(){
    this.GetUserInfo()
  },
  methods: {
    GetUserInfo(){
      getUserInfo().then(res=>{
        if(res.code == 0){
          var that = this
          that.head_image = res.data.head_image
          if(res.data.nickname == ''){
            that.form.ncname = res.data.mobile
          }else{
            that.form.ncname = res.data.nickname
          }
        }
      })
    },
    // 更改头像
    changeHeaderImg () {
      let img = this.$refs.input_btn.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onloadend = function (e) {
        let img = document.getElementById('img_show')
        img.src = e.target.result
      }
      let fd = new FormData()
      fd.append('file', img)
      HeadImage(fd).then(res=>{
      })
    },
    // 更改用户名
    changeUserName(form){
      var ncname = this.form.ncname
      var ncnameOne = ncname.replace(/\s+/g, "");
      this.$refs[form].validate(valid => {
        if (valid) {
          let params = {
            nickname: ncnameOne
          }
          getUserName(params).then(res=>{
            if(res.code == 0){
              this.$message({
                message: '更改成功',
                type: 'success'
              });
              // 再次刷新页面
              this.reload()
            }else{
              this.$message({
                message: res.msg,
                type: 'success'
              });
            }
          })
        }
      })   
    }
  }
}
</script>

<style lang="scss" scoped>
.personal_information {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 1052px;
  h2 {
    font-size: 24px;
    color: #666;
    line-height: 36px;
    margin-top: 10px;
    padding-bottom: 30px;
    border-bottom: 1px solid #e0e0e0;
  }
  // 头像部分
  .user_header_box {
    display: flex;
    align-items: flex-end;
    margin: 30px 0;
    .header_img {
      // display: flex;
      // align-items: center;
      span {
        font-size: 18px;
        color: #666;
      }
      img {
        width: 102px;
        height: 102px;
        border-radius: 50%;
        border: 1px solid #e0e0e0;
        margin: 0 20px 0 60px;
      }
    }
    .upload_btn_box {
      position: relative;
      font-size: 16px;
      color: #e51818;
      font-weight: 700;
      .upload_btn {
        width: 80px;
        height: 17px;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  // 用户名部分
  .user_name {
    height: 52px;
    display: flex;
    padding: 30px 0;
    border-top: 1px dashed #e0e0e0;
    border-bottom: 1px dashed #e0e0e0;
    align-items: center;
    span {
      font-size: 18px;
      color: #666;
      margin-right: 30px;
    }
    .user_input {
      width: 282px;
    }
    .el-form-item{
      margin-bottom: 0;
    }
  }
  // 生日部分
  .user_birthday {
    height: 52px;
    padding: 30px 0;
    border-bottom: 1px dashed #e0e0e0;
    margin-bottom: 80px;
    span {
      font-size: 18px;
      color: #666;
      margin-right: 45px;
    }
  }
  // 按钮部分
  .personal_btn {
    height: 52px;
    .ok_btn {
      width: 189px;
      background-color: #e51818;
      color: #fff;
      font-size: 16px;
    }
    .txt_btn {
      font-size: 16px;
      color: #666;
      margin-left: 40px;
    }
  }
}
</style>
