<template>
  <div class="quick_bar">
    <ul class="quick_Ul">
      <!-- <li v-if="!isToken" @click="jumpShopCart"><span class="iconfont icon-shopcart"></span></li>
      <router-link to="/common/AShopCar" tag="li" v-else-if="isToken"><span class="iconfont icon-shopcart"></span></router-link>
      <li v-if="!isToken" @click="jumpShopCart"><span class="iconfont icon-contact"></span></li>
      <router-link to="/one/user/MyCenter" v-else-if="isToken" tag="li"><span class="iconfont icon-contact"></span></router-link>
      <router-link to="/copyCommon/NCustomerTelephone" tag="li"><span class="iconfont icon-kefu"></span></router-link>
      <li @click="goTop" ref="btn"><span class="iconfont icon-fanhuidingbu"></span></li> -->
      <li v-if="!isToken" @click="jumpShopCart">
        <span class="iconfont icon-shopcart"></span>
      </li>
      <router-link to="/common/AShopCar" tag="li" v-else-if="isToken">
        <span class="iconfont icon-shopcart"></span>
      </router-link>
      <li v-if="!isToken" @click="jumpShopCart">
        <span class="iconfont icon-gerenzhongxin_fuzhi"></span>
      </li>
      <router-link to="/one/user/MyCenter" v-else-if="isToken" tag="li">
        <span class="iconfont icon-gerenzhongxin_fuzhi"></span>
      </router-link>
      <router-link to="/copyCommon/NCustomerTelephone" tag="li">
        <span class="iconfont icon-kefu_fuzhi"></span>
      </router-link>
      <li @click="goTop" ref="btn">
        <span class="iconfont icon-fanhuidingbu"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isTop: true,
        timer: null,
        isToken: false, //用于判断token是否存在
      }
    },
    created() {
      // 检测是否登录
      var token = localStorage.getItem('token');
      if (token) {
        this.isToken = true
      } else {
        this.isToken = false
      }
    },
    mounted() {
      this.needScroll()
    },
    methods: {
      needScroll() {
        let clientHeight = document.documentElement.clientHeight
        let obtn = this.$refs.btn
        window.onscroll = function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          if (osTop >= clientHeight) {
            obtn.style.display = 'block'
          } else {
            obtn.style.display = 'none'
          }
          if (!this.isTop) {
            clearInterval(this.timer)
          }
          this.isTop = false
        }
      },
      goTop() {
        let that = this
        that.timer = setInterval(function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          that.isTop = true
          if (osTop == 0) {
            clearInterval(that.timer)
          }
        }, 30)
      },
      // 跳转到购物车
      jumpShopCart() {
        this.$message({
          message: '您还没有登录哦！',
          type: 'warning'
        });
      }
      // 跳转到订单

    }
  }

</script>

<style lang="scss" scoped>
  .quick_bar {
    position: fixed;
    bottom: 100px;
    right: 50%;
    margin-right: -700px;
    width: 68px;
    z-index: 99999;

    .quick_Ul {
      border-radius: 8px 8px 0 0;

      li {
        height: 68px;
        line-height: 68px;
        text-align: center;
        background-color: rgba(157, 157, 157, .2);
        border-radius: 4px;
        font-weight: 400;

        &:hover {
          color: #fff;
          background-color: #e51818;
        }

        span {
          font-size: 22px;
        }

        &:nth-child(4) {
          margin-top: 20px;
          border-radius: 8px;
          display: none;
        }
      }
    }
  }

</style>
