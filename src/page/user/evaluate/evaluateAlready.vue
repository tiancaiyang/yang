<template>
    <div>
        <!-- 待评价页面 -->
        <ul class="evaluate_list">
          <li v-for="item in evaluateList" :key="item.index">
            <img :src="item.thumb">
            <p class="evaluate_goods_detail">{{ item.title }}</p>
            <p class="evaluate_goods_price">¥ {{ item.price }}</p>
            <a class="evaluate_btn" @click="goEvaluateInfo(item)">评价详情</a>
          </li>
        </ul>
        <div v-if="evaluateList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
        <div class="nullevaluate" v-if="evaluateList.length == 0">
            <p class="iconfont icon-wupingjia icon"></p>
            <p>目前还没有对商品进行评价~</p>
        </div>
    </div>
</template>

<script>
import { evaluationList } from '../../../api/index.js'
export default {
    data() {
        return {
            evaluateList:[],//评价数据列表
            page:0,
            limit:20,
            totalPage:0,
        }
    },
    created(){
        this.getEvaluationList()
    },
    methods: {
        //获取当前页码
        getCurrentPage(pageNum){
            this.page = pageNum-1;
            this.getEvaluationList()
        },
        // 获取已评价数据
        getEvaluationList(){
            let params = {
                assess_type : 2,
                page: this.page,
                limit: this.limit
            }
            evaluationList(params).then(res=>{
                if(res.code == 0){
                    this.evaluateList = res.data.res_assess
                    this.totalPage = parseInt(res.data.total_num)
                }
            })
        },
        // 查看已评价详情
        goEvaluateInfo(item){
            let params = {
                orderType : item.order_type,
                orderNo : item.order_no,
                thumb: item.thumb,
                title: item.title,
                price: item.price
            }
            this.$router.push({name: 'EvaluateInfo',query: params})
        }
    }
}
</script>

<style scoped lang="scss">
    // 评价状态的商品列表
    .evaluate_list {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-top: 20px;
        width: 32%;
        height: 455px;
        margin-right: 2%;
        background-color: #fff;
        text-align: center;
        &:nth-child(3n){
            margin-right: 0;
        }
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
    .nullevaluate{
      text-align: center;
       padding: 50px 0;
       .icon{
            width: 100%;
         font-size: 80px;
         margin-bottom: 10px;
         margin: auto;
       }
       p{
         font-size: 16px;
         color: #bbb;
       }
    }
</style>