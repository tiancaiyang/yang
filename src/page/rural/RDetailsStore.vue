<template>

  <div class="details_store">
    <!-- 面包屑导航 -->
    <!-- <div class="brand_nav">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="brand_nav_box banxin">
        <el-breadcrumb-item>乡村互联-乌镇</el-breadcrumb-item>
        <el-breadcrumb-item>民宿屋</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <!-- 详情显示区域 -->
    <div class="details_show_box">
      <!-- 图片显示区域 -->
      <div class="details_img_box">
        <a href="javascript:;"> <img :src=this.img[0] alt="" @click="getPhoto()"></a>

        <div class="photo_box">
          <img src="../../assets/rural/照相机.png">
          <span>共{{this.img.length}}张</span>

        </div>

        <div class="fullscreen">
          <span class=" el-icon el-icon-error" @click="cancle()"></span>
          <div class="swiper-container">

            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in img" :key="item">
                <img :src="item" alt="">
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <!-- Add Arrows -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>

        </div>

        <!-- 全地图 -->
        <div class="fullMap">
          <span class=" el-icon el-icon-error" @click="cancleMap()"></span>
          <div id="box1" class="fullmap_box">

          </div>

        </div>
      </div>
      <!-- 右边详情部分 -->
      <div class="details_box_right">
        <h2>{{brand_store_name}}</h2>
        <div class="foods_rate">
          <el-rate v-model="value1" disabled text-color="#ff9900" class="rate_star"></el-rate>
          <span>{{value1}} 分</span>
        </div>
        <p class="details_txt">{{ introduction }}</p>
        <div class="personal_details">
          <div class="address_box">
            <p><span class="el-icon-location"></span>{{address}}</p>
            <a @click=" getblockMap()">查看地图<span class="el-icon-arrow-right"></span></a>

          </div>
          <p class="personal_tel"><span class="el-icon-phone"></span>{{name}} {{mobile}}</p>
        </div>
        <div class="btn_box">
          <a @click="collectionGoods"><span :class='collect == 2?"el-icon-star-off":"el-icon-star-on"'></span>收藏商品</a>
          <a @mouseenter="shareFlag=true" @mouseleave="shareFlag=false"><span class="el-icon-share"></span>分享</a>
          <div class="share" v-if="shareFlag" @mouseleave="shareFlag=false" @mouseenter="shareFlag=true">
            <ul>
              <li @click="getshare(1)">
                <img src="../../assets/images/b2c/shareQQ.png" alt="">
                <p>QQ好友</p>
              </li>
              <li @click="getshare(2)">
                <img src="../../assets/images/b2c/shareWei.png" alt="">
                <p>新浪微博</p>
              </li>
              <li @click="getshare(3)">
                <img src="../../assets/images/b2c/shareCopy.png" alt="">
                <p>复制链接</p>
              </li>
            </ul>
            <input type="text" v-model="share" id="inShare">
          </div>
        </div>

      </div>

    </div>

    <!-- tabs标签页 -->
    <div class="store_box">
      <div class="box_l">
        <div class="box-l_header">
          <ul>

            <li @click="returnTop('#shop')">店家商品</li>
            <li @click="returnTop('#location')">位置指南</li>
            <li @click="returnTop('#intro')">店家介绍</li>
          </ul>
        </div>
        <div class="box_l_house" v-for="item in product_list" :key="item.title">
          <h1 id="shop">{{item.title}}</h1>
          <ul>
            <li v-for="item1 in item.data_list" :key="item1.product_id">
              <div class="house_list">
                <div class="house_img">
                  <img :src=item1.thumb alt="">
                </div>
                <div class="house_content">
                  <h1>{{ item1.title}}</h1>
                  <!-- <span class="room_count">仅剩一间</span> -->
                  <ul>
                    <li>{{item1.des}}</li>

                  </ul>
                  <span class="extra">{{item1.use_rule}}</span>
                </div>
              </div>
              <div class="house_destine">
                <span class="price">¥{{ item1.price }}</span>

                <a href="javascript:;">
                  <input type="button" value="立即预定" class="confirm" @click="gonext(item1.product_id)" :id="item1.product_id">
                </a>

              </div>
            </li>
          </ul>
        </div>

        <div class="map">
          <h1 id="location">位置指南</h1>
          <div id="box" class="map_box">

          </div>
        </div>
        <div class="house_intro">
          <h1 id="intro">店家介绍</h1>
          <div class="intro_header">
            <h2>店内介绍</h2>
            <p>
              {{introduction}}</p>

          </div>
          <div class="intro_middle">
            <h2>周边环境</h2>
            <p>
              {{round_environment}}
            </p>
          </div>
          <div class="intro_footer">
            <h2>营业时间</h2>
            <p>
              {{store_hours}}
            </p>
          </div>
        </div>
      </div>
      <div class="box_r">
        <h1>其他推荐</h1>
        <ul>
          <li v-for="item in store_list" :key="item.brand_member_id">
            <router-link :to="{path:'/rural/RDetailsStore',query:{brand_member_id:item.brand_member_id}}">
              <img :src=item.thumb alt="">
              <p> {{item.brand_store_name}}</p>
              <span>¥{{item.price}}起</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import {
    ruralXcStore,
    publicCollect
  } from "../../api/index.js";
  export default {
    watch: {
      $route() {
        this.brand_member_id = this.$route.query.brand_member_id;
      },
      brand_member_id() {
        this.getruralXcStore();
      }
    },
    data() {
      return {
        cancleindex: 0, //弹出框消失
        value1: 5,
        collectFlag: false,
        brand_member_id: this.$route.query.brand_member_id,
        address: "", //地址
        assess: "", //评分
        brand_store_name: "", //店名
        img: [], //图片
        introduction: "", //描述
        name: "", //姓名
        mobile: "", //电话
        pos: "", //定位
        product_id: "", //
        product_list: [], //产品列表
        round_environment: "", //周边
        store_hours: "", //营业时间
        store_list: [], //商店列表

        id: "", //id
        type: "", //类型
        collection_type: "3", //收藏类型
        collect: "2", //是否收藏
        // identity: '',
        // isToken: false,
        shareFlag: false,
        share: "" //网址
      };
    },
    mounted() {
      this.brand_member_id = this.$route.query.brand_member_id;
      this.getruralXcStore();
      this.getMap();
      this.getFullMap();
      var swiper = new Swiper(".swiper-container", {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        observer: true,
        observeParents: true
      });
    },
    created() {
      this.getruralXcStore();
      this.share = location.href;
    },
    methods: {
      gonext(data) {
        console.log(data);
        let params = {
          product_id: this.product_id
        };
        this.$router.push({
          path: "/rural/RDetailsStorePage",
          query: params
        });
      },
      getblockMap() {
        document.querySelector(".fullMap").style.display = "block";
      },
      cancleMap() {
        document.querySelector(".fullMap").style.display = "none";
      },
      cancle() {
        document.querySelector(".fullscreen").style.display = "none";
      },
      // 弹框
      getPhoto() {
        document.querySelector(".fullscreen").style.display = "block";
      },
      // 锚点定位
      returnTop: function (id) {
        document.querySelector(id).scrollIntoView(true);
      },
      // 收藏商品
      collectionGoods() {
        // console.log(123)
        if (this.collect == 1) {
          this.collect = 2; //2取消
        } else if (this.collect == 2) {
          this.collect = 1; //1收藏
        }
        let params = {
          id: this.product_id,
          collection_type: this.collection_type,
          type: "3",
          collect: this.collect
        };
        publicCollect(params).then(res => {
          console.log(params);
          if (res.code == 0) {
            if (this.collect == 1) {
              this.$message({
                message: "收藏成功",
                type: "success"
              });
            } else if (this.collect == 2) {
              this.$message({
                message: "取消收藏",
                type: "warning"
              });
            }
          }
        });
      },
      // // 分享
      getshare(index) {
        var shareCopy = document.getElementById("inShare");
        shareCopy.select();
        document.execCommand("Copy");

        var _shareUrl;
        if (index == 2) {
          _shareUrl =
            `http://service.weibo.com/share/share.php?appkey=&title=${
            this.introduction
          }&url=${this.share}&searchPic=false&style=simple`; //真实的appkey ,必选参数
          window.open(_shareUrl, "_blank");
        } else if (index == 1) {
          _shareUrl =
            `http://connect.qq.com/widget/shareqq/index.html?url=${
            this.share
          }&title=${
            this.introduction
          }&pics=你的分享图片&summary=${this.introduction}`; //真实的appkey ,必选参数
          window.open(_shareUrl, "_blank");
        } else if (index == 3) {
          this.$message({
            message: "网址复制成功",
            type: "success"
          });
        }


      },
      getMap() {
        var map = new AMap.Map("box", {
          center: this.pos, //初始地图中心点
          zoom: 16
        });
        var endIcon = new AMap.Icon({
          image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          imageSize: new AMap.Size(30, 40),
          imageOffset: new AMap.Pixel(-2, 0)
        });
        var endMarker = new AMap.Marker({
          position: this.pos,
          icon: endIcon
        });
        map.add(endMarker);
      },
      getFullMap() {
        var map = new AMap.Map("box1", {
          center: this.pos, //初始地图中心点
          zoom: 16
        });
        var endIcon = new AMap.Icon({
          image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          imageSize: new AMap.Size(30, 40),
          imageOffset: new AMap.Pixel(-2, 0)
        });
        var endMarker = new AMap.Marker({
          position: this.pos,
          icon: endIcon
        });
        map.add(endMarker);
      },
      getruralXcStore() {
        let params = {
          brand_member_id: this.brand_member_id
        };
        ruralXcStore(params).then(res => {
          console.log(res.data);
          if (res.code === 0) {
            this.address = res.data.address;
            this.assess = res.data.assess;
            this.brand_store_name = res.data.brand_store_name;
            this.img = res.data.img;
            this.introduction = res.data.introduction;
            this.name = res.data.name;
            this.mobile = res.data.mobile;
            this.pos = res.data.pos;
            this.product_list = res.data.product_list;
            this.round_environment = res.data.round_environment;
            this.store_hours = res.data.store_hours;
            this.store_list = res.data.store_list;
            this.collect_type = res.data.collect_type;

            this.product_list.forEach(element => {
              element.data_list.forEach(item => {
                console.log(item.product_id);
                this.product_id = item.product_id;
              });
            });
          }
        });
      }
    },
  };

</script>

<style lang="scss" scoped>
  .details_store {
    .brand_nav {
      margin: 35px 0;

      & /deep/ .brand_nav_box {
        font-size: 16px;
        color: #666;
      }
    }

    .details_show_box {
      width: 100%;
      height: 446px;
      border: 1px solid #eaeaea;
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;

      .details_img_box {
        position: relative;
        width: 706px;
        height: 406px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
          display: inline-block;
          width: 706px;
          height: 406px;
          text-align: center;

          img {
            max-width: 100%;
            max-height: 100%;
          }
        }

        .photo_box {
          position: absolute;
          right: 0;
          bottom: 0;
          text-align: center;
          line-height: 38px;
          width: 106px;
          height: 38px;
          background-color: #000000;
          border-radius: 19px;
          opacity: 0.5;

          span {
            font-family: PingFang-SC-Medium;
            font-size: 18px;
            color: #ffffff;
          }
        }

        .fullscreen {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 99;
          max-width: 100%;
          overflow: hidden;

          & .cancle {
            display: none;
          }

          & .show {
            display: none;
          }

          span {
            position: absolute;
            right: 20px;
            top: 50px;
            font-size: 60px;
            color: #fff;
          }

          .swiper-container {
            margin: 100px auto;
            position: relative;

            .swiper-wrapper {
              text-align: center;

              .swiper-slide {
                width: 800px;
                height: 500px;

                img {
                  max-width: 100%;
                  max-height: 100%;
                }
              }
            }
          }
        }

        .fullMap {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 99;
          overflow: hidden;

          span {
            position: absolute;
            right: 20px;
            top: 50px;
            font-size: 60px;
            color: #fff;
          }

          .fullmap_box {
            margin: 200px auto;
            width: 854px;
            height: 500px;
          }
        }
      }

      .details_box_right {
        width: 407px;
        margin-left: 30px;

        h2 {
          font-size: 36px;
          color: #000;
          padding: 20px 0;
        }

        .foods_rate {
          display: flex;

          span {
            margin-left: 10px;
            color: #f88f14;
            font-size: 22px;
            padding-bottom: 20px;
          }

          .rate_star /deep/ .el-rate__icon {
            font-size: 22px;
          }
        }

        .details_txt {
          width: 387px;
          font-size: 16px;
          color: #999;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 24px;
          padding-bottom: 25px;
        }

        .personal_details {
          height: 133px;
          border-bottom: 1px solid #eaeaea;
          border-top: 1px solid #eaeaea;

          .address_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 30px 0 40px 0;

            p {
              width: 280px;
              font-size: 16px;
              color: #666;

              span {
                margin-right: 10px;
              }
            }

            a {
              font-size: 14px;
              color: #23b57e;
            }
          }

          .personal_tel {
            font-size: 16px;
            color: #666;

            span {
              margin-right: 10px;
            }
          }
        }

        .btn_box {
          position: relative;
          height: 80px;
          display: flex;
          justify-content: space-around;
          align-items: center;

          a {
            font-size: 16px;
            color: #999;

            span {
              margin-right: 10px;
              font-size: 18px;
              color: #f88f14;
            }

            &:first-child {
              span {
                color: #f88f14;
              }
            }
          }

          .share {
            position: absolute;
            color: red;
            bottom: -100px;
            right: -30px;
            width: 250px;
            height: 140px;
            background: url(../../assets/images/b2c/shareBox.png) no-repeat;
            z-index: 999;

            ul {
              display: flex;
              justify-content: space-around;
              text-align: center;

              li {
                height: 64px;
                padding-top: 30px;
                padding-left: 16px;
                text-align: center;

                &:hover {
                  cursor: pointer;
                }

                img {
                  margin-bottom: 5px;
                }
              }
            }

            // background: red;
            // p {
            //   margin-bottom: 10px;

            //   &:hover {
            //     cursor: pointer;
            //   }
            // }
          }

          input {
            opacity: 0;
          }
        }
      }
    }

    .store_box {
      display: flex;
      margin-top: 31px;
      justify-content: space-between;
      align-items: flex-start;

      .box_l {
        width: 902px;
        background-color: #ffffff;
        border: solid 1px #eaeaea;

        .box-l_header {
          width: 902px;
          height: 60px;

          ul {
            width: 852px;
            height: 60px;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            margin: 0 26px;
            border-bottom: 1px solid #ccc;

            li {
              width: 90px;
              height: 23px;
              font-family: MicrosoftYaHei;
              font-size: 22px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #333333;
              // line-height: 23px;
              text-align: center;
              margin-right: 109px;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        .box_l_house {
          margin: 23px;
          box-sizing: border-box;

          h1 {
            margin-bottom: 18px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            color: #333333;
            margin-top: 20px;
          }

          ul {
            li {
              width: 852px;
              height: 127px;
              display: flex;
              justify-content: space-between;

              .house_list {
                width: 700px;
                display: flex;
                justify-content: flex-start;

                .house_img {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 184px;
                  height: 118px;
                  border-radius: 10px;

                  img {
                    max-width: 100%;
                    max-height: 100%;
                  }
                }

                .house_content {
                  border-radius: 10px;
                  position: relative;

                  h1 {
                    width: 100%;
                    font-family: PingFang-SC-Bold;
                    font-size: 22px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #333333;
                  }

                  .room_count {
                    position: absolute;
                    right: 30px;
                    top: 20px;
                    width: 56px;
                    height: 14px;
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 14px;
                    letter-spacing: 0px;
                    color: #e51616;
                    border: 1px solid #e51616;
                  }

                  ul {
                    line-height: 0;

                    li {
                      height: 35px;
                      width: 100%;
                    }
                  }
                }
              }

              .house_destine {
                width: 200px;
                text-align: center;

                .price {
                  display: inline-block;
                  margin-top: 30px;
                  margin-bottom: 10px;
                  width: 41px;
                  height: 18px;
                  font-family: MicrosoftYaHei;
                  font-size: 22px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #e51616;
                }

                .confirm {
                  width: 158px;
                  height: 49px;
                  background-image: linear-gradient(-90deg,
                    rgba(3, 0, 0, 0.53) 0%,
                    rgba(255, 255, 255, 0.53) 100%),
                    linear-gradient(#f86e14, #f86e14);
                  background-blend-mode: soft-light, normal;
                  border-radius: 25px;
                  border: none;
                  outline: none;
                  font-size: 18px;
                  color: #ffffff;

                  &:hover {
                    cursor: pointer;
                  }
                }
              }

              ul {
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-top: 28px;
                margin-bottom: 6px;

                li {
                  width: 163px;
                  height: 17px;
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 20px;
                  letter-spacing: 0px;
                  color: #666666;
                }
              }

              .extra {
                width: 63px;
                height: 17px;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #666666;
                margin-top: 10px;
              }
            }
          }
        }

        .map {
          width: 902px;
          height: 369px;
          border-top: 10px solid #f7f7f7;
          border-bottom: 10px solid #f7f7f7;

          .map_box {
            margin-left: 24px;
            margin-top: 20px;
            width: 854px;
            height: 241px;
          }

          h1 {
            width: 96px;
            height: 24px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
            margin-left: 26px;
          }
        }

        .house_intro {
          width: 854px;
          // background-color: #b2b2b2;
          margin: 0 auto;

          h1 {
            margin-top: 34px;
            margin-bottom: 28px;
            width: 96px;
            height: 24px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
          }

          .intro_header {
            width: 846px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            color: #333333;
            margin-bottom: 38px;

            h2 {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: 700;
              letter-spacing: 0px;
              color: #333333;
            }

            p {
              width: 100%;
              font-family: MicrosoftYaHei;
              font-size: 17px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #333333;
            }
          }

          .intro_middle {
            margin-bottom: 44px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 38px;
            letter-spacing: 0px;
            color: #333333;

            h2 {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: 700;
              letter-spacing: 0px;
              color: #333333;
            }

            p {
              width: 100%;
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #333333;
            }
          }

          .intro_footer {
            margin-bottom: 44px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 38px;
            letter-spacing: 0px;
            color: #333333;

            h2 {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: 700;
              letter-spacing: 0px;
              color: #333333;
            }

            p {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #333333;
            }
          }
        }
      }

      .box_r {
        width: 278px;
        background-color: #ffffff;
        border: solid 1px #eaeaea;
        margin: 0 auto;

        h1 {
          width: 88px;
          height: 22px;
          font-family: MicrosoftYaHei-Bold;
          font-size: 22px;
          color: #333333;
          margin: 20px 0 15px 20px;
        }

        ul {
          li {
            width: 261px;
            margin: 0 auto;
            margin-left: 20px;

            img {
              max-width: 100%;
              max-height: 100%;
              width: 239px;
              height: 153px;
              border-radius: 10px;
            }

            p {
              font-family: MicrosoftYaHei;
              font-size: 22px;
              color: #333333;
              margin-top: 17px;
              margin-bottom: 15px;
            }

            span {
              width: 76px;
              height: 17px;
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 20px;
              letter-spacing: 1px;
              color: #f88f14;
            }
          }
        }
      }
    }
  }

</style>
