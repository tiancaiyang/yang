<template>
<div class="user_evaluate">
  <h2>评价晒单</h2>
  <div class="user_evaluate_box">
    <!-- 评价状态导航 -->
    <div class="evaluate_nav">
      <router-link to="evaluateWaitting" tag="a" active-class="is-active">待评价(<span>{{ waitingNum }}</span>)</router-link>
      <router-link to="evaluateAlready" tag="a" active-class="is-active">已评价({{assessedNum}})</router-link>
    </div>
    <!-- 评价状态的商品列表 -->
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import { evaluationList } from '../../../api/index.js'
export default {
  data () {
    return {
      assessedNum:0,
      waitingNum:0,
    }
  },
  created(){
      this.getEvaluationList()
    },
  methods: {
      getEvaluationList(){
          let params = {
            assess_type : 1
          }
          evaluationList(params).then(res=>{
            console.log(res)
              if(res.code == 0){
                this.assessedNum = res.data.assessed_num
                this.waitingNum = res.data.waiting_assess_num
              }
          })
      }
  }
  
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
      .is-active {
        color: #e51818;
      }
    }
    
  }
}
</style>
