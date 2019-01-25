<template>
  <div class="product_detail">
    <div class="product_detail_box banxin">
      <div class="product_detail_all">
        <!-- 头部购买商品的详细信息盒子 -->
        <div class="buy_detail_box">
          <div class="buy_box_top">
            <!-- 商品轮播图组件 -->
            <div class="product_swiper">
              <swiper :swiperData="img"></swiper>
            </div>
            <!-- 商品属性和购买按钮 -->
            <div class="product_box_right">
              <!-- 商品描述标题 -->
              <h2>{{ localProduct.title }}</h2>
              <!-- 秒杀时间 -->
              <div class="secillBg" v-if="localProduct.activity_type == 2 || localProduct.activity_type == 1">
                <span v-if="localProduct.activity_type == 1">特价商品</span>
                <span v-if="localProduct.activity_type == 2"><span class="iconfont icon-naozhong1"></span> 秒杀商品</span>
                <div class="countDownDiv fr" v-if="localProduct.activity_type == 2">
                  距<i v-if=" Date.parse(new Date()) < beginTime">开始:</i><i v-if=" Date.parse(new Date()) >= beginTime">结束:</i>
                  <count-down :o_time=" Date.parse(new Date()) >= beginTime? OverTime : beginTime"></count-down>
                </div>
              </div>
              <!-- 售价 -->
              <div class="goods_price_box">
                <p class="goods_price">售价 <span>￥{{ price }}</span>
                </p>
                <span class="goods_evaluate">评价{{ assess.length }}</span>
              </div>
              <!-- 运费 -->
              <p class="express_fee">运费 <span v-if="localProduct.trans_expenses == 0">包邮</span> {{
                localProduct.trans_expenses }}元 </p>
              <!-- 商品属性 -->
              <!-- <div class="goods_Attributes" v-for="(item,index) in localProduct.attrs" :key="item.index">
                <span class="goods_Attributes_title">{{ item.text_name }}</span>
                <ul>
                  <li @click="selectAttr(index,ind)" :class="{'active':sel[index] == ind}" v-for="(items,ind) in item.business_product_base_spec_info"
                    :key="items.ind">
                    <span>{{ items.spec_info_name }}</span>
                  </li>
                </ul>
              </div> -->
              <!-- 商品数量 -->
              <div class="goods_num_box">
                <span class="goods_num_title">数量</span>
                <el-input-number v-model="num1" @change="handleChange" :min=1 :max=Number(stock) size="mini" class="el_input_num"></el-input-number>
                <span class="goods_num">(库存{{ stock }}件)</span>
              </div>
              <!-- 购买按钮 -->
              <div class="buy_btn_box">
                <el-button class="buy_now" @click="getBuyNow">立即购买</el-button>
                <el-button class="buy_fromcar" @click="addCCart">加入购物车</el-button>
              </div>
            </div>
          </div>
          <!-- 收藏和分享按钮的盒子 -->
          <div class="collection_btn_box">
            <a @click="collectionGoods"><span :class='collect == 2?"el-icon-star-off":"el-icon-star-on"'></span>收藏商品</a>
            <a @mouseenter="shareFlag=true" @mouseleave="shareFlag=false"><span class="el-icon-share"></span>分享</a>
            <div class="share" v-if="shareFlag" @mouseleave="shareFlag=false" @mouseenter="shareFlag=true">
              <ul>
                <li @click="getshare(1)">
                  <img src="../../assets/images/b2c/shareQQ.png" alt="">
                  <p>QQ好友</p>
                </li>
                <li @click="getshare(2)">
                  <img src="../../assets/images/b2c/shareWei.png" alt="">
                  <p>新浪微博</p>
                </li>
                <li @click="getshare(3)">
                  <img src="../../assets/images/b2c/shareCopy.png" alt="">
                  <p>复制链接</p>
                </li>
              </ul>
              <!-- <p>微博</p>
              <p @click="getshare(2)">QQ空间</p> -->
              <input type="text" v-model="share" id="inShare">
            </div>
          </div>
        </div>
        <!-- 精品推荐 -->
        <div class="goods_recommend">
          <h2>精品推荐</h2>
          <ul>
            <li @click="recommentPath(item)" v-for="(item, index) in productListGroup" :key="index">
              <img :src="item.thumb">
              <p>{{item.title}}</p>
              <span>¥ {{item.price}}</span>
            </li>
          </ul>
          <!-- 换一换按钮 -->
          <a class="change_btn" @click="productListChangeBtn()"><span class="el-icon-refresh"></span>换一换</a>
        </div>
        <!-- 商品详情跟评价 -->
        <div class="evaluate_details_box">
          <!-- tab 切换栏 -->
          <div class="nav_title">
            <div class="nav_btn">
              <a @click="changeTabs(1)" :class="tabFlag=='1'?'active':''">商品详情</a>
              <a @click="changeTabs(2)" :class="tabFlag=='2'?'active':''">商品评价</a>
            </div>
            <!-- <p>手机购买<img src="../../assets/images/b2b/good1.png"></p> -->
          </div>
          <div class="nav_content_box" v-show="tabFlag == '1'">
            <div class="goods_details_txt">
              <p>商品名称：{{ localProduct.title }}</p>
              <!-- <p>生产日期：2018年08月</p>
              <p>保质期限：345天</p> -->
              <p>商品条码：{{ localProduct.sn }}</p>
            </div>
            <ul class="details_img_show">
              <li v-html="localProduct.content"></li>
            </ul>
          </div>
          <div class="nav_content_box clearfix" v-show="tabFlag == '2'">
            <ul class="nav_content_box_assess">
              <li class="clearfix" v-for="item in assess_content" :key="item.id">
                <div class="assess_imgBox fl"><img :src="item.head_image"></div>
                <div class="assess_info">
                  <p>{{ item.username }}</p>
                  <p class="assess_info_num">{{ item.uid }}分 | {{ item.assess_date }} 评价</p>
                  <p class="assess_info_content">{{ item.content }}</p>
                  <!-- <ul>
                    <li class="fl" v-for="items in item.images" :key="items.id">
                      <img :src="items.image">
                    </li>
                  </ul> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "../../components/Swiper.vue";
  import {
    publicCollect,
    rurallocalProductView,
    rurallocalSubmit,
    b2cAddressList,
    b2cAddCCart
  } from "../../api/index.js";
  import CountDown from "../../components/CountDown.vue";
  export default {
    inject: ["reload"],
    data() {
      return {
        img: [], //轮播图
        price: "", //售价
        trans_expenses: "", //运费
        product_id: this.$route.query.product_id,
        // product_id:this.$route.params.product_id,
        localProduct: [], //土特产数据
        assess: [],
        assess_content: [], //评论
        attrs: [], //规格
        cat_format: [], //规格
        url: "", //图文详情
        spec_list: "", //多属性规格对应列表
        // productList: '', //推荐列表
        stock: 0, //库存
        collect_type: "", //是否收藏
        recomentProduct: [], //推荐列表
        productListGroup: [], //推荐列表数据分组
        num: 0, //推荐列表第一组数据
        everyNum: 1, // 秒杀商品的单次的限购数量
        current: 0, //当前所在的页数
        size: 5, //显示的数量
        tabFlag: 1,
        thumb: '', //缩略图
        activity_id: '',
        title: this.$route.query.title,
        price_total: "", //总价
        num_total: "", //购买总数
        pay_type: "", //支付方式
        activity_type: "", //活动类型
        address_id: "", //收货地址                  再调口传
        spec: "", //属性id                            还没有
        product_attr: "", //属性值      没有
        brand_member_id: "", //品牌商
        comment: "", //用户备注                     meiyou
        seckill_id: "", //秒杀id      meiyou
        discount_id: "", //特价id       meiyou
        user_token: "", //token值

        num1: '0', //数量
        beginTime: 0, // 秒杀活动开始的时间
        OverTime: 0, // 秒杀活动结束的时间
        id: "", //id
        type: "3", //类型
        collection_type: "1", //收藏类型
        collect: "2", //是否收藏

        order_no: '', //订单号
        // identity: '', //身份验证
        // isToken: false,

        shareFlag: false,
        share: "", //网址
        class_id: this.$route.query.class_id,

      };
    },
    created() {
      this.getrurallocalProductView();
      this.getb2cAddressList();
      this.share = location.href;
    },
    methods: {
      // 收藏商品
      collectionGoods() {
        if (this.collect == 1) {
          this.collect = 2; //2取消
        } else if (this.collect == 2) {
          this.collect = 1; //1收藏
        }
        let params = {
          id: this.product_id,
          collection_type: this.collection_type,
          type: "3",
          collect: this.collect
        };
        publicCollect(params).then(res => {
          if (res.code == 0) {
            if (this.collect == 1) {
              this.$message({
                message: "收藏成功",
                type: "success"
              });
            } else if (this.collect == 2) {
              this.$message({
                message: "取消收藏",
                type: "warning"
              });
            }
          }
        });


      },
      // 数量加减键
      handleChange(value) {
        this.num1 = value;
      },

      // 换一批
      productListChangeBtn() {
        let list = this.recomentProduct.length - 1;
        if (this.num < list) {
          this.num = this.num + 1;
        } else if (this.num >= list) {
          this.num = 0;
        }
        this.productListGroup = this.recomentProduct[this.num];
      },
      // 精品推荐路由跳转
      recommentPath(item) {
        this.$router.push({
          path: "RLocalProduct",
          query: {
            product_id: item.product_id
          }
        });
        // 再次刷新页面
        this.reload();
      },
      // 商品详情和商品评价的切换
      changeTabs(index) {
        this.tabFlag = index;
        if (this.tabFlag == 2) {}
      },

      // 土特产商品详情
      getrurallocalProductView() {
        let params = {
          product_id: this.product_id
        };
        rurallocalProductView(params).then(res => {
          if (res.code == 0) {
            // console.log(res.data);
            this.img = res.data.img;
            this.price = res.data.price;
            this.trans_expenses = res.data.trans_expenses;
            this.localProduct = res.data;
            this.assess = res.data.assess;
            this.assess_content = res.data.assess.assess_content;
            this.attrs = res.data.attrs;
            this.brand_member_id = res.data.brand_member_id;
            this.activity_type = res.data.activity_type;
            this.cat_format = res.data.cat_format;
            this.url = res.data.url;
            this.spec_list = res.data.spec_list;
            this.spec = this.spec_list.spec;
            this.recomentProduct = res.data.productList;
            this.productListGroup = this.recomentProduct[this.num];
            this.stock = res.data.stock;
            if (this.stock == 0) {
              this.stock = 0
            }
            this.collect_type = res.data.collect_type;
            this.thumb = res.data.thumb;
            this.activity_id = res.data.activity_id;
            // this.activity_attr = res.data.activity_attr;
          }
        });
      },
      //获取收货地址
      getb2cAddressList() {

        this.user_token = localStorage.getItem("token");

        let params = {
          "user-token": this.user_token
        };
        b2cAddressList(params).then(res => {
          if (res.data.length == 0) {
            this.$message({
              message: "请去添加地址",
              type: "error"
            });
            return;
          }
          this.address_id = res.data[0].address_id;

          // console.log(this.address_id);
        });
      },

      // 立即购买
      getBuyNow() {
        let params = {
          price_total: this.price * this.num1,
          num_total: this.num1,
          pay_type: this.pay_type,
          address_id: this.address_id,
          comment: this.comment,
          seckill_id: this.seckill_id,
          discount_id: this.discount_id,

          tute: "1", //特产标识 1
          product_id: this.product_id, //品牌id
          num: this.num1, //购买数量
          price: this.price, //商品价格0
          spec: this.spec, //选中的规格字符串
          title: this.title, //商品名称
          product_attr: this.product_attr, //选中的规格属性
          activity_type: this.activity_type, //活动的类型 0 1 2
          brand_member_id: this.brand_member_id, //品牌商id
          selectImg: this.thumb, //选中规格的图片`
          changeNum: this.stock, //最大库存
          transExpenses: this.trans_expenses, //运费

          from: 0, //from为0从商品详情进入确认订单 1从购物车进入

        }
        this.$router.push({
          path: '/san/b2c/COrderConfirm',
          query: params
        });

      },

      // 加入购物车
      addCCart() {
        if (this.user_token == null) {
          this.$message({
            message: 'token不存在',
            type: 'error'
          })
        } else {
          let params = {
            product_id: this.product_id, //品牌id
            num: this.num1, //购买数量
            spec: this.spec, //选中的规格字符串
            product_attr: this.product_attr, //选中的规格属性
            activity_type: this.activity_type, //活动的类型 0 1 2
            type: "3",
            activity_id: this.activity_id,
            'User-Token': this.user_token,
          };
          b2cAddCCart(params).then(res => {
            // console.log(params);
            if (res.code == 0) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
            }
          });
        }
        // this.reload();
        this.$emit('listenCart', this.class_id);
      },
      // 分享
      getshare(index) {
        var shareCopy = document.getElementById("inShare");
        shareCopy.select();
        document.execCommand("Copy");

        var _shareUrl;
        if (index == 2) {
          _shareUrl =
            `http://service.weibo.com/share/share.php?appkey=285ad16f35cdc&title=${
            this.title
          }&url=${this.share}&searchPic=false&style=simple`; //真实的appkey ,必选参数
          window.open(_shareUrl, "_blank");
        } else if (index == 1) {
          _shareUrl =
            `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${
            this.share
          }&sharesource=qzone&title=${
            this.title
          }&pics=你的分享图片&summary=${this.title}`; //真实的appkey ,必选参数
          window.open(_shareUrl, "_blank");
        } else if (index == 3) {
          this.$message({
            message: "网址复制成功",
            type: "success"
          });
        }


      },
    },
    components: {
      Swiper,
      CountDown
    }
  };

</script>

<style lang="scss" scoped>
  .product_detail {
    padding-top: 20px;
    background-color: #fff;

    .product_detail_box {
      margin: 0 50px;

      .product_detail_all {
        width: 1022px;
        min-height: 1052px;

        // 购买商品详情描述部分
        .buy_detail_box {
          .buy_box_top {
            height: 430px;
            width: 100%;
            display: flex;

            .product_swiper {
              width: 350px;
              height: 100%;
              margin-right: 20px;

              &:hover {
                cursor: pointer;
              }
            }

            .product_box_right {
              height: 100%;
              position: relative;

              h2 {
                font-size: 18px;
                color: #383838;
                font-weight: 700;
                margin: 25px 0 20px 0;
              }

              .secillBg {
                background: url(../../assets/images/b2c/prodctinfoSecill.png) no-repeat;
                height: 45px;
                line-height: 33px;
                color: #fff;
                padding: 0 20px;

                .countDownDiv {
                  display: inline-block;

                  & /deep/ div {
                    display: inline-block;

                    span {
                      &::before {
                        content: ":";
                        width: 10px;
                        height: 10px;
                      }
                    }
                  }
                }
              }

              .goods_price_box {
                width: 653px;
                height: 43px;
                line-height: 43px;
                background-color: #f3f3f3;
                display: flex;
                justify-content: space-between;
                font-size: 14px;

                .goods_price {
                  color: #666;
                  display: flex;

                  span {
                    display: block;
                    color: #f88f14;
                    font-size: 24px;
                    font-weight: 700;
                    margin-top: -2px;
                    padding: 0 10px;
                  }

                  .activityTypeIcon {
                    font-size: 14px;
                  }
                }

                .goods_evaluate {
                  color: #005aa0;
                  margin-right: 10px;
                  position: relative;

                  &:hover {
                    cursor: pointer;
                  }

                  &:before {
                    content: "";
                    width: 1px;
                    height: 27px;
                    background-color: #c7c7c7;
                    position: absolute;
                    top: 8px;
                    left: -10px;
                  }
                }
              }

              .express_fee {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #666;
                margin: 12px 0;

                span {
                  width: 40px;
                  height: 16px;
                  color: #fff;
                  text-align: center;
                  line-height: 16px;
                  border-radius: 3px;
                  background-color: #fd575a;
                  margin: 0 15px;
                }
              }

              .goods_Attributes {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #666;
                margin-bottom: 15px;

                ul {
                  margin-left: 20px;
                  display: flex;
                  flex-wrap: wrap;

                  li {
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    height: 43px;
                    border: 1px solid pink;
                    padding: 0 5px;
                    cursor: pointer;

                    img {
                      width: 28px;
                      height: 28px;
                      border: 1px solid #ccc;
                      margin-right: 5px;
                    }
                  }

                  .active {
                    border: 1px solid #e51818;
                    color: #e51818;
                  }
                }
              }

              .goods_num_box {
                font-size: 14px;
                color: #666;
                margin-top: 40px;
                display: flex;
                align-items: center;

                .el_input_num {
                  margin: 0 20px;
                  width: 150px;
                }
              }

              .buy_btn_box {
                position: absolute;
                bottom: 0;

                .buy_now {
                  border: 2px solid #23b57e;
                  background-color: #23b57e;
                  width: 160px;
                  height: 50px;
                  color: #fff;
                  font-size: 18px;
                  font-weight: 700;

                  &:hover {
                    opacity: 0.6;
                  }
                }

                .buy_fromcar {
                  width: 160px;
                  height: 50px;
                  background-color: #23b57e;
                  color: #fff;
                  font-size: 18px;
                  font-weight: 700;
                }
              }
            }
          }

          .collection_btn_box {
            position: relative;
            margin-top: 10px;
            font-size: 14px;
            color: #666;

            a {
              margin-right: 20px;

              span {
                color: #f88f14;
                margin-right: 3px;
              }
            }

            .share {
              position: absolute;
              color: red;
              width: 250px;
              height: 140px;
              padding-left: 10px;
              background: url(../../assets/images/b2c/shareBox.png) no-repeat;
              z-index: 999;

              ul {
                display: flex;
                justify-content: space-around;
                text-align: center;

                li {
                  height: 64px;
                  padding-top: 30px;
                  text-align: center;

                  &:hover {
                    cursor: pointer;
                  }

                  img {
                    margin-bottom: 5px;
                  }
                }
              }

              // background: red;
              // p {
              //   margin-bottom: 10px;

              //   &:hover {
              //     cursor: pointer;
              //   }
              // }
            }

            input {
              opacity: 0;
            }
          }
        }

        // 精品推荐
        .goods_recommend {
          margin-top: 60px;
          position: relative;

          h2 {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
          }

          ul {
            width: 100%;
            height: 222px;
            border: 1px solid #eaeaea;
            display: flex;
            justify-content: space-around;
            padding: 20px 0;
            box-sizing: border-box;

            li {
              width: 160px;
              text-align: center;

              &:hover {
                cursor: pointer;
              }

              img {
                width: 110px;
                height: 110px;
                margin-bottom: 20px;
              }

              p {
                font-size: 14px;
                color: #383838;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin: 10px 0;
              }

              span {
                font-size: 16px;
                color: #f88f14;
              }
            }
          }

          .change_btn {
            position: absolute;
            top: 60px;
            right: 8px;
          }
        }

        // 商品详情跟评价
        .evaluate_details_box {
          margin-top: 30px;

          .nav_title {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f6f6f6;
            border: 1px solid #eaeaea;
            border-bottom: 2px solid #23b57e;
            font-size: 18px;
            color: #666;

            .nav_btn {
              display: flex;

              a {
                display: block;
                text-align: center;
                height: 50px;
                line-height: 50px;
                width: 134px;
              }

              .active {
                background-color: #23b57e;
                color: #fff;
              }
            }

            p {
              margin-right: 10px;
              display: flex;
              align-items: center;

              img {
                width: 40px;
                height: 40px;
                margin-left: 10px;
              }
            }
          }

          .nav_content_box {
            margin-top: 20px;

            .goods_details_txt {
              height: 167px;
              border-bottom: 1px solid #dbdbdb;
              font-size: 16px;
              color: #666;
              padding-left: 30px;

              p {
                margin-bottom: 10px;
              }
            }

            .details_img_show {
              margin-top: 20px;

              li {
                text-align: center;

                img {
                  width: 800px;
                  height: 800px;
                }
              }
            }

            // 评价
            .nav_content_box_assess {
              >li {
                margin-bottom: 80px;

                .assess_imgBox {
                  width: 76px;
                  height: 76px;
                  @include common_center;

                  img {
                    width: 76px;
                    height: 76px;
                    border-radius: 50%;
                  }
                }

                .assess_info {
                  padding-left: 86px;

                  p {
                    font-size: 20px;
                    color: #333;
                    margin-bottom: 20px;
                  }

                  .assess_info_num {
                    font-size: 16px;
                    color: #666;
                  }

                  .assess_info_content {
                    color: #070707;
                  }

                  ul {
                    >li {
                      width: 105px;
                      height: 105px;
                      margin-right: 20px;
                      margin-bottom: 20px;
                      @include common_center;

                      img {
                        max-width: 100%;
                        max-height: 100%;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

</style>
