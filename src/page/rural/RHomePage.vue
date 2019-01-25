<template>
  <div class="rural_homepage">
    <!-- 图片导航 -->
    <div class="banner_img_nav">
      <div class="img_left">
        <a href="javascript:;" v-for="item in ad_list.left_picture" :key="item.ad_id">
          <img :src=item.media_file_path class="img_left" @click="goDetails(item.link)">
        </a>
      </div>

      <div class="img_right">
        <a href="javascript:;" v-for="item in ad_list.right_picture" :key="item.ad_id">
          <img :src=item.media_file_path @click="goDetails(item.link)">
        </a>


      </div>
    </div>
    <!-- 当地特产 加一个轮播 -->
    <!-- 还没解决 -->
    <div class="local_goods">

      <el-carousel :interval="3000" arrow="hover" height="400px" trigger="click">
        <el-carousel-item v-for="item in native_product_list" :key="item.index">
          <ul>
            <router-link :to="{path:'./RLocalProduct',query:{product_id:item.product_id}}" tag="li" v-for="list in native_product_list"
              :key="list.index">
              <div class="img_box" @click="getSend(1)">
                <img :src=list.thumb>
              </div>
              <p class="goods_detail">{{list.title}}</p>
              <p class="goods_price">¥ {{list.price}}</p>
            </router-link>
          </ul>
        </el-carousel-item>
      </el-carousel>

    </div>
    <!-- 农家菜 -->
    <div class="farm_all">
      <div class="farm_food_top">
        <span>农家菜</span>
        <router-link :to="{path:'./RDetailsList',query:{address_id:address_id,class_id:2,sort_type:1}}">
          <span @click="getSend(2)">更多</span><span class="el-icon-arrow-right"></span>
        </router-link>
      </div>
      <!-- 农家菜内容部分 -->
      <div class="farm_all_content">
        <ul>
          <li v-for="item in food_store_list" :key="item.index">
            <router-link :to="{path:'./RDetailsStore',query:{brand_member_id:item.brand_member_id}}">
              <div class="img_box" @click="getSend(2)">

                <img :src=item.thumb>

              </div>
              <div class="farm_title">
                <h2>{{item.brand_store_name}}</h2>
                <div class="foods_rate">
                  <el-rate v-model="value1" disabled text-color="#ff9900"></el-rate>
                  <span>{{value1}} 分</span>
                </div>
              </div>
              <div class="food_details">
                <span>[ {{item.street}} ]</span>
                <ul>
                  <li>{{item.title}}</li>

                </ul>
              </div>
              <div class="food_price">
                <span class="new_price">¥ {{item.price}}</span>
                <span class="start_flag">起</span>
                <span class="old_price">¥ {{item.price}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 民宿屋 -->
    <div class="farm_all">
      <div class="farm_hotel_top">
        <span>民宿屋</span>
        <router-link :to="{path:'./RDetailsList',query:{address_id:address_id,class_id:3,sort_type:1}}">
          <span @click="getSend(3)">更多</span> <span class="el-icon-arrow-right"></span>
        </router-link>
      </div>
      <!-- 农家菜内容部分 -->
      <div class="farm_all_content">
        <ul>
          <li v-for="item in room_store_list" :key="item.brand_member_id">
            <router-link :to="{path:'./RDetailsStore',query:{brand_member_id:item.brand_member_id}}">
              <div class="img_box" @click="getSend(3)">
                <img :src=item.thumb>
              </div>
              <div class="farm_title">
                <h2>{{item.brand_store_name}}</h2>
                <div class="foods_rate">
                  <el-rate v-model="value1" disabled text-color="#ff9900"></el-rate>
                  <span>{{value1}} 分</span>
                </div>
              </div>
              <div class="food_details">
                <span>[ {{item.street}} ]</span>
                <ul>
                  <li>{{item.title}}</li>

                </ul>
              </div>
              <div class="food_price">
                <span class="new_price">¥ {{item.price}}</span>
                <span class="start_flag">起</span>
                <span class="old_price">¥ {{item.price}}</span>
              </div>
            </router-link>
          </li>

        </ul>
      </div>
    </div>
    <!-- 当地游 -->
    <div class="farm_all">
      <div class="local_tour_top">
        <span>当地游</span>
        <router-link :to="{path:'./RDetailsList',query:{address_id:address_id,class_id:4,sort_type:0}}">
          <span @click="getSend(4)">更多</span><span class="el-icon-arrow-right"></span>
        </router-link>
      </div>
      <!-- 农家菜内容部分 -->
      <div class="farm_all_content">
        <ul>
          <li v-for="item in tourism_store_list" :key="item.brand_member_id">
            <router-link :to="{path:'./RDetailsStore',query:{brand_member_id:item.brand_member_id}}">
              <div class="img_box" @click="getSend(4)">
                <img :src=item.thumb>
              </div>
              <div class="farm_title">
                <h2>{{item.brand_store_name}}</h2>
                <div class="foods_rate">
                  <el-rate v-model="value1" disabled text-color="#ff9900"></el-rate>
                  <span>{{value1}} 分</span>
                </div>
              </div>
              <div class="food_details">
                <span>[ {{item.street}} ]</span>
                <ul>
                  <li>{{item.title}}</li>

                </ul>
              </div>
              <div class="food_price">
                <span class="new_price">¥ {{item.price}}</span>
                <span class="start_flag">起</span>
                <span class="old_price">¥ {{item.price}}</span>
              </div>
            </router-link>
          </li>

        </ul>
      </div>
    </div>
    <quick-bar />
  </div>
</template>

<script>
  import QuickBar from '../../components/quickBar'
  import Swiper from "swiper"
  import {
    ruralXcIndex,
    ruralsearchStoreProductList
  } from "../../api/index.js"
  export default {
    props: ["address", 'Lonlat1', 'searchData'],
    data() {
      return {
        value1: 4,
        // switch_lonlat:'',
        Lonlat: '',
        address_id: '', //地址id
        class_id: '', //分类id
        adcode: '', //广告代码
        province: '', //省份
        city: '', //城市
        district: '', //所在区
        township: '', //镇
        introduce: '', //介绍
        image: '', //照片
        towncode: '', //城市代码
        ad_list: [], //广告位照片
        product_id: '',
        native_product_list: [], //本地特产
        food_store_list: [], //农家菜
        room_store_list: [], //民宿屋
        tourism_store_list: [], //当地游
        // search:'123',//搜索内容

      }
    },
    created() {
      this.getruralXcIndex(this.Lonlat1);
      this.getruralsearchStoreProductList();
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      // 广告位的去向
      goDetails(data) {
        console.log(data)
        let params = {
          product_id: data || 1
        }
        this.$router.push({
          path: './RDetailsStorePage',
          query: params
        })
      },
      // 向父组件传class_id值
      getSend(data) {
        this.$emit("listenParent", data);
      },
      // 接收接口数据
      getruralXcIndex(data) {
        let params = {
          lonlat: data,
        }
        ruralXcIndex(params).then(res => {
          if (res.code === 0) {
            console.log(res.data)
            this.address_id = this.address;
            this.ad_list = res.data.ad_list;
            this.native_product_list = res.data.native_product_list;
            this.adcode = res.data.adcode;
            this.province = res.data.province;
            this.city = res.data.city;
            this.district = res.data.district;
            this.township = res.data.township;
            this.introduce = res.data.introduce;
            this.image = res.data.image;
            this.towncode = res.data.towncode;
            this.food_store_list = res.data.food_store_list;
            this.room_store_list = res.data.room_store_list;
            this.tourism_store_list = res.data.tourism_store_list;
          }
        })

      },
      getruralsearchStoreProductList() {
        let params = {
          address_id: 21,
          search: '',
        }
        ruralsearchStoreProductList(params).then(res => {
          // console.log(res);
        })
      },

    },
    components: {
      QuickBar
    }

  }

</script>

<style lang="scss" scoped>
  .rural_homepage {

    // banner图片导航区域
    .banner_img_nav {
      height: 404px;
      display: flex;
      margin-top: 60px;

      .img_left {
        width: 600px;
        height: 404px;
        margin-right: 20px;
        border-radius: 10px;

        a {
          display: inline-block;
          height: 404px;
        }
      }

      .img_right {
        width: 600px;
        height: 404px;

        a {
          display: inline-block;
          width: 580px;
          height: 192px;
          // margin-bottom: 20px;

          img {
            vertical-align: middle;
            width: 100%;
            height: 100%;
            // max-width: 100%;
            // max-height: 100%;
            border-radius: 10px;


          }

          &:last-child {
            margin-top: 20px;
          }
        }

      }
    }

    .local_goods {
      width: 1236px;
      height: 565px;
      background: url("../../assets/rural/local.png") no-repeat;
      margin-top: 50px;
      overflow: hidden;

      .el-carousel {
        width: 1200px;
        margin-top: 200px;

        .el-carousel__item {

          // color: #475669;
          font-size: 18px;
          opacity: 0.75;
          line-height: 300px;
          margin: 0;

          ul {
            li {
              margin: 0 auto;
              width: 216px;
              height: 328px;
              background-color: #ffffff;
              float: left;
              margin-right: 20px;

              &:hover {
                cursor: pointer;
              }

              &:first-child {
                margin-left: 20px;

              }

              .img_box {
                margin: 0 10px;
                width: 200px;
                height: 200px;

                img {
                  max-width: 100%;
                  max-height: 100%;
                }
              }

              .goods_detail {
                margin: 30px 0 20px 0;
                width: 204px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                color: #666666;

              }

              .goods_price {
                text-align: center;
                height: 15px;
                font-family: Arial-BoldMT;
                font-size: 20px;
                line-height: 20px;
                color: #e51818;
              }
            }

            & /deep/ .el-carousel__indicators {
              bottom: 20px;
            }
          }
        }

      }

    }

    // 农家菜 和 民宿屋 还有 当地游  用的是一套css样式 的规则块
    .farm_all {
      margin-top: 60px;
      margin-bottom: 60px;

      .farm_food_top,
      .farm_hotel_top,
      .local_tour_top {
        height: 69px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        >span {
          font-size: 34px;
          color: #fff;
          font-weight: 700;
          margin-left: 35px;
        }

        a {
          font-size: 16px;
          color: #fff;
          margin-top: 20px;
          margin-right: 40px;

          span {
            margin-left: 5px;
          }
        }
      }

      .farm_food_top {
        background: url("../../assets/rural/farm_food.png");
      }

      .farm_hotel_top {
        background: url("../../assets/rural/farm_hotel.png");
      }

      .local_tour_top {
        background: url("../../assets/rural/local_tour.png");
      }

      // 农家菜内容部分
      .farm_all_content {
        padding-bottom: 10px;
        border: 1px solid #ddd;
        border-top: none;
        background-color: #fff;

        >ul {
          display: flex;
          flex-wrap: wrap;

          >li {
            width: 374px;
            background-color: transparent;
            // opacity: 0;
            margin-left: 20px;
            margin-top: 20px;

            .img_box {
              width: 374px;
              height: 239px;
              border-radius: 10px;
              display: flex;
              // opacity: 0;
              justify-content: center;
              align-items: center;

              img {
                max-width: 100%;
                max-height: 100%;
              }
            }

            .farm_title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 18px 0 14px 0;

              h2 {
                font-size: 23px;
                color: #333;
              }

              .foods_rate {
                display: flex;
                align-items: center;

                span {
                  font-size: 16px;
                  color: #f88f14;
                  margin-left: 5px;
                }
              }
            }

            .food_details {
              display: flex;
              align-items: center;
              font-size: 16px;
              color: #999;

              span {
                margin-right: 5px;
              }

              ul {
                display: flex;

                li {
                  position: relative;
                  padding: 0 6px;

                  &::after {
                    content: "";
                    width: 2px;
                    height: 15px;
                    background-color: #999;
                    position: absolute;
                    top: 2px;
                    right: 0;
                  }

                  &:last-child:after {
                    display: none;
                  }
                }
              }
            }

            .food_price {
              margin: 18px 0 10px 0;

              .new_price {
                font-size: 20px;
                color: #e51818;
              }

              .start_flag {
                font-size: 16px;
                color: #e51818;
              }

              .old_price {
                font-size: 20px;
                color: #b3b3b3;
                margin-left: 25px;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }

    & /deep/ .quick_bar {
      .quick_Ul {
        li {
          &:nth-child(-n + 3) {
            display: none;
          }

          &:hover {
            background-color: #0e7d4a;
          }

        }

      }
    }
  }

</style>
