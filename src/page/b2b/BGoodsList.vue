<template>
  <div class="goods_list">
    <header-top></header-top>
    <Header></Header>
    <div class="goods_list_box banxin">
      <!-- 列表内容部分 -->
      <div class="goods_list_content">
        <!-- 品牌导航部分 -->
        <div class="brand_nav">
          <p class="brand_title">{{this.name}}</p>
          <ul class="brand_all">
            <li :class="brandFlag == item.check_id ? 'brand_box active' : 'brand_box'" v-for="item in brandName" :key="item.index" @click="changeBrandTab(item.check_id)">{{item.name}}</li>
          </ul>
          <!-- <a class="toggle_btn"><span>收起</span> <span class="el-icon-arrow-down"></span></a> -->
        </div>
        <!-- 筛选栏 -->
        <div class="filter_tabs">
          <ul class="filter_tabs_left">
            <li @click="filterChange(1)" :class="filterFlag==1?'filter_btn active':'filter_btn'">综合</li>
            <li @click="filterChange(2)" :class="filterFlag==2?'filter_btn active':'filter_btn'">销量</li>
            <li @click="filterChange(5)" :class="filterFlag==5?'filter_btn active':'filter_btn'">新品</li>
            <li @click="priceToggle()" class="filter_btn" >价格
              <span class="el-icon-caret-top priceIcon_top" :class="filterFlag==4?'activePrice':''"></span>
              <span class="el-icon-caret-bottom priceIcon_down" :class="filterFlag==3?'activePrice':''"></span>
            </li>
          </ul>
          <!-- 价格筛选 -->
          <div class="filter_price">
            <el-input prefix-icon="iconfont icon-renminbi1688" v-model="price1" class="price_input"></el-input>
            <span>-</span>
            <el-input prefix-icon="iconfont icon-renminbi1688" v-model="price2" class="price_input"></el-input>
            <!-- 价格筛选确定按钮 -->
            <el-button class="filter_price_btn" @click="getDefaultGoodsList(brandFlag)">确定</el-button>
          </div>
          <!-- 分页计数器 -->
          <div class="paging_box">
            <span class="paging_num">{{ page+1 }}</span>/{{ Math.ceil(totalPage/limit) }}
            <span class="el-icon-arrow-left"></span>
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
        <!-- 商品列表显示区 -->
        <ul class="goods_list_show">
          <li class="show_box" v-for="item in goodsList" :key="item.index" @click="goGoodsDetail(item.product_id, item.activity_type, item.activity_id)">
            <div class="img_box">
              <img :src="item.thumb">
            </div>
            <p class="goods_details"> <img src="">{{ item.title }}</p>
            <p class="goods_price">
              <span class="goods_flag" v-if="item.activity_type == 2">秒杀</span>
              <span class="goods_flag" v-if="item.activity_type == 1">特价</span>
              <span>¥{{ item.price }}</span>
            </p>
            <p class="evaluate_num">已有<span>{{ item.assess_num }}</span>人评论</p>
            <el-button class="detail_btn">立即购买</el-button>
          </li>
        </ul>
        <div><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import {b2bpersonalBrandCat,b2bBrandCatProduct} from '../../api/index.js'
export default {
  data () {
    return {
      type: this.$route.query.type,
      cid: this.$route.query.cid,
      name: this.$route.query.name,
      brandFlag: '',   // 选择品牌的 id
      brandName: [],  // 品牌名字
      goodsList: [],  // 商品列表8
      filterFlag: 1,  // 1综合 2销量高到低 3价格高到低 4价格低到高 5新品
      price1: '',     // 价格筛选的两个价格
      price2: '',
      flag: false,    //价格高低判断
      page:0,
      limit:10,
      totalPage:0,//总条数
    }
  },
  created() {
    this.getDefaultBrandData()
  },
  methods: {
    //获取当前页码
    getCurrentPage(pageNum){
      this.page = pageNum-1;
      this.getDefaultGoodsList()
    },
    // 条件筛选的切换
    filterChange(num) {
      this.filterFlag = num
      this.page = 0
      this.getDefaultGoodsList(this.brandFlag)
    },
    // 品牌的选择
    changeBrandTab(num) {
      this.brandFlag = num
      this.page = 0
      this.getDefaultGoodsList(this.brandFlag)
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
    // 获得品牌列表的数据
    getDefaultBrandData() {
      let params = {
        type: this.type,
        cid: this.cid
      }
      b2bpersonalBrandCat(params).then(res=>{
        if(res.code == 0) {
          this.brandName = res.data.list
          this.brandFlag = res.data.list[0].check_id  // 默认第一个为选中状态
          this.getDefaultGoodsList(this.brandFlag)
        }
      })
    },
    // 获得品牌相对应的商品列表的数据
    getDefaultGoodsList(num) {
      let params = {
        type: this.type,
        cid: this.cid,
        check_id: num,
        sort_type : this.filterFlag,
        begin_price: this.price1,
        end_price: this.price2,
        page : this.page,
        limit: this.limit
      }
      console.log(params)
      b2bBrandCatProduct(params).then(res => {
        console.log(res)
        if(res.code == 0) {
          this.goodsList = res.data.goods_list
          this.totalPage = parseInt(res.data.total_num)
        }
      })
    },
    // 点击商品 跳转到商品详情页
    goGoodsDetail(productId, activityType, activityId) {
      let params = {
        product_id: productId,
        activity_type: activityType,
        activity_id: activityId
      }
      this.$router.push({name: 'BProductDetail', query: params})
    }
  }
}
</script>

<style lang="scss" scoped>
.goods_list {
  background-color: #f5f5f5;
  .goods_list_box {
    // 列表内容部分
    .goods_list_content {
      padding-top: 25px;
      // 品牌导航部分
      .brand_nav {
        display: flex;
        background-color: #fff;
        .brand_title {
          width: 116px;
          background-color: #fbfbfb;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .brand_all {
          display: flex;
          flex-wrap: wrap;
          padding: 20px 30px;
          width: 900px;
          .brand_box {
            padding: 10px 20px;
            margin-right: 30px;
            margin-bottom: 10px;
            color: #333;
            font-size: 16px;
            cursor: pointer;
          }
          .active {
            background-color: #e51818;
            color: #fff;
          }
        }
        .toggle_btn {
          margin-top: 20px;
          margin-left: 15px;
          font-size: 16px;
          color: #333;
          width: 85px;
          height: 35px;
          border: 1px solid #dbdbdb;
          text-align: center;
          line-height: 35px;
        }
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
      // 商品列表显示区
      .goods_list_show {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 60px;
        .show_box {
          width: 230px;
          height: 420px;
          padding: 10px;
          box-sizing: border-box;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          margin: 0 12.5px 12px 0;
          position: relative;
          .img_box {
            width: 210px;
            height: 210px;
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

            .goods_flag {
              display: block;
              border-radius: 4px;
              width: 48px;
              height: 21px;
              font-size: 14px;
              color: #fff;
              text-align: center;
              line-height: 21px;
              background-color: #e51818;
            }
            span{
              font-size: 20px;
              color: #e51818;
              // margin-left: 10px;
            }
          }
          .goods_details {
            margin: 20px 0 10px 0;
            font-size: 14px;
            color: #333;
            line-height: 24px;
            @include p-common;
          }
          .evaluate_num {
            font-size: 14px;
            color: #999;
            margin-top: 15px;
            span {
              color: #005aa0;
            }
          }
          .detail_btn {
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
          &:nth-child(5n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
