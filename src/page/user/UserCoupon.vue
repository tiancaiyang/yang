<template>
  <div class="user_coupon">
    <h2>优惠券</h2>
    <!-- 优惠券导航 -->
    <div class="user_coupon_nav">
      <a @click="tab(1)" :class="couponType== 1?'active':''">可用优惠券</a>
      <a @click="tab(2)" :class="couponType== 2?'active':''">已使用</a>
      <a @click="tab(3)" :class="couponType== 3?'active':''">已过期</a>
    </div>
    <!-- 优惠券列表 -->
    <div v-show="couponType == 1">
      <ul class="user_coupon_list">
        <li v-for="item in couponList" :key="item.index">
          <div class="coupon_top">
            <div class="coupon_top_money">
              <span>¥{{ item.sub_price }}</span>
              <span>满{{ item.min_price }}元可用</span>
            </div>
            <a @click="goUseCoupon(item.couponId)" class="fr goUser">去使用>></a>
          </div>
          <div class="coupon_bottom">
            <p class="coupon_detail">品类：{{ item.name }}</p>
            <p class="coupon_time">{{ item.begin_time }} - {{ item.end_time }}</p>
          </div>
          <span class="ball_left"></span>
          <span class="ball_right"></span>
        </li>
      </ul>
      <div class="orderNull" v-if="couponList.length == 0">
        <p class="iconfont icon-wuyouhui"></p>
        <p>暂无优惠券！敬请期待！</p>
      </div>
      <div v-if="couponList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
    </div>
    <div  v-show="couponType == 2">
      <ul class="user_coupon_list">
        <li class="expired" v-for="item in couponList" :key="item.index">
          <div class="coupon_top">
            <div class="coupon_top_money">
              <span>¥{{ item.sub_price }}</span>
              <span>满{{ item.min_price }}元可用</span>
            </div>
          </div>
          <div class="coupon_bottom">
            <p class="coupon_detail">品类：{{ item.name }}</p>
            <p class="coupon_time">{{ item.begin_time }} - {{ item.end_time }}</p>
          </div>
          <span class="ball_left"></span>
          <span class="ball_right"></span>
        </li>
      </ul>
      <div class="orderNull" v-if="couponList.length == 0">
        <p class="iconfont icon-wuyouhui"></p>
        <p>暂无已使用的优惠券！</p>
      </div>
       <div v-if="couponList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
    </div>
    <div  v-show="couponType == 3">
      <ul class="user_coupon_list">
        <li class="expired expiredTow" v-for="item in couponList" :key="item.index">
          <div class="coupon_top">
            <div class="coupon_top_money">
              <span>¥{{ item.sub_price }}</span>
              <span>满{{ item.min_price }}元可用</span>
            </div>
          </div>
          <div class="coupon_bottom">
            <p class="coupon_detail">品类：{{ item.name }}</p>
            <p class="coupon_time">{{ item.begin_time }} - {{ item.end_time }}</p>
          </div>
          <span class="ball_left"></span>
          <span class="ball_right"></span>
        </li>
      </ul>
      <div class="orderNull" v-if="couponList.length == 0">
        <p class="iconfont icon-wuyouhui"></p>
        <p>暂无已过期的优惠券！</p>
      </div>
       <div v-if="couponList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
    </div>
  </div>
</template>

<script>
import { getCouponList } from '../../api/index.js'
export default {
  data () {
    return {
      couponType: 1,
      couponList:[],//优惠券列表
      page:0,
      limit:10,
      totalPage:0,//总条数
    }
  },
  created(){
    this.getCollection()
  },
  methods: {
    // tab切换
    tab (index) {
      this.couponType = index
      this.page = 0
      this.getCollection()
    },
     //获取当前页码
    getCurrentPage(pageNum){
      this.page = pageNum-1;
      this.getCollection()
    },
    // 获取优惠券列表
    getCollection(){
      let params = {
        couponType:this.couponType,
        page : this.page,
        limit: this.limit
      }
      getCouponList(params).then(res=>{
        console.log(res)
        if(res.code == 0){
          this.couponList = res.data.list
          this.totalPage = parseInt(res.data.total_num)
        }
      })
    },
    // 去使用优惠券
    goUseCoupon(id){
      this.$router.push({ name:'ACouponList',query:{ couponId: id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.user_coupon {
  // height: 1052px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  h2 {
    font-size: 24px;
    color: #666;
    line-height: 36px;
    margin-bottom: 30px;
  }
  // 优惠券导航
  .user_coupon_nav {
    height: 38px;
    border-bottom: 1px solid #e0e0e0;
    a {
      font-size: 16px;
      color: #666;
      padding: 0 20px;
    }
    a:first-child {
      border-right: 1px solid #e0e0e0;
      padding-left: 0;
    }
    .active {
      color: #e51818;
    }
  }
  // 优惠券列表
  .user_coupon_list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    li {
      width: 290px;
      height: 188px;
      background-image: url('../../assets/images/user/coupon1.png');
      border-radius: 15px;
      margin-bottom: 20px;
      margin-right: 2%;
      .coupon_top {
        height: 46%;
      }
      .coupon_top {
        position: relative;
        .coupon_num {
          font-size: 16px;
          position: absolute;
          color: rgba(144, 4, 24, 0.55);
          top: 15px;
          right: 15px;
        }
        .coupon_top_money {
          color: #fff;
          font-size: 16px;
          display: flex;
          align-items: flex-end;
          padding-top: 25px;
          padding-left: 25px;
          span:first-child {
            display: inline-block;
            font-size: 30px;
            margin-right: 10px;
            margin-bottom: 5px;
          }
          span:last-child {
            color: #fecccc;
          }
        }
        .goUser{
          color: #fff;
          padding-right: 20px;
        }
      }
      .coupon_bottom {
        margin: 25px 0 0 20px;
        font-size: 16px;
        color: rgba(99, 10, 25, 0.9);
        .coupon_detail {
          margin-bottom: 15px;
          @include p-common;
        }
      }
      &:nth-child(3n){
        margin-right: 0; 
      }
    }
    .expired {
      background-image: url('../../assets/images/user/coupon2.png');
      .coupon_num {
        color: rgba(36, 36, 36, 0.55);
      }
      .coupon_bottom {
        color: rgba(191, 191, 191, 0.79);
      }
    }
    .expiredTow{
      background-image: url('../../assets/images/user/coupon3.png');
    }
  }
  //空内容
  .orderNull{
    text-align: center;
    margin-top: 50px;
    .icon-wuyouhui{
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
</style>
