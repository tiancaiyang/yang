<template>
  <div class="user_address">
    <!-- 标题盒子 -->
    <div class="title_box">
      <h2>收货地址</h2>
      <a @click="openNowAddress = true"><span class="el-icon-circle-plus"></span>新增收货地址</a>
    </div>
    <!-- 地址列表盒子 -->
    <ul class="address_list_all">
      <li v-for="item in addressData" :key="item.index">
        <div class="box_left">
          <p class="consignee_info">
            <span>{{ item.name }}</span>
            <span>{{ item.mobile }}</span>
            <span class="default" v-if="item.is_default == 1">默认</span>
            <span class="default isAdd" v-if="item.isShopAddress == 1">店铺地址</span>
          </p>
          <p class="consignee_address">
            <span class="el-icon-location"></span><span>{{ item.area }}{{ item.address }}</span>
          </p>
        </div>
        <div class="btn_box clearfix" v-if="item.isShopAddress != 1">
          <!-- <el-button type="warning" round class="change_btn fl">设为默认</el-button> -->
          <el-button type="primary" @click="editAddress(item)" icon="el-icon-edit" round class="change_btn fl">编辑</el-button>
          <el-button type="danger" @click="deleteAddress(item)" icon="el-icon-delete" round class="change_btn fl">删除</el-button>
        </div>
        <div class="btn_box clearfix" v-if="item.isShopAddress == 1">
          <span class="noChange">不可更改</span>
        </div>
      </li>
    </ul>
    <div class="arrderrNull" v-if="addressData.length == 0">
        <p class="iconfont icon-wupingjia icon"></p>
        <p>目前您还没有收货地址，快去添加吧！</p>
    </div>
    <!-- 新增收货地址的弹窗 -->
    <el-dialog title="新增收货地址" :visible.sync="openNowAddress" width="800px" class="dialog_box">
      <el-form :model="formNow"  :rules="rules" ref="formNow" class="form_box">
        <el-form-item label="姓名:"  prop="name" :label-width="formLabelWidth">
          <el-input v-model="formNow.name" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话:"  prop="num"  :label-width="formLabelWidth">
          <el-input  v-model="formNow.num" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="区域:" prop="area" :label-width="formLabelWidth">
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
        <el-form-item label="收货地址:"  prop="address" :label-width="formLabelWidth">
          <el-input v-model="formNow.address" autocomplete="off" class="form_input_last"></el-input>
        </el-form-item>
        <el-form-item label="是否设置为默认地址" :label-width="formLabelWidth">
           <el-switch v-model="formNow.delivery" active-color="#e51818"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openNowAddress = false" class="cancel_btn">取 消</el-button>
        <el-button type="primary" @click="submitForm('formNow')" class="preservation_btn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑收货地址的弹窗 -->
    <el-dialog title="编辑收货地址" :visible.sync="dialogFormVisible" width="800px" class="dialog_box">
      <el-form :model="form"  :rules="rules" ref="form" class="form_box">
        <el-form-item label="姓名:"  prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话:"  prop="num"  :label-width="formLabelWidth">
          <el-input  v-model="form.num" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="区域:" prop="area" :label-width="formLabelWidth">
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
        <el-form-item label="收货地址:"  prop="address" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" class="form_input_last"></el-input>
        </el-form-item>
        <el-form-item label="是否设置为默认地址" :label-width="formLabelWidth">
           <el-switch v-model="form.delivery" active-color="#e51818"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="cancel_btn">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('form')" class="preservation_btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import map from '../../../static/json/map.json'
import { b2cAddressListNew ,b2cAddressList,b2cEditAddressList ,b2cDeleteAddressList} from '../../api/index.js'
export default {
  inject :['reload'],
  data () {
    return {
      form: {},
      formLabelWidth: '90px',
      province: '',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city: '',
      block: '',
      openNowAddress: false,//新增收货地址弹框
      dialogFormVisible: false,//修改收货地址弹框
      formNow: {
        name: '',
        num: '',
        area: '',
        address: '',
        delivery: false,
      },
      form: {
        name: '',
        num: '',
        area: '',
        address: '',
        delivery: false,
      },
      formLabelWidth: '160px',
      rules: {
         name: [
           { required: true, message: '请输入姓名', trigger: 'blur' },
         ],
         num: [
           { required: true, message: '请输入真实有效电话号码', trigger: 'change' },
         ],
         area: [
           { required: true, message: '请选择省市', trigger: 'change' }
         ],
         address: [
           { required: true, message: '请输入详细地址', trigger: 'change' }
         ],
      },
      default:0,//是否是默认选中
      addressData:[],//收货地址列表
    }
  },
  created () {
    this.getCityData()
    this.getAddressList()
    // console.log(map)
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
          this.formNow.area = this.sheng+this.shi+this.qu
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
          // console.log(this.E)
          this.formNow.area = this.sheng+this.shi+this.qu
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
      this.formNow.area = this.sheng+this.shi+this.qu
      // console.log(this.E)
    },
    //获取收货地址列表
    getAddressList(){
      b2cAddressList().then(res=>{
        if(res.code == 0){
          this.addressData = res.data
          console.log(res)
        }
      })
    },
    // 新增收货地址
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.formNow.delivery){
            this.default = 1
          }else{
            this.default = 0
          }
          let params = {
            name: this.formNow.name,
            address: this.formNow.address,
            area: this.formNow.area,
            mobile: this.formNow.num,
            default: this.default,
          }
          b2cAddressListNew(params).then(res=>{
            if(res.code == 0){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.openNowAddress = false
              // 再次刷新页面
              this.reload()
            }
          })
        } else {
          return false;
        }
      });
    },
    // 打开修改收货地址弹窗
    editAddress(item){
      this.dialogFormVisible = true
      this.form.name = item.name
      this.form.num = item.mobile
      this.form.area = item.area
      this.form.address = item.address
      this.addressId = item.address_id
      if(item.is_default == 0){
        this.form.delivery = false
      }else if(item.is_default == 1){
        this.form.delivery = true
      }
    },
    // 修改收货地址
    submitEditForm(form){
      this.form.area = this.sheng+this.shi+this.qu
      this.$refs[form].validate((valid) => {
        if (valid) {
          if(this.form.delivery){
            this.editDefault = 1
          }else{
            this.editDefault = 0
          }
          let params = {
            name: this.form.name,
            address: this.form.address,
            area: this.form.area,
            mobile: this.form.num,
            default: this.editDefault,
            address_id : this.addressId,
          }
          b2cEditAddressList(params).then(res=>{
            if(res.code == 0){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.dialogFormVisible = false
              // 再次刷新页面
              this.reload()
            }
          })
        } else {
          return false;
        }
      });
    },
    // 删除收货地址
    deleteAddress(item){
      let params = {
        name: item.name,
        address_id: item.address_id,
      }
      b2cDeleteAddressList(params).then(res=>{
        if(res.code == 0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            // 再次刷新页面
            this.reload()
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.user_address {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 1052px;
  // 标题盒子
  .title_box {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    h2 {
      font-size: 24px;
      line-height: 36px;
      color: #666;
    }
    a {
      font-size: 18px;
      color: #666;
      span {
        margin-right: 10px;
      }
    }
  }
  // 地址列表盒子
  .address_list_all {
    li {
      height: 115px;
      display: flex;
      align-items: center;
      border-bottom: 1px dashed #e0e0e0;
      &:hover{
        .btn_box{
          display: block;
        }
      }
      .box_left {
        width: 580px;
        .consignee_info {
          display: flex;
          margin-bottom: 20px;
          span:first-child {
            font-size: 20px;
            color: #333;
          }
          span:nth-child(2) {
            font-size: 20px;
            color: #333;
            margin: 0 30px;
          }
          .default {
            display: block;
            width: 44px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border-radius: 9px;
            background-color: #fedece;
            font-size: 14px;
            color: #f77434;
          }
          .isAdd{
            width:60px;
          }
        }
        .consignee_address {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #666;
          span:first-child {
            margin-right: 6px;
          }
        }
      }
      .btn_box  {
        display: none;
        .change_btn {
          width: 80px;
          height: 30px;
          padding: 0;
          display: flex;
          align-items: center;
          margin-left: 0;
          justify-content: center;
        }
        .change_btn:nth-child(2) {
          margin: 0 30px;
        }
        .noChange{
          color:#999;
        }
      }
    }
  }
  // 地址列表为空
  .arrderrNull{
    text-align: center;
    padding: 50px 0;
    .icon{
      width: 100%;
      font-size: 80px;
      margin-bottom: 10px;
    }
    p{
      font-size: 16px;
      color: #bbb;
    }
  }
  // 新增收货地址的盒子
  .dialog_box {
    .form_box {
      width: 618px;
      .form_input {
        width: 235px;
        // margin-left: 10px;
      }
      .form_input_last {
        width: 518px;
        // margin-left: 10px;
      }
      .linkage {
        width: 518px;
        // margin-left: 10px;
        display: flex;
        justify-content: space-between;
        .linkage_select {
          width: 159px;
        }
      }
    }
    .dialog-footer {
      width: 100%;
      display: flex;
      justify-content: center;
      .cancel_btn,
      .preservation_btn {
        width: 210px;
        height: 52px;
        font-size: 16px;
        color: #fff;
      }
      .cancel_btn {
        background-color: #b0b0b0;
        border: none;
      }
      .cancel_btn:hover {
        opacity: .5;
      }
      .preservation_btn {
        background-color: #e51818;
        border: none;
      }
      .preservation_btn:hover {
        opacity: .5;
      }
    }
  }
}
</style>
