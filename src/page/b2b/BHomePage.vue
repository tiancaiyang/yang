<template>
  <div class="Bhomepage">
    <header-top />
    <Header />
    <div class="Bhomepage_box banxin">
      <!-- 导航轮播图部分 -->
      <div class="bhome_banner">
        <ul class="banner_top">
          <router-link to="/" tag="li">首页</router-link>
          <router-link to="/one/b2b/BHomePage" tag="li" style="color: #e51818">掌柜之家</router-link>
          <!-- <router-link
            to="/rural"
            tag="li"
          >乡村互联</router-link> -->
          <!-- <router-link to="/OHomePage" tag="li">海外购</router-link> -->
        </ul>
        <!-- 侧边导航栏部分 -->
        <div class="banner_l_nav_box fl">
          <h2>
            <span class="icon_box iconfont icon-weibiaoti303"></span>
            <span>全部分类</span>
          </h2>
          <ul class="banner_l_nav">
            <li class="nav_li" v-for="item in leftNav" :key="item.index">
              <div class="li_name_box">
                <img :src="item.img_path">
                <span>{{ item.cat_name}}</span>
              </div>
              <!-- 侧边分类盒子 -->
              <div class="nav_classify_box">
                <div class="brandClassify">
                  <a v-for="items in item.list.cate_list" :key="items.cid" @click="goGoodsList(items.name, items.type, items.cid)">{{
                    items.name }}</a>
                </div>
                <div class="recomBrand">
                  <h3>推荐品牌</h3>
                  <ul>
                    <li v-for="items in item.list.rec_brand_list" :key="items.index" @click="goGoodsList(items.name, items.type, items.cid)">
                      <img :src="items.logo">
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 轮播图版块 -->
        <div class="banner_swiper fl">
          <el-carousel :interval="3000" arrow="hover" height="450px">
            <el-carousel-item v-for="item in bannerSwiperImg" :key="item.index">
              <img :src="item.media_file_path" @click="masterHref(item)">
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 活动推荐版块 -->
        <div class="banner_right fr">
          <ul>
            <li v-for="item in groupRecommend" :key="item.index" @click="masterHref(item)">
              <img :src="item.media_file_path">
            </li>
          </ul>
        </div>
      </div>
      <!-- 限时优惠 -->
      <div class="limit_time" v-if="this.seckillList.length != 0">
        <h2 class="common_h2">限&nbsp;&nbsp;/&nbsp;&nbsp;时&nbsp;&nbsp;/&nbsp;&nbsp;优&nbsp;&nbsp;/&nbsp;&nbsp;惠</h2>
        <div class="limit_content clearfix">
          <ul class="fl">
            <li v-for="item in seckillList" :key="item.index" @click="goGoodsDetail(item.product_id, item.activity_type, item.activity_id)">
              <div class="img_box">
                <img :src="item.thumb">
              </div>
              <p>{{item.title}}</p>
              <div class="limit_goods_price">
                <span class="new_price">¥ {{item.seckill_price}}&nbsp;/&nbsp;箱</span>
                <span class="old_price">¥ {{item.price}}&nbsp;/&nbsp;箱</span>
              </div>
              <!-- 按钮部分 -->
              <a class="limit_btn">立即秒杀</a>
            </li>
          </ul>
          <div class="content_timer fr">
            <!-- 倒计时 -->
            <p class="content_title">距离<span v-if=" Date.parse(new Date()) < beginTime">开始</span><span v-if=" Date.parse(new Date()) >= beginTime">结束</span>还剩</p>
            <div class="countDown">
              <count-down :o_time="new Date() >= beginTime? OverTime : beginTime"></count-down>
            </div>
            <div class="more_btn">
              <router-link to="/b2b/BLimitTimeSell" tag="a">查看更多&nbsp;></router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- 特价优惠 跟 优惠券 -->
      <div class="special_offer clearfix">
        <!-- 特价优惠版块 -->
        <div class="fl">
          <div class="special_l fl" v-if="flagSale == 2">
            <!-- 特价优惠标题 -->
            <div class="special_l_title clearfix">
              <img src="../../assets/images/b2b/tjyh.png">
              <router-link to="/b2b/BGoodSale" tag="a" class="fr">更多&nbsp;<span class="el-icon-arrow-right"></span></router-link>
            </div>
            <!-- 优惠特价商品列表 -->
            <ul>
              <li class="clearfix" v-for="item in saleProduct.list" :key="item.index" @click="goGoodsDetail(item.product_id, item.activity_type, item.activity_id)">
                <img :src="item.thumb">
                <div class="show_box_r">
                  <p>{{item.title}}</p>
                  <el-progress :text-inside="false" :stroke-width="10" :percentage="parseInt(item.ratio)" color="red"
                    style="height:20px"></el-progress>
                  <div class="special_price">
                    <p class="new_price">¥ {{item.discount_price}}</p>
                    <p class="old_price">¥ {{item.price}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="special_r " v-if="flagSale == 1">
            <img :src="this.saleProduct.list[0].media_file_path" alt="" class="ad">
          </div>
        </div>
        <!-- 优惠券版块 -->
        <div class="fr">
          <div class="special_r fr" v-if="flagCoupon == 2">
            <!-- 优惠券标题 -->
            <div class="special_r_title clearfix">
              <img src="../../assets/images/b2b/yhq.png">
              <a class="fr" @click="goUserCoupon()">更多&nbsp;<span class="el-icon-arrow-right"></span></a>
            </div>
            <!-- 优惠券列表 -->
            <div class="coupon_list">
              <ul>
                <li v-for="item in coupon_list" :key="item.couponId">
                  <div class="coupon_left">
                    <span>¥</span>&nbsp;&nbsp;<span>{{item.sub_price}}</span>
                  </div>
                  <div class="coupon_detail">
                    <h3>{{item.name}}</h3>
                    <p>{{item.base_type_name}}</p>
                  </div>
                  <a @click="goCouponList(item.couponId)"><span>去使用</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="special_r fr" v-if="flagCoupon == 1">
            <img :src="this.coupon_list.list[0].media_file_path" alt="" class="ad">
          </div>
        </div>
        <!-- <span class="iconfont icon-wupingjia icon"></span> -->
      </div>
      <!-- 组合活动 -->
      <div class="set_meal">
        <h2 class="common_h2">组&nbsp;&nbsp;/&nbsp;&nbsp;合&nbsp;&nbsp;/&nbsp;&nbsp;活&nbsp;&nbsp;/&nbsp;&nbsp;动</h2>
        <!-- 分类导航栏 -->
        <ul class="top_nav">
          <li :class="groupFlag == item.cid ? 'nav_active' : ''" v-for="item in groupList" :key="item.index" @click="changeGroupTab(item.cid)">{{item.name}}</li>
        </ul>
        <!-- 商品展示区 -->
        <div class="goods_show">
          <ul class="goods_show_box">
            <li class="every_box" v-for="items in groupGoodsList" :key="items.index" @click="goCombinationDetail(items.group_id, items.group_type)">
              <img :src="items.thumb" class="goods_img">
              <div class="goods_default">
                <p>{{items.group_name}}</p>
              </div>
              <!-- 赠品展示区 -->
              <div class="send_goods">
                <span>赠品:</span>
                <ul>
                  <li v-for="haha in items.gift_thumb" :key="haha.index">
                    <img :src="haha">
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <router-link to="/b2b/BCombination" tag="a" class="more_btn">查看更多</router-link>
        </div>
      </div>
      <!-- 品牌优惠 -->
      <div class="brand_cheap">
        <h2 class="common_h2">品&nbsp;&nbsp;/&nbsp;&nbsp;牌&nbsp;&nbsp;/&nbsp;&nbsp;优&nbsp;&nbsp;/&nbsp;&nbsp;惠</h2>
        <div class="brand_img_box">
          <div class="brand_cheap_l">
            <ul>
              <li v-for="item in brandDiscountLeft" :key="item.index" @click="masterHref(item)">
                <img :src="item.media_file_path">
              </li>
            </ul>
          </div>
          <ul class="clearfix">
            <li v-for="item in brandDiscountRight" :key="item.index" @click="masterHref(item)">
              <img :src="item.media_file_path">
            </li>
          </ul>
        </div>
      </div>
      <!-- 货架精选 -->
      <div class="best_choice">
        <h2 class="common_h2">货&nbsp;&nbsp;/&nbsp;&nbsp;架&nbsp;&nbsp;/&nbsp;&nbsp;精&nbsp;&nbsp;/&nbsp;&nbsp;选</h2>
        <ul>
          <li v-for="item in qualityGoods" :key="item.index" @click="goGoodsDetail(item.product_id, item.activity_type, item.activity_id)">
            <img :src="item.thumb">
            <p>{{item.title}}</p>
            <div class="limit_price">
              <span>¥ {{item.price}} / {{item.unit}}</span>
            </div>
            <a class="go_buycar">去购买</a>
          </li>
        </ul>
      </div>
    </div>
    <quick-bar />
    <Footer />
    <footer-bottom />
  </div>
</template>

<script>
  import QuickBar from '../../components/quickBar'
  import CountDown from "../../components/CountDown.vue";
  import {
    b2bHome,
    b2bGroupBrand,
    b2bGroupGoodsList,
    getCouponList
  } from "../../api/index.js";
  export default {
    data() {
      return {
        leftNav: [], // 左侧边栏
        bannerSwiperImg: [], // 轮播图片
        groupRecommend: [], // 活动推荐
        saleProduct: [], // 特价优惠
        groupList: [], // 组合活动
        brandDiscountLeft: [], // 品牌优惠左
        brandDiscountRight: [], // 品牌优惠右
        groupGoodsList: [], // 组合活动商品列表
        groupGoodsFree: [], // 组合活动商品的赠品
        groupFlag: "", // 组合活动选中标识
        seckillList: [], // 限时优惠
        brandDiscount: [], // 品牌优惠
        qualityGoods: [], // 货架精选
        goGoodsListName: "", // 跳转到商品列表页的name参数
        beginTime: 0, // 秒杀活动开始的时间
        OverTime: 0, // 秒杀活动结束的时间
        listCoupon: [], //优惠券
        coupon_list: [], //优惠券
        flagCoupon: '',
        flagSale: '',
      };
    },
    created() {
      this.getB2bHome();
      this.getB2bGroupBrand();
      this.gogetCouponList();
    },
    methods: {
      // b2b首页 初始展示接口
      getB2bHome() {
        b2bHome().then(res => {
          if (res.code == 0) {
            console.log(res)
            this.bannerSwiperImg = res.data.home_banner;
            this.groupRecommend = res.data.activity_master_img;
            this.brandDiscountLeft = res.data.left_picture;
            this.brandDiscountRight = res.data.right_picture;
            this.leftNav = res.data.menu_list;
            this.saleProduct = res.data.sale_product;
            this.flagSale = this.saleProduct.flag;
            this.coupon_list = res.data.coupon_list;
            this.flagCoupon = this.coupon_list.flag;
            if (this.saleProduct.length == 0) {
              this.alive = false;
            }
            this.seckillList = res.data.seckill_list;
            this.qualityGoods = res.data.quality_goods;
            if (res.data.seckill_list.length != 0) {
              this.beginTime = parseInt(res.data.seckill_list[0].begin_time);
              this.OverTime = parseInt(res.data.seckill_list[0].over_time);
            }

          }
        });
      },
      // 点击分类或者推荐品牌 跳转到相应的页面
      goGoodsList(one, two, san) {
        let params = {
          name: one,
          type: two,
          cid: san
        };
        this.$router.push({
          name: "BGoodsList",
          query: params
        });
      },
      // b2b组合活动分类列表
      getB2bGroupBrand() {
        b2bGroupBrand().then(res => {
          if (res.code == 0) {
            this.groupList = res.data;
            this.groupFlag = res.data[0].cid; // 默认第一个为选中状态
            this.getB2bGroupGoodsList(this.groupFlag);
          }
        });
      },
      // b2b 组合活动商品列表
      getB2bGroupGoodsList(num) {
        let params = {
          cid: num,
          limit: 4
        };
        b2bGroupGoodsList(params).then(res => {
          if (res.code == 0) {
            this.groupGoodsList = res.data.list;
            // console.log(this.groupGoodsList)
          }
        });
      },
      // 点击组合活动tab栏切换
      changeGroupTab(num) {
        this.groupFlag = num;
        this.getB2bGroupGoodsList(num);
      },
      // 去组合活动详情页面
      goCombinationDetail(groupId, type) {
        let params = {
          group_id: groupId
        }
        if (type == 3) {
          this.$router.push({
            name: 'BCombinationInfoSan',
            query: params
          })
        } else {
          this.$router.push({
            name: 'BCombinationInfo',
            query: params
          })
        }
      },
      // 点击商品 跳转到商品详情页
      goGoodsDetail(productId, activityType, activityId) {
        let params = {
          product_id: productId,
          activity_type: activityType,
          activity_id: activityId
        };
        this.$router.push({
          name: "BProductDetail",
          query: params
        });
      },
      // 广告位链接
      masterHref(item) {
        if (item.link_type == 8) {
          //组合活动
          this.$router.push({
            path: "/b2b/BCombination"
          });
        } else if (item.link_type == 7) {
          //特价
          this.$router.push({
            path: "/b2b/BGoodSale"
          });
        } else if (item.link_type == 6) {
          //秒杀
          this.$router.push({
            path: "/b2b/BLimitTimeSell"
          });
        } else if (item.link_type == 5) {
          //品牌商品列表
          this.$router.push({
            name: 'BGoodsList',
            query: {
              cid: item.link,
              name: item.link_name,
              type: 'brand'
            }
          })
        } else if (item.link_type == 4) {
          //分类商品列表
          this.$router.push({
            name: 'BGoodsList',
            query: {
              cid: item.link,
              name: item.link_name,
              type: 'cat'
            }
          })
        } else if (item.link_type == 3) {
          //店铺
          this.$router.push({
            name: 'AShopInfo',
            query: {
              brandId: item.link,
              type: '1'
            }
          })
        } else if (item.link_type == 2) {
          //商品详情
          this.$router.push({
            name: 'BProductDetail',
            query: {
              activity_type: item.activity_type,
              activity_id: item.activity_id,
              product_id: item.link
            }
          })
        } else if (item.link_type == 1) {
          //web页面
          // window.location.href = item.link;
        }
      },
      // 优惠券列表
      gogetCouponList() {
        let user_token = localStorage.getItem('token');
        let params = {
          'user-token': user_token,
          product_id: this.product_id,
          page: 0,
          limit: 3,
        }
        getCouponList(params).then(res => {
          console.log(res)
          if (res.code == 0) {
            this.listCoupon = res.data.list;
            if (this.listCoupon.length == 0) {
              this.aliveCoupon = false;
            }
          }
        })
      },
      // 去优惠券列表商品页
      goCouponList(data) {
        let user_token = localStorage.getItem('token');
        let params = {
          'user-token': user_token,
          couponId: data,
          page: 0,
          limit: 3,
        }
        this.$router.push({
          path: '/common/ACouponList',
          query: params
        })
      },
      // 去个人中心的优惠券
      goUserCoupon() {
        this.$router.push('/one/user/UserCoupon');
      }
    },
    components: {
      CountDown,
      QuickBar
    }
  };

</script>

<style lang="scss" scoped>
  .Bhomepage {
    background-color: #f5f5f5;

    // 公共的 h2 标题的样式
    .common_h2 {
      font-size: 28px;
      color: #333;
      font-weight: 400;
      text-align: center;
      margin-bottom: 30px;
    }

    .Bhomepage_box {

      // banner 部分
      .bhome_banner {
        background-color: #fff;
        height: 450px;
        position: relative;

        // 头部导航
        .banner_top {
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

        // 侧边导航栏部分
        .banner_l_nav_box {
          width: 232px;
          height: 488px;
          color: #fff;
          font-size: 18px;
          background-color: #312b30;
          margin-top: -38px;

          h2 {
            height: 37px;
            letter-spacing: 3px;
            @include common_center;
            border-bottom: 1px dashed rgb(208, 208, 208);

            .icon-weibiaoti303:before {
              padding-right: 10px;
              font-size: 18px;
            }
          }

          // 侧边栏内容
          .banner_l_nav {
            height: 450px;
            box-sizing: border-box;
            background-color: #312b30;
            padding: 10px 0;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .nav_li {
              display: flex;
              align-items: center;
              padding: 9px 0 9px 73px;

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

              .li_name_box {
                font-size: 14px;
                letter-spacing: 3px;
                @include common_center;
                margin-left: -15px;

                img {
                  height: 18px;
                  width: 18px;
                  padding-right: 14px;
                }
              }

              // 侧边栏分类盒子
              .nav_classify_box {
                position: absolute;
                top: 0;
                left: 232px;
                width: 736px;
                height: 450px;
                background-color: #fff;
                box-shadow: 3px 0 10px 0 rgba(122, 122, 122, 0.58);
                padding: 30px;
                box-sizing: border-box;
                display: none;
                z-index: 99;

                .brandClassify {
                  width: 586px;

                  a {
                    display: inline-block;
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

        // 轮播图部分
        .banner_swiper {
          width: 736px;
          height: 450px;
        }

        // 活动推荐
        .banner_right {
          ul {
            height: 450px;
            width: 232px;
            padding: 0 10px;
            box-sizing: border-box;
            background: url("../../assets/images/b2b/hdtj.png") no-repeat;

            li {
              cursor: pointer;

              &:first-child {
                padding: 50px 0 10px 0;
              }
            }
          }
        }
      }

      // 限时优惠
      .limit_time {
        margin-top: 60px;

        // display: none;
        .limit_content {
          background-color: pink;
          height: 358px;
          position: relative;

          ul {
            padding: 10px;
            display: flex;
            width: 962px;
            height: 100%;
            box-sizing: border-box;

            li {
              width: 228px;
              padding: 10px;
              box-sizing: border-box;
              background-color: #fff;
              margin-right: 10px;

              .img_box {
                width: 208px;
                height: 208px;
                @include common_center;
                margin-bottom: 15px;

                img {
                  max-width: 100%;
                  max-height: 100%;
                }
              }

              p {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 16px;
                color: #666;
                margin-bottom: 10px;
              }

              .limit_goods_price {
                margin-bottom: 20px;

                .new_price {
                  font-size: 18px;
                  color: #e62025;
                }

                .old_price {
                  font-size: 16px;
                  margin-left: 15px;
                  text-decoration: line-through;
                  color: #999;
                }
              }
            }

            .limit_btn {
              display: block;
              border-radius: 15px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              background-color: #f21025;
              color: #fff;
            }
          }

          .content_timer {
            width: 238px;
            height: 100%;
            background: url("../../assets/images/b2b/ms.png");
            position: relative;

            .content_title {
              width: 100%;
              color: #fff;
              font-size: 18px;
              // text-align: center;
              padding-left: 26px;
              position: absolute;
              top: 150px;
              letter-spacing: 2px;
            }

            .countDown {
              height: 50px;
              width: 193px;
              position: absolute;
              top: 186px;
              right: 19px;

              & /deep/ .countDivComponents {
                height: 50px;

                span {
                  width: 48px;
                  height: 50px;
                  line-height: 50px;
                  font-size: 25px;
                  color: #fff;
                  margin-right: 35px;
                  padding-left: 9px;
                }

                b {
                  position: absolute;
                  top: -36px;
                  right: 32px;
                  color: #fff;
                  font-size: 18px;
                }
              }
            }

            .more_btn {
              position: absolute;
              bottom: 33px;
              right: 60px;
              background-color: #790901;
              border-radius: 16px;

              a {
                display: block;
                width: 120px;
                height: 32px;
                line-height: 30px;
                text-align: center;
                color: #fff;
                font-size: 16px;
              }
            }
          }
        }
      }

      // 特价优惠 跟 优惠券
      .special_offer {
        margin-top: 60px;
        height: 390px;

        .icon {
          text-align: center;
          margin: auto;
          font-size: 300px;
        }

        // 特价优惠
        .special_l {
          width: 714px;
          height: 100%;

          .special_l_title {
            border-bottom: 2px solid #e66a07;

            img {
              margin-bottom: -2px;
            }

            a {
              line-height: 35px;
              font-size: 14px;
              color: #e66a07;
            }
          }

          // 特价商品列表
          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 176px;
              width: 357px;
              padding: 10px;
              box-sizing: border-box;
              background-color: #fff;

              img {
                width: 156px;
                height: 156px;
                margin-right: 20px;
              }

              .show_box_r {
                display: inline-block;
                width: 152px;

                >p {
                  overflow: hidden;
                  text-emphasis: ellipsis;
                  height: 48px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  margin-top: 10px;
                  margin-bottom: 15px;
                  font-size: 16px;
                  color: #666;
                  line-height: 24px;
                }

                .special_price {
                  margin-top: 20px;

                  .new_price {
                    font-size: 20px;
                    color: #e51818;
                    margin: 0;
                  }

                  .old_price {
                    text-decoration: line-through;
                    margin: 0;
                    font-size: 16px;
                    color: #999;
                  }
                }
              }
            }

            li:nth-child(2n-1) {
              border-right: 2px solid #e0e0e0;
            }

            li:nth-child(n + 3) {
              border-top: 1px solid #e0e0e0;
            }
          }
        }

        // 优惠券
        .special_r {
          width: 476px;
          height: 100%;

          .ad {
            max-width: 100%;
            max-height: 100%;
          }

          // 标题
          .special_r_title {
            border-bottom: 2px solid #c5a25e;

            a {
              line-height: 35px;
              font-size: 14px;
              color: #c5a25e;
            }
          }

          // 优惠券列表
          .coupon_list {
            height: 353px;
            padding: 10px;
            box-sizing: border-box;
            background-color: #ebe4d7;

            ul {
              height: 100%;

              li {
                height: 105px;
                margin-bottom: 9px;
                border-radius: 10px;
                background: url("../../assets/images/b2b/yhq_bg.png");
                display: flex;
                position: relative;

                .coupon_left {
                  width: 35%;
                  height: 100%;
                  text-align: center;

                  span {
                    display: inline-block;
                    color: #45330e;
                    font-weight: 700;
                  }

                  span:first-child {
                    font-size: 32px;
                    margin-top: 43px;
                  }

                  span:last-child {
                    font-size: 30px;
                    margin-top: 20px;
                  }
                }

                .coupon_detail {
                  h3 {
                    margin: 23px 0 20px 0;
                    font-size: 22px;
                    color: #6c4f10;
                    letter-spacing: 1.1px;
                  }

                  p {
                    font-size: 16px;
                    color: #6c4f10;
                    opacity: 0.8;
                    letter-spacing: 0.8px;
                  }
                }

                a {
                  position: absolute;
                  right: 0;
                  display: inline-block;
                  width: 72px;
                  height: 100%;
                  text-align: center;
                  padding-top: 30px;
                  box-sizing: border-box;

                  span {
                    display: inline-block;
                    width: 16px;
                  }
                }
              }

              li:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }

      // 组合活动
      .set_meal {
        margin-top: 60px;

        // 头部导航部分
        .top_nav {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;

          li {
            padding: 10px 15px;
            margin-left: 60px;
            font-size: 18px;
            color: #666;
            box-sizing: border-box;
            cursor: default;
          }

          li:first-child {
            margin-left: 0;
          }

          .nav_active {
            border-bottom: 3px solid #e51818;
            color: #e51818;
          }
        }

        // 商品展示区域
        .goods_show {
          height: 600px;
          background: url("../../assets/images/b2b/zhhd.png");
          padding: 60px 34px 0;
          box-sizing: border-box;
          text-align: center;

          .goods_show_box {
            display: flex;
            margin-bottom: 30px;

            .every_box {
              background-color: #fff;
              padding: 20px;
              width: 268px;
              height: 448px;
              box-sizing: border-box;
              margin-right: 20px;

              .goods_img {
                width: 228px;
                height: 228px;
                margin-bottom: 30px;
              }

              .goods_default {
                text-align: center;

                p {
                  font-size: 16px;
                  color: #666;
                  overflow: hidden;
                  text-emphasis: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  line-height: 24px;
                  margin-bottom: 40px;
                  height: 48px;
                }
              }

              .send_goods {
                height: 44px;
                display: flex;
                align-items: center;
                margin-top: 30px;

                span {
                  font-size: 14px;
                  color: #999;
                }

                ul {
                  display: flex;
                  margin-left: 10px;
                  justify-content: flex-start;

                  li {
                    margin-left: 5px;

                    img {
                      width: 47px;
                      height: 44px;
                      border: 1px solid #cccccc;
                    }
                  }
                }
              }
            }
          }

          // 按钮
          .more_btn {
            width: 240px;
            height: 42px;
            display: inline-block;
            border-radius: 40px;
            text-align: center;
            line-height: 42px;
            background-color: #6a0303;
            color: #fff;
            font-size: 16px;
          }
        }
      }

      // 品牌优惠
      .brand_cheap {
        margin-top: 60px;

        .brand_img_box {
          height: 348px;
          display: flex;

          img {
            @include common_li_hover;
          }

          .brand_cheap_l {
            ul {
              padding: 0;
              width: 386px;
            }
          }

          ul {
            width: 812px;
            height: 348px;
            padding-left: 20px;
            box-sizing: border-box;

            li {
              width: 386px;
              height: 164px;
              float: left;
            }

            li:nth-child(n + 3) {
              margin-top: 20px;
            }

            li:nth-child(2n) {
              margin-left: 20px;
            }
          }
        }
      }

      // 货架精选
      .best_choice {
        margin-top: 60px;
        margin-bottom: 120px;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            // height: 364px;
            width: 232px;
            background-color: #fff;
            box-sizing: border-box;
            padding: 10px;
            margin-right: 10px;
            @include common_li_hover;

            &:nth-child(5n) {
              margin-right: 0;
            }

            img {
              width: 212px;
              height: 212px;
            }

            p {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: center;
              margin-top: 30px;
              font-size: 16px;
              color: #666;
            }

            .limit_price {
              margin-top: 20px;
              @include common_center;
              font-size: 18px;
              color: #e51818;
            }

            .go_buycar {
              margin-top: 20px;
              display: block;
              color: #fff;
              background-color: #e51818;
              text-align: center;
              height: 34px;
              line-height: 34px;
            }
          }

          li:nth-child(n + 6) {
            margin-top: 10px;
          }
        }
      }
    }
  }

</style>
