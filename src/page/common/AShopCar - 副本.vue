<template>
<div class="shopcar">
  <header-top></header-top>
  <Header></Header>
  <div class="shopcar_box banxin">
    <h2>我的购物车<span>(25)</span></h2>
    <!-- tab 栏切换 -->
    <div class="shopcar_nav_tabs">
      <a :class="tabs==1?'shopcar_btn tab_active':'shopcar_btn'" @click="changeShopcar(1)">普通商品 <span>17</span></a>
      <a :class="tabs==2?'shopcar_btn tab_active':'shopcar_btn'" @click="changeShopcar(2)">订货平台 <span>6</span></a>
    </div>
    <!-- 购物车列表显示区域 -->
    <div class="shopcar_list_box">
      <!-- 标题栏 -->
      <div class="list_box_title">
        <el-checkbox :indeterminate="indeterminate" v-model="ischeckAll" @change="allChecked" class="el_checkbox">全选</el-checkbox>
        <span class="all_goods_title">商品信息</span>
        <ul>
          <li>单价(元)</li>
          <li>数量</li>
          <li>金额</li>
          <li>操作</li>
        </ul>
      </div>
      <!-- 购物车列表内容 -->
      <ul class="list_box_content">
        <li>
          <!-- 店铺名称 -->
          <div class="content_top">
            <el-checkbox class="store_checkbox">店铺名称</el-checkbox>
            <div class="go_store">
              <span class="store_limit">满1000元起订</span>
              <a>逛逛凑单<span class="el-icon-arrow-right"></span></a>
            </div>
          </div>
          <!-- 列表内容 -->
          <div class="content_bottom">
            <ul>
              <li>
                <el-checkbox class="goods_checkbox"></el-checkbox>
                <div class="goods_details">
                  <ul>
                    <li>
                      <div class="img_box">
                        <img src="../../assets/images/b2b/banner.jpg">
                      </div>
                      <div class="details_txt">
                        <p>北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱jhkhkjhkjhkj</p>
                        <div class="details_txt_bottom">
                          <span class="sale_flag">特价</span>
                          <span class="goods_model">1*12*500ml</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- 盒子右半部分 -->
                <div class="li_box_right">
                  <span class="unit_price">￥567.00</span>
                  <div class="num_box">
                    <el-input-number size="mini" v-model="num2" class="num_btn" :min="1"></el-input-number>
                  </div>
                  <span class="total_price">￥567.00</span>
                  <div class="btn_box">
                    <a>删除</a>
                    <a>移入我的收藏夹</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <Footer></Footer>
  <footer-bottom></footer-bottom>
</div>
</template>

<script>
export default {
  data () {
    return {
      tabs: 1,
      num1: 1,
      num2: 1,
    }
  },
  methods: {
    // 切换购物车
    changeShopcar (index) {
      this.tabs = index
    },
    // 全选反选
    allChecked (e) {
      this.ischeckAll = e
      this.indeterminate = false
      for(var i = 0, len = this.test.length; i < len; i++) {
        this.test[i].selected = e
        this.test[i].indeterminate = false
        for(var j = 0, len1 = this.test[i].country.length; j < len1; j++) {
          this.test[i].country[j].selected = e
        }
      }
    },

    erChecked (index, topId, e) {
      this.test[index].selected = e
      this.test[index].indeterminate = false
      var childrenArray = this.test[index].country
      if (childrenArray) {
        for(var i = 0, len = childrenArray.length; i < len; i++) {
          childrenArray[i].selected = e
        }
      }
      this.getIsCheckAll()
    },

    sanChecked (topIndex, sonId, topId, e) {
      var childrenArray = this.test[topIndex].country
      var tickCount = 0, unTickCount = 0, len = childrenArray.length
      for(var i = 0; i < len; i++) {
        if(sonId == childrenArray[i].id) childrenArray[i].selected = e
        if(childrenArray[i].selected == true) tickCount++
        if(childrenArray[i].selected == false) unTickCount++
      }
      if (tickCount == len) {
        this.test[topIndex].selected = true
        this.test[topIndex].indeterminate = false
      } else if (unTickCount == len) {
        this.test[topIndex].selected = false
        this.test[topIndex].indeterminate = false
      } else {
        this.test[topIndex].selected = false
        this.test[topIndex].indeterminate = true
      }
      this.getIsCheckAll()
    },

    getIsCheckAll () {
      var tickCount = 0, unTickCount = 0, indeterminateCount = 0, ArrLength = this.test.length
      for (let j = 0; j < ArrLength; j++) {
        if(this.test[j].selected == true) tickCount++
        if(this.test[j].selected == false) unTickCount++
        if(this.test[j].indeterminate == true) indeterminateCount++
      }
      if(tickCount == ArrLength) {
        this.ischeckAll = true
        this.indeterminate = false
      } else if(unTickCount == ArrLength) {
        this.ischeckAll = false
        if(indeterminateCount > 0) {
          this.indeterminate = true
        } else {
          this.indeterminate = false
        }
      } else {
        console.log('过来了')
        this.ischeckAll = false
        this.indeterminate = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shopcar {
  background-color: #fff;
  .shopcar_box {
    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin-bottom: 16px;
      span {
        color: #e51818;
        margin-left: 10px;
      }
    }
    // tab 栏切换
    .shopcar_nav_tabs {
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #e6e6e6;
      a {
        padding: 8px 20px;

        color: #333;
        font-size: 18px;
        span {
          font-size: 16px;
        }
      }
      .tab_active {
        border-bottom: 2px solid #e51818;
        color: #e51818;
      }
    }
    // 购物车列表显示区域
    .shopcar_list_box {
      margin-top: 25px;
      // 标题栏
      .list_box_title {
        height: 45px;
        background-color: #eee;
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        .el_checkbox {
          margin-left: 20px;
        }
        .all_goods_title {
          width: 35%;
          margin-left: 100px;
        }
        ul {
          display: flex;
          width: 45%;
          justify-content: space-between;
        }
      }
      // 购物车列表内容
      .list_box_content {
        margin-top: 20px;
        >li {
          margin-bottom: 40px;
          // 店铺名称
          .content_top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            .store_checkbox {
              margin-left: 20px;
            }
            .go_store {
              font-size: 16px;
              color: #666;
              display: flex;
              align-items: center;
              a {
                font-size: 14px;
                color: #329fdb;
                margin-left: 10px;
              }
            }
          }
          // 列表内容
          .content_bottom {
            padding: 20px 0;
            box-sizing: border-box;
            border: 1px solid #eee;
            border-top: 2px solid #aaa;
            >ul {
              >li {
                display: flex;
                align-items: flex-start;
                .goods_checkbox {
                  margin: 0 20px;
                }
                .goods_details {
                  width: 45%;
                  >ul {
                    >li {
                      display: flex;
                      margin-top: 25px;
                      &:first-child {
                        margin-top: 0;
                      }
                      .img_box {
                        width: 81px;
                        height: 81px;
                        border: 1px solid #000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img {
                          max-width: 100%;
                          max-height: 100%;
                        }
                      }
                      .details_txt {
                        width: 204px;
                        margin-left: 20px;
                        p {
                          font-size: 14px;
                          color: #333;
                          line-height: 20px;
                          text-overflow : ellipsis;
                          overflow : hidden;
                          display : -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                        }
                        .details_txt_bottom {
                          display: flex;
                          align-items: center;
                          margin-top: 16px;
                          .sale_flag {
                            width: 57px;
                            height: 23px;
                            border: 1px solid #ee0d0d;
                            border-radius: 12px;
                            color: #e51818;
                            font-size: 16px;
                            text-align: center;
                            line-height: 23px;
                            background-color: #fff;
                          }
                          .goods_model {
                            font-size: 14px;
                            color: #666;
                            border: 1px solid #c5c5c5;
                            background-color: #fff;
                            width: 95px;
                            height: 20px;
                            margin-left: 10px;
                            text-align: center;
                            line-height: 20px;
                          }
                        }
                      }
                    }
                  }
                }
                // li 盒子的右半部分
                .li_box_right {
                  width: 50%;
                  display: flex;
                  justify-content: space-between;
                  margin-left: -10px;
                  .unit_price {
                    font-size: 13px;
                    color: #333;
                  }
                  .num_box {
                    width: 100px;
                    .num_btn {
                      width: 133px;
                      height: 28px;
                    }
                  }
                  .total_price {
                    font-size: 14px;
                    color: #e51818;
                    font-weight: 700;
                  }
                  .btn_box {
                    a {
                      display: block;
                      font-size: 14px;
                      color: #333;
                      margin-bottom: 16px;
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
