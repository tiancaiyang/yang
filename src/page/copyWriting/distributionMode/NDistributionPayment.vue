<template>
    <div class="NCommon">
       <h2 class="title">配送费收取标准：</h2>
       <div class="NCommon_content">
            <h3>1、商户消费者订单满足起订量后，由第三方卖家进行免费配送；或根据订单数量，由第三方卖家和商户消费者沟通协商物流费用。</h3>
            <h3>2、普通消费者订单和土特产配送费收取由第三方卖家根据业务情况，免收配送费用或者根据各快递物流公司市场价格进行配送费明确标价收取。</h3>
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
        }
    }
</style>