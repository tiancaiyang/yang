<template>
    <div>
    <header-top></header-top>
    <Header></Header>
    <div  class="body_box">
        <div class="accountInfo banxin">
            <div class="accountInfoTop">
                <h3>
                <img src="../../../assets/common/checked.png" alt="">
                支付成功
                </h3>
            </div>
            <div class="accountInfoBottom">
                <router-link to="/" tag="a" >继续购物</router-link>
                <router-link to="/one/user/OrderPerson/OrderAll" tag="a" >查看订单</router-link>
            </div>
        </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
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

<style lang="scss" scoped>
.body_box {
    padding: 80px 0 0;
   .accountInfo {
        box-sizing: border-box;
        background-color: #fff4e8;
        height: 200px;
        border: 1px solid #ffc07b;
        padding: 30px 40px;
    .accountInfoTop {
      border-bottom: 1px solid #eee;
      h3 {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 30px;
        img{
          vertical-align: middle;
        }
      }
    }
    .accountInfoBottom {
      padding-top: 20px;
      a {
        font-size: 16px;
        font-weight: bold;
        color: #666;
        padding: 10px 20px;
        display: inline-block;
      }
      a:hover{
          color: #e51818;
      }
    }
  }
}
</style>