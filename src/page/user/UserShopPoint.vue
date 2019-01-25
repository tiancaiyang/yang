<template>
  <div class="shop_point">
    <h2>积分明细</h2>
    <!-- 我的积分 -->
    <div class="my_shop_point">
      <div class="shop_point_num">
        <h3>我的积分</h3>
        <span>1679</span>
      </div>
      <el-button class="gomall_btn">前往积分商城</el-button>
    </div>
    <!-- 积分明细 -->
    <div class="shop_point_detail">
      <h3>积分明细</h3>
      <el-table :data="tableData" border style="width: 100%" :header-cell-style="table_style" :cell-style="{'text-align':'center'}">
        <el-table-column prop="date" label="操作时间" width="265">
        </el-table-column>
        <el-table-column prop="change" label="积分变化" width="226">
        </el-table-column>
        <el-table-column prop="change_type" label="操作类型" width="168">
        </el-table-column>
        <el-table-column prop="num_total" label="积分总计">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      table_style: {
        'background': '#f8f8f8',
        'color': '#333',
        'text-align': 'center'
      },
      tableData: [
        {'date': '2018-10-31  23:59:59', 'change': '+36.00', 'change_type': '交易累积', 'num_total': '1679.00'},
        {'date': '2018-10-31  23:59:59', 'change': '+36.00', 'change_type': '交易累积', 'num_total': '1679.00'},
        {'date': '2018-10-31  23:59:59', 'change': '+36.00', 'change_type': '交易累积', 'num_total': '1679.00'},
        {'date': '2018-10-31  23:59:59', 'change': '+36.00', 'change_type': '交易累积', 'num_total': '1679.00'}
      ]
    }
  },
  methods: {}
}

</script>

<style lang="scss" scoped>
  .shop_point {
    background-color: #fff;
    height: 1052px;
    padding: 20px;
    box-sizing: border-box;

    h2 {
      font-size: 24px;
      color: #666;
      line-height: 36px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
    }

    // 我的积分
    .my_shop_point {
      border-bottom: 1px dashed #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 40px 10px 30px;

      .shop_point_num {
        h3 {
          font-size: 18px;
          color: #666;
          font-weight: 700;
          margin-bottom: 30px;
        }

        span {
          font-size: 62px;
          font-weight: 700;
          color: #e51818;
        }
      }

      .gomall_btn {
        width: 210px;
        height: 52px;
        background-color: #e51818;
        color: #fff;
        font-size: 16px;
      }
    }

    // 积分明细
    .shop_point_detail {
      margin-top: 40px;
      h3 {
        margin-bottom: 25px;
        font-size: 18px;
        color: #666;
      }
    }
  }

</style>
