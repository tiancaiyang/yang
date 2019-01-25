<template>
  <!-- 所有页面的公共头部 -->
  <div class="headert_top_box">
    <div class="headert_top banxin">
      <ul class="headert_top_l">
        <router-link to="/" tag="li">欢迎来到掌柜当家 !</router-link>
        <router-link to="/one/user/ApplyBusiness" tag="li">商家入驻</router-link>
        <li><span class="el-icon-location"></span>{{ city }}</li>
      </ul>
      <ul class="headert_top_r">
        <li class="user_center" v-if="isToken">
          {{ nichenName }}<span class="el-icon-arrow-down"></span>
          <div>
            <router-link to="/one/user" tag="a">个人中心</router-link>
            <a @click="goOutLogoin">退出登录</a>
          </div>
        </li>
        <li class="user_center_Nistoken" v-else-if="!isToken">
          <router-link to="/two/Login" tag="a">登录</router-link>/<router-link to="/two/Register" tag="a">注册</router-link>
        </li>

        <router-link to="/one/user/OrderPerson/OrderAll" tag="li" v-if="isToken">我的订单</router-link>
        <li v-else-if="!isToken" @click="tipis">我的订单</li>

        <router-link to="/one/user/NewsNotification" tag="li"><span class="el-icon-bell"></span>消息通知</router-link>

        <li class="shop_car" v-if="isToken">
          <span class="iconfont icon-shopcart" @mouseenter="goCart"></span>购物车
          <div class="shop_car_show" >
            <ul>
              <li v-for="item in miniCartList" :key="item.index">
                <img :src="item.thumb" alt="">
                <div class="shopName">
                  {{ item.title }}
                </div>
                <div class="shopPrice">
                  <p>¥ {{ item.price }} ×{{ item.num }}</p>
                </div>
              </li>
              <li class="shopBottomLi">
                <div class="shopBottom">
                  <a v-if="!isToken" @click="tipis" class="goShopCar" href="javascript:void(0);">去购物车</a>
                  <a v-else-if="isToken" class="goShopCar" @click="goShopCar">
                    <!-- <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-konggouwuche1"></use>
                    </svg> -->
                    去购物车
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li class="" v-else-if="!isToken" @click="tipis"><span class="el-icon-goods"></span>购物车</li>

      </ul>
    </div>
  </div>
</template>

<script>
  import {
    getMiNiCart,
    getUserInfo
  } from '../api/index.js'
  export default {
    inject: ['reload'],
    data() {
      return {
        city: '',
        nichenName: '', //昵称
        isToken: false, //用于判断token是否存在
        miniCartList: [], //购物车列表
      }
    },
    created() {
      var that = this
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            that.city = result.city
          }
        })
        // this.reload();
      });
      // 检测是否登录
      var token = localStorage.getItem('token');
      if (token) {
        this.isToken = true
      } else {
        this.isToken = false
      }
      this.getCart()
      this.GetUserInfo()
      // this.reload();
    },
    methods: {
      // 鼠标放到购物车时触发的事件
      goCart() {
        // this.reload();
      },
      tipis() {
        this.$message({
          message: '您还未登录，请先登录。',
          type: 'warning'
        });
      },
      getCart() {
        getMiNiCart().then(res => {
          if (res.code == 0) {
            this.miniCartList = res.data
          }
        })
        // this.reload();
      },
      // 跳转至购物车
      goShopCar() {
        this.$router.push({
          name: 'AShopCar'
        })
      },
      // 获取个人信息
      GetUserInfo() {
        getUserInfo().then(res => {
          if (res.code == 0) {
            if (res.data.nickname == '') {
              this.nichenName = res.data.mobile
            } else {
              this.nichenName = res.data.nickname
            }
          }
        })
      },
      // 退出登录
      goOutLogoin() {
        localStorage.clear()
        this.$router.push({
          name: 'Login'
        })
      }

    }

  }

</script>

<style lang="scss" scoped>
  .headert_top_box {
    width: 100%;
    background-color: #e3e3e3;

    .headert_top {
      display: flex;
      justify-content: space-between;

      .headert_top_l,
      .headert_top_r {
        display: flex;

        // justify-content: space-between;
        >li {
          padding: 14px 20px;
          font-size: 14px;
          color: #666;
          position: relative;

          &:after {
            content: "";
            width: 1px;
            height: 14px;
            position: absolute;
            background-color: #b0b0b0;
            top: 14px;
            right: -1px;
          }

          .el-icon-location,
          .el-icon-goods,
          .el-icon-bell {
            padding-right: 4px;
            color: #e51818;
          }

          .el-icon-arrow-down {
            padding-left: 4px;
          }
        }

        >li:last-child:after {
          display: none;
        }

        >li:hover {
          color: #e51818;
          cursor: pointer;
        }
      }

      .headert_top_l {
        li:first-child {
          padding-left: 0;
        }
      }

      .headert_top_r {
        .user_center {
          position: relative;

          &:hover {
            background-color: #fff;
            color: #666;

            &:after {
              display: none;
            }

            div {
              display: block;

              a:hover {
                color: #e51818;
              }
            }
          }

          div {
            width: 100%;
            display: none;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-top: none;
            position: absolute;
            top: 41px;
            left: -1px;
            z-index: 9999;

            a {
              display: block;
              height: 38px;
              text-align: center;
              line-height: 38px;
            }
          }
        }

        // 当未登录时
        .user_center_Nistoken {
          &:hover {
            color: #666;
          }

          a:hover {
            color: #e51818;
          }
        }

        .shop_car {
          position: relative;
          z-index: 999;
          margin-top: -3px;

          .iconfont {
            color: #e51818;
            font-size: 15px;
            margin-right: 5px;

          }

          &:hover {
            background-color: #fff;

            ul {
              display: block;
            }
          }

          ul {
            position: absolute;
            width: 326px;
            display: none;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-top: none;
            top: 42px;
            right: -1px;

            li {
              margin: 17px 15px 0;
              padding-bottom: 17px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #e0e0e0;
              box-sizing: border-box;

              img {
                max-width: 54px;
                max-height: 54px;
                border: 1px solid #ececec;
              }

              .shopName {
                width: 120px;
                font-size: 14px;
                color: #999;
              }

              .shopPrice {
                p {
                  font-weight: bold;
                  font-size: 14px;
                  color: #666;
                  margin-bottom: 15px;
                }
              }
            }

            li:nth-child(3) {
              border-bottom: 0;
            }

            .shopBottomLi {
              margin: 0;
              padding: 0;

              .shopBottom {
                width: 100%;
                height: 52px;
                line-height: 52px;
                padding: 0 15px;
                background-color: #f5f5f5;
                text-align: right;

                .goShopCar {
                  font-size: 14px;
                  color: #fff;
                  padding: 10px 20px;
                  border-radius: 8px;
                  background-color: #e51818;
                  text-align: right;
                }
              }
            }

          }
        }
      }
    }
  }

</style>
