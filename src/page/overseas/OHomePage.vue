<template>
    <div class="OHomepage">
        <header-top></header-top>
        <Header></Header>
        <!-- banner 部分 -->
        <div class="banner_box">
            <div class="banner banxin clearfix">
                <!-- 头部导航部分 -->
                <ul class="top_bar">
                    <router-link to="/one/b2b/BHomePage" tag="li"><a>首页</a></router-link>
                    <router-link to="/OTourism" tag="li"><a>境外游</a></router-link>
                </ul>
                <!-- 侧边分类导航栏 -->
                <div class="left_nav">
                    <h2><span class="el-icon-picture"></span>全部分类</h2>
                    <ul>
                        <li v-for="item in leftNav" :key="item.index">
                            <img :src="item.img_path" alt="" class="imgBox">
                            <a>{{ item.cat_name }}</a>
                            <div class="nav_classify_box">
                                <div class="brandClassify">
                                    <router-link :to="'/CCatList/'+items.type+'/'+items.cid" tag="a" v-for="items in item.list.cate_list" :key="items.cid">{{ items.name }}</router-link>
                                </div>
                                <div class="recomBrand">
                                    <h3>推荐品牌</h3>
                                    <ul>
                                        <router-link :to="'/CBrandList/'+items.type+'/'+items.cid+'/'+items.name" tag="li" v-for="items in item.list.rec_brand_list" :key="items.index">
                                            <img :src="items.logo">
                                        </router-link>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- banner 轮播图 -->
            <el-carousel :interval="3000" arrow="hover" height="470px" trigger="click">
                <el-carousel-item v-for="item in homeBranner" :key="item.index">
                <img :src="item.media_file_path">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 国家分类 -->
        <div class="country">
            <div class="country_box banxin">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <router-link to="/ONationalPavilion" tag="div" class="swiper-slide" v-for="item in countryList" :key="item.index">
                            <div  class="countryImg"><img  :src='item.national_flag' alt=""></div>
                            <div class="countryName">
                                <p>{{ item.name }}</p>
                                <p>{{ item.english_name }}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-button-prev swiper-button-white"></div><!--左箭头-->
                <div class="swiper-button-next swiper-button-white"></div><!--右箭头-->
            </div>
        </div>
        <!-- 全球热卖 -->
        <div class="homePage_Div hotSale">
            <div class="homePage_Div_img">
                <img src="../../assets/images/overseas/hotSale.png" alt="">
            </div>
            <div class="hotSale_content banxin">
                <ul>
                    <li v-for="item in AdList" :key="item.index"><img :src="item.media_file_path" alt=""></li>
                </ul>
            </div>
        </div>
        <!-- 旅游精选 -->
        <div class="homePage_Div banxin homePage_Div_w">
            <div class="homePage_Div_img">
                <img src="../../assets/images/overseas/tourismTitle.png" alt="">
            </div>
            <div class="tourism_img">
                <img :src="travelSelectionTop.icon_index" alt="">
            </div>
            <div class="tourism_content">
                <ul>
                    <li v-for="item in travelSelection" :key="item.index">
                        <div class="tourism_content_img"><img :src="item.thumb" alt=""></div>
                        <div class="tourism_content_info">
                            <p class="title">{{ item.title }}</p>
                            <p class="price">￥{{ item.price }}<span>起</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 精品推荐 -->
        <div class="homePage_Div banxin homePage_Div_w">
            <div class="homePage_Div_img">
                <img src="../../assets/images/overseas/recommented.png" alt="">
            </div>
            <div class="tourism_content">
                <ul>
                    <li v-for="item in recommendProductList" :key="item.index">
                        <div class="tourism_content_img recomment_img"><img :src="item.thumb" alt=""></div>
                        <div class="tourism_content_info recomment">
                            <p class="title">{{ item.title }}</p>
                            <p class="price">￥{{ item.price }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
        <footer-bottom></footer-bottom>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import { OverseasintlIndex } from '../../api/index.js'
    export default {
        data() {
            return {
                homeBranner:[],//首页轮播
                leftNav:[],//左侧分类
                countryList:[],//国家馆
                AdList:[],//全球热卖下广告位
                travelSelectionTop:'',//旅游精选头部
                travelSelection:[],//旅游精选列表
                recommendProductList:[],//推荐列表
            }
        },
        created(){
            this.getOverseasHome()
        },
        updated(){
            this.swiperList()
        },
        methods:{
            swiperList(){
                var swiper = new Swiper('.swiper-container', {
                    slidesPerView: 4,
                    slidesPerColumn: 2,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            },
            // 获取接口数据`
            getOverseasHome(){
                OverseasintlIndex().then(res=>{
                    console.log(res)
                    if(res.code == 0){
                        this.homeBranner = res.data.home_banner
                        this.leftNav = res.data.menu_list
                        this.countryList = res.data.pavilions_list
                        this.AdList = res.data.ad_list
                        this.travelSelectionTop = res.data.country
                        this.travelSelection = res.data.tour_product_list
                        this.recommendProductList = res.data.product_list
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .OHomepage{
        background-color: #f5f5f5;
    }
    // banner 部分
    .banner_box {
      width: 100%;
      .banner {
        position: relative;
        // 头部导航栏部分
        .top_bar {
          display: flex;
          justify-content: start;
          height: 38px;
          margin-left: 310px;
          margin-top: -38px;
          li {
            margin-right: 80px;
            line-height: 38px;
            font-size: 18px;
            color: #333;
            a {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
        // 侧边分类导航栏
        .left_nav {
          width: 232px;
          color: #fff;
          position: absolute;
          top: 0;
          background-color: #1b1b1a;
          z-index: 9999;
          h2 {
            width: 100%;
            height: 38px;
            line-height: 38px;
            background-color: #f21025;
            text-align: center;
            font-size: 18px;
            span {
              margin-right: 10px;
            }
          }
          >ul {
            width: 100%;
            height: 470px;
            box-sizing: border-box;
            padding-top: 22px;
            position: relative;
            >li {
              padding-left: 20px;
              font-size: 14px;
              padding: 10px 0 10px 30px;
              &:hover{
                background-color: #0f0f0f;
                .nav_classify_box{
                  display: block;
                }
              }
              &:active{
                background-color: #0f0f0f;
              }
              .imgBox{
                width: 15px;
                height: 15px;
                vertical-align: middle;
                margin-right: 10px;
              }
              a{
                display: inline-block;
              }
              .el-icon-picture {
                margin-right: 11px;
                color: red;
                font-size: 14px;
              }
            }
          }
          // 侧边栏分类盒子
          .nav_classify_box{
            position: absolute;
            top: 0;
            left: 232px;
            width: 736px;
            height: 470px;
            background-color: #fff;
            box-shadow: 3px 0 10px 0 rgba(122,122,122,0.58);
            padding: 30px;
            box-sizing: border-box;
            display: none;
            .brandClassify{
              width: 586px;
              a{
                font-size: 14px;
                color: #999;
                padding: 0 10px;
                margin-bottom: 10px;
                border-right: 1px solid #999;
                &:last-child{
                  border-right: 0;
                }
              }
            }
            // 底部品牌推荐
            .recomBrand{
              height: 230px;
              position: absolute;
              bottom: 0;
              left: 30px;
              right: 0;
              h3{
                font-size: 16px;
                color: #333;
                padding-top: 30px;
              }
              ul{
                margin-top: 20px;
                display: flex;
                flex-wrap: wrap;
                li{
                  width: 158px;
                  height: 58px;
                  border: 1px solid #efefef;
                  margin: 0 10px 10px 0;
                  @include common_center;
                  img{
                    max-width: 100%;
                    max-height: 100%;
                  }
                }
              }
            }
          }
        }
      }
    }
    // 国家
    .country{
        height: 416px;
        background: url(../../assets/images/overseas/blueBG2.png) no-repeat top center;
        .country_box{
            height: 100%;
            background: url(../../assets/images/overseas/blueBG.png) no-repeat top center;
            position: relative;
            padding-top: 20px;
            .swiper-container{
                margin: 0 30px 17px;
                height: 330px;
            }
            .swiper-slide{
                width: 278px;
                height: 160px;
                margin-bottom: 5px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                .countryImg{
                    width: 112px;
                    height: 112px;
                    padding: 15px;
                    box-sizing: border-box;
                    @include common_center;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                        box-shadow: 5px 5px 10px rgba(122,122,122,0.58);
                    }
                }
                .countryName{
                    p{
                        font-size: 18px;
                        color: #333;
                        margin-bottom: 2px;
                    }
                }
            }
            .swiper-button-prev,.swiper-button-next{
                top:auto;
                bottom: 30px;
                width: 38px;
                height: 38px;
                margin-top: 0;
                border-radius: 50%;
                background-color: #18a6ff;
                background-size: 23px 19px;
            }
            .swiper-button-prev{
                left: 47%;
                transform: translateX(-50%);
            }
            .swiper-button-next{
                right: 44%;
                transform: translateX(-50%);
            }

        }
    }
    // 全球热卖
    .homePage_Div{
        .homePage_Div_img{
            height: 180px;
            background-color: #13182c;
            @include common_center;
        }
        .hotSale_content{
            background-color: #fff;
            border-radius: 0 0 16px 16px;
            border: 1px solid #e5e5e5;
            ul{
                padding: 30px 0;
                display: flex;
                justify-content: space-between;
                li{
                    height: 393px;
                    width: 393px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        max-width: 393px
                    }
                }
            }
        }
    }
    .homePage_Div_w{
        margin-top: 30px;
        border: 1px solid #e5e5e5;
        border-radius: 16px;
        padding-bottom: 50px;
        .homePage_Div_img{
            height: 150px;
            background-color: #fff;
        }
        .tourism_img{
            width: 100%;
            height: 400px;
            @include common_center;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .tourism_content{
            ul{
                padding: 0;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li{
                    width: 230px;
                    height: 315px;
                    padding-top: 10px;
                    display: flex;
                    justify-content: space-around;
                    flex-direction: column;
                    @include common_li_hover;
                    .tourism_content_img{
                        height: 230px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            max-width: 100%;
                            max-height: 100%;
                            border-radius: 16px;
                        }
                    }
                    .tourism_content_info{
                        padding: 0 15px;
                        .title{
                            font-size: 16px;
                            color:#151515;
                            line-height: 18px;
                            @include p-common;
                        }
                        .price{
                            color: #f00;
                            font-size: 20px;
                            padding-top: 10px;
                            span{
                                font-size: 14px;
                                color: #666;
                            }
                        }
                    }
                    // 推荐板块
                    .recomment_img{
                        padding: 0 10px;
                        img{
                            border-radius: 0;
                        }
                    }
                    .recomment{
                        .title{
                            text-align: center;
                        }
                        .price{
                            text-align: center;
                            color: #e51818;
                        }
                    }
                }
            }
        }

    }
</style>