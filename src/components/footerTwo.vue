<template>
  <div class="footerTwo_box">
    <div class="footerTwo banxin">
      <ul>
        <li><router-link to="/" tag="a">欢迎来到掌柜当家 !</router-link></li>
        <li><a href="http://www.sltyhp.com/index/business_channel/index.html" target="_blank">商家入驻</a></li>
        <li><router-link to="/copyCommon/NAboutUs" tag="a">关于我们</router-link></li>
        <li><a href="javascript:void(0);">手机掌柜</a></li>
        <li><router-link to="/copyCommon/NCustomerTelephone" tag="a">联系我们</router-link></li>
        <li><a href="http://www.sltyhp.com/index/talent_recruitment/index.html" target="_blank">人才招聘</a></li>
        <li><a href="javascript:void(0);" class="el-icon-location">郑州</a></li>
      </ul>
      <p>Copyright 2015-2030 All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .footerTwo_box {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    padding-bottom: 58px;

    .footerTwo {
      ul {
        display: flex;
        justify-content: center;
        margin-top: 28px;
        margin-bottom: 36px;

        li {
          padding: 0 21px;
          font-size: 14px;
          color: #666;
          position: relative;
          .el-icon-location:before {
            color: #fd3942;
            margin-right: 2px;
          }
        }

        li:after {
          content: "";
          width: 1px;
          height: 14px;
          background-color: #b0b0b0;
          position: absolute;
          top: 0;
          right: 0;
        }

        li:last-child:after {
          display: none;
        }
      }
      p {
        display: flex;
        justify-content: center;
        font-size: 14px;
        color: #666;
      }
    }
  }
</style>
