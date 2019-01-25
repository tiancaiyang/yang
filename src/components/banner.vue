<template>
  <div class="banner_box clearfix">
    <div class="banner banxin clearfix">
      <!-- 头部导航部分 -->
      <ul class="top_bar">
        <router-link to="/" tag="li">首页</router-link>
        <li @click="goB2B">掌柜之家</li>
        <!-- <router-link
            to="/rural"
            tag="li"
          >乡村互联</router-link> -->
        <!-- <router-link to="/OHomePage" tag="li">海外购</router-link> -->
      </ul>
      <!-- 侧边分类导航栏 -->
      <div class="left_nav clearfix">
        <h2 @mouseenter="changeShow" @mouseleave="changeHidden">
          <span class="icon_box iconfont icon-weibiaoti303"></span>
          <span>全部分类</span>
        </h2>
        <ul v-if="flag" @mouseenter="changeShow" @mouseleave="changeHidden">
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
  </div>
</template>
<script>
  import {
    b2cHome,
    b2bHome
  } from '../api/index.js'
  export default {
    props: ['message'],
    data() {
      return {
        leftNav: [], //左侧边栏

        flag: false, //侧边栏隐藏
        identity: '',
      }
    },
    methods: {
      getHome() {
        if (this.message == 0) {
          b2cHome().then(res => {
            if (res.code == 0) {
              console.log(res);
              this.leftNav = res.data.menu_list;
            }
          });

        } else {
          b2bHome().then(res => {
            if (res.code == 0) {
              console.log(res);
              this.leftNav = res.data.menu_list;
            }
          });
        }


      },
      changeShow() {
        this.flag = true;
      },
      changeHidden() {
        this.flag = false;
      },
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
    },
    created() {
      this.getHome();
      this.identity = localStorage.getItem("identity");
    },
  }

</script>
<style lang="scss" scoped>
  // banner 部分
  .banner_box {
    margin-top: 40px;
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
        background-color: #1b1b1a;
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

</style>
