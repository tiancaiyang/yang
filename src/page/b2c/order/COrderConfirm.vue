<template>
  <div class="order_confirm">
    <header-top></header-top>
    <Header></Header>
    <!-- 确认订单内容显示区域 -->
    <div class="order_confirm_box banxin">
      <!-- 选择收货地址部分 -->
      <div class="choice_address">
        <h2>选择收货地址</h2>
        <!-- 地址列表 -->
        <div class="arrderrNull" v-if="addressData.length == 0">
            <p class="iconfont icon-wupingjia icon"></p>
            <p>目前您还没有收货地址，快去添加吧！</p>
        </div>
        <ul class="address_list_all" v-if="addressData.length != 0">
          <li v-for="(item, index) in addressData" :key="index" @click="choiceAddress(item,index)" :class="index==addressNum?'address_active':''">
            <p class="address_list_top">
              <span>{{item.name}} 收</span>
              <a v-if="item.is_default == 1">默认地址</a>
            </p>
            <div class="address_box">
              <p>{{item.area}}</p>
              <p>{{item.address}}</p>
              <p>{{item.mobile}}</p>
            </div>
            <div class="btn_box" v-if="item.isShopAddress !=1">
              <a @click="editAddress(item)">修改</a>
              <a @click="deleteAddress(item)">删除</a>
            </div>
          </li>
        </ul>
        <!-- 显示隐藏地址卡片 -->
        <!-- <el-button type="text" style="color:#e51818; padding-top:0">显示全部地址<span class="el-icon-arrow-down"></span></el-button> -->
        <el-button class="add_address" @click="openNowAddress = true"><span class="el-icon-plus"></span>新增收货地址</el-button>
      </div>
      <!-- 确认订单信息部分 -->
      <div class="order_ok">
        <h2>确认商品信息</h2>
        <!-- 商品信息的表格 -->
        <div class="table_box" v-if="this.$route.query.from == 0">
          <div class="tableProduct">
            <table>
              <thead>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>运费</th>
                <th>金额</th>
              </thead>
              <tbody>
                <tr v-for="item in productList" :key="item.index">
                  <td>
                    <div class="imgBox fl">
                      <img :src="item.selectImg" alt="">
                    </div>
                    <div class="title">
                      <p>{{ item.title }}</p>
                      <p>{{ item.product_attr }}</p>
                    </div>
                  </td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.num }}</td>
                  <td>{{ item.transExpenses }}</td>
                  <td>
                    {{ item.price*item.num + parseFloat(item.transExpenses) - parseFloat(couponPrice) | strip }}
                  </td>
                </tr>
                <tr class="tr_bottom">
                  <td colspan="3" class="couponTd" v-if="couponList.length != 0">
                    <span>优惠券</span>
                    <div :class="0 == couponNum?'couponActive':''" @click="fromCouponChange(0,0)">
                      <p class="price">不使用</p>
                      <p class="time"></p>
                    </div>
                    <div v-for="coup in couponList" :key="coup.index"  @click="fromCouponChange(coup,coup.couponId)" :class="coup.couponId == couponNum?'couponActive':''">
                      <p class="price">{{ coup.name }}</p>
                      <p class="time" >有效期:{{ coup.end_time }}</p>
                    </div>
                  </td>
                  <td v-if="couponList.length == 0">
                    <span>优惠券</span>
                  </td>
                  <td colspan="2" v-if="couponList.length == 0">
                    <span>暂无优惠券</span>
                  </td>
                  <td></td>
                  <td class="tr_bottom_td">-{{ couponPrice  }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="user_message">
            给卖家留言:<el-input maxlength = "100" placeholder="选填, 最多100个字" v-model="comment" class="message_input"></el-input> {{comment.length}}/100
          </div>
        </div>
        <div class="table_box" v-if="this.$route.query.from == 1">
          <div class="tableProduct" v-for="(item,index) in cartProductList" :key="item.index">
            <div class="tableProduct_shopName">
              <h3><img :src="item.head_img" alt="">{{ item.shop_name }} </h3>
            </div>
            <table>
              <thead>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>金额</th>
              </thead>
              <tbody>
                <tr v-for="items in item.goods" :key="items.index">
                  <td>
                    <div class="imgBox fl">
                      <img :src="items.thumb" alt="">
                    </div>
                    <div class="title">
                      <p>{{ items.title }}</p>
                      <p>{{ items.options.product_attr }}</p>
                    </div>
                  </td>
                  <td>{{ items.price }}</td>
                  <td>{{ items.num }}</td>
                  <td >
                    {{ items.price*items.num  | strip }}
                  </td>
                </tr>
                <tr class="tr_bottom">
                  <td>运费</td>
                  <td></td>
                  <td></td>
                  <td class="tr_bottom_td">{{ item.trans_expenses}}</td>
                </tr>
                <tr class="tr_bottom">
                  <td colspan="3" class="couponTd">
                    <span>优惠券</span>
                    <div v-for="coup in item.coupon" :key="coup.index" :class="coup.checked == 'true'?'couponActive':''"  @click="couponChange(index,coup.couponId)">
                      <p class="price" v-if="coup.couponId == 0">不使用</p>
                      <p class="time" v-if="coup.couponId == 0"></p>
                      <p class="price" v-if="coup.couponId != 0">{{ coup.name }}</p>
                      <p class="time" v-if="coup.couponId != 0">有效期:{{ coup.end_time }}</p>
                    </div>
                  </td>
                  <td class="tr_bottom_td">-<span v-html="everyShopCoupon(index)"></span></td>
                </tr>
                <tr class="tr_bottom">
                  <td>总价</td>
                  <td></td>
                  <td></td>
                  <td class="tr_bottom_td"  v-html="everyShopMoney(index)"></td>
                </tr>
              </tbody>
            </table>
            <div class="user_message">
              给卖家留言:<el-input maxlength = "100" placeholder="选填, 最多100个字" v-model="cartShop[item.shop_id]" class="message_input"></el-input>
            </div>
          </div>
        </div>
        <div class="total_message">
          <div class="total_message_box">
            <p v-if="this.$route.query.from == 0"><span>应付款:</span> ¥ {{ allPrice  - parseFloat(couponPrice)  | strip }}</p>
            <p v-if="this.$route.query.from == 1"><span>应付款:</span> ¥ {{ allShopPrice | strip }}</p>
            <p><span>寄送至:</span> {{ addressDefaut.area }}{{ addressDefaut.address }}</p>
            <p><span>收货人:</span> {{ addressDefaut.name }}{{ addressDefaut.mobile }}</p>
          </div>
          <el-button class="send_order" @click="submitOrder">提交订单</el-button>
        </div>
      </div>
       <!-- 新增地址弹窗 -->
      <el-dialog title="新增收货地址" :visible.sync="openNowAddress" class="change_dialog" width="742px">
        <el-form :model="formNow"  :rules="rules" ref="formNow" label-position="left" size="mini" class="form_box">
          <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="formNow.name" autocomplete="off" class="form_input"></el-input>
          </el-form-item>
          <el-form-item label="收货人电话"  prop="num" :label-width="formLabelWidth">
            <el-input v-model="formNow.num" autocomplete="off" class="form_input"></el-input>
          </el-form-item>
          <el-form-item label="区域" prop="area" :label-width="formLabelWidth">
            <el-input v-model="formNow.area" autocomplete="off" class="form_input"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="address" :label-width="formLabelWidth">
            <el-input v-model="formNow.address" autocomplete="off" class="form_input"></el-input>
          </el-form-item>
          <el-form-item label="是否设置为默认地址" :label-width="formLabelWidth">
           <el-switch v-model="formNow.delivery" active-color="#e51818"></el-switch>
          </el-form-item>
          <el-form-item class="form_btn_box">
            <el-button class="form_btn" @click="submitForm('formNow')">保存收货人信息</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 修改地址弹窗 -->
      <el-dialog title="编辑收货地址" :visible.sync="dialogFormVisible" class="change_dialog" width="742px">
        <el-form :model="form" :rules="rules" ref="form" label-position="left" size="mini" class="form_box">
           <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" class="form_input"></el-input>
          </el-form-item>
          <el-form-item label="收货人电话"  prop="num" :label-width="formLabelWidth">
            <el-input v-model="form.num" autocomplete="off" class="form_input"></el-input>
          </el-form-item>
          <el-form-item label="区域" prop="area" :label-width="formLabelWidth">
            <el-input v-model="form.area" autocomplete="off" class="form_input"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="address" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off" class="form_input"></el-input>
          </el-form-item>
          <el-form-item label="是否设置为默认地址" :label-width="formLabelWidth">
           <el-switch v-model="form.delivery" active-color="#e51818"></el-switch>
          </el-form-item>
          <el-form-item class="form_btn_box">
            <el-button class="form_btn" @click="submitEditForm('form')">保存收货人信息</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import {
  b2cAddressList, 
  b2cAddressListNew, 
  b2cEditAddressList, 
  b2cDeleteAddressList ,
  b2cpersonalSubmitOrder, 
  b2cpersonalCartConfirmOrder,
  b2cpersonalCartSubmitOrder,
  b2cgetCouponListByGoodsId,
  rurallocalSubmit
} from '../../../api/index.js'
export default {
  inject :['reload'],
  data () {
    var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    return {
      addressNum: 0,//如果没有默认收货地址就默认选择第一个
      productList:[],//商品列表
      num1: 1,//商品数量选择
      allPrice:0,//总金额
      addressData:[],//地址列表
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
      editDefault:0,//是否是修改默认选中
      addressDefaut:[],//默认选中的地址
      addressId:'',//地址id
      comment:'',//备注
      cartShop:[],//购物车备注
      cid:'',//从购物车获取数据
      cartProductList:[],//从购物车获取的商品数据
      allShopPrice:0,//购物车总金额
      tute:'',//乡村互联标识特产商品标识
      couponList:[],//单商品优惠券列表
      couponPrice:0,//优惠券价格
      couponNum: 0,//优惠券默认显示第一个
    }
  },
  created(){
    this.getAddressList()
    if(this.$route.query.from == 0){
      this.productList.push(this.$route.query)
      this.num1 = this.$route.query.num
      this.allPrice = this.stripFun(this.$route.query.num * this.$route.query.price)+parseFloat(this.$route.query.transExpenses)
       //乡村互联标识
       if(this.$route.query.tute){
         this.tute = this.$route.query.tute
       }
      this.getFromOneCoupon()
    }else if(this.$route.query.from == 1){
      this.cid = this.$route.query.cid
      this.getCartSubmitOrder()
    }
  },
  methods: {
    // 点击选择收货地址
    choiceAddress (item,index) {
      this.addressNum = index
      this.addressDefaut = item
      this.addressId = item.address_id
    },
    //获取收货地址列表
    getAddressList(){
      b2cAddressList().then(res=>{
        if(res.code == 0){
          this.addressData = res.data
          this.addressData.forEach((item,index)=>{
            if(item.is_default == 1){
              this.addressDefaut = item
              this.addressNum = index
              this.addressId = item.address_id
            }else if(index == 0){
              this.addressDefaut = item
              this.addressId = item.address_id
            }
          })
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
    // 单商品优惠券展示
    getFromOneCoupon(){
      var type = 2
      if(this.tute == ''){
        type = 2
      }else{
        type = 3
      }
      let params = {
        product_id: this.$route.query.product_id,
        baseType: type,
        totalPrice: this.allPrice,
        shopId: this.$route.query.brand_member_id
      }
      b2cgetCouponListByGoodsId(params).then(res=>{
        console.log(res)
        if(res.code == 0){
          this.couponList = res.data.coupon
        }
      })
    },
    // 选择优惠券--单商品
    fromCouponChange(item,index){
      if(index == 0){
        this.couponPrice = 0
        this.couponNum = 0
      }else{
        this.couponPrice = item.sub_price
        this.couponNum = index
      }
    },
    // 选择优惠券---多商品
    couponChange(itemIndex,couponId){
      var coupList = this.cartProductList[itemIndex]['coupon'];
      this.cartProductList.forEach((item,index)=>{
        if(index == itemIndex){
          coupList.forEach(data=>{
            if(data.couponId == couponId){
              data.checked = 'true'
            }else{
              data.checked = false
            }
          })
        }
      })
      this.cartNum()
    },
    // 每店铺下的优惠券价格--最终展示
    everyShopCoupon(itemIndex){
      var couponPrice = 0
      var coupList = this.cartProductList[itemIndex]['coupon'];
      this.cartProductList.forEach((item,index)=>{
        if(index == itemIndex){
          coupList.forEach(data=>{
            if(data.checked == 'true'){
              if(data.couponId == 0){
                couponPrice = 0
              }else{
                couponPrice = data.sub_price
              }
            }
          })
        }
      }) 
      return parseFloat(couponPrice)
    },
    stripFun( num , precision = 12){
        return +parseFloat(num.toPrecision(precision));
    },
    // 从购物车提交的订单获取到的数据
    getCartSubmitOrder(){
      let params = {
        cart_id: this.cid
      }
      b2cpersonalCartConfirmOrder(params).then(res=>{
        console.log(res)
        if(res.code == 0){
          this.cartProductList = res.data
          this.cartNum()
        }
      })
    },
    // 购物车每个店铺商品总金额
    everyShopMoney(index){
      var that = this
      var everyStoreMoney = 0,
      list = that.cartProductList[index]['goods'];
      var transExpenses = that.cartProductList[index]['trans_expenses'];
      var couponPrice = 0
      var coupList = this.cartProductList[index]['coupon'];
      this.cartProductList.forEach((item,itemIndex)=>{
        if(index == itemIndex){
          coupList.forEach(data=>{
            if(data.checked == 'true'){
              if(data.couponId == 0){
                couponPrice = 0
              }else{
                couponPrice = data.sub_price
              }
            }
          })
        }
      }) 
      list.forEach(function(item, index, arr) {
          everyStoreMoney += that.stripFun(parseFloat(item.num) * parseFloat(item.price))
      });
      return that.stripFun(everyStoreMoney+parseFloat(transExpenses)-parseFloat(couponPrice))
    },
    //购物车总金额
    cartNum(){
      var that = this
      this.allShopPrice = 0;
      for(var i =0, len = that.cartProductList.length; i<len; i++){
        var list = that.cartProductList[i]['goods'];
        var transExpenses = that.cartProductList[i]['trans_expenses'];
        var couponPrice = 0
        var coupList = this.cartProductList[i]['coupon'];
          coupList.forEach(data=>{
            if(data.checked == 'true'){
              if(data.couponId == 0){
                couponPrice = 0
              }else{
                couponPrice = data.sub_price
              }
            }
          })
        list.forEach(item=>{
          that.allShopPrice += that.stripFun(parseFloat(item.num) * parseFloat(item.price))
        })
        that.allShopPrice = that.stripFun(that.allShopPrice + parseFloat(transExpenses)-parseFloat(couponPrice))
      }
    },
    // 提交订单
    submitOrder(){
      if(this.addressId == null || this.addressId.length == 0){
        this.$message({
          message: '请添加收货地址',
          type: 'error'
        });
      }else{
        if(this.$route.query.from == 0){
          var totalPrice = this.stripFun(this.allPrice - parseFloat(this.couponPrice))
          let params = {
            product_id: this.$route.query.product_id,
            price_total: totalPrice,
            num_total: this.num1,
            activity_type: this.$route.query.activity_type,
            activity_id : this.$route.query.activity_id,
            address_id: this.addressId,
            spec: this.$route.query.spec,
            product_attr: this.$route.query.product_attr,
            brand_member_id: this.$route.query.brand_member_id,
            comment : this.comment,
            couponId: this.couponNum
          }
          if(this.tute == 1){
            rurallocalSubmit(params).then(res=>{
              if(res.code == 0){
                let params = {
                  order_no : res.data.order_no,
                  price_total: res.data.price_total,
                  form:0,
                  tute: this.tute
                }
                this.$router.push({name:'CChoicePay',query:params})
              }
            })
          }else{
            b2cpersonalSubmitOrder(params).then(res=>{
              console.log(res)
              if(res.code == 0){
                let params = {
                  order_no : res.data.order_no,
                  price_total: res.data.price_total,
                  form:0,
                }
                this.$router.push({name:'CChoicePay',query:params})
              }else{
                this.$alert(res.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  
                  }
                });
              }
            })
          }
        }else if(this.$route.query.from == 1){
          var couponArr = []
          var coupon = ''
          for(var i =0, len = this.cartProductList.length; i<len; i++){
            var coupList = this.cartProductList[i]['coupon'];
            if(coupList.length > 0){
              coupList.forEach(data=>{
                if(data.checked == 'true'){
                  if(data.couponId == 0){
                    couponArr.push(this.cartProductList[i].shop_id + '_' + data.couponId + '_' + '0')
                  }else{
                    couponArr.push(this.cartProductList[i].shop_id + '_' + data.couponId + '_' + '0')
                  }
                }
              })
            }else if(coupList.length == 0){
              couponArr.push(this.cartProductList[i].shop_id + '_' + '0' + '_' + '0')
            }
            coupon = couponArr.join(',')
          }
          let params = {
            price_total: this.allShopPrice,
            address_id: this.addressId,
            cart_id: this.cid,
            comment : this.cartShop,
            discount: coupon
          }
          console.log(params)
          b2cpersonalCartSubmitOrder(params).then(res=>{
            console.log(res)
            if(res.code == 0){
              let params = {
                order_no : res.data.order_no,
                price_total: res.data.price_total,
                form:1,
              }
              this.$router.push({name:'CChoicePay',query:params})
            }else {
              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                 
                }
              });
            }
          })
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .order_confirm {
    background-color: #f5f5f5;
    min-height: 906px;
    .order_confirm_box {
      min-height: 906px;
      margin-top: 20px;
      background-color: #fff;
      padding: 53px 60px 68px 58px;
      box-sizing: border-box;
      // 选择收货地址
      .choice_address {
        h2 {
          height: 35px;
          border-bottom: 1px solid #dbdbdb;
          font-size: 18px;
          color: #333;
          font-weight: 700;
        }
        // 地址列表为空
        .arrderrNull{
          text-align: center;
          padding: 50px 0;
          .icon{
            font-size: 80px;
            margin-bottom: 10px;
          }
          p{
            font-size: 16px;
            color: #bbb;
          }
        }
        // 地址列表
        .address_list_all {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          li {
            width: 344px;
            height: 160px;
            padding: 0 18px;
            box-sizing: border-box;
            border: 1px solid #000;
            margin-right: 25px;
            margin-bottom: 20px;
            .address_list_top {
              height: 40px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #e7e7e7;
              span {
                font-size: 16px;
                color: #333;
                font-weight: 700;
              }
              a {
                font-size: 14px;
                color: #666;
              }
            }
            .address_box {
              margin-bottom: 20px;
              p {
                font-size: 12px;
                color: #333;
                margin-top: 10px;
              }
            }
            .btn_box {
              font-size: 12px;
              color: #666;
              display: none;
              a {
                margin-right: 20px;
                &:hover {
                  color: #e51818;
                }
              }

            }
            &:hover .btn_box {
              display: block;
            }
            &:hover {
              background-color: #f7f7f7;
            }
            &:nth-child(3n) {
              margin-right: 0;
            }
          }
          .address_active {
            background: url('../../../assets/images/b2c/choice.png') no-repeat;
            background-position: right bottom;
            border: 4px solid #e22319;
            box-sizing: border-box;
          }
        }
        // 新增收货地址按钮
        .add_address {
          margin: 0;
          padding: 0;
          width: 112px;
          height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333;
          font-size: 14px;
        }
      }
      // 修改地址弹窗
      .change_dialog {
        .form_box {
          margin: 0 auto;
          width: 410px;
          .form_input {
            width: 300px;
            height: 30px;
          }
          & /deep/.el-form-item__content{
            height: 30px;
          }
        }
        .form_btn_box {
          .form_btn {
            margin: 0;
            padding: 0;
            width: 116px;
            height: 27px;
            text-align: center;
            line-height: 27px;
            background-color: #e51818;
            color: #fafafa;
            font-size: 14px;
            margin-left: 90px;
          }
        }
      }
      // 确认商品信息
      .order_ok {
        margin-top: 40px;
        h2 {
          height: 35px;
          border-bottom: 1px solid #dbdbdb;
          font-size: 18px;
          color: #333;
          font-weight: 700;
        }
        .table_box {
          margin-top: 20px;
          border: 1px solid #e0e0e0;
          .tableProduct{
            .tableProduct_shopName{
              h3{
                padding: 10px 20px;
                img{
                  width: 50px;
                  height: 25px;
                  vertical-align: middle;
                }
              }
            }
            table{
              thead{
                font-size: 14px;
                color:#666;
                height: 40px;
                line-height: 40px;
                text-align: left;
                background-color: #fff4e8;
                th{
                  &:nth-child(1){
                    width: 480px;
                    padding-left: 20px;
                  }
                  &:nth-child(2){
                    width: 220px;
                  }
                  &:nth-child(3){
                    width: 220px;
                  }
                  &:nth-child(4){
                    width: 220px;
                  }
                  &:nth-child(5){
                    width: 220px;
                  }
                }
              }
              tbody{
                tr{
                  color: #333;
                  height: 60px;
                  line-height: 60px;
                  td{
                    &:nth-child(1){
                      padding-left: 20px;
                      .title{
                        p{
                          line-height: 20px;
                        }
                      }
                    }
                    .imgBox{
                      width: 60px;
                      height: 60px;
                      margin-right: 10px;
                      @include common_center;
                      img{
                        max-width: 100%;
                        max-height: 100%;
                      }
                    }
                  }
                }
                .tr_bottom{
                  .tr_bottom_td{
                    color: #e51818;
                    font-weight: bold;
                  }
                }
                .couponTd{
                  div{
                    display: inline-block;
                    top: 20px;
                    width: 150px;
                    height: 55px;
                    font-size: 12px;
                    padding-left: 5px;
                    margin-right: 10px;
                    border: 1px solid #333;
                    background-color: #f5f5f5;
                    box-sizing: border-box;
                    position: relative;
                    .price{
                      position: absolute;
                      top: -13px;
                      height: 0;
                    }
                    .time{
                      position: absolute;
                      top:6px;
                      height: 0;
                    }
                  }
                  .couponActive{
                    background: url('../../../assets/images/b2c/choice.png') no-repeat;
                    background-position: right bottom;
                    border: 2px solid #e22319;
                    box-sizing: border-box;
                  }
                }
              }
            }
          }
          .user_message {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #333;
            margin: 30px 20px;
            .message_input {
              width: 662px;
              background-color: #f3f3f3;
              margin: 0 20px;
            }
          }
        }
        .total_message {
          margin-top: 30px;
          height: 194px;
          position: relative;
          .total_message_box {
            width: 673px;
            height: 146px;
            border: 2px solid #e22319;
            padding: 25px 30px 0 0;
            box-sizing: border-box;
            position: absolute;
            right: 0;
            top: 0;
            p {
              font-size: 14px;
              color: #333;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              span {
                font-size: 16px;
                font-weight: 700;
                margin-right: 10px;
              }
            }
            p:first-child {
              font-size: 24px;
              color: #e51818;
              font-weight: 700;
              margin-bottom: 25px;
              span {
                font-size: 16px;
                color: #333;
              }
            }
            p:nth-child(2) {
              margin-bottom: 10px;
            }
          }
          .send_order {
            width: 161px;
            height: 48px;
            background-color: #e51818;
            color: #fff;
            font-size: 18px;
            font-weight: 700;
            position: absolute;
            top: 145px;
            right: 0;
          }
        }
      }
    }
  }
</style>
