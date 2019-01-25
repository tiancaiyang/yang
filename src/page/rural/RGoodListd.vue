<template>
  <div class="box banxin">
    <!-- 商品列表显示区 -->
    <ul class="goods_list_show ">

      <li v-for="item in searchData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="item.id">
        <div class="img_box">
          <a @click="gotoDetails(item.product_id,item.title)">
            <img :src=item.thumb alt="">
          </a>

        </div>
        <p class="goods_price">
          <span>¥{{item.price}}</span>
        </p>
        <p class="goods_details">
          {{item.title}}
        </p>
        <p class="pinglun">
          卖出<span>{{item.sale}}</span>件
        </p>

        <div class="shopCar">
          <a @click="addCCart(item.product_id)">
            <img src="../../assets/common/shopcar.png" alt="">
          </a>

        </div>
      </li>

    </ul>
    <!-- 分页 -->

    <paging :pagesize="pagesize" :currentPage="currentPage" :total="totalPage" @listen="getchild"></paging>
  </div>
</template>
<script>
  import paging from '../../components/paging.vue'
  import {
    rurallocalProduct,
    b2cAddCCart
  } from "../../api/index.js"
  export default {
    components: {
      paging
    },
    data() {
      return {
        product_id: '',
        // address_id: this.$route.params.address_id, //景点id
        // page: this.$route.params.page, //分类id
        // limit: this.$route.params.limit, //一页几个
        address_id: this.$route.query.address_id, //景点id
        page: this.$route.query.page, //分类id
        limit: this.$route.query.limit, //一页几个
        class_id:this.$route.query.class_id,
        goodList: [],
        totalPage: 0, //总共有多少数据
        currentPage: 1, //当前页
        pagesize: 20, //每一页的个数

        num1: '2', //购买数量
        spec: '', //
        product_attr: '', //
        type: '3', //
      }
    },
    created() {
      this.getrurallocalProduct();
    },
    computed: {
      searchData: function (search) {
        search = this.message;
        if (search) {
          return this.goodList.filter(function (goodList) {
            return Object.keys(goodList).some(function (key) {
              return String(goodList[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }

        return this.goodList;
      }
    },
    methods: {
      // 跳转到土特产详情页面
      gotoDetails(val, key) {
        let params = {
          product_id: val,
          title: key,
          class_id:this.class_id,
        }

        this.$router.push({
          path: './RLocalProduct',
          query: params
        })
      },
      getchild(data) {
        // console.log(data);
        this.currentPage = data;
      },
      // 接口进行接收值
      getrurallocalProduct() {
        let params = {
          address_id: this.address_id,
          page: this.page,
          limit: this.limit
        }
        rurallocalProduct(params).then(res => {
          console.log(res.data);
          if (res.code === 0) {
            this.goodList = res.data.list;
            this.totalPage = res.data.list.length;
          }
        })
      },
      // 加入购物车
      addCCart(data) {
        this.$router.push({
          path: './RLocalProduct',
          query: {
            product_id: data,
            class_id:this.class_id,
          }
        });
        // console.log(this.class_id)
      }
    },
  }

</script>
<style lang="scss" scoped>
  .box {
    margin-top: 20px;
    height: 1000px;

    .goods_list_show {
      width: 1200px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      li {
        box-sizing: border-box;
        margin-right: 10px;
        margin-bottom: 12px;
        width: 232px;
        height: 420px;
        background-color: #ffffff;
        border: solid 1px #dddddd;

        &:nth-of-type(-5n+5) {
          margin-right: 0;
        }

        .img_box {
          margin: 10px;
          margin-bottom: 16px;
          width: 200px;
          height: 220px;
          // background-color: #d6d6d6;

          img {
            max-height: 100%;
            max-width: 100%;
          }
        }

        .goods_price {
          margin-left: 10px;

          span {
            width: 30px;
            height: 15px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #f88f14;
          }
        }

        .goods_details {
          margin: 16px 0px 16px 10px;
          width: 200px;
          height: 39px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
        }

        .pinglun {
          margin-left: 10px;
          width: 150px;
          height: 12px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #666666;

          span {
            font-family: MicrosoftYaHei-Bold;
            font-size: 14px;
            font-weight: normal;
            letter-spacing: 0px;
            color: #005aa0;
          }

        }

        .shopCar {
          margin-left: 10px;
          margin-top: 23px;
          text-align: right;
          width: 200px;
          height: 40px;
          line-height: 40px;
          // background-color: #ccc;
        }
      }

    }

    .pagesize {
      display: flex;
      align-items: flex-start;
      font-family: MicrosoftYaHei;

      font-size: 14px;
      color: #ffffff;
      margin-bottom: 53px;
      ;

      .pages_box {
        display: flex;
        margin: auto;

        a {
          margin-top: 10px;
          margin-right: 10px;
          display: inline-block;
          color: #666666;

        }
      }

    }


  }

</style>
