<template>
  <!-- 底部最底下版块 -->
  <div class="footerb_box">
    <div class="footerb_content clearfix banxin">
      <!-- 左边详细地址信息 -->
      <div class="footerb_content_l fl">
        <p>地址：河南省郑州市金水区花园路东风路交叉口向西200米蓝堡湾三期世玺中心1409室     电话：0371-67618866</p>
        <p>Copyright 2015-2030 All Rights Reserved     增值电信业务经营许可证：<a href="http://www.miibeian.gov.cn" target="_blank">豫B2-20170007-1</a></p>
        <p>互联网ICP备案号： <a href="http://www.miibeian.gov.cn" target="_blank">豫B2-20170007-1</a></p>
      </div>
      <!-- 右边二维码部分 -->
      <div class="footerb_content_r fr">
        <img src="../../static/微信图片_20190123140725.png">
        <span>扫一扫手机版</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goLink(){

    }
  },
}
</script>

<style lang="scss" scoped>
.footerb_box {
  width: 100%;
  background-color: #414141;
  font-size: 14px;
  font-weight: normal;
  color: #999;
  .footerb_content {
    .footerb_content_l {
      padding:  40px 0;
      p:nth-child(2) {
        margin: 16.5px 0;
      }
    }
    .footerb_content_r {
      margin-top: 25px;
      img {
        display: block;
        background-color: #fff;
        width: 85px;
        height: 85px;
      }
      span {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
