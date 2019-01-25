<template>
  <div class="OTourism">
    <header-top></header-top>
    <div class="national_header">
      <div class="banxin">
        <div class="national_header_left fl">
          <h2 class="national_header_left_title">境外旅游</h2>
        </div>
        <div class="national_header_right fr">
          <el-input class="header_search" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input1"></el-input>
        </div>
      </div>
    </div>
    <div class="national_div banxin clearfix">
      <div class="national_top">
        <ul class="national_top_Ul">
          <li @click="topToggle(1)"><a :class="index == 1 ? 'active':''" href="javascript:void(0);">全部</a> </li>
          <li @click="topToggle(2)"><a :class="index == 2 ? 'active':''" href="javascript:void(0);">推荐</a></li>
          <li @click="topToggle(3)"><a :class="index == 3 ? 'active':''" href="javascript:void(0);">自由行</a></li>
          <li @click="topToggle(4)"><a :class="index == 4 ? 'active':''" href="javascript:void(0);">跟团游</a></li>
          <li @click="topToggle(5)"><a :class="index == 5 ? 'active':''" href="javascript:void(0);">玩乐</a></li>
        </ul>
      </div>
      <div class="national_List fl">
        <ul class="tourism_ul">
          <li class="tourism_li">
            <div class="goods_details_box">
              <div class="img_box">
                <img src="../../assets/rural/goods.png">
              </div>
              <div class="box_right">
                <div class="box_right_info">
                  <h2>【双12】 全国出发-泰国纯玩6天5晚跟团游 热卖爆款 升级五星酒店全国出发-泰国纯玩</h2>
                  <div class="food_details">
                    <ul>
                      <li>亲子+蜜月</li>
                      <li>亲子+蜜月</li>
                    </ul>
                  </div>
                </div>
                <p class="goods_price">¥ 19.9 <span>起</span></p>
              </div>
            </div>
            <div class="box_btn">
              <el-button class="reserve_btn">查看详情</el-button>
              <p>月销1289笔</p>
              <p>评价1456条</p>
            </div>
          </li>
          <li class="tourism_li">
            <div class="goods_details_box">
              <div class="img_box">
                <img src="../../assets/rural/goods.png">
              </div>
              <div class="box_right">
                <div class="box_right_info">
                  <h2>【双12】 全国出发-泰国纯玩6天5晚跟团游 热卖爆款 升级五星酒店全国出发-泰国纯玩</h2>
                  <div class="food_details">
                    <ul>
                      <li>亲子+蜜月</li>
                      <li>亲子+蜜月</li>
                    </ul>
                  </div>
                </div>
                <p class="goods_price">¥ 19.9 <span>起</span></p>
              </div>
            </div>
            <div class="box_btn">
              <el-button class="reserve_btn">查看详情</el-button>
              <p>月销1289笔</p>
              <p>评价1456条</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="national_right fr">
        <h3>热门推荐</h3>
        <div>
          <ul>
            <li>
              <div class="img_box">
                <img src="../../assets/rural/goods.png">
              </div>
              <div class="box_right">
                <div class="box_right_info">
                  <h2>塞班岛军舰套餐 海上拖伞珊瑚岛群浮潜 塞班岛 塞班岛地接 塞班</h2>
                </div>
                <p class="goods_price">¥ 19.9 <span>起</span></p>
              </div>
            </li>
            <li>
              <div class="img_box">
                <img src="../../assets/rural/goods.png">
              </div>
              <div class="box_right">
                <div class="box_right_info">
                  <h2>塞班岛军舰套餐 海上拖伞珊瑚岛群浮潜 塞班岛 塞班岛地接 塞班</h2>
                </div>
                <p class="goods_price">¥ 19.9 <span>起</span></p>
              </div>
            </li>
            <li>
              <div class="img_box">
                <img src="../../assets/rural/goods.png">
              </div>
              <div class="box_right">
                <div class="box_right_info">
                  <h2>塞班岛军舰套餐 海上拖伞珊瑚岛群浮潜 塞班岛 塞班岛地接 塞班</h2>
                </div>
                <p class="goods_price">¥ 19.9 <span>起</span></p>
              </div>
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

  export default {
    data() {
      return {
        input1: '',
        index: 1,
      }
    },

    methods: {
      topToggle(num) {
        this.index = num
      },

    },

  }

</script>

<style scoped lang="scss">
  .OTourism {
    background-color: #fff;
  }

  .national_header {
    height: 150px;
    background-color: #007aff;

    .national_header_left {
      padding-top: 45px;
      width: 50%;

      .national_header_left_title {
        font-size: 36px;
        color: #fff;
      }
    }

    .national_header_right {
      padding-top: 42px;
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
    margin-top: -43px;

    .national_top {
      .national_top_Ul {
        padding: 0 200px;
        display: flex;
        justify-content: space-around;

        li {
          width: 203px;
          height: 43px;
          line-height: 43px;
          text-align: center;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          box-sizing: border-box;

          a {
            display: inline-block;
            line-height: 33px;
            box-sizing: border-box;
          }

          .active {
            border-bottom: 5px solid #fff;
          }
        }

      }
    }

    .national_List {
      width: 900px;
      padding-top: 40px;
      background-color: #fff;

      .tourism_ul {
        width: 900px;

        .tourism_li {
          height: 250px;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;

          .goods_details_box {
            display: flex;
            padding: 15PX;

            .img_box {
              width: 220px;
              height: 210px;
              @include common_center;
              background-color: #ccc;

              img {
                max-width: 100%;
                max-height: 100%;
              }
            }

            .box_right {
              margin-left: 20px;
              width: 430px;
              display: flex;
              justify-content: space-between;
              flex-direction: column;

              .box_right_info {
                h2 {
                  font-size: 20px;
                  color: #333;
                  line-height: 29px;
                  @include p-common;
                }

                .food_details {
                  margin-top: 20px;
                  display: flex;
                  align-items: center;

                  ul {
                    display: flex;
                    align-items: center;

                    li {
                      color: #666;
                      font-size: 16px;
                      border: 1px solid #666;
                      border-radius: 16px;
                      padding: 10px 15px;
                      margin-right: 10px;
                    }
                  }
                }
              }

              .goods_price {
                margin-top: 20px;
                font-size: 24px;
                color: #f00;

                span {
                  color: #666;
                  font-size: 20px;
                }
              }
            }
          }

          .box_btn {
            height: 100px;
            position: absolute;
            right: 15px;
            top: 60px;

            .reserve_btn {
              width: 100%;
              height: 40px;
              background-color: #2585cb;
              color: #fff;
              font-size: 16px;
              border-radius: 24px;
            }

            p {
              color: #999;
              font-size: 14px;
              margin-top: 13px;
            }
          }

        }
      }
    }

    .national_right {
      width: 290px;
      height: 380px;
      margin-top: 40px;
      padding: 18px 15px;
      box-sizing: border-box;
      background-color: #f2f2f2;

      h3 {
        color: #333;
        font-size: 14px;
      }

      ul {
        li {
          // height: 120px;
          padding: 15px 0;
          display: flex;
          border-bottom: 1px solid #ebebeb;

          .img_box {
            width: 80px;
            height: 80px;
            @include common_center;
            background-color: #ccc;

            img {
              max-width: 100%;
              max-height: 100%;
            }
          }

          .box_right {
            margin-left: 10px;
            width: 180px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .box_right_info {
              h2 {
                font-size: 14px;
                color: #666;
                line-height: 18px;
                @include p-common;
              }
            }

            .goods_price {
              font-size: 16px;
              color: #f00;

              span {
                color: #666;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

</style>
