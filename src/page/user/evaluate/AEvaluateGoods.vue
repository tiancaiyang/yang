<template>
<div class="goods_evaluate">
  <header-top></header-top>
  <div class="goods_evaluate_box banxin">
    <!-- 网页标题 -->
    <p class="evaluate_title"><span>商品评价</span></p>
    <!-- 评价内容 -->
    <div class="evaluate_content">
      <!-- 评价内容区的上半部分 -->
      <div class="evaluate_content_top">
        <!-- 商品展示区 -->
        <div class="goods_show">
          <img :src="thumb">
          <p class="goods_title">{{ title }}{{ productAttr }}</p>
        </div>
        <!-- 评价内容区 -->
        <div class="evaluate_txt">
          <div class="text_box_title">
            <p><img src="../../../assets/images/evaluate1.png">评价</p>
          </div>
          <div class="evaluate_txt_content">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea" resize="none"></el-input>
            <div class="upload_img">
              <a v-show="uploadImgs.length>=5?false:true"><img src="../../../assets/images/evaluate_img.png">晒照片
              </a>
              <input type="file" ref="input_btn" @change="addEvaluateImg">
              <ul>
                <li v-for="(item, index) in uploadImgs" :key="index">
                  <img :src="item">
                  <span class="el-icon-circle-close" @click="delImg(index)"></span>
                </li>
              </ul>
              <span>{{uploadImgs.length}}/5</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 评分区域 -->
      <div class="evaluate_point">
        <span class="evaluate_point_title">整体评分</span>
        <div class="point_star">
          <p>
            <span>描述相符</span>
            <el-rate v-model="value1" :colors="['#e51818', '#e51818', '#e51818']"></el-rate>
            <span class="star_num">{{value1 + '.00'}}</span>
          </p>
          <p>
            <span>物流态度</span>
            <el-rate v-model="value2" :colors="['#e51818', '#e51818', '#e51818']"></el-rate>
            <span class="star_num">{{value2 + '.00'}}</span>
          </p>
          <p>
            <span>服务态度</span>
            <el-rate v-model="value3" :colors="['#e51818', '#e51818', '#e51818']"></el-rate>
            <span class="star_num">{{value3 + '.00'}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 发布按钮 -->
    <el-button class="send_message" @click="goEvaluateStatus">发布</el-button>
  </div>
  <Footer></Footer>
  <footer-bottom></footer-bottom>
</div>
</template>

<script>
import  { evaluatuploadImage,personalAssessAdd,businessAssessAdd } from '../../../api/index.js'
export default {
  data () {
    return {
      productId: this.$route.query.productId,
      orderNo: this.$route.query.orderNo,
      orderType: this.$route.query.orderType,
      orderDetailId: this.$route.query.detailId,
      thumb: this.$route.query.thumb,
      title: this.$route.query.title,
      productAttr: this.$route.query.productAttr,
      textarea: '',
      uploadImgs: [],
      imgList:[],
      value1: null,
      value2: null,
      value3: null,
    }
  },
  methods: {
    // 评价上传图片
    addEvaluateImg () {
      let img = this.$refs.input_btn.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(img)
      var uri = ''
      var that = this
      reader.onloadend = function (e) {
        uri = e.target.result
        that.uploadImgs.push(uri)
      }
      let fd = new FormData()
      fd.append('image', img)
      evaluatuploadImage(fd).then(res=>{
        if(res.code == 0){
          this.imgList.push(res.data) 
        }
      })
      if(this.imgList.length != this.uploadImgs.length){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }
    },
    // 删除预览图片
    delImg (index) {
      this.uploadImgs.splice(index, 1)
      this.imgList.splice(index,1)
    },
    // 跳转到评价状态页面
    goEvaluateStatus () {
      var reg = /^\s*$/g;
      if(this.textarea == "" || reg.test(this.textarea)){
        this.$message({
          message: '请输入评价内容',
          type: 'success'
        });
      }else if(this.value1 == 0){
        this.$message({
          message: '请对描述相符评分',
          type: 'success'
        });
      }else if(this.value2 == 0){
        this.$message({
          message: '请对物流态度评分',
          type: 'success'
        });
      }else if(this.value3 == 0){
        this.$message({
          message: '请对服务态度评分',
          type: 'success'
        });
      }else {
        let params = {
          product_id: this.productId,
          order_no: this.orderNo,
          content: this.textarea,
          images: this.imgList,
          describe_star: this.value1,
          article_star: this.value2,
          service_start: this.value3,
          order_detail_id: this.orderDetailId,
          order_type : this.orderType,
        }
        if(this.orderType == 1){
          businessAssessAdd(params).then(res=>{
            if(res.code == 0){
              this.$message({
                message: '评价成功',
                type: 'success'
              });
              this.$router.push({name: 'AEvaluateSuccess'})
            }
          })
        }else if(this.orderType == 2){
          personalAssessAdd(params).then(res=>{
            if(res.code == 0){
              this.$message({
                message: '评价成功',
                type: 'success'
              });
              this.$router.push({name: 'AEvaluateSuccess'})
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods_evaluate {
  background-color: #fff;
  .goods_evaluate_box {
    margin-top: 40px;
    // 网页标题
    .evaluate_title {
      height: 40px;
      background-color: #f2f2f2;
      border-bottom: 2px solid #e51818;
      span {
        display: block;
        width: 134px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        background-color: #e51818;
        font-weight: 700;
      }
    }
    // 评价内容
    .evaluate_content {
      min-height: 542px;
      border: 1px solid #eaeaea;
      // 评价内容区的上半部分
      .evaluate_content_top {
        min-height: 334px;
        border-bottom: 1px solid #eaeaea;
        padding: 40px 0 0 104px;
        box-sizing: border-box;
        display: flex;
        .goods_show {
          margin-right: 30px;
          img {
            width: 130px;
            height: 130px;
          }
          p {
            color: #666;
            font-size: 14px;
            line-height: 24px;
          }
          .goods_title {
            color: #3366cc;
            font-weight: 700;
            margin-top: 10px;
          }
        }
        .evaluate_txt {
          height: 200px;
          width: 566px;
          .text_box_title {
            font-size: 18px;
            color: #333;
            font-weight: 700;
            height: 50px;

            p {
              display: flex;
              align-items: center;
              img {
                margin-right: 10px;
              }
            }
          }
          .evaluate_txt_content {
            background-color: #ffc07b;
            width: 566px;
            height: 181px;
            padding: 3px;
            box-sizing: border-box;
            .upload_img {
              position: relative;
              display: flex;
              padding-top: 10px;
              box-sizing: border-box;
              a {
                width: 64px;
                height: 23px;
                font-size: 12px;
                color: #fff;
                display: flex;
                align-items: center;
                background-color: #93b4c6;
                margin-right: 10px;
                img {
                  margin-right: 5px;
                }
              }
              input {
                width: 64px;
                height: 23px;
                position: absolute;
                top: 10px;
                left: 0;
                opacity: 0;
              }
              ul {
                display: flex;
                li {
                  width: 42px;
                  height: 42px;
                  border: 1px solid #e0e0e0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-right: 10px;
                  position: relative;
                  img {
                    max-width: 100%;
                    max-height: 100%;
                  }
                  span {
                    color: #e51818;
                    position: absolute;
                    top: -20px;
                    right: -6px;
                  }
                }
              }
              span {
                font-size: 12px;
                color: #999;
                margin-top: 15px;
                margin-left: 10px;
              }
            }
          }
        }
      }
      // 评分区域
      .evaluate_point {
        height: 208px;
        display: flex;
        // background-color: pink;
        .evaluate_point_title {
          display: block;
          width: 130px;
          height: 44px;
          background-color: #f3f3f3;
          color: #999;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          line-height: 44px;
          margin:86px 50px 0 104px;
        }
        .point_star {
          margin-top: 68px;
          p {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            span {
              margin-right: 15px;
              font-size: 14px;
              color: #333;
            }
            .star_num {
              margin-left: 50px;
              color: #e03234;
            }
          }
        }
      }
    }
    // 发布按钮
    .send_message {
      background-color: #e51818;
      width: 127px;
      height: 50px;
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      margin: 30px 0 0 282px;

    }
  }
}
</style>
