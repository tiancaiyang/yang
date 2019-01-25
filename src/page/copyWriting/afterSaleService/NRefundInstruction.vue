<template>
    <div class="NCommon">
       <h2 class="title">退款说明</h2>
       <div class="NCommon_content">
           <h3>取消订单后如何退款：</h3>
           <p>在线支付的订单（包含使用优惠劵、账户余额、货到付款的订单）取消成功后，第三方卖家订单根据卖家自身情况进行取消申请和退款受理。建议您致电第三家卖家，进行沟通协商。</p>
       </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
    }
</script>

<style scoped lang="scss">
    .NCommon{
        .title{
            font-size: 24px;
            line-height: 36px;
            color: #666;
            margin-bottom: 30px;
        }
        .NCommon_content{
            padding-left: 10px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
            h3{
                font-size: 18px;
                line-height: 30px;
                color: #333;
                margin: 0 0 20px;
            }
            p{
                font-size: 16px;
                color: #181818;
                line-height: 30px;
                padding: 0 0 20px;
            }
        }
    }
</style>