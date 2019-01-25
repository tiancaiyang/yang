<template>
    <div class="NCommon">
       <h2 class="title">品牌入驻</h2>
       <div class="NCommon_content">
           <h3>掌柜当家入驻品牌种类为：</h3>
           <p>酒水饮料、服装鞋帽、日常洗护、家具家电、海外进口、粮油食品、护理洗化、零食糕点等。</p>
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
                padding: 0 0 10px;
            }
        }
    }
</style>