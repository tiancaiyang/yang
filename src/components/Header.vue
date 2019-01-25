<template>
  <div class="header_box">
    <div class="header banxin clearfix">
      <!-- logo部分 -->
      <div class="header_logo fl" @click="goHome()"></div>
      <!-- 搜索框 -->
      <div class="header_search fl">
        <!-- 搜索选择 -->
        <div class="searchChiose">
          <a v-if="isToken && identity == 2" :class="activeFlag == 1 ? 'active':''" @click="searchType(1)">零售</a>
          <!-- <a :class="activeFlag == 2 ? 'active':''" @click="searchType(2)">店铺</a> -->
          <a v-if="identity == 2" :class="activeFlag == 3 ? 'active':''" @click="searchType(3)">批发</a>
        </div>
        <!-- 搜索框 -->
        <div class="search_box">
          <input type="search" id="" placeholder="" v-model="search" @keyup.enter='searchInput'>
          <span @click="searchInput"><img src="../assets/common/search.png"></span>
        </div>
        <!-- 搜索关键字 -->
        <ul class="keyword">
          <li v-for="item in hotWord" :key="item.index"><a @click="hotWordsChange(item)">{{ item.name }}</a></li>
        </ul>
      </div>
      <!-- 二维码 -->
      <div class="header_QRcode fr">
        <img src="../../static/微信图片_20190123140725.png">
        <p>手机版二维码</p>
      </div>
    </div>
    <!-- <banner></banner> -->
  </div>
</template>

<script>
import banner from '../components/banner'
import { headerHotWords } from '../api/index.js'
export default {
  inject :['reload'],
  data(){
    return{
      search:'',
      activeFlag: 1,//选中--默认商品1商品，2店铺，3批发
      hotWord:[],//搜索热词列表
      identity:'',//判断当前用户
      isToken:false,
    }
  },
  created(){
    // 检测是否登录
    var token = localStorage.getItem('token');
    if(token){
      this.isToken = true
    }else{
      this.isToken = false
    }
    this.getHotWords()
    this.identity = localStorage.getItem('identity')
  },
  methods:{
    // 点击logo 回首页
    goHome() {
      this.$router.push({name: 'CHomePage'});
    },
    getHotWords(){
      headerHotWords().then(res=>{
        if(res.code == 0){
          this.hotWord = res.data.hot_words
        }
      })
    },
    // 切换搜索类别
    searchType(index){
      this.activeFlag = index
    },
     // 热词搜索点击
    hotWordsChange(item){
      let params = {
        keyWords: item.name,
        type : this.activeFlag
      }
      if(this.activeFlag == 1){//商品
        // 再次刷新页面
        this.reload()
        this.$router.push({ name:'AGoodsListSearch',query:params})
      }else if(this.activeFlag == 3){//批发
        // 再次刷新页面
        this.reload()
        this.$router.push({ name:'AGoodsListSearch',query:params})
      }
    },
    // 搜索
    searchInput(){
      let params = {
        keyWords: this.search,
        type : this.activeFlag
      }
      if(this.activeFlag == 1){//商品
        // 再次刷新页面
        this.reload()
        this.$router.push({ name:'AGoodsListSearch',query:params})
      }else if(this.activeFlag == 2){//店铺
        // 再次刷新页面
        this.reload()
        this.$router.push({ name:'AShopList',query:params})
      }else if(this.activeFlag == 3){//批发
        // 再次刷新页面
        this.reload()
        this.$router.push({ name:'AGoodsListSearch',query:params})
      }
    }
  },
  components:{
    banner
  }
}
</script>

<style lang="scss" scoped>
.header_box {
  width: 100%;
  height: 190px;
  background-color: #fff;
  .header {
    // logo 部分
    .header_logo {
      width: 482px;
      height: 84px;
      margin-top: 40px;
      background: url('../assets/common/logo.png') no-repeat center;
    }
    // 搜索部分
    .header_search {
      margin-left: 90px;
      margin-top: 35px;
      .searchChiose{
        padding-bottom: 5px;
        a{
          padding: 5px;
          border-radius: 4px;
          display: inline-block;
        }
        .active{
          background-color: #e51818;
          color: #fff;
        }
      }
      .search_box {
        height: 50px;
        display: flex;
        input {
          outline: none;
          border: 1px solid #e51818;
          width: 383px;
          height: 100%;
          font-size: 16px;
          color: #aaa;
          padding-left: 15px;
        }
        span {
          display: inline-block;
          width: 82px;
          height: 100%;
          background-color: #e51818;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      // 搜索关键字部分
      .keyword {
        display: flex;
        margin-top: 10px;
        li {
          padding: 0 21px;
          font-size: 14px;
          color: #999;
          position: relative;
        }
        li:after {
          content: "";
          width: 1px;
          height: 14px;
          position: absolute;
          background-color: #b0b0b0;
          top: 2px;
          right: 0;
        }
        li:first-child {
          padding-left: 0;
        }
        li:last-child {
          padding-right: 0;
        }
        li:last-child:after {
          display: none;
        }
      }
    }
    // 二维码部分
    .header_QRcode {
      margin-top: 45px;
      text-align: center;
      img {
        width: 66px;
        height: 66px;
        background-color: #cecece;
        margin-left: 9px;
        &:hover{
          width: 104px;
          height: 104px;
        }
      }
      p {
        font-size: 14px;
        color: #999;
        line-height: 36px;
      }
    }
  }
}
</style>
