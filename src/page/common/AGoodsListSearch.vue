<template>
  <div class="goodslist_search">
    <header-top></header-top>
    <Header></Header>
    <div class="goodslist_search_box banxin">
      <!-- 面包屑导航 -->
      <!-- <div class="breadcrumb_nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
        </el-breadcrumb>
      </div> -->
      <!-- 筛选栏 -->
      <div class="filter_tabs">
          <ul class="filter_tabs_left">
            <li @click="filterChange(1)" :class="filterFlag==1?'filter_btn active':'filter_btn'">综合</li>
            <li @click="filterChange(2)" :class="filterFlag==2?'filter_btn active':'filter_btn'">销量</li>
            <li @click="filterChange(5)" :class="filterFlag==5?'filter_btn active':'filter_btn'">新品</li>
            <li @click="priceToggle()" class="filter_btn" >价格<span class="el-icon-caret-top priceIcon_top" :class="filterFlag==4?'activePrice':''"></span> <span class="el-icon-caret-bottom priceIcon_down" :class="filterFlag==3?'activePrice':''"></span></li>
          </ul>
           <!-- 价格筛选 -->
          <div class="filter_price">
            <el-input prefix-icon="iconfont icon-renminbi1688" class="price_input" v-model="price1"></el-input>
            <span>-</span>
            <el-input prefix-icon="iconfont icon-renminbi1688" class="price_input" v-model="price2"></el-input>
            <!-- 价格筛选确定按钮 -->
            <el-button class="filter_price_btn" @click="getb2cBrandCatProduct">确定</el-button>
          </div>
          <!-- 分页计数器 -->
          <div class="paging_box">
            <span class="paging_num">{{ page+1 }}</span>/{{ Math.ceil(totalPage/limit) }}
            <!-- <span class="el-icon-arrow-left"></span>
            <span class="el-icon-arrow-right"></span> -->
          </div>
      </div>
      <!-- 列表内容部分 -->
      <div class="goods_list_content">
        <!-- 列表盒子左边的相关搜索 -->
        <div class="abuout_search">
          <h2>相关搜索</h2>
          <ul>
            <li @click="searchInput(item)" v-for="item in relatedSearch" :key="item.indec">{{ item.name }}</li>
          </ul>
        </div>
        <div>
          <!-- 右边列表盒子 -->
          <ul class="goods_list_all">
            <li class="goods_show_box" v-for="item in productList" :key="item.index">
              <div class="img_box">
                <img :src="item.thumb">
              </div>
              <p class="goods_price">
                <span  v-if="item.activity_type == 1" class="goods_flag">特价</span>
                <span  v-else-if="item.activity_type == 2" class="goods_flag">秒杀</span>
                <span  v-if="item.activity_type == 0">¥ {{ item.price }}</span>
                <span  v-else>¥ {{ item.discount_price }}</span>
              </p>
              <p class="goods_details">{{ item.title }}</p>
              <p class="evaluate_num">已有<span>{{ item.assess_num }}</span>人评论</p>
              <a @click="Rushtobuy(item)">
                <el-button  class="goods_buy_btn">立即抢购</el-button>
              </a>
            </li>
          </ul>
          <div v-if="productList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
          <!-- 无相关商品列表 -->
          <div class="orderNull" v-if="productList.length == 0">
            <p class="iconfont icon-wusousuojieguo"></p>
            <p>暂无相关商品，先去逛逛别的商品吧！</p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import { b2cPersonalSearch,b2cbusinessSearch,headerHotWords } from '../../api/index.js'
export default {
  inject :['reload'],
  data () {
    return {
      type: this.$route.query.type,//1商品 2店铺 3批发
      keyWords:this.$route.query.keyWords,
      filterFlag: 1,//1综合 2销量高到低 3价格高到低 4价格低到高 5新品
      productList:[],//商品列表
      price1: '',  // 价格筛选的两个价格
      price2: '',
      flag: false,//价格高低判断
      relatedSearch:[],//相关搜索
      page:0,
      limit: 20,
      totalPage:0,
    }
  },
  created(){
    this.getb2cBrandCatProduct()
    this.getHotWords()
  },
  methods: {
    // 筛选栏的 tab 切换
    filterChange (num) {
      this.filterFlag = num
      this.page = 0
      this.getb2cBrandCatProduct()
    },
    //获取当前页码
    getCurrentPage(pageNum){
      this.page = pageNum-1;
      this.getb2cBrandCatProduct()
    },
    // 价格从高到低 和 从低到高的切换
    priceToggle () {
      this.flag = !this.flag
      if(this.flag == false) {
        this.filterChange(3)
      } else if (this.flag == true) {
        this.filterChange(4)
      }
    },
    //获取商品列表
    getb2cBrandCatProduct(){
      let params = {
        search: this.keyWords,
        sort_type: this.filterFlag,
        begin_price: this.price1,
        end_price: this.price2,
        page: this.page,
        limit: this.limit
      }
      if(this.type == 1){//商品
        b2cPersonalSearch(params).then(res=>{
          if(res.code == 0){
            this.productList = res.data.list
            this.totalPage = parseInt(res.data.total_num)
          }
        })
      }else if(this.type == 3){//批发
        b2cbusinessSearch(params).then(res=>{
          if(res.code == 0){
            this.productList = res.data.list
            this.totalPage = parseInt(res.data.total_num)
          }
        })
      }
    },
    // 获取相关搜索
    getHotWords(){
      headerHotWords().then(res=>{
        if(res.code == 0){
          this.relatedSearch = res.data.related_search
        }
      })
    },
    // 相关搜索点击
    searchInput(item){
      let params = {
        keyWords: item.name,
        type : this.type
      }
      if(this.type == 1){//商品
        // 再次刷新页面
        this.reload()
        this.$router.push({ name:'AGoodsListSearch',query:params})
      }else if(this.type == 3){//批发
        // 再次刷新页面
        this.reload()
        this.$router.push({ name:'AGoodsListSearch',query:params})
      }
    },
    // 获取订单详情
    Rushtobuy(item){
      if(this.type == 1){
        this.$router.push({name:'CProductDetail',params: { type: item.activity_type, activityId:item.activity_id, productId: item.product_id } })
      }else if(this.type == 3){
        let goodsData = {
            product_id: item.product_id,
            activity_type: item.activity_type,
            activity_id: item.activity_id
          }
        this.$router.push({name: 'BProductDetail', query: goodsData})
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.goodslist_search {
  background-color: #f5f5f5;
  .goodslist_search_box {
    // 面包屑导航
    .breadcrumb_nav {
      margin: 25px 0;
    }
    // 筛选栏
    .filter_tabs {
      height: 45px;
      background-color: #fff;
      margin-top: 25px;
      display: flex;
      align-items: center;
      position: relative;
      .filter_tabs_left {
        display: flex;
        .filter_btn {
          width: 90px;
          height: 43px;
          text-align: center;
          line-height: 43px;
          border: 1px solid #fff;
          font-size: 16px;
          color: #333;
        }
        .active {
          border: 1px solid #e51818;
          color: #e51818;
        }
        .activePrice{
          color: #e51818;;
        }
        // 价格图标
        .priceIcon_top{
          position: absolute;
          top: 10px;
        }
        .priceIcon_down{
          position: absolute;
          bottom: 10px;
        }
      }
      // 价格筛选
      .filter_price {
          width: 200px;
          height: 45px;
          margin-left: 15px;
          display: flex;
          align-items: center;
          padding-left: 10px;
          box-sizing: border-box;
          border: 1px solid #fff;
          .price_input {
            width: 55px;
            height: 25px;
            & /deep/ .el-input__inner {
              margin: 0;
              padding: 0;
              height: 25px;
              padding-left: 16px;
              font-size: 12px;
              color: #999;
            }
            & /deep/ .el-input__prefix {
              > .el-input__icon {
                font-size: 12px;
                line-height: 28px;
              }
            }
          }
          span {
            margin: 0 5px;
          }
          // 价格区间筛选框的 hover
          &:hover {
            border: 1px solid #e0e0e0;
            .filter_price_btn {
              display: block;
            }
          }
          // 价格筛选确定按钮
          .filter_price_btn {
            display: none;
            width: 40px;
            height: 25px;
            background-color: #e51818;
            color: #fff;
            font-size: 12px;
            padding: 0;
            margin-left: 10px;
          }
      }
      // 分页计数器
      .paging_box {
        width: 80px;
        position: absolute;
        right: 0;
        .paging_num {
          color: #e51818;
        }
      }
    }
    // 列表显示区域
    .goods_list_content {
      margin-top: 30px;
      display: flex;
      // 列表盒子左边的相关搜索
      .abuout_search {
        width: 183px;
        height: 285px;
        background-color: #fff;
        border: 1px solid #ddd;
        h2 {
          height: 43px;
          background-color: #f1f1f1;
          font-size: 16px;
          color: #333;
          line-height: 43px;
          padding-left: 26px;
          box-sizing: border-box;
        }
        ul {
          padding-bottom: 20px;
          li {
            font-size: 14px;
            color: #005aa0;
            padding-left: 26px;
            box-sizing: border-box;
            margin-top: 30px;
            &:hover {
              color: #e51818;
              cursor: pointer;
            }
          }
        }
      }
      // 右边列表盒子
      .goods_list_all {
        width: 990px;
        margin-left: 25px;
        display: flex;
        flex-wrap: wrap;
        .goods_show_box {
          width: 240px;
          height: 420px;
          background-color: #fff;
          margin-left: 10px;
          margin-bottom: 12px;
          padding: 10px;
          box-sizing: border-box;
          position: relative;
          @include common_li_hover;
          .img_box {
            width: 220px;
            height: 220px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
          .goods_price {
            display: flex;
            margin: 20px 0 10px 0;
            .goods_flag {
              display: block;
              border-radius: 4px;
              width: 48px;
              height: 21px;
              font-size: 14px;
              color: #fff;
              text-align: center;
              line-height: 21px;
              margin-right: 10px;
              background-color: #e51818;
            }
            span {
              font-size: 20px;
              color: #e51818;
            }
          }
          .goods_details {
            font-size: 14px;
            color: #333;
            line-height: 24px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .evaluate_num {
            font-size: 14px;
            color: #999;
            margin-top: 15px;
            span {
              color: #005aa0;
            }
          }
          .goods_buy_btn {
            width: 160px;
            height: 40px;
            padding: 0;
            border-radius: 6px;
            background-color: #e51818;
            color: #fff;
            position: absolute;
            right: 35px;
            bottom: 30px;
          }
          &:nth-child(4n+1) {
            margin-left: 0;
          }
        }
      }
      .orderNull{
        text-align: center;
        margin-top: 50px;
        .icon-wusousuojieguo{
          height: 100px;
          font-size: 80px;
        }
        p{
          font-size: 18px;
          color: #bbb;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
