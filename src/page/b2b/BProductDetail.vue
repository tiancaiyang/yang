<template>
  <div class="product_detail">
    <header-top></header-top>
    <Header></Header>
    <div class="body_box">
      <banner ></banner>
    </div>
    <div class="product_detail_box banxin">
      <div class="product_detail_all">
        <!-- 头部购买商品的详细信息盒子 -->
        <div class="buy_detail_box">
          <div class="buy_box_top">
            <!-- 商品轮播图组件 -->
            <div class="product_swiper" @click="goOrderConfirm">
              <swiper :swiperData=productInfo.img></swiper>
            </div>
            <!-- 商品属性和购买按钮 -->
            <div class="product_box_right">
              <!-- 商品描述标题 -->
              <h2>{{productInfo.title}}</h2>
              <!-- 活动标题栏 -->
              <div class="secillBg" v-if="productInfo.activity_type == 2 || productInfo.activity_type == 1">
                <span v-if="productInfo.activity_type == 2"><span class="iconfont icon-naozhong1"></span> 秒杀商品</span>
                <span v-if="productInfo.activity_type == 1">特价商品</span>
                <div class="countDownDiv fr" v-if="productInfo.activity_type == 2">
                  距<i v-if=" Date.parse(new Date()) < beginTime">开始:</i><i v-if=" Date.parse(new Date()) >= beginTime">结束:</i>
                  <count-down :o_time=" Date.parse(new Date()) >= beginTime? OverTime : beginTime"></count-down>
                </div>
              </div>
              <!-- 售价 -->
              <div class="goods_price_box">
                <p class="goods_price">售价 <span>￥{{price}}</span> / {{ productInfo.unit }} &nbsp;&nbsp;&nbsp;<del v-if="productInfo.activity_type == 1">￥{{productInfo.price}}</del></p>
                <span class="goods_evaluate"> <a  @click="goAssess('#nav_btn')" >评价 {{productAssess.assess_count}}</a> </span>
              </div>
              <!-- 运费 -->
              <!-- <p class="express_fee">运费  <span>包邮</span></p> -->
              <!-- 商品属性 -->
              <div class="goods_Attributes" v-for="(item, index) in productInfo.attrs" :key="item.index">
                <span class="goods_Attributes_title">{{item.spec_name}}</span>
                <ul>
                  <li v-for="(items, ind) in item.business_product_base_spec_info" :key="items.ind" @click="selectAttr(index, ind)"
                    :class="{'active':sel[index] == ind}">
                    <img src="../../assets/images/b2b/good1.png">
                    <span>{{items.spec_info_name}}</span>
                  </li>
                </ul>
              </div>
              <!-- 商品数量 -->
              <div class="goods_num_box">
                <span class="goods_num_title">数量</span>
                <el-input-number v-model="num1" :min="1" :max="type == 2? everyNum : changeNum" size="mini" class="el_input_num"></el-input-number>
                <span class="goods_num">(库存{{changeNum}}件)</span>
              </div>
              <!-- 购买按钮 -->
              <div class="buy_btn_box">
                <el-button class="buy_now" @click="goOrderConfirm">立即购买</el-button>
                <el-button class="buy_fromcar" @click="appendShopCar">加入购物车</el-button>
              </div>
            </div>
          </div>
          <!-- 收藏和分享按钮的盒子 -->
          <div class="collection_btn_box">
            <a @click="collectionGoods"><span :class='collectType == 2?"el-icon-star-off":"el-icon-star-on"'></span>收藏商品</a>
            <!-- <a><span class="el-icon-share"></span>分享</a> -->
          </div>
        </div>
        <!-- 精品推荐 -->
        <div class="goods_recommend">
          <h2>精品推荐</h2>
          <ul>
            <li v-for="(item, index) in productListGroup" :key="index" @click="goGoodsDetails(item)">
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
            <div class="nav_btn" id="nav_btn">
              <a @click="changeTabs(1)" :class="tabFlag=='1'?'active':''">商品详情</a>
              <a @click="changeTabs(2)" :class="tabFlag=='2'?'active':''">商品评价</a>
            </div>
            <p>手机购买<img src="../../assets/images/b2b/good1.png"></p>
          </div>
          <div class="nav_content_box tabFlagone" v-show="tabFlag == '1'" v-html="productInfo.content"></div>
          <div class="nav_content_box" v-show="tabFlag == '2'">
            <ul class="nav_content_box_assess">
              <li class="clearfix" v-for="item in assessList" :key="item.index">
                <div class="assess_imgBox fl"><img :src="item.head_image" alt=""></div>
                <div class="assess_info">
                  <p>{{ item.username }}</p>
                  <p class="assess_info_num">{{ item.article_star }}分 | {{ item.create_time }} 评价</p>
                  <p class="assess_info_content">{{ item.content }}</p>
                  <ul>
                    <li class="fl" v-for="items in item.images" :key="items.id">
                      <img :src="items.image">
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <quick-bar />
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import banner from '../../components/banner'
  import Swiper from '../../components/Swiper.vue'
  import {
    b2bGoodsProduct,
    b2bAssessList,
    changeCollectBtn,
    b2bAppendShopCar
  } from '../../api/index.js'
  import CountDown from '../../components/CountDown.vue'
  import QuickBar from '../../components/quickBar'
  export default {
    inject: ['reload'], // 注入reload方法
    data() {
      return {
        type: this.$route.query.activity_type,
        productId: this.$route.query.product_id,
        activityId: this.$route.query.activity_id,
        productInfo: [], //商品数据
        specListData: [], //多属性规格对应列表
        price: '', //价格
        changeNum: 1, //最大库存
        thumb: '', //图片
        assessNum: '', // 展示的评论的数量
        productAssess: [], //评价数据
        assessList: [], //评价列表
        sel: [], //数组的每一项代表一个属性值，由这个数组中的值来改变对应属性的样式
        id: [], //规格的id拼接保存["18", "25"]
        spec: '', //选中的规格id的字符串拼接  18,25
        product_attr: '', //选中规格的字符串拼接  红茶味;500ml
        selectGui: [], //选中规格的名字  ["茉莉花茶味", "500ml"]
        productList: [], //精品推荐
        productListGroup: [],
        num1: 1,
        collectType: '', // 商品收藏
        tabFlag: 1,
        num: 0,
        beginTime: 0, // 秒杀活动开始的时间
        OverTime: 0, // 秒杀活动结束的时间
        everyNum: 1, // 秒杀商品的单次的限购数量
      }
    },
    created() {
      this.getGoodsDetailsData()
    },
    methods: {
      // 去评价
      goAssess(id){
          this.tabFlag = 2;
          let params = {
            product_id: this.productId,
            type :this.type
          }
          b2bAssessList(params).then(res => {
            this.assessList = res.data
          });
          // console.log(id)
          document.querySelector(id).scrollIntoView(true);
      },
      // 收藏商品
      collectionGoods() {
        if (this.collectType == 1) {
          this.collectType = 2
        } else if (this.collectType == 2) {
          this.collectType = 1
        }
        let params = {
          product_id: this.productId,
          collect_type: this.collectType,
          product_type: 1
        }
        changeCollectBtn(params).then(res => {
          if (res.code == 0) {
            if (this.collectType == 1) {
              this.$message({
                message: '收藏成功',
                type: 'success'
              });
            } else if (this.collectType == 2) {
              this.$message({
                message: '取消收藏',
                type: 'warning'
              });
            }
          }
        })
      },
      // 商品详情和商品评价的切换
      changeTabs(index) {
        this.tabFlag = index
        if (this.tabFlag == 2) {
          let params = {
            product_id: this.productId,
            type :this.type
          }
          b2bAssessList(params).then(res => {
            this.assessList = res.data
          })
        }
      },
      // 获取商品详情
      getGoodsDetailsData() {
        let params = {
          activity_type: this.type,
          product_id: this.productId,
          activity_id: this.activityId
        }
        b2bGoodsProduct(params).then(res => {
          console.log(res)
          if (res.code == 0) {
            this.productInfo = res.data
            this.thumb = res.data.thumb
            this.collectType = res.data.collect_type
            this.productList = res.data.productList
            this.productAssess = res.data.assess
            this.specListData = res.data.spec_list
            this.productListGroup = this.productList[this.num]
            this.changeNum = parseInt(res.data.stock)
            if (this.type == 0) { // 普通商品
              this.price = this.productInfo.price
            } else if (this.type == 1) { // 特价
              this.price = this.productInfo.discount_price
            } else if (this.type == 2) { // 秒杀
              this.price = this.productInfo.seckill_price
              this.everyNum = parseInt(res.data.every_num)
            }
            this.beginTime = parseInt(res.data.begin_time)
            this.OverTime = parseInt(res.data.over_time)
          }
        })
      },
      // 选择商品属性
      selectAttr(index, ind) {
        this.sel[index] = ind;
        this.$set(this.sel, index, ind)
        var itemId = this.productInfo.attrs[index].business_product_base_spec_info[ind].spec_info_id; //获取选中的id号
        this.id.splice(index, 1, itemId); //替换数组id[]中对应的元素，获得所有选中的id
        this.spec = this.id.join(); //拼接选中的规格的id_info
        var itemName = this.productInfo.attrs[index].business_product_base_spec_info[ind].spec_info_name;
        this.selectGui.splice(index, 1, itemName);
        this.product_attr = this.selectGui.join(';');
        var that = this;
        this.specListData.forEach(item => {
          if (that.spec == item.spec) {
            // that.goodsId = item.attr_id;
            that.changeNum = parseInt(item.stock);
            that.price = item.price;
            that.thumb = item.thumb
          }
        })
      },
      // 精品推荐
      productListChangeBtn() {
        let hehe = this.productList.length - 1
        if (this.num < hehe) {
          this.num = this.num + 1
        } else if (this.num >= hehe) {
          this.num = 0
        }
        this.productListGroup = this.productList[this.num]
      },
      // 精品推荐里面的商品跳转到商品详情
      goGoodsDetails(item) {
        let goodsData = {
          product_id: item.product_id,
          activity_type: item.activity_type,
          activity_id: item.activity_id
        }
        this.$router.push({
          name: 'BProductDetail',
          query: goodsData
        })
        this.reload()
      },
      // 去确认订单页面
      goOrderConfirm() {
        let params = {
          product_id: this.productId, //品牌id
          num: this.num1, //购买数量
          price: this.price, //商品价格0
          spec: this.spec, //选中的规格字符串
          title: this.productInfo.title, //商品名称
          product_attr: this.product_attr, //选中的规格属性
          activity_type: this.type, //活动的类型 0 1 2
          activity_id: this.activityId,
          brand_member_id: this.productInfo.brand_member_id, //品牌商id
          brand_member_pos_id: this.productInfo.brand_member_pos_id, // 业务员id
          limit_price: this.productInfo.limit_price, // 品牌商最低购买限制
          selectImg: this.thumb, //选中规格的图片
          changeNum: this.changeNum, //最大库存
          from: 0 // from为0从商品详情进入确认订单 1从购物车进入
        }
        // 判断是否选择了属性
        if (this.productInfo.attrs !== undefined && this.productInfo.attrs.length > 0) {
          if (this.selectGui.length != this.productInfo.attrs.length) {
            this.$message.error('请选择商品规格')
          } else {
            if (this.changeNum == 0) {
              this.$message({
                message: '该商品已售完, 请选购其他商品',
                type: 'warning'
              })

            } else {
              this.$router.push({
                name: 'BOrderConfirm',
                query: params
              })
            }
          }
        } else {
          if (this.changeNum == 0) {
            this.$message({
              message: '该商品已售完, 请选购其他商品',
              type: 'warning'
            })
          } else {
            this.$router.push({
              name: 'BOrderConfirm',
              query: params
            })
          }
        }
      },
      // 加入购物车
      appendShopCar() {
        let params = {
          product_id: this.productId, //品牌id
          num: this.num1, //购买数量
          spec: this.spec, //选中的规格字符串
          product_attr: this.product_attr, //选中的规格属性
          brand_member_pos_id: this.productInfo.brand_member_pos_id, // 业务员id
          activity_type: this.type, //活动的类型 0 1 2
          activity_id: this.activityId,
        }
        // 判断是否选择了属性
        if (this.productInfo.attrs !== undefined && this.productInfo.attrs.length > 0) {
          if (this.product_attr == '') {
            this.$message.error('请选择商品规格')
          } else {
            if (this.changeNum == 0) {
              this.$message({
                message: '该商品已售完, 请选购其他商品',
                type: 'warning'
              })
            } else {
              b2bAppendShopCar(params).then(res => {
                if (res.code == 0) {
                  this.$message({
                    message: '成功加入购物车',
                    type: 'success'
                  })
                  this.reload()
                }
              })
            }
          }
        } else {
          if (this.changeNum == 0) {
            this.$message({
              message: '该商品已售完, 请选购其他商品',
              type: 'warning'
            })
          } else {
            b2bAppendShopCar(params).then(res => {
              console.log(res)
              if (res.code == 0) {
                this.$message({
                  message: '成功加入购物车',
                  type: 'success'
                })
                this.reload()
              }
            })
          }
        }
      }
    },
    components: {
      Swiper,
      CountDown,
      QuickBar,
      banner
    }
  }

</script>

<style lang="scss" scoped>
  .product_detail {
    background-color: #fff;

    // 面包屑导航
    .body_box {
      background-color: #f5f5f5;
      // height: 25px;
      border-bottom: 2px solid #e51818;
    }

    .product_detail_box {
      // background-color: #fff;
      padding-top: 20px;

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

              // 秒杀商品的倒计时
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
                      &::after {
                        content: ":";
                        width: 10px;
                        height: 10px;
                      }

                      &:last-child:after {
                        content: "";
                      }
                    }

                    b {
                      font-size: 15px;
                      padding-right: 10px;
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
                    color: #ff0000;
                    font-size: 24px;
                    font-weight: 700;
                    margin-top: -2px;
                    padding: 0 10px;
                  }
                }

                .goods_evaluate {
                  color: #005aa0;
                  margin-right: 10px;
                  position: relative;

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

              .goods_Attributes {
                margin-top: 20px;
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #666;

                ul {
                  margin-left: 20px;
                  display: flex;
                  flex-wrap: wrap;

                  li {
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    height: 43px;
                    border: 1px solid #eee;
                    color: #333;
                    padding: 0 5px;

                    img {
                      width: 28px;
                      height: 28px;
                      border: 1px solid #ccc;
                      margin-right: 5px;
                    }
                  }

                  .active {
                    border-color: #e51818;
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
                  border: 2px solid #e3393c;
                  background-color: #ffeced;
                  width: 160px;
                  height: 50px;
                  color: #e51818;
                  font-size: 18px;
                  font-weight: 700;

                  &:hover {
                    opacity: .6;
                  }
                }

                .buy_fromcar {
                  width: 160px;
                  height: 50px;
                  background-color: #e51818;
                  color: #fff;
                  font-size: 18px;
                  font-weight: 700;
                }
              }
            }
          }

          .collection_btn_box {
            margin-top: 10px;
            font-size: 14px;
            color: #666;

            a {
              margin-right: 20px;

              span {
                color: #e51818;
                margin-right: 3px;
              }
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
              }

              span {
                font-size: 16px;
                color: #e51818;
              }
            }
          }

          .change_btn {
            position: absolute;
            top: 60px;
            right: 20px;
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
            border-bottom: 2px solid #e51818;
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
                background-color: #e51818;
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

          .tabFlagone {
            text-align: center;
          }

          .nav_content_box {
            margin-top: 20px;

            // 评价
            .nav_content_box_assess {
              >li {
                margin-bottom: 80px;

                .assess_imgBox {
                  width: 76px;
                  height: 76px;
                  @include common_center;

                  img {
                    max-width: 100%;
                    max-height: 100%;
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

    & /deep/ .quick_bar {
      .quick_Ul {
        li {
          &:nth-of-type(-n+ 3) {
            display: none;
          }
        }
      }
    }
  }

</style>
