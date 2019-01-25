<template>
  <div class="my_order">
    <h2>我的订单</h2>
    <!-- 导航栏 和 搜索区域 -->
    <div class="my_order_top">
      <!-- 订单状态导航 -->
      <div class="top_nav">
        <ul>
          <li>全部订单</li>
          <li>待付款</li>
          <li>待收货(19)</li>
          <li>售后/退换货</li>
        </ul>
      </div>
      <!-- 订单检索框 -->
      <div class="search_box">
        <el-input placeholder="请输入内容" size="medium">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 订单盒子 -->
    <ul class="my_order_content">
      <li class="my_order_content_box">
        <!-- 订单盒子的上半部分 -->
        <div class="content_box_top">
          <p class="order_title">等待付款</p>
          <div class="order_status">
            <ul>
              <li>2018-10-13 14:56:32</li>
              <li>订单号: 15820604203365</li>
              <li>张小强</li>
              <li>在线支付</li>
            </ul>
            <p class="total_price">总金额:&nbsp;<span>2683.9</span>&nbsp;元</p>
          </div>
        </div>
        <!-- 订单商品盒子 -->
        <div class="order_goods_box">
          <!-- 订单商品列表 -->
          <ul class="order_goods_list">
            <li>
              <img src="../../assets/images/b2b/good1.png">
              <div class="goods_detail_box">
                <p class="goods_detail_txt">"OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机hahahhahahahhahhahahhahahahhahahahhahahhahahahhahahhahahahahhahahahahhaha"</p>
                <p class="goods_detail_price">¥&nbsp;4999.0 &nbsp; ×1</p>
              </div>
            </li>
            <li>
              <img src="../../assets/images/b2b/good1.png">
              <div class="goods_detail_box">
                <p class="goods_detail_txt">"OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机"</p>
                <p class="goods_detail_price">¥&nbsp;4999.0 &nbsp; ×1</p>
              </div>
            </li>
            <li>
              <img src="../../assets/images/b2b/good1.png">
              <div class="goods_detail_box">
                <p class="goods_detail_txt">"OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机"</p>
                <p class="goods_detail_price">¥&nbsp;4999.0 &nbsp; ×1</p>
              </div>
            </li>
          </ul>
          <!-- 订单按钮 -->
          <div class="order_btn_box">
            <a>立即支付</a>
            <a>订单详情</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.my_order {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  h2 {
    font-size: 24px;
    color: #666;
    margin: 8px 0 30px 0;
    line-height: 36px;
  }
  // 导航栏 和 搜索区域
  .my_order_top {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 订单状态导航
    .top_nav {
      ul {
        display: flex;
        li {
          cursor: default;
          padding: 0 20px;
          position: relative;
          font-size: 16px;
          color: #666;
        }
        li:after {
          content: "";
          width: 1px;
          height: 14px;
          position: absolute;
          top: 2px;
          right: 0;
          background-color: #b0b0b0;
        }
        li:last-child:after {
          display: none;
        }
        li:first-child {
          padding-left: 0;
        }
        li:last-child {
          padding-right: 0;
        }
      }
    }
    // 订单检索框
    .search_box {
      width: 245px;
      height: 40px;
    }
  }
  // 订单盒子
  .my_order_content {
    .my_order_content_box {
      border: 1px solid #e51818;
      background-color: #fff6f6;
      // 订单盒子的上半部分
      .content_box_top {
        border-bottom: 1px solid #f28787;
        padding: 20px;
        box-sizing: border-box;
        .order_title {
          font-size: 20px;
          color: #e51818;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        .order_status {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          ul {
            display: flex;
            li {
              padding: 0 10px;
              position: relative;
              font-size: 14px;
              color: #999;
            }
            li:first-child {
              padding-left: 0;
            }
            li:last-child {
              padding-right: 0;
            }
            li:after {
              content: "";
              width: 1px;
              height: 14px;
              position: absolute;
              top: 0;
              right: 0;
              background-color: #999;
            }
            li:last-child:after {
              display: none;
            }
          }
          .total_price {
            display: flex;
            align-items: flex-end;
            font-size: 16px;
            color: #999;
            span {
              font-size: 32px;
              color: #333;
            }
          }
        }
      }
      // 订单商品盒子
      .order_goods_box {
        width: 906px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        // 订单商品列表
        .order_goods_list {
          width: 445px;
          li {
            height: 88px;
            display: flex;
            margin-bottom: 40px;
            img {
              width: 88px;
              height: 88px;
              margin-right: 19px;
            }
            .goods_detail_box {
              width: 331px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .goods_detail_txt {
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient: vertical;
                line-height: 24px;
                font-size: 14px;
                color: #666;
              }
              .goods_detail_price {
                font-size: 16px;
                color: #333;
              }
            }
          }
          li:last-child {
            margin-bottom: 0;
          }
        }
        // 订单按钮
        .order_btn_box {
          width: 153px;
          font-size: 16px;
          a {
            display: block;
            height: 45px;
            text-align: center;
            line-height: 45px;
          }
          a:first-child {
            background-color: #e51818;
            margin-bottom: 20px;
            color: #fff;
          }
          a:last-child {
            border: 1px solid #e0e0e0;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
