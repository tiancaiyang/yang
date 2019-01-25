<template>
  <div>
    <header-top></header-top>
    <Header></Header>
    <div class="goodSaleDiv">
      <div class="img_box"></div>
      <!-- 商品区 -->
      <div class="goods_Div banxin">
        <div class="time_banner">
          <div class="swiper-container timeBanner">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in groupData" :key="item.index" :class="{ active: isActiveNUm == item.cid }"
                @click="toggleBranner(item.cid)"><span>{{item.name}}</span></div>
            </div>
            <div class="swiper-button-prev swiper-button-black"></div>
            <!--左箭头-->
            <div class="swiper-button-next swiper-button-black"></div>
            <!--右箭头-->
          </div>
        </div>
        <ul>
          <li v-for="item in listData" :key="item.index" @click="goCombinationDetail(item.group_id, item.group_type)">
            <div class="goods_img">
              <img :src="item.thumb">
            </div>
            <div class="goods_info">
              <p class="goods_title">{{item.group_name}}</p>
              <!-- <p class="goods_price">¥ 249.0</p> -->
              <div class="endTime-Div">
                <div class="gift_Div">
                  <span>赠品:</span>
                  <img v-for="items in item.gift_thumb" :key="items.index" :src="items">
                </div>
                <div>
                  <el-button class="goods_buy_btn">立即抢购</el-button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- <div><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div> -->
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
  import Swiper from "swiper"
  import CountDown from "../../components/CountDown.vue"
  import {
    b2bGetCombinationGroup,
    b2bGetCombinationList
  } from '../../api/index.js'
  export default {
    data() {
      return {
        groupData: [], // 组合活动分类
        isActiveNUm: 0,
        listData: [], // 组合活动列表数据
        page: 0,
        limit: 999999999999999,
        totalPage: 0, //总页数
      }
    },
    mounted() {
      this.getCombinationGroup()
    },
    updated() {
      this.groupSwiper()
    },
    methods: {
      // 分类导航
      groupSwiper() {
        var swiper = new Swiper(".swiper-container", {
          slidesPerView: 6,
          spaceBetween: 0,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        })
      },
      //获取当前页码
      getCurrentPage(pageNum) {
        this.page = pageNum - 1;
        this.getCombinationList(this.isActiveNUm)
      },
      // 组合分类的切换
      toggleBranner(index) {
        this.isActiveNUm = index
        this.page = 0
        this.getCombinationList(index)
      },
      // 获取组合分类数据
      getCombinationGroup() {
        b2bGetCombinationGroup().then(res => {
          // console.log(res)
          if (res.code == 0) {
            this.groupData = res.data
            this.isActiveNUm = res.data[0].cid
            this.getCombinationList(res.data[0].cid)
          }
        })
      },
      // 组合活动列表
      getCombinationList(id) {
        let params = {
          cid: id,
          page: this.page,
          limit: this.limit
        }
        b2bGetCombinationList(params).then(res => {
          // console.log(res)
          if (res.code == 0) {
            this.listData = res.data.list
            this.totalPage = parseInt(res.data.total_num)
          }
        })
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
      }
    },
    components: {
      CountDown
    }
  }

</script>

<style scoped lang="scss">
  .goodSaleDiv {
    background-color: #f9f9f9;

    .img_box {
      background: url(../../assets/common/activity/combination.png) no-repeat top center;
      width: 100%;
      height: 993px;
    }

    .time_banner {

      border-radius: 10px;

      .swiper-container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 80px;
        border-radius: 10px;

        & /deep/ .swiper-button-prev {
          box-shadow: 5px 0 10px rgba(131, 104, 104, 0.34);
        }

        // & /deep/ .swiper-button-next {
        //   box-shadow: 5px 0 10px rgba(131, 104, 104, 0.34);
        // }


      }

      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;

        span {
          width: 100%;
          border-right: 1px solid #e0e0e0;
        }
      }

      .active {
        background-color: #e51818;
        color: #fff;

        span {
          border-right: 1px solid #e51818;
        }
      }

      .swiper-button-prev,
      .swiper-button-next {
        top: 0;
        bottom: 0;
        width: 80px;
        height: 80px;
        opacity: 1;
        margin-top: 0;
        background-color: #fff;
        background-size: 19px 19px;
      }

      .swiper-button-prev {
        left: 0;
        border-radius: 10px 0 0 5px;
        box-shadow: 5px 0 10px rgba(226, 224, 224, 0.84);
      }

      .swiper-button-next {
        right: 0;
        border-radius: 0 10px 10px 0;
        box-shadow: -5px 0 5px rgba(226, 224, 224, 0.84);
      }
    }

    .goods_Div {
      // background-color: #f5f5f5;
      margin-top: -533px;
      border-radius: 10px 10px 0 0;

      .time_banner {
        height: 80px;
        margin-bottom: 30px;
        background-color: #fff;
      }

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 386px;
          height: 500px;
          background-color: #fff;
          margin-right: 21px;
          margin-bottom: 20px;

          &:nth-child(3n) {
            margin-right: 0;
          }

          .goods_img {
            height: 346px;
            width: 346px;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            img {
              max-height: 100%;
              max-width: 100%;
            }

            .imgIcon {
              position: absolute;
              top: 20px;
              right: 20px;
            }
          }

          .goods_info {
            padding: 0 20px 20px;

            p {
              margin-bottom: 16px;
            }

            .goods_title {
              font-size: 16px;
              color: #333;
              line-height: 24px;
            }

            // .goods_price {
            //   color: #e51818;
            //   font-size: 24px;
            // }
            .endTime-Div {
              height: 48px;
              line-height: 48px;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .gift_Div {
                height: 100%;

                span {
                  color: #999;
                  font-size: 16px;
                }

                img {
                  max-width: 48px;
                  max-height: 48px;
                  vertical-align: middle;
                }
              }

              .goods_buy_btn {
                height: 48px;
                width: 125px;
                border-radius: 4px;
                font-size: 16px;
                color: #fff;
                border: 1px solid #e51818;
                background-color: #e51818;
              }
            }
          }
        }
      }
    }
  }

</style>
