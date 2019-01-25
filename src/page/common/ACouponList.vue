<template>
  <div class="goodslist_search">
    <header-top></header-top>
    <Header></Header>
    <div class="goodslist_search_box banxin">
      <!-- 列表内容部分 -->
      <div class="goods_list_content">
        <!-- 商品列表显示区 -->
        <ul class="goods_list_show">
          <li class="show_box" v-for="item in productList" :key="item.index">
            <div class="img_box">
              <img :src="item.thumb">
            </div>
            <p class="goods_price">
              <span class="goods_flag" v-if="item.activity_type == 2">秒杀</span>
              <span class="goods_flag" v-if="item.activity_type == 1">特价</span>
              <span>¥{{ item.price }}</span>
            </p>
            <p class="goods_details">{{ item.title }}</p>
            <p class="evaluate_num">已有<span>{{ item.sale }}</span>人评论</p>
            <a @click="goGoodsInfo(item)">
              <el-button class="goods_buy_btn">立即抢购</el-button>
            </a>
          </li>
        </ul>
        <div v-if="productList.length != 0">
          <page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen="getCurrentPage"></page-base>
        </div>
        <!-- 无相关商品列表 -->
        <div class="orderNull" v-if="productList.length == 0">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wusousuojieguo"></use>
          </svg>
          <!-- <p class="iconfont icon-wusousuojieguo"></p> -->
          <p>暂无相关商品，先去逛逛别的商品吧！</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
  import QuickBar from '../../components/quickBar'
  import {
    getProductListByCouponId
  } from '../../api/index.js'
  export default {
    data() {
      return {
        couponId: this.$route.query.couponId,
        productList: [], //商品列表
        page: 0,
        limit: 20,
        totalPage: 0,
      }
    },
    created() {
      this.getb2cBrandCatProduct()
    },
    methods: {
      //获取当前页码
      getCurrentPage(pageNum) {
        this.page = pageNum - 1;
        this.getb2cBrandCatProduct()
      },
      //获取商品列表
      getb2cBrandCatProduct() {
        let params = {
          couponId: this.couponId,
          page: this.page,
          limit: this.limit
        }
        getProductListByCouponId(params).then(res => {
          console.log(res)
          if (res.code == 0) {
            this.productList = res.data.list
            this.totalPage = parseInt(res.data.total_num)
          }
        })
      },
      // 去到商品详情
      goGoodsInfo(item) {
        if (item.type == 1) {
          let goodsData = {
            product_id: item.product_id,
            activity_type: item.activity_type,
            activity_id: item.activity_id
          }
          this.$router.push({
            name: 'BProductDetail',
            query: goodsData
          })
        } else if (item.type == 2) {
          this.$router.push({
            name: 'CProductDetail',
            params: {
              type: item.activity_type,
              activityId: item.activity_id,
              productId: item.product_id
            }
          })
        } else if (item.class_id == 1) {
          let params = {
            product_id: item.product_id,
            class_id: item.class_id,
          }
          this.$router.push({
            path: '/rural/RLocalProduct',
            query: params
          })
        }
      }
    },

  }

</script>

<style lang="scss" scoped>
  .goodslist_search {
    background-color: #f5f5f5;

    .goodslist_search_box {

      // 列表显示区域
      .goods_list_content {
        margin-top: 30px;

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
            @include common_li_hover;

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
              margin: 15px 0 10px 0;

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

              span {
                font-size: 20px;
                color: #e51818;
                margin-left: 10px;
              }
            }

            .goods_details {
              height: 48px;
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

              // margin-top: 5px;
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

            &:nth-child(5n) {
              margin-right: 0;
            }
          }
        }

        .orderNull {
          text-align: center;
          margin-top: 50px;

          .icon {
            height: 100px;
            font-size: 80px;
          }

          p {
            font-size: 18px;
            color: #bbb;
            margin-bottom: 10px;
          }
        }
      }
    }
  }

</style>
