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
              <div
                class="swiper-slide"
                v-for="item in SecillTop"
                :key="item.index"
                :class="{ active: isActiveNUm == item.scene_id }"
                @click="toggleBranner(item.scene_id)"
              >
                <div>{{ item.seckill_time }}&nbsp; {{ item.seckill_title }}</div>
                <!-- <div>{{ item.seckill_title }}</div> -->
                <div
                  v-if="item.is_begin == 1"
                  class="swiper-countDown"
                >
                  <p>距结束:</p>
                  <count-down :o_time="item.over_time"></count-down>
                </div>
                <div v-if="item.is_begin != 1">{{ item.begin_time | dateFormat}}</div>
              </div>
            </div>
            <div class="swiper-button-prev swiper-button-black"></div>
            <!--左箭头-->
            <div class="swiper-button-next swiper-button-black"></div>
            <!--右箭头-->
          </div>
        </div>
        <ul>
          <!-- 进行中 -->
          <li
            v-for="item in secillDataList"
            :key="item.index"
          >
            <div class="goods_img">
              <img :src="item.thumb">
            </div>
            <div class="goods_info">
              <p class="goods_title">{{ item.title }}</p>
            </div>
            <div class="endTime-Div">
              <div class="count_down">
                <p class="goods_price">¥ {{ item.seckill_price }} <span class="old_price">￥{{ item.price }}</span></p>
              </div>
              <a>
                <el-button
                  v-if="item.seckill_status == 1"
                  class="goods_buy_btn"
                  @click="nowBayBtn(item)"
                >立即购买</el-button>
              </a>
              <el-button
                v-if="item.seckill_status == 2"
                class="goods_buy_btn partake"
              >已参与</el-button>
              <el-button
                v-if="item.seckill_status == -1"
                class="goods_buy_btn partake"
              >即将开始</el-button>
              <el-button
                v-if="item.seckill_status == 0"
                class="goods_buy_btn partake"
              >已抢光</el-button>
            </div>
          </li>
        </ul>
        <div>
          <page-base
            :pagesize="limit"
            :currentPage="page"
            :total="totalPage"
            @listen="getCurrentPage"
          ></page-base>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
import Swiper from "swiper";
import CountDown from "../../components/CountDown.vue";
import { Getseckill, b2bGetSeckillProductList } from "../../api/index.js";
export default {
  data() {
    return {
      isActiveNUm: 0, //时间档切换
      SecillTop: [], //头部时间表
      secillDataList: [], //秒杀列表
      page: 0,
      limit: 6,
      totalPage: 0 //总页数
    };
  },
  created() {
    this.getSecillTop();
  },
  updated() {
    this.swiperList();
  },
  methods: {
    swiperList() {
      var swiper = new Swiper(".swiper-container", {
        slidesPerView: 4,
        spaceBetween: 0,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    },
    //获取当前页码
    getCurrentPage(pageNum) {
      this.page = pageNum - 1;
      this.getSeckillProductList();
    },
    // 头部时间档切换
    toggleBranner(sceneId) {
      this.isActiveNUm = sceneId;
      this.page = 0;
      this.getSeckillProductList();
    },
    // 头部时间档
    getSecillTop() {
      let params = {
        type: 1
      };
      Getseckill(params).then(res => {
        // console.log(res)
        if (res.code == 0) {
          this.SecillTop = res.data;
          this.SecillTop.forEach(item => {
            if (item.is_main == 1) {
              this.isActiveNUm = item.scene_id;
            }
          });
          this.getSeckillProductList();
        }
      });
    },
    // 获取数据
    getSeckillProductList() {
      let params = {
        scene_id: this.isActiveNUm,
        page: this.page,
        limit: this.limit
      };
      b2bGetSeckillProductList(params).then(res => {
        if (res.code == 0) {
          this.secillDataList = res.data.list;
          this.totalPage = parseInt(res.data.total_num);
        }
      });
    },
    nowBayBtn(item) {
      this.$router.push({
        name: "BProductDetail",
        query: {
          activity_type: item.activity_type,
          activity_id: item.activity_id,
          product_id: item.product_id
        }
      });
    }
  },
  components: {
    CountDown
  }
};
</script>

<style scoped lang="scss">
.goodSaleDiv {
  .img_box {
    background: url(../../assets/common/activity/seckillTimeBG.png) no-repeat
      top center;
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
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      cursor: pointer;
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
      flex-wrap: wrap;
    }
    .swiper-countDown {
      width: 100%;
      display: inline-block;
      p {
				font-size: 17px;
        padding-bottom: 10px;
      }
      & /deep/ div {
        display: inline-block;
				@include common_center;
        span {
          &::after {
            content: ":";
            width: 10px;
            height: 10px;
          }
          &:last-child:after {
            display: none;
          }
        }
        b {
					font-size: 17px;
					padding-right: 10px;
        }
      }
    }
    .active {
      background-color: #e51818;
      color: #fff;
    }
    .swiper-button-prev,
    .swiper-button-next {
      top: 0;
      bottom: 0;
      width: 80px;
      height: 80px;
      margin-top: 0;
      background-color: #fff;
      opacity: 1;
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
    background-color: #f5f5f5;
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
        height: 498px;
        background-color: #fff;
        margin-right: 21px;
        margin-bottom: 20px;
        @include common_li_hover;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .goods_img {
          height: 346px;
          width: 346px;
          padding: 20px;
          @include common_center;
          img {
            max-height: 100%;
            max-width: 100%;
          }
        }
        .goods_info {
          padding: 0 20px;
          p {
            margin-bottom: 16px;
          }
          .goods_title {
            font-size: 16px;
            color: #333;
            line-height: 24px;
          }
        }
        .endTime-Div {
          height: 48px;
          padding-left: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: url(../../assets/common/activity/beginBottom.png)
            no-repeat;
          .count_down {
            .goods_price {
              color: #fff;
              font-size: 24px;
              .old_price {
                color: #999;
                font-size: 16px;
                text-decoration: line-through;
              }
            }
          }
          .goods_buy_btn {
            height: 48px;
            width: 125px;
            font-size: 18px;
            color: #fff;
            border: 1px solid #ef910b;
            background-color: #ef910b;
          }
          // 已参与
          .partake {
            border: 1px solid #734549;
            background-color: #734549;
          }
        }
        // 敬请期待
        .beginMinute {
          text-align: center;
          line-height: 48px;
          background: url(../../assets/common/activity/beginBottom.png)
            no-repeat;
          padding-left: 0;
          a {
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>