<template>
    <div class="returnRefunt banxin">
        <ul class="returnRefunt_list">
            <li class="clearfix" v-for="item in returnGoodsList" :key="item.index">
                <div class="img_box fl">
                  <img :src="item.thumb">
                </div>
                <div class="returnRefunt_detail">
                  <p class="returnRefunt_title">{{ item.title }}</p>
                  <p v-if="orderType != 3" class="returnRefunt_price">¥ {{ item.price }}</p>
                  <p v-if="orderType == 3" class="returnRefunt_price">¥ {{ item.price * item.num | strip }}</p>
                  <div v-if="orderType != 3">
                    <a v-if="orderType != 1 && item.order_status != 3" @click="returnRefundOne(item.detail_id)" class="returnRefunt_btn one">退货退款</a>
                    <a @click="returnRefundTwo(item.detail_id)" class="returnRefunt_btn">仅退款</a>
                  </div>
                  <div v-if="orderType == 3">
                    <a v-if="item.class_id == 1" @click="returnRefundOne(item.detail_id)" class="returnRefunt_btn one">退货退款</a>
                    <a @click="returnRefundTwo(item.detail_id)" class="returnRefunt_btn">仅退款</a>
                  </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { b2bOrderReturnList } from '../../../api/index.js'
export default {
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      orderType: this.$route.query.orderType,
      returnGoodsList:[],//退款商品列表
    }
  },
  created(){
    this.getReturnList()
  },
  methods:{
    getReturnList(){
      let params = {
        order_no : this.orderNo,
        type : this.orderType
      }
      b2bOrderReturnList(params).then(res=>{
        console.log(res)
        if(res.code == 0){
          this.returnGoodsList = res.data
        }
      })
    },
    // 退货退款--没有B端
    returnRefundOne(detailId){
      let params = {
         orderNo : this.orderNo,
         detailId : detailId,
         orderType: this.orderType,
      }
      this.$router.push({name:'CReturnGoods',query:params})
    },
    // 仅退款
    returnRefundTwo(detailId){
      if(this.orderType == 1){
        let params = {
           orderNo : this.orderNo,
           detailId : detailId,
           orderType: this.orderType,
        }
        this.$router.push({name:'BReturnGoods',query:params})
      }else if(this.orderType == 2){
        let params = {
           orderNo : this.orderNo,
           detailId : detailId,
           orderType: this.orderType,
        }
        this.$router.push({name:'CReturnOnly',query:params})
      }else if(this.orderType == 3){
        let params = {
           orderNo : this.orderNo,
           detailId : detailId,
           orderType: this.orderType,
        }
        this.$router.push({name:'CReturnOnly',query:params})
      }
    }
  },
}
</script>

<style scoped lang="scss">
  .returnRefunt{
    background-color: #f5f5f5;
    .returnRefunt_list{
      li{
        background-color: #fff;
        padding: 30px;
        margin-bottom: 20px;
        .img_box{
          width: 150px;
          height: 150px;
          @include common_center;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .returnRefunt_detail{
          height: 150px;
          padding-left: 170px;
          position: relative;
          .returnRefunt_title{
            position: absolute;
            top: 0;
            font-size: 20px;
            color: #333;
          }
          .returnRefunt_price{
            position: absolute;
            bottom: 10px;
            font-size: 24px;
            font-weight: bold;
            color: #e51818;
          }
          .returnRefunt_btn{
            position: absolute;
            right: 0;
            width: 100px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            background-color: #e51818;
            color: #fff;
            font-size: 14px;
            border-radius: 4px;

          }
          .one{
            top:50px;
          }
        }
      }
    }
  }
</style>