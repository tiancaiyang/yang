<template>
  <div class="C_homepage">
    <header-top />
    <Header></Header>
    <!-- banner 部分 -->
    <div class="banner_box clearfix">
      <div class="banner banxin clearfix">
        <!-- 头部导航部分 -->
        <ul class="top_bar">
          <router-link to="/" tag="li" style="color: #e51818">首页</router-link>
          <li @click="goB2B">掌柜之家</li>
          <!-- <router-link
            to="/rural"
            tag="li"
          >乡村互联</router-link> -->
          <!-- <router-link to="/OHomePage" tag="li">海外购</router-link> -->
        </ul>
        <!-- 侧边分类导航栏 -->
        <div class="left_nav clearfix">
          <h2>
            <span class="icon_box iconfont icon-weibiaoti303"></span>
            <span>全部分类</span>
          </h2>
          <ul>
            <li v-for="item in leftNav" :key="item.index">
              <img :src="item.img_path" alt="" class="imgBox">
              <a>{{ item.cat_name }}</a>
              <div class="nav_classify_box">
                <div class="brandClassify">
                  <router-link :to="'/CCatList/'+items.type+'/'+items.cid" tag="a" v-for="items in item.list.cate_list"
                    :key="items.cid">{{ items.name }}</router-link>
                </div>
                <div class="recomBrand">
                  <h3>推荐品牌</h3>
                  <ul>
                    <router-link :to="'/CBrandList/'+items.type+'/'+items.cid+'/'+items.name" tag="li" v-for="items in item.list.rec_brand_list"
                      :key="items.index">
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
        <el-carousel-item v-for="item in imgs" :key="item.index">
          <img @click="masterHref(item)" :src="item.media_file_path">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 内容部分 -->
    <div class="C_hp_content banxin clearfix">
      <!-- 丝语快讯 -->
      <div class="fast_news">
        <span class="fast_title"><img src="../../assets/images/b2c/fast_news1.png"></span>
        <div class="news_words">
          <span v-for="item in message" :key="item.index">
            {{ item.title }}
          </span>
        </div>
        <router-link to="/one/user/NewsNotification" tag="a">查看更多<span class="el-icon-arrow-right"></span></router-link>
      </div>
      <!-- 限时秒杀 -->
      <div class="limit_time" v-if="seckillList.length !== 0">
        <img src="../../assets/images/b2c/timer.png" class="timer_img">
        <p class="content_title">距离<span v-if=" Date.parse(new Date()) < beginTime">开始</span><span v-if=" Date.parse(new Date()) >= beginTime">结束</span>还剩</p>
        <div class="countdown">
          <count-down :o_time=" Date.parse(new Date()) >= beginTime? OverTime : beginTime"></count-down>
        </div>
        <router-link tag="a" to="/CSeckillTime" class="go_more">更多<span class="el-icon-arrow-right"></span></router-link>
        <!-- banner 轮播图 -->
        <div class="limit_time_swiper">
          <!-- banner 轮播图 -->
          <el-carousel :interval="3000" arrow="hover" height="400px" trigger="click">
            <el-carousel-item v-for="item in seckillList" :key="item.index">
              <ul>
                <router-link :to="'/one/b2c/CBodyCommon/CProductDetail/'+list.activity_type+'/'+list.product_id+'/'+list.activity_id"
                  tag="li" v-for="list in item.data" :key="list.index">
                  <div class="limit_goods_img"><img :src="list.thumb"></div>
                  <p class="goods_describe">{{list.title}}</p>
                  <p class="goods_price">¥ {{list.seckill_price}}</p>
                </router-link>
              </ul>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 商品分类 -->
      <div class="menu_nav clearfix">
        <!-- 商品分类版块左边 -->
        <div class="menu_nav_l fl">
          <!-- 左上 -->
          <div class="nav_left_t clearfix">
            <a v-for="item in smallPicture" :key="item.index" @click="masterHref(item)">
              <img :src="item.media_file_path">
            </a>
          </div>
          <!-- 左下 -->
          <div class="nav_left_b">
            <a v-for="item in hPicture" :key="item.index" @click="masterHref(item)"><img :src="item.media_file_path"></a>
          </div>
        </div>
        <!-- 商品分类版块左边 -->
        <div class="menu_nav_r fr">
          <a v-for="item in sPicture" :key="item.index" @click="masterHref(item)"><img :src="item.media_file_path"></a>
        </div>
      </div>
      <!-- 每周精选 -->
      <div class="weekly_star">
        <!-- 头部标题部分 -->
        <div class="weekly_title">
          <span class="title_l"></span>
          <h2>每周精选</h2>
          <span class="title_r"></span>
        </div>
        <!-- 精选商品 -->
        <div class="weekly_goods">
          <ul>
            <router-link :to="'/one/b2c/CBodyCommon/CProductDetail/'+item.activity_type+'/'+item.product_id+'/'+item.activity_id"
              tag="li" v-for="item in qualityGoods" :key="item.product_id">
              <div><img :src="item.thumb"></div>
              <p class="weekly_goods_detail">{{ item.title }}</p>
              <p class="weekly_goods_price">¥{{ item.price }}</p>
            </router-link>
          </ul>
        </div>
      </div>
      <!-- 第一类商品 -->
      <div class="each_class" v-for="item in catList" :key="item.index">
        <!-- 商品类别的名字跟导航 -->
        <div class="each_class_top">
          <span class="class_name">{{ item.name }}</span>
          <ul>
            <li><router-link :to="'/CCatList/'+'cat'+'/'+item.cid" tag="a">更多<span class="el-icon-arrow-right"></span></router-link></li>
          </ul>
        </div>
        <!-- 分类商品的内容 -->
        <div class="class_content clearfix">
          <div class="content_l fl">
            <el-carousel :interval="3000" arrow="hover" height="626px" trigger="click">
              <el-carousel-item v-for="item2 in item.img_path" :key="item2.index">
                <img :src="item2.media_file_path" @click="masterHref(item2)">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="content_r fr">
            <ul>
              <router-link :to="'/one/b2c/CBodyCommon/CProductDetail/'+items.activity_type+'/'+items.product_id+'/'+items.activity_id"
                tag="li" v-for="items in item.product_list" :key="items.index">
                <div><img :src="items.thumb"></div>
                <p class="goods_detail">{{ items.title }}</p>
                <p class="goods_price">¥{{ items.price }}</p>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="you_like">
        <div class="you_like_t">
          <span class="title_l"></span>
          <h2>猜你喜欢</h2>
          <span class="title_r"></span>
        </div>
        <div class="goods_show">
          <ul>
            <router-link :to="'/one/b2c/CBodyCommon/CProductDetail/'+item.activity_type+'/'+item.product_id+'/'+item.activity_id"
              tag="li" v-for="item in guessLove" :key="item.product_id">
              <div><img :src="item.thumb"></div>
              <p class="goods_detail">{{ item.title }}</p>
              <p class="goods_price">¥ {{ item.price }}</p>
            </router-link>
          </ul>
        </div>
      </div>
      <quick-bar />
    </div>
    <Footer></Footer>
    <footer-bottom />
  </div>
</template>

<script>
import QuickBar from '../../components/quickBar'
  import CountDown from "../../components/CountDown.vue";
  import {
    b2cHome
  } from "../../api/index.js";
  export default {
    data() {
      return {
        hotWords: [], //搜索栏下方热词
        imgs: [], //轮播图片
        leftNav: [], //左侧边栏
        message: [], //丝语快讯
        seckillList: [], //限时秒杀
        beginTime: 0, //倒计时--开始时间
        OverTime: 0, //倒计时--结束时间
        smallPicture: [], //广告位两个小图
        hPicture: [], //广告位横图
        sPicture: [], //广告位竖图
        qualityGoods: [], //每周精选
        catList: [], //大分类
        guessLove: [], //猜你喜欢
        identity: ""
      }
    },
    created() {
      this.getHome();
      this.identity = localStorage.getItem("identity");
    },
    mounted(){

    },
    methods: {
      // 首页接口
      getHome() {
        b2cHome().then(res => {
          if (res.code == 0) {
            console.log(res);
            this.hotWords = res.data.hot_words;
            this.imgs = res.data.home_banner;
            this.leftNav = res.data.menu_list;
            this.message = res.data.message;
            this.seckillList = res.data.seckill_list;
            this.smallPicture = res.data.small_picture;
            this.hPicture = res.data.h_picture;
            this.sPicture = res.data.s_picture;
            this.qualityGoods = res.data.quality_goods;
            this.catList = res.data.cat_list;
            this.guessLove = res.data.guess_love;
            if (res.data.seckill_list.length != 0) {
              this.beginTime = parseInt(res.data.seckill_list[0].data[0].begin_time);
              this.OverTime = parseInt(res.data.seckill_list[0].data[0].over_time);
            }

          }
        });
      },
      // 是否进入b2b
      goB2B() {
        if (this.identity == 1) {
          this.$message({
            message: "您还不是商户，可以去个人中心申请成为商家哦！",
            type: "warning"
          });
        } else if (this.identity == 2) {
          this.$router.push({
            path: "/one/b2b/BHomePage"
          });
        } else {
          this.$message({
            message: "您还未登录",
            type: "warning"
          });
        }
      },
      // 特价和组合活动链接跳转
      masterHref(item) {
        if (item.link_type == 7) {
          //特价
          this.$router.push({
            path: "/CGoodSale"
          });
        } else if (item.link_type == 6) {
          //秒杀
          this.$router.push({
            path: "/CSeckillTime"
          });
        } else if (item.link_type == 5) {
          //品牌商品列表
          this.$router.push({
            name: 'CBrandList',
            params: {
              cid: item.link,
              name: item.link_name,
              type: 'brand'
            }
          })
        } else if (item.link_type == 4) {
          //分类商品列表
          this.$router.push({
            name: 'CCatList',
            params: {
              cid: item.link,
              type: 'cat'
            }
          })
        } else if (item.link_type == 3) {
          //店铺
          this.$router.push({
            name: 'AShopInfo',
            params: {
              brandId: item.link,
              type: '2'
            }
          })
        } else if (item.link_type == 2) {
          //商品详情
          this.$router.push({
            name: 'CProductDetail',
            params: {
              type: item.activity_type,
              activityId: item.activity_id,
              productId: item.link
            }
          })
        } else if (item.link_type == 1) {
          //web页面
          // window.location.href = item.link;
        }
      }
    },
    components: {
      QuickBar,
      CountDown
    }
  };

</script>

<style lang="scss" scoped>
  .C_homepage {
    width: 100%;
    background-color: #f5f5f5;

    // banner 部分
    .banner_box {
      width: 100%;

      .banner {
        position: relative;

        // 头部导航栏部分
        .top_bar {
          position: absolute;
          top: -38px;
          left: 280px;
          display: flex;

          li {
            height: 38px;
            @include common_center;
            // background-color: red;
            padding: 0 40px;
            font-size: 18px;
            color: #333;
            cursor: pointer;
          }
        }

        // 侧边分类导航栏
        .left_nav {
          width: 232px;
          color: #fff;
          position: absolute;
          top: -38px;
          // background-color: #1b1b1a;
          background-color: rgba(0,0,0,.9);
          z-index: 9999;

          h2 {
            width: 100%;
            height: 38px;
            letter-spacing: 3px;
            background-color: #f21025;
            @include common_center;
            font-size: 18px;

            .icon-weibiaoti303:before {
              padding-right: 10px;
              font-size: 18px;
            }
          }

          >ul {
            width: 100%;
            height: 470px;
            box-sizing: border-box;
            position: relative;
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            >li {
              padding: 10px 0;
              display: flex;
              align-items: center;
              padding-left: 58px;

              &:hover {
                background-color: #0f0f0f;
                cursor: pointer;

                .nav_classify_box {
                  display: block;
                }
              }

              &:active {
                background-color: #0f0f0f;
              }

              .imgBox {
                width: 18px;
                height: 18px;
                vertical-align: middle;
                margin-right: 15px;
              }

              a {
                display: inline-block;
                font-size: 14px;
                letter-spacing: 3px;
              }

              .el-icon-picture {
                margin-right: 11px;
                color: red;
                font-size: 14px;
              }
            }
          }

          // 侧边栏分类盒子
          .nav_classify_box {
            position: absolute;
            top: 0;
            left: 232px;
            width: 736px;
            height: 470px;
            background-color: #fff;
            box-shadow: 3px 0 10px 0 rgba(122, 122, 122, 0.58);
            padding: 30px;
            box-sizing: border-box;
            display: none;

            .brandClassify {
              width: 586px;

              a {
                font-size: 14px;
                color: #999;
                padding: 0 10px;
                margin-bottom: 10px;
                border-right: 1px solid #999;

                &:last-child {
                  border-right: 0;
                }
              }
            }

            // 底部品牌推荐
            .recomBrand {
              height: 230px;
              position: absolute;
              bottom: 0;
              left: 30px;
              right: 0;

              h3 {
                font-size: 16px;
                color: #333;
                padding-top: 30px;
              }

              ul {
                margin-top: 20px;
                display: flex;
                flex-wrap: wrap;

                li {
                  width: 158px;
                  height: 58px;
                  border: 1px solid #efefef;
                  margin: 0 10px 10px 0;
                  @include common_center;

                  img {
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

    // banner 下面的内容版块
    .C_hp_content {

      // 丝语快讯
      .fast_news {
        width: 100%;
        height: 46px;
        line-height: 46px;
        border-radius: 23px;
        margin-top: 30px;
        background-color: #ffeee6;
        border: 1px solid #ffd0a6;
        display: flex;
        justify-content: space-between;

        .fast_title {
          width: 231px;
          height: 46px;
          border-top-left-radius: 23px;
          border-bottom-left-radius: 23px;
          text-align: center;
          line-height: 42px;
          background: url("../../assets/images/b2c/fast_news2.png");

          img {
            vertical-align: middle;
          }
        }

        .news_words {
          width: 760px;
          margin-left: -40px;

          span {
            display: inline-block;
            width: 100%;
            height: 46px;
            color: #b05d24;
            @include p-common;
            -webkit-line-clamp: 1;
          }
        }

        a {
          margin-right: 40px;
          font-size: 14px;
          line-height: 49px;
          color:#dc8080
        }
      }

      // 限时秒杀
      .limit_time {
        height: 493px;
        margin-top: 96px;
        position: relative;
        background: url("../../assets/images/b2c/time_kill.png");

        // 计时器
        .timer_img {
          position: absolute;
          top: -22px;
        }

        .content_title {
          position: absolute;
          color: #fff;
          font-size: 20px;
          top: -10px;
          left: 60px;
        }

        // 倒计时展示
        .countdown {
          width: 242px;
          height: 48px;
          position: absolute;
          left: 60px;
          top: 20px;

          & /deep/ .countDivComponents {
            height: 48px;

            span {
              width: 48px;
              height: 48px;
              line-height: 48px;
              font-size: 32px;
              color: #fff;
              margin-right: 42px;
              padding-left: 12px;
            }

            b {
              color: #fff;
              position: absolute;
              font-size: 20px;
              right: 66px;
              top: -30px;
            }
          }
        }

        // 更多
        .go_more {
          position: absolute;
          top: 45px;
          right: 25px;
          font-size: 14px;
          color: #fff;
        }

        // 商品展示区域
        .limit_time_swiper {
          width: 1160px;
          height: 360px;
          position: absolute;
          top: 92px;
          left: 20px;
          background-color: #fff;

          ul {
            width: 1140px;
            height: 312px;
            margin-top: 20px;
            margin-left: 10px;
            padding-left: 6px;
            box-sizing: border-box;
            display: flex;

            // justify-content: space-around;
            li {
              width: 220px;
              height: 100%;
              padding: 10px;
              box-sizing: border-box;

              .limit_goods_img {
                width: 200px;
                height: 200px;
                cursor: pointer;
                @include common_center;

                img {
                  max-width: 100%;
                  max-height: 100%;
                }
              }

              p {
                text-align: center;
              }

              .goods_describe {
                overflow: hidden;
                text-emphasis: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                margin-top: 30px;
                font-size: 16px;
                line-height: 20px;
                color: #666;
              }

              .goods_price {
                margin-top: 20px;
                font-size: 20px;
                color: #e51818;
              }
            }
          }
        }
      }

      // 商品分类
      .menu_nav {
        margin-top: 60px;

        a {
          display: inline-block;
          @include common_center;

          img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 0 50px 0 0;
          }
        }

        .nav_left_t {
          position: relative;
          margin-bottom: 20px;

          a {
            width: 386px;
            height: 216px;
          }

          a:last-child {
            position: absolute;
            right: 0;
            top: 0;
          }
        }

        .nav_left_b {
          width: 793px;
          height: 272px;
        }

        .menu_nav_r {
          width: 386px;
          height: 506px;
        }
      }

      // 每周精选
      .weekly_star {
        margin-top: 80px;

        // 头部标题部分
        .weekly_title {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: flex-end;

          span {
            width: 32px;
            height: 26px;
          }

          .title_l {
            background: url("../../assets/images/b2c/title_l.png") no-repeat;
          }

          h2 {
            font-size: 32px;
            color: #333;
            margin: 0 30px;
          }

          .title_r {
            background: url("../../assets/images/b2c/title_r.png") no-repeat;
          }
        }

        // 精选商品
        .weekly_goods {
          margin-top: 35px;
          ul {
            display: flex;
            // justify-content: space-between;
            li {
              width: 232px;
              height: 346px;
              padding: 10px;
              margin-right: 10px;
              box-sizing: border-box;
              text-align: center;
              background-color: #fff;
              @include common_li_hover;
              &:nth-last-child(){
                margin-right: 0;
              }
              div {
                width: 212px;
                height: 212px;
                @include common_center;
                img {
                  max-width: 100%;
                  max-height: 100%;
                }
              }

              .weekly_goods_detail {
                overflow: hidden;
                text-emphasis: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                margin-top: 30px;
                font-size: 16px;
                line-height: 20px;
                color: #666;
              }

              .weekly_goods_price {
                margin-top: 20px;
                font-size: 20px;
                color: #e51818;
              }
            }
          }
        }
      }

      // 每一类商品
      .each_class {
        margin-top: 70px;

        .each_class_top {
          display: flex;
          margin-bottom: 20px;
          justify-content: space-between;

          .class_name {
            font-size: 20px;
            color: #333;
            position: relative;
            padding-left: 15px;
          }

          .class_name:before {
            content: "";
            width: 5px;
            height: 18px;
            background-color: #f21025;
            position: absolute;
            top: 2px;
            left: 0;
            border-radius: 2.5px;
          }

          ul {
            display: flex;
            justify-content: center;

            li {
              padding: 0 20px;
              font-size: 16px;
              color: #666;
              position: relative;
            }

            li:after {
              content: "";
              width: 1px;
              height: 14px;
              background-color: #b0b0b0;
              position: absolute;
              top: 4px;
              right: 0;
              padding-right: 0;
            }

            li:last-child:after {
              display: none;
            }
          }
        }

        // 分类商品的内容
        .class_content {
          .content_l {
            width: 232px;
          }

          .content_r {
            width: 958px;
            height: 626px;
            ul {
              display: flex;
              flex-wrap: wrap;
              // justify-content: space-between;
              li {
                width: 232px;
                height: 308px;
                padding: 20px;
                margin-right: 10px;
                box-sizing: border-box;
                text-align: center;
                background-color: #fff;
                @include common_li_hover;
                &:nth-child(4n){
                  margin-right: 0;
                }
                div {
                  width: 192px;
                  height: 192px;
                  margin-bottom: 10px;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }

                .goods_detail {
                  overflow: hidden;
                  text-emphasis: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                  font-size: 14px;
                  line-height: 20px;
                  color: #666;
                }

                .goods_price {
                  margin-top: 10px;
                  font-size: 18px;
                  color: #e51818;
                }
              }

              li:nth-child(n + 4) {
                margin-bottom: 10px;
              }
            }
          }
        }
      }

      // 猜你喜欢
      .you_like {
        margin-top: 70px;
        margin-bottom: 80px;

        .you_like_t {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: flex-end;

          span {
            width: 32px;
            height: 26px;
          }

          .title_l {
            background: url("../../assets/images/b2c/title_l.png") no-repeat;
          }

          .title_r {
            background: url("../../assets/images/b2c/title_r.png") no-repeat;
          }

          h2 {
            font-size: 32px;
            color: #333;
            margin: 0 30px;
          }
        }

        .goods_show {
          margin-top: 35px;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              margin-right: 9px;
              margin-bottom: 10px;
              width: 232px;
              height: 346px;
              padding: 10px;
              box-sizing: border-box;
              text-align: center;
              background-color: #fff;
              @include common_li_hover;

              div {
                width: 212px;
                height: 212px;
                @include common_center;

                img {
                  max-width: 100%;
                  max-height: 100%;
                }
              }

              .goods_detail {
                height: 40px;
                overflow: hidden;
                text-emphasis: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                margin-top: 30px;
                font-size: 16px;
                line-height: 20px;
                color: #666;
              }

              .goods_price {
                margin-top: 20px;
                font-size: 20px;
                color: #e51818;
              }
            }

            li:nth-child(5n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }

</style>
