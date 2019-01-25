<template>
  <div class="page_box">

    <!-- 面包屑导航 -->
    <!-- <div class="brand_nav">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="brand_nav_box banxin">
        <el-breadcrumb-item>乡村互联-乌镇</el-breadcrumb-item>
        <el-breadcrumb-item>民宿屋</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <!-- 详情显示区域 -->
    <div class="page_show_box">
      <!-- 图片显示区域 -->
      <div class="page_img_box">
        <swiper :swiperData="img"></swiper>
        <!-- <img :src=img[count]>
        <ul>
          <li v-for="(item,index) in img" :key="item" @mouseenter="showindex(index)">
            <img :src=item>
          </li>

        </ul> -->
      </div>
      <!-- 右边详情部分 -->
      <div class="page_box_right">
        <h2>[{{brand_store_name}}]{{title}}</h2>
        <div class="page_rate">
          <span>价格:</span>
          <span>¥{{price}}</span>

        </div>
        <div class="page_txt">
          <span>退订规则:</span>
          <span>{{use_rule}}</span>
        </div>
        <div class="personal_details">
          <span>有效期:</span>
          <span>截止{{term_of_validity_begin | formatDate}} 至 {{term_of_validity_end | formatDate}}</span>
        </div>
        <div class="page_time">
          <span>住店时间:</span>
          <!-- 时间筛查 -->
          <div class="all">
            <div class="select_time">
              <span class="select_normal">入住</span>
              <el-date-picker type="date" placeholder="选择日期" class="eldate" v-model="start_time" :clearable="false"
                :picker-options="pickerOptions1" format="yyyy-MM-dd" @change="gettime">
              </el-date-picker>
            </div>
            <span class="zhi">至</span>
            <div class="select_time">
              <span class="select_normal">离开</span>
              <el-date-picker type="date" placeholder="选择日期" class="eldate" v-model="end_time" :clearable="false"
                :picker-options="pickerOptions1" @change="gettime">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="page_price">
          <span>商品规格:</span>
          <span @click="selectBed" :class="selectFlag?'active':'show'">{{guide}}</span>
        </div>
        <div class="btn_box">

          <a href="javascript:;">
            <input type="button" value="立即预定" @click="goto()">
          </a>

          <a @click="collectionGoods"><span :class='collect == 2?"el-icon-star-off":"el-icon-star-on"'></span>收藏商品</a>

        </div>
      </div>
    </div>

    <!-- tabs标签页 -->
    <div class="store_box">
      <div class="box_l">
        <div class="box-l_header">
          <ul>
            <li @click="returnTop('#firstHtml')" @mouseenter="getColor(0)" @mouseleave="getCancle(3)" :class="colorIndex==0?'active':''">商品详情</li>
            <li @click="returnTop('#secondtHtml')" @mouseenter="getColor(1)" @mouseleave="getCancle(3)" :class="colorIndex==1?'active':''">预定须知</li>
            <li @click="returnTop('#pingjia')" @mouseenter="getColor(2)" @mouseleave="getCancle(3)" :class="colorIndex==2?'active':''">累计评价</li>
          </ul>
        </div>
        <!-- 房屋详情 -->
        <div class="box_l_house">

          <!-- <h1 id="shopdetail">商品详情</h1> -->
          <span id="firstHtml"></span>
          <div v-html="content" class="page_know">

          </div>
          <span id="secondtHtml"></span>
          <div v-html="content_s" class="page_know"></div>

        </div>

        <!-- 用户评价 -->
        <div v-if="assess_length ==0" class="user">
          <h1 id="pingjia">用户评价</h1>
          暂无评价
        </div>
        <div class="user" v-else="">
          <h1 id="pingjia">用户评价</h1>
          <div class="user_box" v-for="item in assess_content" :key="item.assess_content_id">
            <div class="user_photo">
              <img :src=item.head_image alt="">
            </div>
            <div class="user_content">
              <span class="user_name">{{item.username}}</span>
              <span class="user_time">5分 | {{item.assess_date}} |{{item.assess_content_date}} 评价</span>
              <p>{{item.content}}</p>

            </div>


          </div>

          <paging :pagesize="pagesize" :currentPage="currentPage" :total="totalPage" @listen="getchild" ></paging>

        </div>



      </div>
      <div class="box_r">
        <h1>其他推荐</h1>
        <ul>
          <li v-for="item in store_list" :key="item.id">
            <router-link :to="{path:'./RDetailsStore',query:{brand_member_id:item.brand_member_id}}">
              <img :src=item.thumb alt="">
              <p> {{item.brand_store_name}}</p>
              <span>¥{{ item.price }}起</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Swiper from "../../components/Swiper.vue";
  import paging from '../../components/paging.vue'
  import {
    ruralXcproductView,
    rurallocalProductView,
    publicCollect
  } from "../../api/index.js"
  export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },

        colorIndex: 0,
        count: 0,
        collectFlag: false,
        product_id: this.$route.query.product_id,
        // product_id: 2,
        assess_content: [], //评价
        assess_length: '', //评价是否有
        flag: true,
        guide: '', //规格
        term_of_validity_begin: '', //开始有效期
        term_of_validity_end: '', //结束有效期
        brand_member_id: '', //店铺id
        discount_end_time: '', //特价有效结束时间
        discount_start_time: '', //特价有效开始时间
        title: '', //商品名称
        price: '', //价格
        discount_price: '', //特价价格
        use_rule: '', //描述
        activity_type: '', //0普通  1特价
        sale: '', //销量
        brand_store_name: '', //店铺名
        collect_type: '', //是否收藏
        img: [], //轮播图
        store_list: [], //推荐
        address_id: '', //景点id
        class_id: '', //分类id
        totalPage: 0, //总共有多少数据
        currentPage: 1, //当前页
        pagesize: 3, //每一页的个数
        content: '', //规则
        content_s: '', //规则购买须知
        start_time: '', //入住时间
        end_time: '', //离开时间
        stay_day: '', //共住的时间
        id: '', //id
        type: '3', //类型
        collection_type: '1', //收藏类型
        collect: '2', //是否收藏
        selectFlag: false,

        // identity: '', //身份验证
        // isToken: false,
      }
    },
    created() {
      // var token = localStorage.getItem('token');
      // if (token) {
      //   this.isToken = true;
      // } else {
      //   this.isToken = false;
      // }
      // this.identity = localStorage.getItem('identity');
      // console.log('----')
      // console.log(this.identity)
      this.getruralXcproductView();
      this.getpubliccollect();
      this.getrurallocalProductView();

    },
    mounted() {
      this.gettime();
    },
    // 时间戳格式
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d;
      }
    },
    methods: {
      //获取从分页组件传过来的当前页码
      getchild(data) {
        this.currentPage = data; //当前页的值
      },
      // 收藏商品
      collectionGoods() {
        // console.log(123)
        if (this.collect == 1) {
          this.collect = 2 //2取消
        } else if (this.collect == 2) {
          this.collect = 1 //1收藏
        }
        let params = {
          id: this.product_id,
          collection_type: this.collection_type,
          type: '3',
          collect: this.collect,
        }
        publicCollect(params).then(res => {
          // console.log(456)
          // console.log(params)
          if (res.code == 0) {

            if (this.collect == 1) {
              this.$message({
                message: '收藏成功',
                type: 'success'
              });
            } else if (this.collect == 2) {
              this.$message({
                message: '取消收藏',
                type: 'warning'
              });
            }
          }
        })
      },
      // 跳转传参到下一个页面
      goto() {

        if (this.start_time == '' || this.end_time == '') {
          this.$message({
            message: '请选择时间',
            type: 'error'
          });
        } else if (this.guide == '') {
          this.$message({
            message: '请选择规格',
            type: 'error'
          });
        } else {
          let params = {
            guide: this.guide,
            product_id: this.product_id,
            price: this.price,
            activity_type: this.activity_type,
            title: this.title,
            discount_price: this.discount_price,
            class_id: this.class_id,
            brand_member_id: this.brand_member_id,
            stay_begin: Number(this.start_time),
            stay_end: Number(this.end_time),
            stay_day: this.stay_day,
            brand_store_name: this.brand_store_name,
            content: this.content,
            use_rule: this.use_rule,
          }
          this.$router.push({
            path: '/rural/ROrderSubmit',
            query: params

          })
        }



      },
      // 获得时间间隔
      gettime() {
        if (this.start_time != '' && this.end_time != '') {
          if (this.end_time < this.start_time) {
            this.$message({
              message: '请输入离开的时间大于入住的时间',
              type: 'error'
            });
            this.start_time = this.end_time = this.stay_day = '';
          } else {
            this.stay_day = parseInt((new Date(this.end_time)) - (new Date(this.start_time)));
            if (typeof (this.stay_day) === NaN) {
              return flag = false;
            }
            let dd = parseInt(this.stay_day / 1000 / 60 / 60 / 24);
            this.stay_day = dd + 1;
            this.flag = true;
          }
        }

      },
      selectBed() {
        this.selectFlag = !this.selectFlag;
      },
      // 改变li的颜色
      getColor(color) {
        // console.log(color)
        this.colorIndex = color;
      },
      getCancle(color) {
        this.colorIndex = color;
      },
      // 点击切换显示的图片
      showindex(index) {
        // console.log(index);
        this.count = index;
      },
      // collectBtn() {
      //   this.collectFlag = !this.collectFlag
      //   if (this.collect == '1') {
      //     this.collect = '2';
      //   } else {
      //     this.collect = '1'
      //   }
      //   this.getpubliccollect();
      //   // console.log(this.collect)
      // },
      // 锚点定位
      returnTop: function (id) {
        document.querySelector(id).scrollIntoView(true);
      },
      getruralXcproductView() {
        let params = {
          product_id: this.product_id
        }
        ruralXcproductView(params).then(res => {
          console.log(res);
          if (res.code === 0) {
            if (Object.keys(res.data.assess) == 0) {
              this.flag = false;
            }
            this.assess_content = res.data.assess.assess_content;
            this.assess_length = res.data.assess.length;
            this.brand_member_id = res.data.brand_member_id;
            if (this.assess_length != 0) {
              this.totalPage = res.data.assess.assess_content.length;
            }
            this.guide = res.data.guide;
            this.product_id = res.data.product_id;
            this.class_id = res.data.class_id;
            this.term_of_validity_begin = res.data.term_of_validity_begin;
            this.term_of_validity_end = res.data.term_of_validity_end;
            this.activity_type = res.data.activity_type;
            this.title = res.data.title;
            this.price = res.data.price;
            this.discount_end_time = res.data.discount_end_time;
            this.discount_start_time = res.data.discount_start_time;
            this.use_rule = res.data.use_rule;
            this.sale = res.data.sale;
            this.brand_store_name = res.data.brand_store_name;
            this.collect_type = res.data.collect_type;
            this.img = res.data.img;
            this.store_list = res.data.store_list;
            this.content = res.data.content;
            this.content_s = res.data.content_s;
          }
        })
      },
      getpubliccollect() {
        let params = {
          id: '2',
          type: '3',
          collection_type: '1',
          collect: this.collect
        }
        publicCollect(params).then(res => {})

      },
      // 土特产详情
      getrurallocalProductView() {
        let params = {
          product_id: this.product_id,
          discount_id: '',
        }
        rurallocalProductView(params).then(res => {
          // console.log(res.data);

        })
      }
    },
    components: {
      Swiper,
      paging
    }
  }

</script>
<style lang="scss">
  .page_box {

    // background: #000;
    .brand_nav {
      margin: 35px 0;

      & /deep/ .brand_nav_box {
        font-size: 16px;
        color: #666;
      }
    }

    .page_show_box {
      margin-top: 28px;
      width: 100%;
      height: 554px;
      border: 1px solid #eaeaea;
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;

      .page_img_box {
        width: 554px;
        height: 520px;
        border-radius: 10px;

        &:hover {
          cursor: pointer;
        }

        & /deep/ .swiperDiv {
          margin: auto;
          width: 520px;

          .swiper-wrapper {
            margin-left: 30px;

            img {
              margin: auto;
            }
          }

          .gallery-top {
            height: 100%;
          }
        }
      }

      .page_box_right {
        width: 407px;
        margin-left: 30px;

        h2 {
          font-family: PingFang-SC-Bold;
          font-size: 32px;
          color: #000000;
          margin-bottom: 30px;
        }

        .page_rate {

          width: 100%;
          height: 68px;
          padding-left: 15px;
          line-height: 68px;
          background-color: #ffddc7;


          span:first-child {
            letter-spacing: 15px;
            width: 62px;
            height: 16px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #999999;
          }

          span:last-child {
            margin-left: 20px;
            width: 68px;
            height: 22px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 28px;
            color: #ff6913;
          }
        }

        .page_txt {
          margin: 30px 0;
          margin-left: 15px;

          span:first-child {
            width: 70px;
            height: 16px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #999999;
          }

          span:last-child {
            margin-left: 20px;
            width: 142px;
            height: 18px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #333333;
          }
        }

        .personal_details {
          margin-left: 15px;

          span:first-child {
            width: 68px;
            height: 16px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            letter-spacing: 5px;
            color: #999999;
          }

          span:last-child {
            margin-left: 20px;
            width: 140px;
            height: 16px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #333333;
          }



        }

        .page_time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 30px 0;
          margin-left: 15px;

          span {
            width: 70px;
            height: 16px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #999999;
          }

          .all {
            display: flex;
            align-items: center;



            .select_time {
              position: relative;
              width: 120px;
              height: 48px;




              .select_normal {
                font-size: 16px;
                color: #999;
                position: absolute;
                top: 15px;
                left: 10px;
                z-index: 99;
              }

              & /deep/ .el-date-editor.el-input,
              .el-date-editor.el-input__inner {
                width: 160px;

                .el-input__icon {
                  right: 0;
                }

              }

              .el-input--prefix {
                .el-input__inner {
                  padding-left: 42px;
                }

                .el-input__prefix {
                  top: 3px;
                  left: 100px;

                  .el-icon-date::before {
                    font-size: 18px;
                    color: #1d9e6e;
                  }
                }
              }



            }
          }



        }

        .page_price {
          margin-left: 15px;

          span {
            &:hover {
              cursor: pointer;
            }
          }

          span:first-child {

            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #999999;
          }

          // span:last-child {
          //   // display: inline-block;
          //   // width: 162px;
          //   // height: 48px;
          //   // text-align: center;
          //   // line-height: 48px;
          //   // margin-left: 20px;
          //   // background-color: #ffffff;
          //   // border-radius: 4px;
          //   // border: solid 1px #ccc;

          // }

          & .show {
            display: inline-block;
            width: 162px;
            height: 48px;
            text-align: center;
            line-height: 48px;
            margin-left: 20px;
            background-color: #ffffff;
            border-radius: 4px;
            border: solid 1px #ccc;
          }

          & .active {
            display: inline-block;
            width: 162px;
            height: 48px;
            text-align: center;
            line-height: 48px;
            margin-left: 20px;
            background-color: #ffffff;
            border-radius: 4px;
            border: solid 1px #ccc;
            border: solid 1px #ff6913;
            color: #ff6913;
          }
        }

        .btn_box {
          margin-top: 46px;
          display: flex;
          justify-content: space-around;
          align-items: center;

          input {
            width: 284px;
            height: 60px;
            background-color: #ff6913;
            font-family: MicrosoftYaHei;
            font-size: 18px;
            border: none;
            outline: none;
            color: #ffffff;

            &:hover {
              cursor: pointer;
            }
          }

          a {
            font-size: 16px;
            color: #999999;

            span {
              color: #f88f14
            }
          }
        }
      }
    }

    .store_box {
      display: flex;
      margin-top: 31px;
      justify-content: space-between;

      .box_l {
        width: 902px;

        background-color: #ffffff;
        border: solid 1px #eaeaea;

        .box-l_header {
          width: 902px;
          height: 60px;

          ul {
            width: 852px;
            height: 78px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            box-sizing: border-box;
            margin: 0 26px;
            border-bottom: 1px solid #ccc;

            li {
              width: 102px;
              height: 78px;
              line-height: 78px;
              margin-right: 108px;
              font-family: MicrosoftYaHei;
              font-size: 22px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #333333;
              text-align: center;

              &:hover {
                cursor: pointer;
              }

            }

            .active {
              color: #23b57e;
              border-bottom: 2px solid #23b57e;
            }
          }
        }

        .box_l_house {
          margin-left: 25px;
          // height: 289px;

          h1 {
            width: 96px;
            height: 24px;
            margin-top: 29px;
            margin-bottom: 29px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
          }

          ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 700px;
            font-family: PingFang-SC-Medium;
            font-size: 18px;
            color: #333333;

            li {
              width: 350px;
              height: 20px;
              margin-bottom: 10px;
              font-size: 18px;
              line-height: 20px;
              color: #333333;
            }
          }
        }




        .page_know {
          width: 677px;
          margin-left: 10px;
          margin-top: 25px;
          margin-bottom: 39px;
          font-family: PingFang-SC-Medium;
          font-size: 18px;
          line-height: 39px;
          color: #333333;

          // &>p:first-child {
          //   // display: none;
          // }

          p {
            font-size: 18px;

          }

        }

        .user {
          width: 854px;

          // background-color: #b2b2b2;
          margin: 0 auto;
          border-top: 10px solid #f7f7f7;
          // border-bottom: 10px solid #f7f7f7;
          margin-bottom: 50px;

          h1 {
            margin-top: 36px;
            margin-bottom: 25px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            color: #333333;
          }

          .user_box {
            margin-top: 10px;
            display: flex;
            justify-content: flex-start;
            width: 850px;

            // background-color: red;

            .user_photo {
              width: 82px;
              height: 83px;
              // background: #000;
              margin-right: 20px;

              img {
                max-width: 100%;
                max-height: 100%;
              }
            }

            .user_content {
              width: 700px;
              height: 294px;
              // background: green;

              .user_name {
                width: 99px;
                height: 20px;
                font-family: MicrosoftYaHei;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333333;
              }

              .user_time {
                margin: 19px 0;
                display: block;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
              }

              p {
                font-family: MicrosoftYaHei;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #070707;
              }

              ul {
                margin-top: 20px;
                display: flex;
                justify-content: flex-start;

                li {
                  width: 105px;
                  height: 105px;
                  margin-right: 18px;

                  img {
                    max-width: 100%;
                  }
                }
              }
            }
          }
          & /deep/ .paging{
              width: 850px;
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
            height: 240px;
            margin: 0 auto;
            margin-left: 20px;

            img {
              max-width: 100%;
              width: 239px;
              height: 153px;
              background-color: #000000;
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
