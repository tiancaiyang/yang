<template>
    <div class="NCommon">
       <h2 class="title">购物流程</h2>
       <div class="NCommon_content">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="category" label="步骤" width="450"></el-table-column>
                <el-table-column prop="specific" label="具体操作" width="450"></el-table-column>
            </el-table>
            <p>注：乡村互联除土特产外，消费者购买的为商品验证码，需要到店进行验码消费。</p>
       </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
               tableData:[{
                    category: '1、注册',
                    specific: '填写详细个人信息，同意协议，提交完成注册'
                  },{
                    category: '2、查找商品',
                    specific: '分类浏览或者直接搜索来查找商品'
                  },{
                    category: '3、放入购物车',
                    specific: '填写详细个人信息，同意协议，提交完成注册'
                  },{
                    category: '4、提交订单',
                    specific: '商品放入购物车去结算或者继续购物'
                  },{
                    category: '5、查看订单状态',
                    specific: '我的订单查看订单状态'
                  },{
                    category: '6、验货签收',
                    specific: '检验货物是否损坏，确认签收'
                  },
               ] 
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
            padding-top: 20px;
            border-top: 1px solid #ddd;
            & /deep/ .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
                font-size: 16px;
                color: #333;
            }
            p{
                font-size: 16px;
                color: #666;
                line-height: 20px;
                margin-top: 30px;
                margin-bottom: 20px;
            }
        }
    }
</style>