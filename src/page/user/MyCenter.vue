<template>
  <div class="my_center">
    <!-- 头部个人信息 -->
    <div class="my_center_top">
      <!-- 头像和用户名部分 -->
      <div class="top_l">
        <img v-if="userMessage.head_image != ''" :src="userMessage.head_image">
        <img v-else src="../../assets/images/user/headerImg.png" alt="">
        <div class="user_msg">
          <p class="user_name">{{ userMessage.nickname }}</p>
          <router-link to="/one/user/PersonalInformation" tag="a">修改资料<span class="el-icon-arrow-right"></span></router-link>
        </div>
      </div>
      <!-- 积分 余额 优惠券 -->
      <!-- <div class="top_r">
        <ul>
          <li>
            <p class="number">0</p>
            <p class="title">积分</p>
            <a @click="Comingsoon">兑换</a>
          </li>
          <li>
            <p class="number">0</p>
            <p class="title">余额</p>
            <a @click="Comingsoon">充值</a>
          </li>
          <li>
            <p class="number">0</p>
            <p class="title">优惠券</p>
            <router-link to="/one/user/UserCoupon" tag="a">领券</router-link>
          </li>
        </ul>
      </div> -->
    </div>
    <!-- 我的订单具体内容 -->
    <div class="my_center_banner">
      <!-- 左边我的订单部分 -->
      <div class="banner_l">
        <!-- 订单状态导航 -->
        <div class="order_nav">
          <div class="common_section_top">
            <span class="common_section_title">我的订单</span>
            <router-link to="/one/user/OrderPerson/OrderAll" tag="a" class="common_section_a">更多<span class="el-icon-arrow-right"></span></router-link>
          </div>
          <!-- 订单状态列表 -->
          <div class="order_nav_list">
            <ul>
              <router-link to="/one/user/OrderPerson/OrderWaitingPay" tag="li">
                <img src="../../assets/images/user/dfk.png">
                <span class="nav_detail">待付款</span>
              </router-link>
              <router-link to="/one/user/OrderPerson/OrderWaitingReceive" tag="li">
                <img src="../../assets/images/user/dsh.png">
                <span class="nav_detail">待收货</span>
              </router-link>
              <router-link to="/one/user/UserEvaluate" tag="li">
                <img src="../../assets/images/user/dpj.png">
                <span class="nav_detail">待评价</span>
              </router-link>
              <router-link to="/one/user/OrderPerson/OrderReturnGoods" tag="li">
                <img src="../../assets/images/user/sh.png">
                <span class="nav_detail">售后/退货</span>
              </router-link>
            </ul>
          </div>
        </div>
        <div class="order_list">
          <ul class="order_list_all">
            <li class="order_list_box" v-for="item in orderList" :key="item.index">
              <div class="goods_img">
                <ul>
                  <li v-for="items in item.product" :key="items.index">
                    <img :src="items.thumb">
                  </li>
                </ul>
              </div>
              <span class="goods_price">¥{{ item.price_total }}</span>
              <span class="goods_detail active">{{ item.order_status | orderStatus  }}</span>
              <a @click="goOrderInfo(item.order_no,item.order_type,item.order_status)" class="active">详情<span class="el-icon-arrow-right"></span></a>
            </li>
          </ul>
          <div class="orderNull" v-if="orderList.length == 0">
            <p class="iconfont icon-wudingdan"></p>
            <p>暂无订单，快去逛逛吧！</p>
          </div>
        </div>
      </div>
      <!-- 右边我的收藏和浏览记录 -->
      <div class="banner_r">
        <!-- 我的收藏 -->
        <div class="my_collect">
          <div class="common_section_top">
            <span class="common_section_title">我的收藏</span>
            <router-link to="/one/user/MyCollection" tag="a" class="common_section_a">更多<span class="el-icon-arrow-right"></span></router-link>
          </div>
          <div class="my_collect_b">
            <ul>
              <li>
                <p>{{ goodsCollNum }}</p>
                <p>商品收藏</p>
              </li>
              <li>
                <p>{{ articleCollNum }}</p>
                <p>店铺收藏</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 浏览记录 -->
        <div class="browse_history">
          <div class="common_section_top">
            <span class="common_section_title">浏览记录</span>
            <router-link to="/one/user/BrowseHistory" tag="a" class="common_section_a">更多<span class="el-icon-arrow-right"></span></router-link>
          </div>
          <div class="goods_swiper">
            <ul>
              <li v-for="item in browseRecords" :key="item.index" @click="goProductInfo(item)">
                <img :src="item.thumb">
                <div class="goods_box_r">
                  <p>{{ item.title }}</p>
                  <span>¥{{ item.price }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部精品推荐版块 -->
    <div class="my_center_footer">
      <div class="common_section_top">
        <span class="common_section_title">精品推荐</span>
        <!-- <router-link to="/" tag="a" class="common_section_a">更多<span class="el-icon-arrow-right"></span></router-link> -->
      </div>
      <div class="goods_show">
        <ul>
          <li v-for="item in qualityGoods" :key="item.index" @click="goProductInfo(item)">
            <img :src="item.thumb">
            <p>{{ item.title }}</p>
            <span>¥ {{ item.price }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { userIndividualCenter } from '../../api/index.js'
export default {
  data () {
    return {
      goodsCollNum:0,//收藏商品数量
      articleCollNum:0,//收藏其他
      browseRecords:[],//浏览记录
      qualityGoods:[],//精品推荐
      orderList:[],//订单列表
      userMessage:[],//个人信息
    }
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    getUserInfo(){
      userIndividualCenter().then(res=>{
        console.log(res)
        if(res.code == 0){
          this.goodsCollNum = res.data.goods_collection_num
          this.articleCollNum = res.data.article_collection_num
          this.browseRecords  = res.data.browse_records
          this.qualityGoods = res.data.quality_goods
          this.orderList = res.data.order_list
          this.userMessage = res.data.user
        }
      })
    },
    // 浏览记录跳转到商品详情
    goProductInfo(item){
      if(item.type == 1){ // 去b端商品详情页面
        let goodsData = {
          product_id: item.product_id,
          activity_type: item.activity_type,
          activity_id: item.activity_id
        }
        this.$router.push({name: 'BProductDetail', query: goodsData})
      }else if(item.type == 2){//去c端页面
        this.$router.push({name:'CProductDetail',params: { type: item.activity_type, activityId:item.activity_id, productId: item.product_id } })
      }
    },
    //敬请期待
    Comingsoon(){
      this.$message({
        message: '敬请期待',
        type: 'warning'
      });
    },
    // 订单详情
        // 订单详情
    goOrderInfo(orderNo,orderType,orderStatus){
      let params = {
        orderNo: orderNo,
        orderType: orderType,
        orderStatus: orderStatus,
      }
      if(orderStatus == 0){
        this.$router.push({name: 'orderInfoDel',query:params})//已取消
      }else if(orderStatus == 1){
        this.$router.push({name: 'orderInfoOver',query:params})//已完成
      }else if(orderStatus == 2){
        this.$router.push({name: 'orderInfoWaitingPay',query:params})//待付款
      }else if(orderStatus == 3){
        this.$router.push({name: 'orderInfoWaitingReceive',query:params})//待发货
      }else if(orderStatus == 4){
        this.$router.push({name: 'orderInfoDeliverGoods',query:params})//待收货
      }else if(orderStatus == 6){
        this.$router.push({name: 'orderInfoReturnGoods',query:params})//退货
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .my_center {
    // 公共的 每个部分里的头部标题
    .common_section_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 36px;

      .common_section_title {
        font-size: 18px;
        color: #333;
      }

      .common_section_a {
        font-size: 14px;
        color: #999;
      }
    }

    // 头部个人信息
    .my_center_top {
      height: 178px;
      background-color: #fff;
      padding: 30px;
      box-sizing: border-box;
      display: flex;

      // 头像和用户名部分
      .top_l {
        display: flex;
        align-items: center;
        width: 350px;
        border-right: 1px solid #e0e0e0;

        img {
          height: 102px;
          width: 102px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .user_msg {
          .user_name {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
          }

          a {
            font-size: 14px;
            color: #999;
          }
        }
      }

      // 积分 余额 优惠券
      .top_r {
        width: 598px;

        ul {
          display: flex;
          justify-content: space-around;

          li {
            margin-top: 13px;
            text-align: center;

            .number {
              font-size: 24px;
              color: #333;
            }

            .title {
              margin: 15px 0 20px 0;
              font-size: 14px;
              color: #999;
            }

            a {
              display: inline-block;
              width: 70px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              background-color: rgba(274, 116, 52, .5);
              border-radius: 12px;
              color: #f77434;
              font-size: 14px;
            }
          }
        }
      }
    }

    // 我的订单具体内容
    .my_center_banner {
      margin-top: 20px;
      height: 553px;
      display: flex;

      .banner_l {
        width: 696px;
        height: 100%;
        background-color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        margin-right: 20px;

        // 订单状态导航
        .order_nav {
          padding-top: 20px;
          box-sizing: border-box;
          height: 229px;
          border-bottom: 1px solid #e0e0e0;

          .order_nav_list {
            ul {
              display: flex;
              justify-content: space-around;

              li {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                img {
                  width: 65px;
                  height: 65px;
                  border-radius: 50%;
                  margin: 30px 0;
                }

                span {
                  color: #999;
                  font-size: 16px;
                }
              }
            }
          }
        }

        // 我的订单部分下面订单展示区
        .order_list {
          height: 323px;
          .order_list_all {
            .order_list_box {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 100px;
              font-size: 16px;
              border-bottom: 1px dashed #e0e0e0;

              .goods_img {
                width: 280px;

                ul {
                  display: flex;

                  li {
                    margin-right: 10px;

                    img {
                      width: 60px;
                      height: 60px;
                    }
                  }
                }
              }

              .goods_price {
                color: #333;
              }

              .goods_detail {
                color: #f77434;
              }

              a {
                color: #666;
              }

              .active {
                color: #e51818;
              }
            }

            .order_list_box:last-child {
              border-bottom: none;
            }
          }
          .orderNull{
            text-align: center;
            margin-top: 50px;
            .icon-wudingdan{
              height: 100px;
              font-size: 80px;
            }
            p{
              font-size: 18px;
              color: #bbb;
              margin-bottom: 10px;
            }
          }
        }
      }

      // 我的收藏 和 浏览记录部分
      .banner_r {
        width: 232px;
        height: 100%;

        // 我的收藏部分
        .my_collect {
          width: 232px;
          height: 176px;
          background-color: #fff;
          margin-bottom: 20px;
          padding: 20px;
          box-sizing: border-box;

          .my_collect_b {
            margin-top: 30px;

            ul {
              display: flex;
              li {
                height: 54px;
                width: 50%;
                text-align: center;
                border-right: 1px solid #efefef;
                p:first-child {
                  font-size: 24px;
                  color: #333;
                  margin-bottom: 16px;
                }

                p:last-child {
                  font-size: 14px;
                  color: #999;
                }
              }
              li:last-child {
                border: none;
              }
            }
          }
        }

        // 浏览记录部分
        .browse_history {
          width: 232px;
          min-height: 357px;
          padding-top: 20px;
          box-sizing: border-box;
          background-color: #fff;
          .common_section_top {
            margin: 0 20px;
          }
          .goods_swiper {
            ul {
              li {
                padding: 0 20px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                height: 100px;
                border-bottom: 1px dashed #e0e0e0;
                img {
                  width: 60px;
                  height: 60px;
                }
                .goods_box_r {
                  margin-left: 10px;
                  font-size: 14px;
                  color: #666;
                  p {
                    overflow: hidden;
                    text-emphasis: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    line-height: 20px;
                    margin-bottom: 15px;
                  }
                  span {
                    font-size: 16px;
                    color: #e51818;
                  }
                }
              }
              li:last-child {
                border: none;
              }
            }
          }
        }
      }
    }

    // 底部精品推荐版块
    .my_center_footer {
      width: 696px;
      height: 281px;
      background-color: #fff;
      margin-top: 20px;
      padding: 20px;
      box-sizing: border-box;
      .goods_show {
        margin-top: 10px;
        ul {
          display: flex;
          padding: 0 20px;
          // justify-content: space-between;
          flex-wrap: wrap;
          li {
            width: 138px;
            font-size: 14px;
            text-align: center;
            margin-right: 15px;
            &:nth-child(4n){
              margin-right: 0;
            }
            img {
              width: 138px;
              height: 138px;
            }
            p {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 20px;
              color: #666;
              margin: 10px 0;
            }
            span {
              color: #e51818;
            }
          }
        }
      }
    }
  }

</style>
