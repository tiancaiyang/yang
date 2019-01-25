<template>
  <div class="details_common">
    <header-top></header-top>
    <!-- 页面头部 -->
    <div class="page_header">
      <div class="page_header_box banxin">
        <!-- 头部的上半部分 -->
        <div class="page_header_t">
          <div class="title_box">
            <div class="title_img"></div>
            <a>乌镇<span class="el-icon-arrow-down"></span></a>
          </div>
          <div class="search_box">
            <input type="search">
            <span class="el-icon-search"></span>
          </div>
        </div>
      </div>
      <!-- 头部tabs栏 -->
      <div class="nav_tabs">
        <ul class="banxin">
          <li :class="num == 1?'tabs_active':''" @click="tabChange(1)">
            <img src="../../assets/rural/r_homepage.png">
            <span>首页</span>
          </li>
          <li :class="num == 2?'tabs_active':''" @click="tabChange(2)">
            <img src="../../assets/rural/ttc.png">
            <span>土特产</span>
          </li>
          <li :class="num == 3?'tabs_active':''" @click="tabChange(3)">
            <img src="../../assets/rural/njc.png">
            <span>农家菜</span>
          </li>
          <li :class="num == 4?'tabs_active':''" @click="tabChange(4)">
            <img src="../../assets/rural/msw.png">
            <span>民宿屋</span>
          </li>
          <li :class="num == 5?'tabs_active':''" @click="tabChange(5)">
            <img src="../../assets/rural/ddy.png">
            <span>当地游</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 面包屑导航 -->
    <div class="brand_nav">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="brand_nav_box banxin">
        <el-breadcrumb-item>乡村互联-乌镇</el-breadcrumb-item>
        <el-breadcrumb-item>民宿屋</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 子组件显示区域 -->
    <div class="children_box banxin">
      <router-view></router-view>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 1
      }
    },
    methods: {
      tabChange(index) {
        this.num = index;
        this.num = index;
        this.$router.push({
            name: "RDetailsList",
            params: {
              class_id: this.num
            }
          }


        )
      }
    }
  }

</script>

<style lang="scss" scoped>
  .details_common {
    background-color: #f5f5f5;

    // 页面头部
    .page_header {
      background-color: #fff;

      .page_header_box {

        // 头部的上半部分
        .page_header_t {
          display: flex;
          justify-content: space-between;
          padding-top: 43px;

          .title_box {
            display: flex;
            align-items: center;

            .title_img {
              width: 172px;
              height: 41px;
              background: url('../../assets/rural/xchl_g.png');
              margin-right: 40px;
            }

            a {
              color: #1d9e6e;
              font-size: 20px;

              span {
                margin-left: 10px;
              }
            }
          }

          .search_box {
            width: 384px;
            height: 46px;
            border-radius: 23px;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            border: 1px solid #eaeaea;
            box-sizing: border-box;

            input {
              outline: none;
              border: none;
              width: 340px;
              height: 46px;
              padding-left: 30px;
              border-radius: 23px;
              font-size: 16px;
              color: #333;
              background-color: #f0f0f0;
            }

            span {
              font-size: 25px;
              color: #999;
            }
          }
        }
      }

      // 头部tabs栏
      .nav_tabs {
        height: 82px;
        background-color: #1d9e6e;
        margin-top: 40px;

        ul {
          display: flex;
          align-items: center;

          li {
            width: 20%;
            height: 82px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: default;

            img {
              margin-bottom: 12px;
            }

            span {
              font-size: 18px;
              color: #fff;
            }

            &:after {
              content: "";
              width: 1px;
              height: 34px;
              background-color: #138057;
              position: absolute;
              top: 24px;
              right: 0;
            }

            &:last-child:after {
              display: none;
            }
          }

          .tabs_active {
            background-color: #23b57e;
            position: relative;

            &:after {
              display: none;
            }
          }
        }
      }
    }

    // 面包屑导航
    .brand_nav {
      margin: 35px 0;

      & /deep/ .brand_nav_box {
        font-size: 16px;
        color: #666;
      }
    }

    // 子组件显示区域
    .children_box {
      min-height: 1052px;
    }
  }

</style>
