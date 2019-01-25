<template>
  <div class="my_collection">
    <h2>我的收藏</h2>
    <div class="my_collection_content">
      <!-- 我的收藏头部导航 -->
      <p class="content_nav">
        <a @click="tab(1)" :class="type== 1?'active':''">商品收藏</a>
        <a @click="tab(2)" :class="type== 2?'active':''">店铺收藏</a>
      </p>
      <!-- 收藏商品的展示区域 -->
      <div class="content_show_box">
        <!-- 商品收藏 -->
        <div v-show="type == 1" >
          <ul class="goods_collection_list">
            <li v-for="item in goodsList" :key="item.index" @click="goProductInfo(item)">
              <img :src="item.thumb">
              <p class="goods_detail">{{ item.title }}</p>
              <p class="goods_price">￥{{ item.price }}</p>
            </li>
          </ul>
          <div class="orderNull" v-if="goodsList.length == 0">
            <p class="iconfont icon-wushoucang"></p>
            <p>收藏夹还是空的呢！快去逛逛吧！</p>
          </div>
          <div v-if="goodsList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
        </div>
        <!-- 店铺收藏 -->
        <div v-show="type == 2">
          <ul  class="content_collection_list">
            <router-link :to="'/common/AShopList/AShopInfo/'+item.brand_member_id+'/'+item.type" tag="li" class="clearfix" v-for="item in shopList" :key="item.index">
              <div class="imgDiv fl">
                <img :src="item.head_img">
              </div>
              <div class="box_center fl">
                <p class="collection_title">{{ item.brand_store_name }}</p>
                <div class="scros">
                  <el-rate
                  v-model="item.score"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}分">
                </el-rate>
                </div>
                <p class="collection_date">已有{{ item.num }}人收藏</p>
              </div>
            </router-link>
          </ul>
          <div class="orderNull" v-if="shopList.length == 0">
            <p class="iconfont icon-wushoucang"></p>
            <p>收藏夹还是空的呢！快去逛逛吧！</p>
          </div>
          <div v-if="shopList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCollectionList } from '../../api/index.js'
export default {
  data () {
    return {
      num: 1,
      value5: '4',
      type:1,//1商品2文章3店铺
      goodsList:[],//商品列表
      shopList:[],//店铺列表
      page:0,
      limit:9,
      totalPage:0,
    }
  },
  created(){
    this.getCollection()
  },
  methods: {
    // tab 导航栏切换
    tab (index) {
      this.type = index
      this.page = 0
      this.getCollection()
    },
    //获取当前页码
    getCurrentPage(pageNum){
      this.page = pageNum-1;
      this.getCollection()
    },
    //获取收藏列表
    getCollection(){

      let params ={
        collection_type : this.type,//商品
        page: this.page,
        limit: this.limit,
      }
      console.log(params)
      GetCollectionList(params).then(res=>{
        console.log(res)
        if(res.code == 0){
          if(this.type == 1){
            this.goodsList = res.data.list
            this.totalPage = parseInt(res.data.total_num)
          }else if(this.type == 2){
            this.shopList = res.data.list
            this.totalPage = parseInt(res.data.total_num)
          }
        }
      })
    },
    // 跳转到商品详情
    goProductInfo(item){
      if(item.type == 1){// 去b端商品详情页面
        let params = {
          product_id: item.product_id,
          activity_type: item.activity_type,
          activity_id: item.product_id,
        }
        this.$router.push({name: 'BProductDetail', query: params})
      }else if(item.type == 2){//去c端页面
        this.$router.push({name:'CProductDetail',params: { type: item.activity_type, activityId:item.activity_id, productId: item.product_id } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my_collection {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 1052px;
  h2 {
    font-size: 24px;
    color: #666;
    line-height: 36px;
    margin-bottom: 30px;
  }
  .my_collection_content {
    // 我的收藏头部导航
    .content_nav {
      padding-bottom: 30px;
      border-bottom: 1px solid #e0e0e0;
      a {
        font-size: 16px;
        color: #666;
        padding: 0 20px;
        position: relative;
      }
      a:after {
        content: "";
        width: 1px;
        height: 16px;
        background-color: #b0b0b0;
        position: absolute;
        top: 3px;
        right: 0;
      }
      a:first-child {
        padding-left: 0;
      }
      a:last-child {
        padding-right: 0;
      }
      a:last-child:after {
        display: none;
      }
      .active {
        color: #e51818;
      }
    }
    // 收藏商品的展示区域
    .content_show_box {
      // 商品收藏部分
      .goods_collection_list {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 18px;
          margin-bottom: 40px;
          width: 290px;
          height: 394px;
          padding: 20px;
          box-sizing: border-box;
          @include common_li_hover;
          img {
            width: 250px;
            height: 250px;
          }
          .goods_detail {
            margin: 20px 0;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
            line-height: 26px;
            font-size: 16px;
            color: #666;
          }
          .goods_price {
            text-align: center;
            color:#e51818;
          }
        }
        li:nth-child(3n) {
          margin-right: 0;
        }
        li:hover {
          box-shadow: 0 0 10px 0 rgba(213, 213, 213, .57);
        }
      }
      // 内容收藏
      .content_collection_list {
        margin-top: 20px;
        li {
          width: 100%;
          height: 136px;
          border-bottom: 1px dashed #e0e0e0;
          margin-bottom: 20px;
          .imgDiv{
            width: 110px;
            height: 110px;
            margin-right: 20px;
            @include common_center;
            img {
              max-width: 100%;
              max-height: 100%;
              border-radius: 4px;
            }
          }

          .box_center {
            .collection_title {
              font-size: 20px;
              color: #333;
              margin-bottom: 28px;
            }
            .scros {
              display: block;
              font-size: 14px;
              color: #666;
              margin-bottom: 36px;
            }
            a:hover {
              color: #4e94f4;
            }
            .collection_date {
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
      //空内容
      .orderNull{
        text-align: center;
        margin-top: 50px;
        .icon-wushoucang{
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
