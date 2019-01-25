<template>
<div class="user_evaluate">
  <h2>评价晒单</h2>
  <div class="user_evaluate_box">
    <!-- 评价状态导航 -->
    <div class="evaluate_nav">
      <a>待评价(<span>19</span>)</a>
      <a>已评价</a>
    </div>
    <!-- 评价状态的商品列表 -->
    <ul class="evaluate_list">
      <li>
        <img src="../../assets/images/b2b/good1.png">
        <p class="evaluate_goods_detail">OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机</p>
        <p class="evaluate_goods_price">¥ 68.88</p>
        <a class="evaluate_btn">去评价</a>
      </li>
      <li>
        <img src="../../assets/images/b2b/good1.png">
        <p class="evaluate_goods_detail">OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机</p>
        <p class="evaluate_goods_price">¥ 68.88</p>
        <a class="evaluate_btn">去评价</a>
      </li>
      <li>
        <img src="../../assets/images/b2b/good1.png">
        <p class="evaluate_goods_detail">OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机</p>
        <p class="evaluate_goods_price">¥ 68.88</p>
        <a class="evaluate_btn">去评价</a>
      </li>
      <li>
        <img src="../../assets/images/b2b/good1.png">
        <p class="evaluate_goods_detail">OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机</p>
        <p class="evaluate_goods_price">¥ 68.88</p>
        <a class="evaluate_btn">去评价</a>
      </li>
      <li>
        <img src="../../assets/images/b2b/good1.png">
        <p class="evaluate_goods_detail">OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机</p>
        <p class="evaluate_goods_price">¥ 68.88</p>
        <a class="evaluate_btn">去评价</a>
      </li>
      <li>
        <img src="../../assets/images/b2b/good1.png">
        <p class="evaluate_goods_detail">OPPO Find X曲面全景屏 波尔多红8GB+128GB 全网通 移动联通电信全网通4G 双卡双待手机</p>
        <p class="evaluate_goods_price">¥ 68.88</p>
        <a class="evaluate_btn">去评价</a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.user_evaluate {
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  h2 {
    font-size: 24px;
    color: #666;
    line-height: 36px;
    margin-bottom: 30px;
  }
  .user_evaluate_box {
    // 评价状态导航
    .evaluate_nav {
      height: 38px;
      border-bottom: 1px solid #e0e0e0;
      a {
        font-size: 16px;
        color: #666;
        padding: 0 20px;
      }
      a:first-child {
        border-right: 1px solid #e0e0e0;
        padding-left: 0;
      }
    }
    // 评价状态的商品列表
    .evaluate_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        margin-top: 20px;
        width: 290px;
        height: 455px;
        background-color: #fff;
        text-align: center;
        img {
          width: 290px;
          height: 290px;
        }
        .evaluate_goods_detail {
          font-size: 16px;
          color: #666;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient: vertical;
          line-height: 26px;
        }
        .evaluate_goods_price {
          font-size: 16px;
          color: #e51818;
          margin: 20px 0;
        }
        .evaluate_btn {
          display: inline-block;
          width: 108px;
          height: 32px;
          color: #fff;
          background-color: #e51818;
          line-height: 32px;
          text-align: center;
        }
      }
    }
  }
}
</style>
