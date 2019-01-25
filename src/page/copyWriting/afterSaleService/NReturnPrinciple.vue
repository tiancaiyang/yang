<template>
    <div class="NCommon">
       <h2 class="title">售后政策</h2>
       <div class="NCommon_content">
           <h3>第三方卖家销售的商品将由第三方卖家直接为您提供售后服务，建议您优先联系商家解决；如对商家处理结果有异议，请致电平台，由平台协助进行解决，如仍对结果由异议，可走法律程序进行解决。</h3>
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