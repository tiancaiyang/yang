<template>
  <div class="goods_list">
    <div>

    </div>
    <div class="goods_list_content">

      <!-- 时间筛选栏 -->
      <div class="time_limit" v-if=" this.class_id == 3">
        <!-- 时间筛选器 -->
        <div class="limit_box">
          <div class="check_in_picker">
            <span class="check_in">入住 </span>
            <el-date-picker type="date" v-model=" start_time" placeholder="选择日期" :picker-options="expireTimeOption"
              class="picker_box" @change="gettime" :clearable="false"></el-date-picker>
          </div>
          <span>至</span>
          <div class="check_in_picker">
            <span class="check_in">离店</span>
            <el-date-picker type="date" v-model="end_time" placeholder="选择日期" :picker-options="expireTimeOption" class="picker_box"
              @change="gettime" :clearable="false"></el-date-picker>
          </div>
          <span class="total_time" v-if="flag">共 {{ days }} 晚</span>
        </div>
        <!-- 搜索按钮 -->
        <el-button class="search_btn" v-model="getData" @click="getSearch">搜索</el-button>
      </div>
      <!-- 所有的列表内容 -->
      <div class="goods_list_all">
        <!-- 价格排序 -->
        <div class="price_limit">
          <span>共 {{storeList.length}} 家</span>
          <el-button round class="price_limit_btn" @click="getSort()">价格排序<span class="el-icon-arrow-down"></span></el-button>
        </div>
        <!-- 列表盒子 -->
        <ul>
          <li v-for="item in searchData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="item.index">
            <!-- <li v-for="item in storeList" :key="item.index"> -->
            <!-- {{item.brand_member_id}} -->
            <div class="goods_details_box">
              <div class="img_box">
                <img :src="item.thumb">
              </div>
              <div class="box_right">
                <h2>{{item.brand_store_name}}</h2>
                <div class="foods_rate">
                  <el-rate v-model="score" disabled text-color="#ff9900"></el-rate>
                  <span> {{parseInt(item.assess_score)}}分</span>
                </div>
                <div class="food_details">
                  <span>[ {{item.street}} ]</span>
                  <ul>
                    <li>{{item.title}}</li>

                  </ul>
                </div>
                <p class="goods_price">¥ {{item.price}}起</p>
              </div>
            </div>
            <router-link :to="{path:'./RDetailsStore',query:{brand_member_id:item.brand_member_id}}">
              <a href="javascript:;">
                <el-button class="reserve_btn" round>立即预定</el-button>
              </a>
            </router-link>



          </li>

        </ul>
        <!-- 分页 -->

        <paging :pagesize="pagesize" :currentPage="currentPage" :total="totalPage" @listen="getchild" :currentP="currentP"></paging>
      </div>
    </div>
  </div>
</template>

<script>
  import paging from '../../components/paging.vue'
  import {
    ruralcatProductList,
    ruralsearchProductList
  } from '../../api/index.js'
  export default {
    components: {
      paging
    },
    props: ['message', 'currentP'],
    computed: {
      // 过滤搜索
      searchData: function (search) {
        // search = this.message;
        // search = search.toString().trim();
        // if (search) {
        //   return this.storeList.filter(function (storeList) {
        //     return Object.keys(storeList).some(function (key) {
        //       return String(storeList[key]).toLowerCase().indexOf(search) > -1
        //     })
        //   })
        // }
        return this.storeList
      },

    },
    inject: ['reload'],
    data() {
      return {
        expireTimeOption: {
          disabledDate(date) { //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return date.getTime() - 1 < Date.now() - 8.64e7;
          }
        },
        flag: false,
        current_time: '', //当前时间
        start_time: '', //入住时间
        end_time: '', //离开时间
        days: 0, //总共的天数
        score: 5,
        address_id: this.$route.query.address_id, //景点id
        class_id: this.$route.query.class_id, //分类id
        sort_type: this.$route.query.sort_type, //排序
        storeList: [], //接口数据
        totalPage: 0, //总共有多少数据
        currentPage: "1", //当前页
        pagesize: 3, //每一页的个数
        search: '', //搜索内容
        brand_member_id: 2,
        isRouterAlive: true,

      }
    },
    created() {
      this.getLists();
    },
    mounted() {
      this.class_id = this.$route.query.class_id;
      this.sort_type = this.$route.query.sort_type;
      this.getLists();
    },
    watch: {
      $route() {
        this.class_id = this.$route.query.class_id;
        this.sort_type = this.$route.query.sort_type;
      },
      class_id() {
        this.getLists()
      },
      sort_type(val) {
        this.sort_type = val;
        console.log('+++' + this.sort_type);
      }
    },
    methods: {
      //获取从分页组件传过来的当前页码
      getchild(data) {
        this.currentPage = data; //当前页的值
      },


      getData(address_id, class_id, search, start_time, end_time) {

        address_id = this.address_id;
        class_id = this.class_id;
        start_time = this.start_time;
        end_time = this.end_time;
        search = this.message;


        if (search != '' || address_id != '' || class_id != '' || start_time != '' || end_time != '') {
          return this.storeList.filter(function (storeList) {
            return Object.keys(storeList).some(function (key) {
              return String(storeList[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }

        return this.storeList;

      },
      // 首页
      firstPage() {
        this.currentPage = 1;
      },
      lastPage() {
        this.currentPage = this.totalPage / this.pagesize;
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        // console.log(`当前页: ${val}`);
      },

      // 接口数据获取
      getLists() {
        let params = {
          address_id: this.address_id,
          class_id: this.class_id,
          sort_type: this.sort_type,
        }
        ruralcatProductList(params).then(res => {
          if (res.code === 0) {
            console.log(res);
            this.storeList = res.data.list;
            this.totalPage = res.data.list.length;
          }
        })
      },
      //时间戳进行计算
      gettime(val) {
        if (this.start_time != '' && this.end_time != '') {
          if (this.end_time < this.start_time) {
            this.$message({
              message: '请输入离开的时间大于入住的时间',
              type: 'error'
            });
            this.start_time = this.end_time = this.days = '';
          } else {
            this.days = parseInt((new Date(this.end_time)) - (new Date(this.start_time)));
            if (typeof (this.days) === NaN) {
              return flag = false;
            }
            let dd = parseInt(this.days / 1000 / 60 / 60 / 24);
            this.days = dd + 1;
            this.flag = true;
          }


        }



      },
      // 排序问题
      getSort() {
        if (this.sort_type == 1) {
          this.sort_type = 2;
        } else if (this.sort_type == 2) {
          this.sort_type = 1;
        }

        this.$router.push({
          path: "RDetailsList",
          query: {
            address_id: this.address_id,
            sort_type: this.sort_type,
            class_id: this.class_id
          }
        })
        this.$emit('listenClass_id', this.class_id);
      },
      // 搜索接口
      getruralsearchProductList() {
        if (this.message == '') {
          this.$message({
            message: '搜索不能为空',
            type: 'error'
          })
        } else {
          let params = {
            address_id: this.address_id,
            class_id: this.class_id,
            search: this.message,
            stay_begin: this.start_time,
            stay_end: this.end_time,
          };
          ruralsearchProductList(params).then(res => {
            if(res.data.length == 0){
              this.$message({
                message:'没有此商品',
                type:'error'
              })
            }else{
              //  console.log(res)
              this.storeList = res.data;
              this.totalPage = res.data.length;
            }

          })
        }



      },
      // 搜索按钮
      getSearch() {
         if (this.message.trim() == '') {
          this.$message({
            message: '搜索不能为空',
            type: 'error'
          })
        }else{
            this.getruralsearchProductList();
        }

      }
    }

  }

</script>

<style lang="scss" scoped>
  .goods_list {

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
        background-color: #fff;

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
