<template>
  <div class="goods_list">
    <div class="goods_list_content">
      <!-- 所有的列表内容 -->
      <div class="goods_list_all">

        <!-- 列表盒子 -->
        <ul>
          <li v-for="item in search_all_list" :key="item.index">

            <div class="goods_details_box">
              <div class="img_box">
                <img :src="item.thumb">
              </div>
              <div class="box_right">
                <h2>{{item.brand_store_name}}</h2>
                <div class="foods_rate">
                  <el-rate v-model="assess_score" disabled text-color="#f88f14"></el-rate>
                  <span> {{item.assess_score}}分</span>
                </div>
                <div class="food_details">
                  <span>[ {{item.street}} ]</span>
                  <ul>
                    <li>{{item.title}}</li>

                  </ul>
                </div>
                <!-- <p class="goods_price">¥ {{item.price}}起</p> -->
              </div>
            </div>
            <router-link :to="{path:'./RDetailsStore',query:{brand_member_id:item.brand_member_id}}">
              <el-button class="reserve_btn" round>立即预定</el-button>
            </router-link>

          </li>

        </ul>
        <!-- 分页 -->

        <paging :pagesize="pagesize" :currentPage="currentPage" :total="totalPage"></paging>
      </div>
    </div>
  </div>
</template>

<script>
  import paging from '../../components/paging.vue'
  import {
    ruralcatProductList,
    ruralsearchStoreProductList
  } from '../../api/index.js'
  export default {
    components: {
      paging
    },
    props: ['message', 'searchData', 'search_all_list'],
    computed: {

    },
    data() {
      return {
        assess_score: 5,
        totalPage: this.search_all_list.length, //总共有多少数据
        currentPage: "1", //当前页
        pagesize: 20, //每一页的个数
        address_id: this.$route.query.address_id,

      }
    },

    created() {
      // this.getruralsearchStoreProductList();
      console.log(this.totalPage)
    },
    updated() {},
    mounted() {

    },

    methods: {
      // getruralsearchStoreProductList() {
      //   let params = {
      //     address_id:this.address_id ,
      //     search:this.searchData,
      //   }
      //   ruralsearchStoreProductList(params).then(res =>{
      //     this.list = res.data;
      //     console.log(params)
      //     console.log(res)
      //   })
      // }
    }

  }

</script>

<style lang="scss" scoped>
  .goods_list {
      background: #fff;
    // 面包屑导航
    .brand_nav {
      margin: 40px 0 20px 0;

      & /deep/ .brand_nav_box {
        font-size: 16px;
        color: #666;
      }
    }

    .goods_list_content {
      border: 1px solid #eaeaea;

      // 时间筛选栏
      .time_limit {
        height: 88px;
        background-color: #e5e5e5;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        // 时间筛选器
        .limit_box {
          display: flex;
          align-items: center;

          .check_in_picker {
            position: relative;
            width: 260px;
            height: 48px;

            .check_in {
              font-size: 16px;
              color: #999;
              position: absolute;
              top: 15px;
              left: 20px;
              z-index: 99;
            }

            & /deep/ .picker_box {
              width: 260px;
              height: 48px;

              .el-input__inner {
                padding-left: 65px;
                height: 48px;
              }

              .el-input__prefix {
                top: 1px;
                left: 220px;

                .el-icon-date::before {
                  font-size: 18px;
                  color: #1d9e6e;
                }
              }
            }
          }

          >span {
            font-size: 16px;
            color: #999;
            margin: 0 30px;
          }
        }

        // 搜索按钮
        .search_btn {
          width: 170px;
          height: 48px;
          background-color: #23b57e;
          color: #fefefe;
          font-size: 16px;
        }
      }

      // 所有的列表内容
      .goods_list_all {
        padding: 0 20px 20px 20px;
        box-sizing: border-box;

        // 价格排序
        .price_limit {
          padding: 20px 0 25px 0;
          border-bottom: 1px solid #eaeaea;
          font-size: 16px;
          color: #666;

          .price_limit_btn {
            font-size: 16px;
            color: #1d9e6e;
            background-color: rgba(29, 158, 110, .3);
            margin-left: 25px;

            span {
              margin-left: 6px;
            }
          }
        }

        // 列表盒子
        >ul {
          margin-top: 10px;

          >li {
            height: 203px;
            border-bottom: 1px solid #eaeaea;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .goods_details_box {
              display: flex;

              .img_box {
                width: 226px;
                height: 144px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                  max-width: 226px;
                  max-height: 144px;
                }
              }

              .box_right {
                margin-left: 20px;

                h2 {
                  font-size: 24px;
                  color: #333;
                  font-weight: 700px;
                }

                .foods_rate {
                  display: flex;
                  align-items: center;
                  margin: 20px 0;

                  .el-rate {
                    .el-rate__item {
                      color: #f88f14;
                    }
                  }

                  span {
                    margin-left: 5px;
                    color: #f88f14;
                  }
                }

                .food_details {
                  display: flex;
                  align-items: center;

                  ul {
                    display: flex;
                    align-items: center;

                    li {
                      position: relative;
                      padding: 0 10px;

                      &::after {
                        content: "";
                        width: 2px;
                        height: 17px;
                        background-color: #666;
                        position: absolute;
                        top: 0;
                        right: 0;
                      }

                      &:last-child:after {
                        display: none;
                      }
                    }
                  }
                }

                .goods_price {
                  margin-top: 21px;
                  font-size: 24px;
                  color: #f88f14;
                }
              }
            }

            .reserve_btn {
              width: 170px;
              height: 48px;
              background-color: #23b57e;
              color: #fefefe;
              font-size: 16px;
              border-radius: 24px;
            }
          }
        }

        // 分页
        .paging {
          display: flex;
          width: 1182px;
          height: 171px;
          margin: auto;

          .paging_box {
            margin: auto;
            display: flex;

            a {
              margin-top: 10px;
              margin-right: 10px;
              display: inline-block;
              color: #666666;

            }

            & /deep/ .el-pager li.active {
              color: #fff;
              background: #23b57e
            }
          }

        }
      }
    }
  }

</style>
