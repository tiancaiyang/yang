<template>
<div class="browse_history">
  <h2>浏览足迹</h2>
  <a class="fr" @click.stop="delBrowsHistory()"><span class="el-icon-delete"></span>清空浏览记录</a>
  <ul class="browse_history_all">
    <li class="all_box" v-for="item in browseList" :key="item.index">
      <p class="time_box">
        <span class="time_num">{{ item.dt_create }}</span>
      </p>
      <ul class="goods_box">
        <li v-for="items in item.goods" :key="items.index"  @click="goProductInfo(items)">
          <a @click.stop="delBrowsHistory(items.browse_records_id)" class="del_btn_active"><span class="el-icon-delete"></span></a>
          <img :src="items.thumb">
          <p class="goods_detail">{{ items.title }}</p>
          <p class="goods_price">￥{{ items.price }}</p>
        </li>
      </ul>
    </li>
  </ul>
  <div class="orderNull" v-if="browseList.length == 0">
    <p class="iconfont icon-wushoucang"></p>
    <p>浏览记录还是空的呢！快去逛逛吧！</p>
  </div>
  <div v-if="browseList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
</div>
</template>

<script>
import { Getbrowserecords,Delbrowserecords } from '../../api/index.js'
export default {
  inject :['reload'],
  data () {
    return {
      delIconFlag: false,
      browseList:[],//浏览记录数据
      page:0,
      limit:9,
      totalPage:0,
    }
  },
  created(){
    this.getBrowseHistory()
  },
  methods: {
     //获取当前页码
    getCurrentPage(pageNum){
      this.page = pageNum-1;
      this.getBrowseHistory()
    },
    // 获取浏览数据
    getBrowseHistory(){
      let params = {
        page : this.page,
        limit: this.limit
      }
      Getbrowserecords(params).then(res=>{
        if(res.code == 0){
          this.browseList = res.data.list
          this.totalPage = parseInt(res.data.total_num)
        }
      })
    },
    // 跳转到商品详情
    goProductInfo(item){
      if(item.type == 1){// 去b端商品详情页面
        let params = {
          product_id: item.product_id,
          activity_type: item.activity_type,
          activity_id: item.product_id,
        }
        this.$router.push({name: 'BProductDetail', query: params})
      }else if(item.type == 2){//去c端页面
        this.$router.push({name:'CProductDetail',params: { type: item.activity_type, activityId:item.product_id, productId: item.product_id } })
      }
    },
    // 删除单个记录
    delBrowsHistory(browseId){
      let params = {
        browse_records_id	: browseId
      }
      if(browseId == !null || browseId == undefined || browseId == ''){
        this.$confirm('确定要删除全部吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Delbrowserecords(params).then(res=>{
            if(res.code == 0){
              // 再次刷新页面
              this.getBrowseHistory()
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
            }
          })
        }).catch(() => {
          this.getBrowseHistory()
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });          
        });
       }else{
        Delbrowserecords(params).then(res=>{
          if(res.code == 0){
            // 再次刷新页面
            this.getBrowseHistory()
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          }
        })    
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.browse_history {
  padding: 20px;
  box-sizing: border-box;
  min-height: 1052px;
  background-color: #fff;
  h2 {
    font-size: 24px;
    line-height: 36px;
    color: #666;
    padding-bottom: 30px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 30px;
  }
  .browse_history_all {
    .all_box {
      .time_box {
        display: flex;
        align-items: flex-end;
        .time_txt {
          font-size: 20px;
          color: #333;
        }
        .time_num {
          font-size: 16px;
          color: #666;
          margin: 0 40px 0 20px;
        }
        a {
          font-size: 14px;
          color: #999;
        }
      }
      .goods_box {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 290px;
          height: 394px;
          padding: 20px;
          box-sizing: border-box;
          text-align: center;
          margin-right: 18px;
          margin-bottom: 40px;
          position: relative;
          @include common_li_hover;
          a {
            display: none;
            position: absolute;
            top: 15px;
            right: 15px;
            color: #999;
          }
          &:hover .del_btn_active{
            display: block;
          }
          .del_btn_active {
            display: none;
          }
          img {
            width: 250px;
            height: 250px;
          }
          .goods_detail {
            margin: 20px 0;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
            line-height: 26px;
            font-size: 16px;
            color: #666;
          }
          .goods_price {
            text-align: center;
            color:#e51818
          }
        }
        li:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
  // 空内容
  .orderNull{
    text-align: center;
    margin-top: 50px;
    .icon-wushoucang{
      height: 100px;
      font-size: 80px;
    }
    p{
      font-size: 18px;
      color: #bbb;
      margin-bottom: 10px;
    }
  }
}
</style>
