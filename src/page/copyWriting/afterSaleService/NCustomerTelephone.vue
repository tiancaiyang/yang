<template>
    <div class="NCommon">
       <h2 class="title">客服电话</h2>
       <div class="NCommon_content">
           <h3>客服电话：0371-67618866</h3>
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
            padding-top: 30px;
            h3{
                font-size: 20px;
                color: #333;
                margin: 0 0 20px;
            }
        }
    }
</style>