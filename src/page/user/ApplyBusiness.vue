<template>
<div class="apply_business">
  <h2>商家申请</h2>
  <!-- 商家申请表单 -->
  <div v-if="applyStatus == 0" class="form_box">
    <p v-if="!isToken" class="tokenTipi">您还未登录，请先登录。</p>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left" class="form_all">
      <el-form-item label="联系人姓名:" prop="name" class="form_input_box">
        <el-input v-model="form.name" placeholder="请输入真实姓名" class="form_input"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话:" prop="mobile" class="form_input_box">
        <el-input v-model="form.mobile" class="form_input"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称:" prop="store_name" class="form_input_box">
        <el-input v-model="form.store_name" class="form_input"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址:" prop="area_path" class="form_input_box">
        <div class="linkage">
            <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区" class="linkage_select">
              <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="shi" @change="choseCity" placeholder="市级地区" class="linkage_select">
              <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="qu" @change="choseBlock" placeholder="区级地区" class="linkage_select">
              <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
            </el-select>
          </div>
      </el-form-item>
      <el-form-item label="详细地址:" prop="address" class="form_input_box">
        <el-input v-model="form.address" class="form_input" style="width:788px"></el-input>
      </el-form-item>
      <el-form-item label="店铺图片:" class="form_input_box">
        <ul>
          <li>
            <div class="img_show_box" 
                v-loading="loading1"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
              <img src="../../assets/images/user/mall.png" id="img1">
            </div>
            <div class="show_box_right">
              <h3>上传门头照片</h3>
              <p><span>必须能看见完整的门匾、门框；</span>（建议正对门面2米处拍摄）。</p>
              <a>重新上传 <input type="file" @change="uploadImg()" ref="input_btn1"></a>
            </div>
          </li>
          <li>
            <div class="img_show_box"
                v-loading="loading2"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
              <img src="../../assets/images/user/card.png" id="img2">
            </div>
            <div class="show_box_right">
              <h3>上传营业执照</h3>
              <p><span>需文字清晰、边框完整；</span>拍复印件需要加盖印章，可用有效其他证件代替。</p>
              <a>选择文件 <input type="file" @change="uploadImg2()" ref="input_btn2"></a>
            </div>
          </li>
        </ul>
      </el-form-item>
      <!-- 表单按钮部分 -->
      <div class="form_input_box_last">
        <el-button class="ok_btn" @click="submitForm('form')">保存</el-button>
        <el-button type="text" class="txt_btn">取消</el-button>
      </div>
    </el-form>
  </div>
  <div v-if="applyStatus != 0" class="statusTitp">
    <img v-if="applyStatus == 4" src="../../assets/common/fail.png" alt="">
    <img v-else src="../../assets/common/checked.png" alt="">
    <span>{{ remark }}</span>
    <div class="applyagain" v-if="applyStatus == 4">
      您还可以:
      <el-button @click="applyagain" type="danger" class="goods_buy_btn">重新申请</el-button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import map from '../../../static/json/map.json'
import { evaluatuploadImage,memberStoreAdd,memberStoreStatus } from '../../api/index.js'
export default {
  data () {
    return {
      province: '',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city: '',
      block: '',
      src1: '',
      src2: '',

      form:{
        name: '',
        mobile:'',
        store_name:'',
        area_path:'',
        address:'',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        mobile: [
          { required: true, message: '请输入真实有效电话号码', trigger: 'change' },
        ],
        store_name: [
          { required: true, message: '请输入店铺名称', trigger: 'change' },
        ],
        area_path: [
          { required: true, message: '请选择省市', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'change' }
        ],
      },
      Lonlat:'',//经纬度
      store_pic:'',//门头照片
      license_pic:'',//营业执照照片
      loading1:false,
      loading2:false,
      applyStatus:'',//申请状态
      remark:'',//状态下文案提示
      isToken:false,
    }
  },
  created () {
    this.getCityData()
    this.getmemberStoreStatus()
    // 检测是否登录
    var token = localStorage.getItem('token');
    if(token){
      this.isToken = true
    }else{
      this.isToken = false
    }
    var that = this
    var map = new AMap.Map('container', {
      resizeEnable: true
    });
    AMap.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition(function(status,result){
          if(status=='complete'){
            that.Lonlat = result.position.lng + ',' + result.position.lat
          }else{
            
          }
      });
    });
  },
  methods: {
    // 加载china地点数据，三级
    getCityData () {
      var data = map
      this.province = []
      this.city = []
      this.block = []
      for (var item in data) {
        if (item.match(/0000$/)) { // 省
          this.province.push({id: item, value: data[item], children: []})
        } else if (item.match(/00$/)) { // 市
          this.city.push({id: item, value: data[item], children: []})
        } else { // 区
          this.block.push({id: item, value: data[item]})
        }
      }
      //分类市级
      for (var index in this.province) {
        for (var index1 in this.city) {
          if (this.province[index].id.slice(0, 2) === this.city[index1].id.slice(0, 2)) {
            this.province[index].children.push(this.city[index1])
          }
        }
      }
      // 分类区级
      for (var item1 in this.city) {
        for (var item2 in this.block) {
          if (this.block[item2].id.slice(0, 4) === this.city[item1].id.slice(0, 4)) {
            this.city[item1].children.push(this.block[item2])
          }
        }
      }
    },
    // 选省
    choseProvince (e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.sheng = this.province[index2].value
          this.shi1 = this.province[index2].children
          this.shi = this.province[index2].children[0].value
          this.qu1 = this.province[index2].children[0].children
          this.qu = this.province[index2].children[0].children[0].value
          this.E = this.qu1[0].id
          this.form.area_path = this.sheng+this.shi+this.qu
        }
      }
    },
    // 选市
    choseCity (e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.shi = this.city[index3].value
          this.qu1 = this.city[index3].children
          this.qu = this.city[index3].children[0].value
          this.E = this.qu1[0].id
          this.form.area_path = this.sheng+this.shi+this.qu
        }
      }
    },
    // 选区
    choseBlock (e) {
      this.E = e
      for(var index4 in this.block){
        if(e === this.block[index4].id){
          this.qu = this.block[index4].value
        }
      }
      this.form.area_path = this.sheng+this.shi+this.qu
    },
    // 点击图片上传
    uploadImg () {
      let img = this.$refs.input_btn1.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onloadend = function (e) {
        let img = document.getElementById('img1')
        img.src = e.target.result
        this.src1 = e.target.result
      }
      this.loading1 = true
      let fd = new FormData()
      fd.append('image', img)
      evaluatuploadImage(fd).then(res=>{
        if(res.code == 0){
          this.store_pic = res.data
          this.loading1 = false
        }
      })
    },
    uploadImg2 () {
      let img2 = this.$refs.input_btn2.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(img2)
      reader.onloadend = function (e) {
        let img2 = document.getElementById('img2')
        img2.src = e.target.result
        this.src2 = e.target.result
      }
      this.loading2 = true
      let fd2 = new FormData()
      fd2.append('image', img2)
      evaluatuploadImage(fd2).then(res=>{
        if(res.code == 0){
          this.license_pic = res.data
          this.loading2 = false
        }
      })
    },
    // 提交申请
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = {
            Lonlat: this.Lonlat,
            name: this.form.name,
            mobile: this.form.mobile,
            store_name: this.form.store_name,
            area_path: this.form.area_path,
            address: this.form.address,
            store_pic: this.store_pic,
            license_pic: this.license_pic,
          }
          memberStoreAdd(params).then(res=>{
            if(res.code == 0){
              this.$message({
                message: '申请提交成功',
                type: 'success'
              });
              this.getmemberStoreStatus()
            }else if(res.code == 1){
              this.$message.error(res.msg);
            }
          })
        } else {
          return false;
        }
      });
    },
    //商家申请当前状态
    getmemberStoreStatus(){
      memberStoreStatus().then(res=>{
        if(res.code == 0){
          this.applyStatus = res.data.apply_status
          this.remark = res.data.remark
        }
      })
    },
    // 重新申请
    applyagain(){
      this.applyStatus = 0
    }
  },
}
</script>

<style lang="scss" scoped>
.apply_business {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 1052px;
  h2 {
    font-size: 24px;
    color: #666;
    line-height: 36px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .tokenTipi{
    margin-bottom: 20px;
    color: #e51818;
  }
  // 商家申请表单
  .form_box {
    margin-top: 30px;
    .form_all {
      .form_input_box {
        min-height: 83px;
        border-bottom: 1px dashed #e0e0e0;
        .form_input {
          width: 268px;
          border: 1px solid #e0e0e0;
          color: #333;
        }
        .linkage {
          width: 502px;
          display: flex;
          justify-content: space-between;
          .linkage_select {
            width: 154px;
            border: 1px solid #e0e0e0;
          }
        }
        ul {
          margin-bottom: 30px;
          li {
            display: flex;
            .img_show_box {
              width: 278px;
              height: 208px;
              background-color: #f2f2f2;
              border: 2px dashed #e0e0e0;
              margin-right: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                max-width: 100%;
                max-height: 100%
              }
            }
            .show_box_right {
              height: 208px;
              width: 336px;
              h3 {
                font-size: 22px;
                color: #333;
                line-height: 25px;
              }
              p {
                margin: 24px 0 48px 0;
                font-size: 16px;
                color: #999;
                span {
                  color: #4e94f4;
                }
              }
              a {
                text-decoration: underline;
                font-weight: 700;
                position: relative;
                font-size: 16px;
                color: #333;
                input {
                  width: 65px;
                  height: 18px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                }
              }
            }
          }
          li:last-child {
            margin-top: 60px;
          }
        }
      }
      .form_input_box_last {
        margin: 80px 0 60px 0;
        .ok_btn {
          width: 189px;
          height: 52px;
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
  }
  //状态提示
  .statusTitp{
    margin-top: 50px;
    text-align: center;
    img{
      vertical-align: middle;
    }
    span{
      color: #666;
    }
    .applyagain{
      margin-top: 50px;
      color: #999;
      .goods_buy_btn {
          border-radius: 4px;
          background-color: #e51818;
      }
    }
    
  }
}
</style>
