<template>
<div class="evaluate_success">
  <header-top></header-top>
  <div class="evaluate_success_box banxin">
    <!-- 盒子上半部分 -->
    <div class="success_box_top">
      <img src="../../../assets/images/evaluate_ok.png">
      <div class="success_text">
        <p>评价已完成，以下商品未评价，快去看看吧~</p>
        <p>带图评论可以帮到其他买家，比心 </p>
      </div>
    </div>
    <!-- 盒子下半部分 -->
    <div class="success_box_b">
      <p>待评价商品<router-link to="/one/user/UserEvaluate" tag="a">返回待评价列表 >></router-link></p>
      <!-- <ul>
        <li>
          <div class="img_box">
            <img src="../../../assets/images/b2b/banner.jpg">
          </div>
          <el-button class="evaluate_btn" @click="goEvaluate">评价</el-button>
        </li>
        <li>
          <div class="img_box">
            <img src="../../../assets/images/b2b/banner.jpg">
          </div>
          <el-button class="evaluate_btn">评价</el-button>
        </li>
        <li>
          <div class="img_box">
            <img src="../../../assets/images/b2b/banner.jpg">
          </div>
          <el-button class="evaluate_btn">评价</el-button>
        </li>
      </ul> -->
    </div>
  </div>
  <Footer></Footer>
  <footer-bottom></footer-bottom>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    // 跳转到商品评价页面
    goEvaluate () {
      this.$router.push({path: '/common/GoodsEvaluate'})
    }
  }
}
</script>

<style lang="scss" scoped>
.evaluate_success {
  background-color: #f5f5f5;
  .evaluate_success_box {
    margin-top: 40px;
    height: 418px;
    background-color: #fff;
    padding: 60px  160px 0;
    box-sizing: border-box;
    border: 1px solid #c4c4c4;
    .success_box_top {
      height: 100px;
      border-bottom: 1px solid #eee;
      display: flex;
      img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
      }
      .success_text {
        p:first-child {
          font-size: 24px;
          color: #333;
          margin: 10px 0 17px;
        }
        p:last-child {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .success_box_b {
      margin-top: 20px;
      padding-left: 20px;
      box-sizing: border-box;
      p {
        color: #999;
        font-size: 14px;
        margin-bottom: 10px;
        a {
          color: #3366cc;
          margin-left: 20px;
        }
      }
      ul {
        display: flex;
        li {
          margin-right: 10px;
          width: 84px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .img_box {
            width: 84px;
            height: 84px;
            border: 1px solid #e0e0e0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 6px;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
          .evaluate_btn {
            width: 39px;
            height: 18px;
            background-color: #e51818;
            text-align: center;
            line-height: 18px;
            padding: 0;
            font-size: 14px;
            color: #fff;
            border-radius: 8px;
          }
        }
      }
    }
  }
}
</style>
