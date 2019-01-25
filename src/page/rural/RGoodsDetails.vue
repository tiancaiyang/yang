<template>
  <div class="details_store">
    <!-- 详情显示区域 -->
    <div class="details_show_box">
      <!-- 图片显示区域 -->
      <div class="details_img_box">
        <ul>
          <li v-for="item in img" :key="item.address_id">
            <img :src=item alt="">
          </li>
        </ul>

      </div>
      <!-- 右边详情部分 -->
      <!-- <div class="details_box_right">
        <h2>{{brand_store_name}}</h2>
        <div class="foods_rate">
          <el-rate v-model="value1" disabled text-color="#ff9900" class="rate_star"></el-rate>
          <span>{{value1}} 分</span>
        </div>
        <p class="details_txt">{{ introduction }}</p>
        <div class="personal_details">
          <div class="address_box">
            <p><span class="el-icon-location"></span>{{address}}</p>
            <a>查看地图<span class="el-icon-arrow-right"></span></a>
          </div>
          <p class="personal_tel"><span class="el-icon-phone"></span>{{name}} {{mobile}}</p>
        </div>
        <div class="btn_box">
          <a @click="collectBtn"><span :class="collectFlag==false?'el-icon-star-off':'el-icon-star-on'"></span> 收藏</a>
          <a><span class="el-icon-share"></span> 分享</a>
        </div>
      </div> -->
    </div>


    <!-- tabs标签页 -->
    <!-- <div class="store_box">
      <div class="box_l">
        <div class="box-l_header">
          <ul>
            <li>店家商品</li>
            <li>位置指南</li>
            <li>店家介绍</li>
          </ul>
        </div>
        <div class="box_l_house" v-for="item in product_list" :key="item.title">
          <h1>{{item.title}}</h1>
          <ul>
            <li v-for="item1 in item.data_list" :key="item1.product_id">
              <div class="house_list">
                <div class="house_img">
                  <img :src=item1.thumb alt="">
                </div>
                <div class="house_content">
                  <h1>{{ item1.title}}</h1>
                  <span class="room_count">仅剩一间</span>
                  <ul>
                    <li>{{item1.des}}</li>

                  </ul>
                  <span class="extra">{{item1.use_rule}}</span>
                </div>
              </div>
              <div class="house_destine">

                <span class="price">${{ item1.price }}</span>
                <input type="button" value="立即预定" class="confirm">

              </div>
            </li>

          </ul>
        </div>

        <div class="map">
          <h1>位置指南</h1>
          <div id="box" class="map_box">

          </div>
        </div>
        <div class="house_intro">
          <h1>店家介绍</h1>
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
            <img :src=item.thumb alt="">
            <p> {{item.brand_store_name}}</p>
            <span>${{item.price}}起</span>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
  import {
    rurallocalProductView
  } from "../../api/index.js"
  export default {
    data() {
      return {
        value1: 5,
        collectFlag: false,
        brand_member_id: this.$route.query.brand_member_id,
        // product_id: this.$route.query.product_id, //产品id
        product_id:60,
        discount_id: '', //特价
        DetailsList: [], //数据集
        cat_format: [], //规格
        img: [], //照片
        attrs: [], //
        business_product_base_spec_info: [],
        spec_list: [],
        productList: [],
        assess: [],


      }
    },
    mounted() {
      // this.getMap()
    },
    created() {
      this.getrurallocalProductView();
    },
    methods: {
      collectBtn() {
        this.collectFlag = !this.collectFlag
      },

      getrurallocalProductView() {
        let params = {
          product_id: this.product_id
        }
        rurallocalProductView(params).then(res => {
          // console.log(res);
          if (res.code === 0 ) {
            this.img = res.data.img;
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .details_store {
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
        width: 706px;
        height: 406px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        ul {
          position: relative;
          width: 706px;
          height: 406px;

          li {
            position: absolute;
            width: 706px;
            height: 406px;
            text-align: center;

            img {
              max-width: 100%;
              max-height: 100%;
              border-radius: 10px;
            }
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
            }

            &:first-child {
              span {
                color: #f88f14;
              }
            }
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
                  height: 128px;
                  border-radius: 10px;

                  img {
                    max-width: 100%;
                    max-height: 100%;
                  }
                }

                .house_content {
                  width: 200px;
                  border-radius: 10px;
                  position: relative;

                  h1 {
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
                    li {
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
                    linear-gradient(#f86e14,
                    #f86e14);
                  background-blend-mode: soft-light,
                    normal;
                  border-radius: 25px;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
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

        // .box_l_foods {
        //   margin-top: 20px;
        //   width: 852px;
        //   // background-color: red;
        //   // height: 100px;
        //   margin: 20px 26px;
        // }

        // h1 {
        //   width: 48px;
        //   height: 24px;
        //   font-family: MicrosoftYaHei-Bold;
        //   font-size: 24px;
        //   font-weight: normal;
        //   font-stretch: normal;
        //   letter-spacing: 0px;
        //   color: #333333;
        //   margin-top: 20px;
        // }

        // ul {

        //   li {
        //     width: 852px;
        //     height: 127px;
        //     // background-color: red;
        //     display: flex;
        //     justify-content: space-between;
        //     margin-bottom: 10px;

        //     .house_list {
        //       width: 500px;

        //       // background-color: blue;
        //       display: flex;
        //       justify-content: flex-start;

        //       .house_img {
        //         width: 184px;
        //         height: 118px;
        //         background-color: #000000;
        //         border-radius: 10px;

        //         img {
        //           max-width: 100%;
        //         }
        //       }

        //       .house_content {
        //         width: 200px;
        //         height: 118px;

        //         border-radius: 10px;
        //         position: relative;

        //         h1 {
        //           width: 109px;
        //           height: 22px;
        //           font-family: PingFang-SC-Bold;
        //           font-size: 22px;
        //           font-weight: normal;
        //           font-stretch: normal;
        //           line-height: 20px;
        //           letter-spacing: 0px;
        //           color: #333333;
        //         }

        //         .room_count {
        //           position: absolute;
        //           right: 30px;
        //           top: 20px;
        //           width: 56px;
        //           height: 14px;
        //           font-family: PingFang-SC-Medium;
        //           font-size: 14px;
        //           font-weight: normal;
        //           font-stretch: normal;
        //           line-height: 14px;
        //           letter-spacing: 0px;
        //           color: #e51616;
        //           border: 1px solid #e51616;
        //         }
        //       }
        //     }

        //     .house_destine {
        //       width: 200px;
        //       text-align: center;

        //       .price {
        //         display: inline-block;
        //         margin-top: 30px;
        //         margin-bottom: 10px;
        //         width: 41px;
        //         height: 18px;
        //         font-family: MicrosoftYaHei;
        //         font-size: 22px;
        //         font-weight: normal;
        //         font-stretch: normal;
        //         letter-spacing: 0px;
        //         color: #e51616;
        //       }

        //       .confirm {
        //         width: 158px;
        //         height: 49px;
        //         background-image: linear-gradient(-90deg,
        //           rgba(3, 0, 0, 0.53) 0%,
        //           rgba(255, 255, 255, 0.53) 100%),
        //           linear-gradient(#f86e14,
        //           #f86e14);
        //         background-blend-mode: soft-light,
        //           normal;
        //         border-radius: 25px;
        //         font-size: 18px;
        //         font-weight: normal;
        //         font-stretch: normal;
        //         letter-spacing: 0px;
        //         color: #ffffff;
        //       }
        //     }

        //     ul {
        //       display: flex;
        //       justify-content: space-around;
        //       align-items: center;
        //       margin-top: 28px;
        //       margin-bottom: 6px;

        //       li {
        //         width: 163px;
        //         height: 17px;
        //         font-family: MicrosoftYaHei;
        //         font-size: 16px;
        //         font-weight: normal;
        //         font-stretch: normal;
        //         line-height: 20px;
        //         letter-spacing: 0px;
        //         color: #666666;
        //       }
        //     }

        //     .extra {

        //       width: 63px;
        //       height: 17px;
        //       font-family: MicrosoftYaHei;
        //       font-size: 16px;
        //       font-weight: normal;
        //       font-stretch: normal;
        //       line-height: 20px;
        //       letter-spacing: 0px;
        //       color: #666666;
        //       margin-top: 10px;
        //     }
        //   }
        // }

        .map {
          width: 909px;
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
