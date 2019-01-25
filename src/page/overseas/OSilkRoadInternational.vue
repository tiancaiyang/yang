<template>
  <div class="OSilkRoadInternational">
    <header-top></header-top>
    <!-- 顶部标题 -->
    <div class="national_header">
      <div class="banxin">
        <div class="national_header_left fl">
          <h2 class="national_header_left_title">丝路国际</h2>
        </div>
        <div class="national_header_right fr">
          <el-input class="header_search" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input1"></el-input>
        </div>
      </div>
    </div>
    <!-- 主内容 -->
    <div class="national_div banxin">
      <!-- 第一板块 -->
      <div class="classification">
        <!-- 左侧分类 -->
        <div class="classification_left">
          <div class="classification_left_top">
            <h3 class="el-icon-location">境外游目的地确认</h3>
          </div>
          <div class="classification_left_content">
            <div class="locusClassify">
              <h3>热门推荐</h3>
              <ul>
                <li>曼谷</li>
                <li>塞班岛</li>
                <li>曼谷</li>
                <li>塞班岛</li>
                <li>曼谷</li>
                <li>塞班岛</li>
                <li>塞班岛</li>
                <li>塞班岛</li>
                <li>塞班岛</li>
                <li>塞班岛</li>
                <li>塞班岛</li>
                <li>曼谷</li>
              </ul>
            </div>
            <div class="locusClassify">
              <h3>出境游</h3>
              <div class="twoClassify">
                <span>泰国:</span>
                <ul>
                  <li>曼谷</li>
                  <li>塞班岛</li>
                  <li>曼谷</li>
                  <li>曼谷</li>
                  <li>曼谷</li>
                </ul>
              </div>
              <div class="twoClassify">
                <span>新加坡:</span>
                <ul>
                  <li>曼谷</li>
                  <li>塞班岛</li>
                  <li>曼谷</li>
                  <li>曼谷</li>
                  <li>曼谷</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="classification_right">
          <div class="classification_right_top">
            <a href="javascript:void(0);">自由行</a>
            <a href="javascript:void(0);">跟团游</a>
          </div>
          <!-- 轮播图 -->
          <div class="classification_right_banner">
            <div class="banner_swiper">
              <el-carousel :interval="3000" arrow="hover" height="400px">
                <el-carousel-item v-for="item in imgs" :key="item.index">
                  <img :src="item">
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!-- 底部列表 -->
          <div class="classification_right_bottom">
            <ul>
              <li>
                <div class="right_bottom_img">
                  <img src="../../assets/images/overseas/silkRoad1.png" alt="">
                </div>
                <div class="price poa">￥9876</div>
                <div class="title poa">全国直飞塞班岛5-7天跟团游5-7天跟团游</div>
              </li>
              <li>
                <div class="right_bottom_img">
                  <img src="../../assets/images/overseas/skillroad2.png" alt="">
                </div>
                <div class="price poa">￥9876</div>
                <div class="title poa">日本半岛6-9天自由行</div>
              </li>
              <li>
                <div class="right_bottom_img">
                  <img src="../../assets/images/overseas/skillroad2.png" alt="">
                </div>
                <div class="price poa">￥9876</div>
                <div class="title poa">日本半岛6-9天</div>
              </li>
              <li>
                <div class="right_bottom_img">
                  <img src="../../assets/images/overseas/skillroad2.png" alt="">
                </div>
                <div class="price poa">￥9876</div>
                <div class="title poa">日本半岛6-9天</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 热门推荐 -->
      <div class="homePage_Div hotSale">
        <div class="homePage_Div_img">
          <img src="../../assets/images/overseas/silkroadRecomment.png" alt="">
        </div>
        <div class="hotSale_content">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <li class="swiper-slide">
                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                <div class="hotSale_content_info">
                  <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p>
                  <p class="price">￥7890.00 <span>起</span></p>
                </div>
              </li>
              <li class="swiper-slide">
                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                <div class="hotSale_content_info">
                  <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p>
                  <p class="price">￥7890.00 <span>起</span></p>
                </div>
              </li>
              <li class="swiper-slide">
                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                <div class="hotSale_content_info">
                  <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p>
                  <p class="price">￥7890.00 <span>起</span></p>
                </div>
              </li>
              <li class="swiper-slide">
                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                <div class="hotSale_content_info">
                  <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p>
                  <p class="price">￥7890.00 <span>起</span></p>
                </div>
              </li>
              <li class="swiper-slide">
                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                <div class="hotSale_content_info">
                  <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p>
                  <p class="price">￥7890.00 <span>起</span></p>
                </div>
              </li>
              <li class="swiper-slide">
                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                <div class="hotSale_content_info">
                  <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p>
                  <p class="price">￥7890.00 <span>起</span></p>
                </div>
              </li>
              <li class="swiper-slide">
                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                <div class="hotSale_content_info">
                  <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p>
                  <p class="price">￥7890.00 <span>起</span></p>
                </div>
              </li>
              <li class="swiper-slide">
                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                <div class="hotSale_content_info">
                  <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p>
                  <p class="price">￥7890.00 <span>起</span></p>
                </div>
              </li>
            </div>
          </div>
          <div class="swiper-button-prev swiper-button-white"></div>
          <!--左箭头-->
          <div class="swiper-button-next swiper-button-white"></div>
          <!--右箭头-->
        </div>
      </div>
      <!-- 旅游特价 -->
      <div class="homePage_Div banxin homePage_Div_w">
        <div class="homePage_Div_img">
          <img src="../../assets/images/overseas/trval.png" alt="">
        </div>
        <div class="TravelSpecials_content">
          <ul>
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo2.png" alt=""></div>
            </li>
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo2.png" alt=""></div>
            </li>
          </ul>
          <ul class="TravelSpecials_content_two">
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo.png" alt=""></div>
            </li>
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo.png" alt=""></div>
            </li>
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo.png" alt=""></div>
            </li>
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo.png" alt=""></div>
            </li>
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo.png" alt=""></div>
            </li>
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo.png" alt=""></div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="TravelSpecials_img"><img src="../../assets/images/overseas/trvalInfo3.png" alt=""></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
  import {
    OverseastourismCountry
  } from '../../api/index.js'
  import Swiper from "swiper";
  export default {
    data() {
      return {
        input1: '',
        imgs: [
          require('../../assets/images/login/bg2.png'),
          require('../../assets/images/login/bg_img.png'),
          require('../../assets/images/overseas/national.png')
        ],
        ad_list: [], //广告位
        home_banner: [], //主页面
        rec_list: [],
        tourism_discount: [],
      }
    },
    methods: {
      //获取境外游接口数据
      getOverseastourismCountry() {
        OverseastourismCountry().then(res => {
          console.log(res);
          if (res.code == 0) {
            this.ad_list = res.data.ad_list;
            this.home_banner = res.data.home_banner;
            this.rec_list = res.data.rec_list;
            this.tourism_discount = res.data.tourism_discount;
          }
        })
      }
    },
    created() {
      this.getOverseastourismCountry();
    },
    mounted() {
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }

</script>

<style scoped lang="scss">
  .OSilkRoadInternational {
    background-color: #f5f5f5;
  }

  .national_header {
    height: 100px;
    background-color: #0283de;

    .national_header_left {
      padding-top: 30px;
      width: 50%;

      .national_header_left_title {
        font-size: 36px;
        color: #fff;
      }
    }

    .national_header_right {
      padding-top: 30px;
      height: 46px;
      width: 550px;

      .header_search {
        & /deep/.el-input__inner {
          border-radius: 23px;
        }
      }
    }
  }

  .national_div {
    margin-top: 30px;

    .classification {
      height: 638px;
      display: flex;
      justify-content: space-between;

      .classification_left {
        width: 300px;

        .classification_left_top {
          height: 38px;
          line-height: 38px;
          padding-left: 23px;
          background-color: #181818;

          h3 {
            color: #fff;
            font-size: 16px;
          }

          .el-icon-location:before {
            color: #01baff;
            margin-right: 18px;
          }
        }

        .classification_left_content {
          padding: 0 15px;
          height: 600px;
          border: 1px solid #ccc;
          box-shadow: 0 5px 8px rgba(218, 218, 218, 0.9);
          box-sizing: border-box;
          background-color: #fff;

          .locusClassify {
            padding-top: 30px;

            h3 {
              font-size: 14px;
              color: #333;
              margin-bottom: 13px;

              &::before {
                content: "";
                display: inline-block;
                width: 12px;
                height: 12px;
                vertical-align: middle;
                background-color: #01b8fc;
                margin-right: 10px;
              }
            }

            ul {
              display: flex;
              flex-wrap: wrap;

              li {
                color: #3d3d3d;
                font-size: 16px;
                border-right: 1px solid #ddd;
                padding: 0 10px;
                margin-bottom: 10px;

                &:last-child {
                  border-right: 0;
                }
              }
            }

            .twoClassify {
              display: flex;
              justify-content: space-between;

              span {
                color: #999;
                font-size: 16px;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .classification_right {
        width: 900px;
        height: 638px;
        box-sizing: border-box;

        .classification_right_top {
          padding-left: 70px;

          a {
            height: 38px;
            line-height: 38px;
            color: #333;
            font-size: 18px;
            margin-right: 40px;
          }
        }

        .classification_right_banner {
          height: 400px;

          // 轮播图部分
          .banner_swiper {
            width: 900px;
            height: 400px;
          }
        }

        .classification_right_bottom {
          padding: 10px 0 0 0;

          ul {
            display: flex;
            justify-content: space-between;

            li {
              margin-left: 10px;
              width: 190px;
              height: 190px;
              position: relative;

              .right_bottom_img {
                @include common_center;
              }

              &:first-child {
                width: 290px;
              }

              .price {
                position: absolute;
                top: 0;
                right: 0;
                width: 90px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                font-size: 18px;
                background-color: #01b8fc;
                border-radius: 0 0 0 12px;
              }

              .title {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 44px;
                line-height: 44px;
                color: #fff;
                font-size: 18px;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.59);
                @include p-common;
                -webkit-line-clamp: 1;
              }
            }
          }
        }
      }
    }

    // 板块盒子--热门推荐
    .homePage_Div {
      border-radius: 16px;
      margin-top: 30px;
      padding-bottom: 20px;
      border: 1px solid #e5e5e5;
      background-color: #fff;

      .homePage_Div_img {
        height: 180px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      // 热门推荐
      .hotSale_content {
        height: 470px;
        position: relative;

        .swiper-container {
          margin: 0 30px 17px;
          height: 390px;

          li {
            width: 280px;
            height: 390px;
            display: flex;
            justify-content: space-around;
            flex-direction: column;

            .hotSale_content_img {
              height: 280px;
              @include common_center;

              img {
                max-width: 100%;
                max-height: 100%;
                border-radius: 16px;
              }
            }

            .hotSale_content_info {
              width: 190px;

              .title {
                font-size: 16px;
                color: #151515;
                line-height: 18px;
                @include p-common;
              }

              .price {
                color: #f00;
                font-size: 20px;
                padding-top: 10px;

                span {
                  font-size: 14px;
                  color: #666;
                }
              }
            }
          }
        }

        .swiper-button-prev,
        .swiper-button-next {
          top: auto;
          bottom: 30px;
          width: 38px;
          height: 38px;
          margin-top: 0;
          border-radius: 50%;
          background-color: #18a6ff;
          background-size: 23px 19px;
        }

        .swiper-button-prev {
          left: 47%;
          transform: translateX(-50%);
        }

        .swiper-button-next {
          right: 44%;
          transform: translateX(-50%);
        }
      }

      // 旅行特价
      .TravelSpecials_content {
        padding: 0 15px;
        display: flex;
        justify-content: space-between;

        .TravelSpecials_content_two {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          box-sizing: border-box;
          padding: 0 15px;

          li {
            width: 184px;
            height: 184px;
            border-radius: 12px;
            margin-bottom: 10px;

            .TravelSpecials_img {
              @include common_center;

              img {
                max-width: 100%;
                max-height: 100%;
                border-radius: 16px;
              }
            }
          }
        }

        ul {
          &:first-child {
            li {
              width: 378px;
              margin-bottom: 10px;
            }
          }

          &:last-child {
            li {
              height: 378px;
            }
          }
        }
      }
    }
  }

</style>
