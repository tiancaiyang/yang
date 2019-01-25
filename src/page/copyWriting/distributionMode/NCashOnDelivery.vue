<template>
    <div class="NCommon">
       <h2 class="title">配送服务查询</h2>
       <div class="NCommon_content">
           <h3>掌柜当家承诺您所下单的商品一律在72小时以内统一发货，商户消费者订单如遇紧急商品，可以与您的业务联系协商配送时间。</h3>
           <h3>掌柜当家物流配送分为三个部分：</h3>
           <p>1、商户消费者订单：由第三方卖家通过隶属业务员直接进行配送或由第三方卖家进行物流配送。</p>
           <p>2、普通消费者和土特产订单：由第三方卖家通过物流或快递进行配送。</p>
           <p>3、乡村乐订单：到店消费，不进行配送。</p>
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
                line-height: 30px;
                color: #181818;
                margin: 20px 0;
            }
        }
    }
</style>