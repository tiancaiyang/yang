<template>
<div class="shopcar">
  <header-top></header-top>
  <Header></Header>
  <div class="shopcar_box banxin">
    <h2>我的购物车<span>({{ parseInt(cTotalNum) + parseInt(bTotalNum)  }})</span></h2>
    <!-- tab 栏切换 -->
    <div class="shopcar_nav_tabs">
      <a :class="tabs==1?'shopcar_btn tab_active':'shopcar_btn'" @click="changeShopcar(1)">普通商品 <span>{{ cTotalNum }}</span></a>
      <a :class="tabs==2?'shopcar_btn tab_active':'shopcar_btn'" @click="changeShopcar(2)">订货平台 <span>{{ bTotalNum }}</span></a>
    </div>
    <!-- 如果购物车为空 -->
    <div class="shopCar_null" v-if="tabs == 1 && ProductList.length == 0">
      <p class="iconfont icon-konggouwuche1 iconCart"></p>
      <p>购物车中还是空的</p>
      <p>快去挑几件中意的商品吧</p>
    </div>
    <div class="shopCar_null" v-if="tabs == 2 && ProductListB.length == 0">
      <p class="iconfont icon-konggouwuche1 iconCart"></p>
      <p>购物车中还是空的</p>
      <p>快去挑几件中意的商品吧</p>
    </div>
    <div>
       <!-- b2c购物车列表显示区域 -->
      <div class="shopcar_list_box" v-show="tabs == 1 && ProductList.length !== 0">
        <!-- 标题栏 -->
        <div class="list_box_title">
          <el-checkbox  v-model="allChecked"  @change="AllGoodsChecked" class="el_checkbox">全选</el-checkbox>
          <span class="all_goods_title">商品信息</span>
          <ul>
            <li>单价(元)</li>
            <li>数量</li>
            <li>金额</li>
            <li>操作</li>
          </ul>
        </div>
        <!-- 购物车列表内容 -->
        <ul class="list_box_content">
          <li v-for="(item,index) in ProductList" :key="item.index">
            <!-- 店铺名称 -->
            <div class="content_top">
              <el-checkbox class="store_checkbox" @change="shopChecked(index)"  v-model="item.checked">
                <img class="content_top_img" :src="item.head_img" alt="">
                {{ item.shop_name }}
              </el-checkbox>
              <div class="go_store">
                <span class="store_limit">{{ item.limit_price }}元起送</span>
                <a @click="goShopInfo(item,item.goods_type)">逛逛凑单<span class="el-icon-arrow-right"></span></a>
              </div>
            </div>
            <!-- 列表内容 -->
            <div class="content_bottom">
              <ul  v-for="(items,ind) in item.goods" :key="items.ind">
                <li>
                  <el-checkbox class="goods_checkbox" @change="goodsChecked(index,ind)"  v-model="items.checked"></el-checkbox>
                  <div class="goods_details">
                    <ul>
                      <li @click="goGoodsInfo(items,item.goods_type)">
                        <div class="img_box">
                          <img :src="items.thumb">
                        </div>
                        <div class="details_txt">
                          <p>{{ items.title }}</p>
                          <div class="details_txt_bottom">
                            <span class="sale_flag" v-if="items.activity_type ==1">特价</span>
                            <span class="goods_model" v-if="JSON.stringify(items.options) !== '{}'">{{ items.options.product_attr }}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- 盒子右半部分 -->
                  <div class="li_box_right">
                    <span class="unit_price">￥{{ items.price }}</span>
                    <div class="num_box">
                      <el-input-number size="mini" v-model="items.num" @change="changeEditCart(items)" class="num_btn" :min="1"></el-input-number>
                    </div>
                    <span class="total_price">￥{{  items.price*items.num | strip }}</span>
                    <div class="btn_box">
                      <a @click="b2cEdelCart(items.cart_id)">删除</a>
                      <a v-if="items.is_collection == 2" @click="collection(items.product_id,items.is_collection)">移入我的收藏夹</a>
                      <a v-if="items.is_collection == 1" @click="collection(items.product_id,items.is_collection)">移出我的收藏夹</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- 底部结算区域 -->
        <div class="list_box_bottom clearfix">
          <div class="fl">
            <el-checkbox  v-model="allChecked"  @change="AllGoodsChecked" class="el_checkbox">全选</el-checkbox>
            <a @click="allDelCheckedGoods" class="delAllChecked">删除选中商品</a>
          </div>
          <div class="fr list_box_bottom_right">
            <span>已选择&nbsp;&nbsp;<b>{{ $store.getters.priceAllC.count }}</b>&nbsp;&nbsp;件商品</span>
            <span>总价:&nbsp;&nbsp;<b>{{ $store.getters.priceAllC.amount | strip }}</b>&nbsp;&nbsp;</span>
            <a  @click="getSubmit">去结算</a>
          </div>
        </div>
      </div>
      <!--b2b 购物车列表显示区域 -->
      <div class="shopcar_list_box" v-show="tabs == 2 && ProductListB.length !== 0">
        <!-- 标题栏 -->
        <div class="list_box_title">
          <el-checkbox  v-model="allCheckedB"  @change="AllGoodsChecked" class="el_checkbox">全选</el-checkbox>
          <span class="all_goods_title">商品信息</span>
          <ul>
            <li>单价(元)</li>
            <li>数量</li>
            <li>金额</li>
            <li>操作</li>
          </ul>
        </div>
        <!-- 购物车列表内容 -->
        <ul class="list_box_content">
          <li v-for="(item,index) in ProductListB" :key="item.index">
            <!-- 店铺名称 -->
            <div class="content_top">
              <el-checkbox class="store_checkbox" @change="shopChecked(index)"  v-model="item.checked">
                <img class="content_top_img" :src="item.head_img" alt="">
                {{ item.shop_name }}
              </el-checkbox>
              <div class="go_store">
                <span class="store_limit">{{ item.limit_price }}元起送</span>
                <router-link :to="'/common/AShopList/AShopInfo/'+item.shop_id+'/'+'1'" tag="a">逛逛凑单<span class="el-icon-arrow-right"></span></router-link>
              </div>
            </div>
            <!-- 列表内容 -->
            <div class="content_bottom">
              <ul  v-for="(items,ind) in item.goods" :key="items.ind">
                <li>
                  <el-checkbox class="goods_checkbox" @change="goodsChecked(index,ind)"  v-model="items.checked"></el-checkbox>
                  <div class="goods_details">
                    <ul>
                      <li @click="goGoodsInfo(items,1)">
                        <div class="img_box">
                          <img :src="items.thumb">
                        </div>
                        <div class="details_txt">
                          <p>{{ items.title }}</p>
                          <div class="details_txt_bottom">
                            <span class="sale_flag" v-if="items.activity_type ==1">特价</span>
                            <span class="goods_model" v-if="JSON.stringify(items.options) !== '{}'">{{ items.options.product_attr }}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- 盒子右半部分 -->
                  <div class="li_box_right">
                    <span class="unit_price">￥{{ items.price }}</span>
                    <div class="num_box">
                      <el-input-number size="mini" v-model="items.num" @change="changeEditCart(items)" class="num_btn" :min="1"></el-input-number>
                    </div>
                    <span class="total_price">￥{{  items.price*items.num | strip }}</span>
                    <div class="btn_box">
                      <a @click="b2cEdelCart(items.cart_id)">删除</a>
                      <a v-if="items.is_collection == 2" @click="collection(items.product_id,items.is_collection)">移入我的收藏夹</a>
                      <a v-if="items.is_collection == 1" @click="collection(items.product_id,items.is_collection)">移出我的收藏夹</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- 底部结算区域 -->
        <div class="list_box_bottom clearfix">
          <div class="fl">
            <el-checkbox  v-model="allCheckedB"  @change="AllGoodsChecked" class="el_checkbox">全选</el-checkbox>
            <a @click="allDelCheckedGoods" class="delAllChecked">删除选中商品</a>
          </div>
          <div class="fr list_box_bottom_right">
            <span>已选择&nbsp;&nbsp;<b>{{ $store.getters.priceAllB.count }}</b>&nbsp;&nbsp;件商品</span>
            <span>总价:&nbsp;&nbsp;<b>{{ $store.getters.priceAllB.amount | strip }}</b>&nbsp;&nbsp;</span>
            <a  @click="getSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>

  </div>
  <Footer></Footer>
  <footer-bottom></footer-bottom>
</div>
</template>

<script>
import {
  b2cGetCCart,b2cdelCart,b2ceditCart,publicCollect,
  b2bgetCart, b2bdelCart,b2beditCart,
  } from '../../api/index.js'
export default {
  inject :['reload'],
  data () {
    return {
      tabs: 1,
      ProductList:[],//获取c端购物车数据
      ProductListB:[],//获取b端购物车数据
      allChecked: false,
      allCheckedB:false,
      cTotalNum:0,//c端商品总数
      bTotalNum:0,//b端商品总数
      identity:'',
    }
  },
  created(){
    this.identity = localStorage.getItem('identity')
    if(this.identity == 1){
      this.getb2cCart()
    }else if(this.identity == 2){
      this.getb2cCart()
      this.getb2bCart()
    }
  },
  methods: {
    // 切换购物车
    changeShopcar (index) {
      this.tabs = index
      if(this.identity == 1 && this.tabs == 2){
        this.$alert('您还不是我们的商家会员，您可以在个人中心中注册申请。', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.tabs = 1
            }
        })
      }
    },
    // 全选反选
    AllGoodsChecked () {
      if(this.tabs == 1){
        var flag = false;
        if ( this.allChecked ) {
            flag = true;
        }
        for ( var i = 0, len = this.ProductList.length; i < len; i++ ) {
          this.ProductList[i]['checked'] = flag;
          var list = this.ProductList[i]['goods'];
          for ( var k = 0, len1 = list.length; k < len1; k++ ) {
              list[k]['checked'] = flag;
          }
        }
      }else if(this.tabs == 2){
        var flag = false;
        if ( this.allCheckedB ) {
            flag = true;
        }
        for ( var i = 0, len = this.ProductListB.length; i < len; i++ ) {
          this.ProductListB[i]['checked'] = flag;
          var list = this.ProductListB[i]['goods'];
          for ( var k = 0, len1 = list.length; k < len1; k++ ) {
              list[k]['checked'] = flag;
          }
        }
      }
    },
    // 店铺全选反选
    shopChecked( index ){
      if(this.tabs == 1){
        var list = this.ProductList[index]['goods'],
            len = list.length;
        if ( this.ProductList[index]['checked'] ) {
            for (var i = 0; i < len; i++ ) {
                list[i]['checked'] = true;
            }
        } else {
            for (var i = 0; i < len; i++ ) {
                list[i]['checked'] = false;
            }
        }
        // 判断是否选择所有商品的全选
        this.isChooseAll();
      }else if(this.tabs == 2){
        var list = this.ProductListB[index]['goods'],
            len = list.length;
        if ( this.ProductListB[index]['checked'] ) {
            for (var i = 0; i < len; i++ ) {
                list[i]['checked'] = true;
            }
        } else {
            for (var i = 0; i < len; i++ ) {
                list[i]['checked'] = false;
            }
        }
        // 判断是否选择所有商品的全选
        this.isChooseAll();
      }

    },
    // 单个商品选中
    goodsChecked( index1, index ){
      if(this.tabs == 1){
        var list = this.ProductList[index1]['goods'],
            len = list.length;
        var flag = true;
        for (var i = 0; i < len; i++ ) {
            if ( list[i]['checked'] == false ) {
                flag = false;
                break;
            }
        }
        flag == true ? this.ProductList[index1]['checked'] = true : this.ProductList[index1]['checked'] = false;
        // 判断是否选择所有商品的全选
        this.isChooseAll();
      }else if(this.tabs == 2){
        var list = this.ProductListB[index1]['goods'],
            len = list.length;
        var flag = true;
        for (var i = 0; i < len; i++ ) {
            if ( list[i]['checked'] == false ) {
                flag = false;
                break;
            }
        }
        flag == true ? this.ProductListB[index1]['checked'] = true : this.ProductListB[index1]['checked'] = false;
        // 判断是否选择所有商品的全选
        this.isChooseAll();
      }

    },
    // 判断是否选择所有商品的全选
    isChooseAll() {
      if(this.tabs == 1){
        var flag1 = true;
        for ( var i = 0, len = this.ProductList.length; i < len; i++ ) {
            if( this.ProductList[i]['checked'] == false ) {
              flag1 = false;
              break;
            }
        }
        flag1 == true ? this.allChecked = true : this.allChecked = false;
      }else if(this.tabs == 2){
        var flag1 = true;
        for ( var i = 0, len = this.ProductListB.length; i < len; i++ ) {
            if( this.ProductListB[i]['checked'] == false ) {
              flag1 = false;
              break;
            }
        }
        flag1 == true ? this.allCheckedB = true : this.allCheckedB = false;
      }
    },
    // 获取c端购物车
    getb2cCart(){
      b2cGetCCart().then(res=>{
        console.log(res)
        if(res.code == 0){
          if(res.data.length == 0){
            this.ProductList.length = 0
          }else{
            this.ProductList = res.data.c_cart
            this.cTotalNum = res.data.c_total_num
            this.$store.commit("addB2cCar",res.data.c_cart)
            if(this.ProductList.length == 0){
              this.cTotalNum = 0
            }
          } 
        }
      })
    },
    // b2c+b2b购物车数量改变
    changeEditCart(items){
      let params = {
        product_id: items.product_id,
        num: items.num,
        cart_id: items.cart_id
      }
      if(this.tabs == 1){
        b2ceditCart(params).then(res=>{
          if(res.code == 0){
            this.$message({
              message: '数量修改成功',
              type: 'success'
            });
          }
        })
      }else if(this.tabs == 2){
        b2beditCart(params).then(res=>{
          if(res.code == 0){
            this.$message({
              message: '数量修改成功',
              type: 'success'
            });
          }
        })
      }
    },
    // b2c购物车删除
    b2cEdelCart(cartId){
      let params = {
        cart_id: cartId
      }
      if(this.tabs == 1){
        b2cdelCart(params).then(res=>{
          if(res.code == 0){
            // 再次刷新页面
            this.getb2cCart()
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        })
      }else if(this.tabs == 2){
        b2bdelCart(params).then(res=>{
          if(res.code == 0){
            // 再次刷新页面
            this.getb2bCart()
            this.tabs = 2
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        })
      }
    },
    //b2c删除选中的商品
    allDelCheckedGoods(){
      if(this.tabs == 1){
        var cid = [];
        var cart_id = '';
        for( var i = 0, len = this.ProductList.length; i < len; i++ ) {
            var list = this.ProductList[i]['goods'];
            list.forEach(function(item, index, arr) {
                if ( list[index]['checked'] ) {
                    cid.push(item.cart_id)
                    cart_id = cid.join(',')
                }
            });
        }
        let params = { cart_id : cart_id }
        if(cart_id.length == 0){
          this.$message({
            message: '请选择要删除的商品',
            type: 'error'
          });
        }else{
          this.$confirm('确定要删除选中的商品吗？', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(()=>{
            b2cdelCart(params).then(res=>{
              if(res.code == 0){
                // 再次刷新页面
                this.getb2cCart()
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
            })
          }).catch(() => {
          });
        }
      }else if(this.tabs == 2){
        var cid = [];
        var cart_id = '';
        for( var i = 0, len = this.ProductListB.length; i < len; i++ ) {
            var list = this.ProductListB[i]['goods'];
            list.forEach(function(item, index, arr) {
                if ( list[index]['checked'] ) {
                    cid.push(item.cart_id)
                    cart_id = cid.join(',')
                }
            });
        }
        let params = { cart_id : cart_id }
        if(cart_id.length == 0){
          this.$message({
            message: '请选择要删除的商品',
            type: 'error'
          });
        }else{
          this.$confirm('确定要删除选中的商品吗？', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(()=>{
              b2bdelCart(params).then(res=>{
                  if(res.code == 0){
                    // 再次刷新页面
                    this.tabs = 2
                    this.getb2bCart()
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                  }
              })
          }).catch(() => {
          });
        }
      }
    },
    // 商品收藏
    collection(productId,isCollection){
      var collectType = 1 //收藏
      if(isCollection == 1){
        collectType = 2 //未收藏，取消收藏
      }else if(isCollection == 2){
        collectType = 1 //去收藏
      }
      var productType = 1
      if(this.tabs == 1){
        productType = 2 //c端如果是乡村互联的特产就需要再次判断
      }else if(this.tabs == 2){
        productType = 1 //B端
      }
      let params = {
        id: productId,
        type: productType,
        collection_type: 1,
        collect: collectType,
      }
      console.log(params)
      publicCollect(params).then(res=>{
        console.log(res)
        if(res.code == 0){
          if(this.tabs == 1){
            if(collectType == 1){
              // 再次刷新页面
              this.reload()
              this.$message({
                message: '收藏成功',
                type: 'success'
              });
            }else if(collectType == 2){
              // 再次刷新页面
              this.reload()
              this.$message({
                message: '取消收藏',
                type: 'success'
              });
            }
          }else if(this.tabs ==2){
            if(collectType == 1){
              // 再次刷新页面
              this.reload()
              this.changeShopcar(2)
              this.$message({
                message: '收藏成功',
                type: 'success'
              });
            }else if(collectType == 2){
              // 再次刷新页面
              this.reload()
              this.changeShopcar(2)
              this.$message({
                message: '取消收藏',
                type: 'success'
              });
            }
          }
        }
      })

    },
    // 结算
    getSubmit(){
      if(this.tabs == 1){
        var cid = []
        var cart_id = ''
        for( var i = 0, len = this.ProductList.length; i < len; i++ ) {
            var list = this.ProductList[i]['goods']
            list.forEach(function(item, index, arr) {
              if ( list[index]['checked'] ) {
                cid.push(item.cart_id)
                cart_id = cid.join(',')
              }
            })
        }
        if(cart_id.length == 0){
          this.$message({
            message: '请选择商品',
            type: 'error'
          })
        }else{
          var params = { cid : cart_id, from:1 }
          this.$router.push({name:'COrderConfirm', query: params })
        }
      }else if(this.tabs == 2){
        var cid = []
        var cart_id = ''
        for( var i = 0, len = this.ProductListB.length; i < len; i++ ) {
            var list = this.ProductListB[i]['goods']
            list.forEach(function(item, index, arr) {
              if ( list[index]['checked'] ) {
                cid.push(item.cart_id)
                cart_id = cid.join(',')
              }
            })
        }
        if(cart_id.length == 0){
          this.$message({
            message: '请选择商品',
            type: 'error'
          })
        }else{
          var params = { cid : cart_id, from:1 }
          this.$router.push({name:'BOrderConfirm', query: params }) // 去确认订单页面
        }
      }
    },
    // b2b获取购物车
    getb2bCart(){
      b2bgetCart().then(res=>{
         console.log(res)
        if(res.code == 0){
          if(res.data.length == 0){
            this.ProductListB.length = 0
          }else{
            this.bTotalNum = res.data.b_total_num
            this.ProductListB = res.data.b_cart
            this.$store.commit("addB2BCar",res.data.b_cart)
            if(this.ProductListB.length == 0){
              this.bTotalNum = 0
            }
          }
        }
      })
    },
    // 商品详情跳转
    goGoodsInfo(item,goodsType){
      if(goodsType == 1){//B端
        let goodsData = {
          product_id: item.product_id,
          activity_type: item.activity_type,
          activity_id: item.activity_id
        }
        this.$router.push({name: 'BProductDetail', query: goodsData})
      }else if(goodsType == 2){//c端
        this.$router.push({name:'CProductDetail',params: { type: item.activity_type, activityId:item.activity_id, productId: item.product_id } })
      }else if(goodsType == 3){//乡村互联
        let params = {
          product_id: item.product_id,
        }
        this.$router.push({ name: 'RLocalProduct',query: params})
      }
    },
    // 进入店铺详情
    goShopInfo(item,goodsType){
      if(goodsType == 2){
        this.$router.push({ name: 'AShopInfo',params:{ brandId:item.shop_id,type:2 }})
      }else if(goodsType == 3){
        this.$router.push({name:'RDetailsStore',query:{brand_member_id:item.shop_id}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shopcar {
  background-color: #fff;
  .shopcar_box {
    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin-bottom: 16px;
      span {
        color: #e51818;
        margin-left: 10px;
      }
    }
    // tab 栏切换
    .shopcar_nav_tabs {
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #e6e6e6;
      a {
        padding: 8px 20px;

        color: #333;
        font-size: 18px;
        span {
          font-size: 16px;
        }
      }
      .tab_active {
        border-bottom: 2px solid #e51818;
        color: #e51818;
      }
    }
    // 购物车为空
    .shopCar_null{
      text-align: center;
      margin-top: 25px;
      .iconCart{
        height: 80px;
        font-size: 80px;
      }
      p{
        font-size: 18px;
        color: #bbb;
        margin-bottom: 10px;
      }
    }
    // 购物车列表显示区域
    .shopcar_list_box {
      margin-top: 25px;
      // 标题栏
      .list_box_title {
        height: 45px;
        background-color: #eee;
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        .el_checkbox {
          margin-left: 20px;
        }
        .all_goods_title {
          width: 35%;
          margin-left: 100px;
        }
        ul {
          display: flex;
          width: 45%;
          justify-content: space-between;
        }
      }
      // 购物车列表内容
      .list_box_content {
        margin-top: 20px;
        >li {
          margin-bottom: 40px;
          // 店铺名称
          .content_top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            .content_top_img{
              width: 50px;
              height: 25px;
              vertical-align: middle;
            }
            .store_checkbox {
              margin-left: 20px;
            }
            .go_store {
              font-size: 16px;
              color: #666;
              display: flex;
              align-items: center;
              a {
                font-size: 14px;
                color: #329fdb;
                margin-left: 10px;
              }
            }
          }
          // 列表内容
          .content_bottom {
            // padding: 20px 0;
            padding-bottom: 20px;
            box-sizing: border-box;
            border: 1px solid #eee;
            border-top: 2px solid #aaa;
            >ul {
              >li {
                display: flex;
                align-items: flex-start;
                padding: 20px 0 0;
                .goods_checkbox {
                  margin: 0 20px;
                }
                .goods_details {
                  width: 45%;
                  >ul {
                    >li {
                      display: flex;
                      margin-top: 25px;
                      &:first-child {
                        margin-top: 0;
                      }
                      .img_box {
                        width: 81px;
                        height: 81px;
                        border: 1px solid #ddd;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img {
                          max-width: 100%;
                          max-height: 100%;
                        }
                      }
                      .details_txt {
                        width: 204px;
                        margin-left: 20px;
                        p {
                          font-size: 14px;
                          color: #333;
                          line-height: 20px;
                          text-overflow : ellipsis;
                          overflow : hidden;
                          display : -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                        }
                        .details_txt_bottom {
                          display: flex;
                          align-items: center;
                          margin-top: 16px;
                          .sale_flag {
                            width: 57px;
                            height: 23px;
                            border: 1px solid #ee0d0d;
                            border-radius: 12px;
                            color: #e51818;
                            font-size: 16px;
                            text-align: center;
                            line-height: 23px;
                            background-color: #fff;
                          }
                          .goods_model {
                            font-size: 14px;
                            color: #666;
                            border: 1px solid #c5c5c5;
                            background-color: #fff;
                            padding: 0 10px;
                            height: 20px;
                            margin-left: 10px;
                            text-align: center;
                            line-height: 20px;
                          }
                        }
                      }
                    }
                  }
                }
                // li 盒子的右半部分
                .li_box_right {
                  width: 50%;
                  display: flex;
                  justify-content: space-between;
                  margin-left: -10px;
                  .unit_price {
                    font-size: 13px;
                    color: #333;
                  }
                  .num_box {
                    width: 100px;
                    .num_btn {
                      width: 133px;
                      height: 28px;
                    }
                  }
                  .total_price {
                    font-size: 14px;
                    color: #e51818;
                    font-weight: 700;
                  }
                  .btn_box {
                    a {
                      display: block;
                      font-size: 14px;
                      color: #333;
                      margin-bottom: 16px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      //底部结算区域
      .list_box_bottom{
        background-color: #f8f8f8;
        line-height: 58px;
        padding-left: 20px;
        .delAllChecked{
          font-size: 14px;
          color: #333;
        }
        .list_box_bottom_right{
          span{
            font-size: 14px;
            color: #333;
            b{
              font-size: 18px;
              color: #e51818;
              font-weight: bold;
            }
          }
          a{
            margin-left: 40px;
            display: inline-block;
            padding: 0 40px;
            font-size: 18px;
            color: #fff;
            background-color: #e51818;
          }
        }
      }
    }
  }
}
</style>
