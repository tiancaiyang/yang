<template>
  <div class="paging">
    <div class="paging_box">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pagesize"
        prev-text="上一页" next-text="下一页" :layout="layout" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {

    name: 'Pagination',
    props: {
      pagesize: '',
      currentPage: '',
      total: '',
      options: '', // 分页发生变化赋值给options
      render: '', // 跳转触发的请求
      layout: {
        type: String,
        default: 'total, prev, pager, next'
      },
      currentP: ''
    },
    created() {
      // console.log(this.total);
      // console.log(this.pagesize);
      // console.log(this.currentP);
      if (this.currentPa == 1) {
        this.handleCurrentChange(this.currentPa);
      }

    },

    methods: {

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 当前页的状态
      handleCurrentChange(val) {
        // console.log(this.currentP);
        console.log(`当前页 ${val}`)
        this.$emit("listen", `${val}`);

      }
    },

  }

</script>
<style lang="scss" scoped>
  // 分页
  .paging {
    display: flex;
    width: 1182px;
    height: 171px;
    margin: auto;

    .paging_box {
      margin: auto;
      display: flex;

      a {
        margin-top: 10px;
        margin-right: 10px;
        display: inline-block;
        color: #666;
      }

      & /deep/ .el-pager li.active {
        color: #fff;
        background: #23b57e;
      }
    }
  }

</style>
