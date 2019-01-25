<template>
  <div class="headerTwo_box">
    <div class="headerTwo banxin" @click="goHome()">
      <img src="../assets/common/logo.png">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    // 点击logo 回首页
    goHome() {
      this.$router.push({name: 'CHomePage'});
    },
  },
}

</script>

<style lang="scss" scoped>
  .headerTwo_box {
    width: 100%;
    background-color: #fff;
    box-shadow: 1.8px 5.7px 16px 0px rgba(176, 176, 176, .28);

    .headerTwo {
      padding: 30px 0 40px 0;
      // width: 231px;
      height: 84px;
      display: flex;
      align-items: center;
      img {
        // background-color: #cecece;
        vertical-align: middle;
      }
    }
  }
</style>
