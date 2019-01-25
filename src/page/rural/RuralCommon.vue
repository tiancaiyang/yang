<template>
  <div class="rural_home">
    <header-top v-if="isRouterAlive" ></header-top>
    <!-- 页面头部 -->
    <div class="page_header">
      <div class="page_header_box banxin">
        <!-- 头部的上半部分 -->
        <div class="page_header_t">
          <div class="title_box">
            <div class="title_img" @click="goRural()"></div>
            <router-link to="./RAddress">
              <span v-if="!accFlag" @click="tabChange(0)"> {{township}}</span>

              <span class="el-icon-arrow-down"></span>
            </router-link>
          </div>
          <div class="search_box">
            <input type="search" v-model="searchlist" @keyup.enter="searchAll">
            <span class="el-icon-search" :search="keyWords" @click="searchAll"></span>
          </div>
        </div>
        <!-- 头部tabs栏 -->
        <div class="nav_tabs">
          <ul>
            <li :class="num == 0?'tabs_active':''" @click="tabChange(0)">
              <span class="iconfont icon-zhuye"></span>
              <span>首页</span>
            </li>
            <li :class="num == 1?'tabs_active':''" @click="tabChange(1)">
              <span class="iconfont icon-nongchan"></span>
              <span>土特产</span>
            </li>
            <li :class="num == 2?'tabs_active':''" @click="tabChange(2)">
              <span class="iconfont icon--jirou"></span>
              <span>农家菜</span>
            </li>
            <li :class="num == 3?'tabs_active':''" @click="tabChange(3)">
              <span class="iconfont icon-minsuwenhua"></span>
              <span>民宿屋</span>
            </li>
            <li :class="num == 4?'tabs_active':''" @click="tabChange(4)">
              <span class="iconfont icon-menpiao_gujiyizhi"></span>
              <span>当地游</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 页面主要内容显示区域 -->
    <div class="rural_content banxin">
      <router-view v-if="isRouterAlive" :message="searchlist" @listenParent="getParent" :count="num" :address="address_id"
        @address="getAddress" @addArr="getAdd" :Lonlat1='lonlat' :searchData="searchData" :currentP="currentP"
        :search_all_list='search_all_list' @listenClass_id='getIndex'></router-view>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
  import {
    ruralXcIndex,
    ruralsearchStoreProductList
  } from "../../api/index.js"
  export default {
    provide: {
      return: {
        reload: this.reload,
      }
    },
    data() {
      return {
        // switch_lonlat: "",
        // Lonlat: "",
        flag: false,
        township: '', //乡镇名
        city: '', //城市名
        district: '', //省市名
        initials: '', //首字母
        lonlat: '', //坐标
        towncode: '', //城市代码
        currentP: "", //当前页为1

        food_store_list: [], //接口数据
        searchlist: "",
        num: 0,
        isRouterAlive: true,
        address_id: "", //地址id
        class_id: '', //分类id
        keyWords: '', //搜索内容
        addressList: [], //地址列表
        right_data: [], //地址右侧
        accessed: '', //地址
        accFlag: false,
        search_all_list: [],
        sort_type: '2',
      }
    },
    created() {
      this.getruralXcIndex();
      // console.log(this.num)
    },
    methods: {
      // 搜索所有的内容
      searchAll() {
        this.getruralsearchStoreProductList();
      },
      // logo回首页
      goRural() {
        this.$router.push('/rural');
      },
      // 获取子组件传过来的分页值
      getParent(data) {
        // console.log(data);
        this.num = data;
        // console.log(this.num);

      },

      //接受乡镇地址
      getAddress(data) {
        // console.log(data);
        this.township = data.township;
        if (this.township == '') {
          this.accFlag = false;
          this.township = this.accessed;
        }
        // this.township = localStorage.getItem("accessed")
        this.city = data.city;
        this.district = data.district;
        this.initials = data.initials;
        this.lonlat = data.lonlat;
        // console.log(this.lonlat)
        this.towncode = data.towncode;

      },
      //接受乡镇地址
      getAdd(data) {
        this.township = data;
      },
      // 接收接口数据
      getruralXcIndex() {
        let params = {
          // switch_lonlat: this.switch_lonlat,
          lonlat: this.lonlat,
        }
        ruralXcIndex(params).then(res => {
          if (res.code === 0) {
            this.address_id = res.data.address_id;
            let township = localStorage.getItem("accessed");
            // console.log(township);
            if (township != null) {
              this.township = township;
            } else {
              this.township = res.data.township;
            }
            this.food_store_list = res.data.food_store_list;
          }
        })

      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
      // 接收排序传过来的tab栏的值
      getIndex(data) {
        this.num = data;
        console.log('----')
        console.log(this.num);
        this.reload();
      },
      getCart(){
        console.log('123456')
        this.reload();
      },
      tabChange(index) {
        this.num = index;
        if (this.num == 0) {
          this.$router.push("/rural/RHomePage");
        } else if (this.num == 1) {
          this.reload();
          this.$router.push({
            path: "RGoodListd",
            query: {
              address_id: this.address_id,
              class_id: this.num,
              page: 1,
              limit: 10,
            }
          })
        } else if (this.num == 2) {
          this.reload();
          this.currentP = '1',
            this.$router.push({
              path: "RDetailsList",
              query: {
                address_id: this.address_id,
                sort_type: this.sort_type,
                class_id: this.num
              }
            })
        } else if (this.num == 3) {
          this.currentP = '1',
            this.reload();
          this.$router.push({
            path: "RDetailsList",
            query: {
              address_id: this.address_id,
              sort_type: this.sort_type,
              class_id: this.num
            }
          })
          // console.log(this.num);
        } else if (this.num == 4) {
          this.reload();
          this.currentP = '1',
            this.$router.push({
              path: "RDetailsList",
              query: {
                address_id: this.address_id,
                sort_type: this.sort_type,
                class_id: this.num
              }
            })
        }
      },
      //接受搜索数据的接口
      getruralsearchStoreProductList() {
        this.searchlist = this.searchlist.toString().trim();
        if (this.searchlist == '') {
          this.$message({
            message: '不能为空',
            type: 'error'
          })
        } else {
          let params = {
            address_id: this.address_id,
            search: this.searchlist
          }
          ruralsearchStoreProductList(params).then(res => {
            // console.log(res);

            if (res.data.length == 0) {
              this.$message({
                message: '没有该商品,请重新输入',
                type: 'error'
              })
            } else {
              this.search_all_list = res.data;
              let params = {
                address_id: this.address_id,
              }
              this.$router.push({
                path: './search',
                query: params
              })
            }

          })
        }

      },


    },
    computed: {
      // 计算属性监听搜索框内容的变化
      searchData: function (search) {
        //逻辑-->根据input的value值筛选goodsList中的数据
        var arrByZM = []; //声明一个空数组来存放数据
        for (var i = 0; i < this.food_store_list.length; i++) {
          //for循环数据中的每一项（根据name值）
          if (this.food_store_list[i].brand_store_name.search(this.searchlist) != -1) {
            //判断输入框中的值是否可以匹配到数据，如果匹配成功
            arrByZM.push(this.food_store_list[i]);
            //向空数组中添加数据
          }
        }
        //一定要记得返回筛选后的数据
        return arrByZM;
      },
    },
  }

</script>

<style lang="scss" scoped>
  .rural_home {
    background-color: #eaeaea;

    // 页面头部
    .page_header {
      height: 256px;
      background: url('../../assets/rural/head-bg.png');

      .page_header_box {

        // 头部的上半部分
        .page_header_t {
          display: flex;
          justify-content: space-between;
          padding-top: 73px;

          .title_box {
            display: flex;
            align-items: center;

            .title_img {
              width: 172px;
              height: 41px;
              background: url('../../assets/rural/xchl.png');
              margin-right: 40px;
              // margin-bottom: 10px;

              &:hover {
                cursor: pointer;
              }
            }

            a {
              color: #fff;
              font-size: 20px;

              span {
                margin-left: 10px;
              }
            }
          }

          .search_box {
            width: 384px;
            height: 46px;
            border-radius: 23px;
            background-color: #fff;
            display: flex;
            align-items: center;

            input {
              outline: none;
              border: none;
              width: 340px;
              height: 46px;
              padding-left: 30px;
              border-radius: 23px;
              font-size: 16px;
              color: #333;
            }

            span {
              font-size: 25px;
              color: #999;
            }
          }
        }

        // 头部tabs栏
        .nav_tabs {
          height: 82px;
          background-color: #1d9e6e;
          margin-top: 55px;

          ul {
            display: flex;
            align-items: center;

            .iconfont {
              font-size: 30px;
            }

            li {
              width: 20%;
              height: 82px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;

              &:hover {
                cursor: pointer;
              }

              img {
                margin-bottom: 12px;
              }

              span {
                font-size: 18px;
                color: #fff;
                margin-bottom: 6px;
              }

              &:after {
                content: "";
                width: 1px;
                height: 34px;
                background-color: #138057;
                position: absolute;
                top: 24px;
                right: 0;
              }

              &:last-child:after {
                display: none;
              }
            }

            .tabs_active {
              background-color: #23b57e;
              position: relative;

              &:after {
                display: none;
              }
            }
          }
        }
      }
    }


  }

</style>
