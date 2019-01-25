<template>
  <div class="user_address">
    <!-- 标题盒子 -->
    <div class="title_box">
      <h2>收货地址</h2>
      <a @click="dialogFormVisible = true"><span class="el-icon-circle-plus"></span>新增收货地址</a>
    </div>
    <!-- 地址列表盒子 -->
    <ul class="address_list_all">
      <li>
        <div class="box_left">
          <p class="consignee_info">
            <span>张小强</span>
            <span>150 0371 1245</span>
            <span v-show="true">默认</span>
          </p>
          <p class="consignee_address">
            <span class="el-icon-location"></span><span>河南省 郑州市 金水区 东风路世玺中心1410</span>
          </p>
        </div>
        <div class="btn_box clearfix">
          <el-button type="warning" round class="change_btn fl">设为默认</el-button>
          <el-button type="primary" icon="el-icon-edit" round class="change_btn fl">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" round class="change_btn fl">删除</el-button>
        </div>
      </li>
      <li>
        <div class="box_left">
          <p class="consignee_info">
            <span>张小强</span>
            <span>150 0371 1245</span>
            <span v-show="false">默认</span>
          </p>
          <p class="consignee_address">
            <span class="el-icon-location"></span><span>河南省 郑州市 金水区 东风路世玺中心1410</span>
          </p>
        </div>
        <div class="btn_box clearfix">
          <el-button type="warning" round class="change_btn fl">设为默认</el-button>
          <el-button type="primary" icon="el-icon-edit" round class="change_btn fl">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" round class="change_btn fl">删除</el-button>
        </div>
      </li>
      <li>
        <div class="box_left">
          <p class="consignee_info">
            <span>张小强</span>
            <span>150 0371 1245</span>
            <span v-show="false">默认</span>
          </p>
          <p class="consignee_address">
            <span class="el-icon-location"></span><span>河南省 郑州市 金水区 东风路世玺中心1410</span>
          </p>
        </div>
        <div class="btn_box clearfix">
          <el-button type="warning" round class="change_btn fl">设为默认</el-button>
          <el-button type="primary" icon="el-icon-edit" round class="change_btn fl">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" round class="change_btn fl">删除</el-button>
        </div>
      </li>
    </ul>
    <!-- 新增收货地址的弹窗 -->
    <el-dialog title="新增收货地址" :visible.sync="dialogFormVisible" width="678px" class="dialog_box">
      <el-form :model="form" class="form_box">
        <el-form-item label="收货人:" :label-width="formLabelWidth">
          <el-input class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="所在地区:" :label-width="formLabelWidth">
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
        <el-form-item label="详细地址:" :label-width="formLabelWidth">
          <el-input autocomplete="off" class="form_input_last"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="cancel_btn">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" class="preservation_btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import map from '../../../static/json/map.json'
export default {
  data () {
    return {
      gridData: [
        {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        {date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'}
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '90px',
      province: '',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city: '',
      block: ''
    }
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
          this.shi1 = this.province[index2].children
          this.shi = this.province[index2].children[0].value
          this.qu1 = this.province[index2].children[0].children
          this.qu = this.province[index2].children[0].children[0].value
          this.E = this.qu1[0].id
        }
      }
    },
    // 选市
    choseCity (e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children
          this.qu = this.city[index3].children[0].value
          this.E = this.qu1[0].id
          // console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock (e) {
      this.E = e
      // console.log(this.E)
    }
  },
  created () {
    this.getCityData()
    // console.log(map)
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
          span:last-child {
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
      }
    }
  }
  // 新增收货地址的盒子
  .dialog_box {
    .form_box {
      width: 618px;
      .form_input {
        width: 235px;
        margin-left: 10px;
      }
      .form_input_last {
        width: 518px;
        margin-left: 10px;
      }
      .linkage {
        width: 518px;
        margin-left: 10px;
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
