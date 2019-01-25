<template>
  <div class="evaluateInfo">
    <header-top></header-top>
    <Header></Header>
      <div class="top_nav banxin">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="top_nav_box">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评价列表</el-breadcrumb-item>
          <el-breadcrumb-item>评价详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="banxin evaluateContent">
          <h3>评价详情</h3>
          <div class="evaluateContent_box">
              <div class="box_left">
                <div class="imgbox">
                    <img :src="thumb" alt="">
                </div>
                <p class="title">{{ title }}</p>
                <p class="price">￥{{ price }}</p>
              </div>
              <div class="box-right">
                  <div class="box-right-eval clearfix">
                    <span class="fl">综合评分:</span>
                    <el-rate
                      v-model="value"
                      disabled
                      show-score
                      :colors="['#e51818', '#e51818', '#e51818']"
                      text-color="#e51818"
                      score-template="{value}">
                    </el-rate>
                  </div>
                  <div class="box-right-eval clearfix">
                    <span class="fl">评价内容:</span>
                    <p class="box-right-Content">{{ evaluateData.content }}</p>
                    <div class="box-right-img">
                        <ul class="clearfix">
                            <li class="fl" v-for="item in evaluateData.image" :key="item.index">
                                <img :src="item.image" alt="">
                            </li>
                        </ul>
                        <p class="time">{{ evaluateData.create_time }}</p>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
import { getAssessDetail } from '../../../api/index.js'
export default {
    data() {
        return {
            value: 0,
            orderNo: this.$route.query.orderNo,
            orderType: this.$route.query.orderType,
            thumb: this.$route.query.thumb,
            title: this.$route.query.title,
            price: this.$route.query.price,
            evaluateData:[],//评价数据
        }
    },
    created(){
        this.evaluateInfo()
    },
    methods:{
        evaluateInfo(){
            let params = {
                order_type:this.orderType,
                order_no: this.orderNo
            }
            getAssessDetail(params).then(res=>{
                if(res.code == 0){
                    this.evaluateData = res.data
                    this.value = parseFloat(res.data.comprehensive_star)
                }
            })
        }
    },
}
</script>

<style scoped lang="scss">
    .evaluateInfo{
        background-color: #f5f5f5;
    }
    .top_nav {
      height: 40px;
      .top_nav_box {
        line-height: 40px;
      }
    }
    .evaluateContent{
        padding: 30px;
        background-color: #fff;
        h3{
            font-size: 24px;
            color: #666;
        }
        .evaluateContent_box{
            margin-top: 30px;
            display: flex;
            justify-content: space-around;
            border-top: 1px solid #e0e0e0;
            .box_left{
                width: 230px;
                text-align: center;
                padding-top: 50px;
                .imgbox{
                    width: 230px;
                    height: 180px;
                    @include common_center;
                    img{
                        max-width: 100%;
                        max-height:100%;
                    }
                }
                .title{
                    font-size: 16px;
                    color:#666;
                    line-height: 20px; 
                    margin-top: 20px; 
                }
                .price{
                    font-weight: bold;
                    color: #e51818;
                    font-size: 18px;
                    margin-top: 20px;
                }
            }
            .box-right{
                padding-left: 50px;
                margin-top: 20px;
                padding-top: 20px;
                width: 60%;
                border-left: 1px solid #e0e0e0;
                .box-right-eval{
                    margin-bottom: 40px;
                    span{
                        color: #999;
                        font-size: 16px;
                        line-height: 20px;
                        padding-right: 15px;
                    }
                    .box-right-Content{
                        line-height: 20px;
                        padding-left: 82px;
                    }
                    .box-right-img{
                        padding-left: 82px;
                        padding-top: 20px;
                        ul{
                            li{
                                width: 80px;
                                height: 80px;
                                margin: 0 10px 10px 0;
                                @include common_center;
                                img{
                                    max-width: 100%;
                                    max-height: 100%;
                                }
                            }
                        }
                        .time{
                            color: #999;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>