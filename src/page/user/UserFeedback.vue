<template>
<div class="user_feedback">
  <h2>意见反馈</h2>
  <div class="inputDiv">
    <el-input
      type="textarea"
      :rows="8"
      resize="none"
      placeholder="请留下宝贵的意见.(至少6个字,最多三百字)"
      v-model="textarea"
      class="feed_content">
    </el-input>
    <span class="inputLength">{{ textarea.length }}/300</span>
  </div>
  
<el-button type="danger" :disabled="textarea.length < 6 || textarea.length > 300 ? true : false" class="sub_btn" @click="submitBtn">提交</el-button>
</div>
</template>

<script>
import { FeedBack } from '../../api/index.js'
export default {
  data () {
    return {
      textarea: ''
    }
  },
  methods: {
    submitBtn () {
      let params = {
        feed_back_info: this.textarea
      }
      FeedBack(params).then(res=>{
        if(res.code == 0){
          this.$message({
            message: '恭喜你,提交成功!',
            type: 'success'
          })
        }
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
.user_feedback {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 1052px;
  h2 {
    font-size: 24px;
    color: #666;
    line-height: 36px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 30px;
  }
  .inputDiv{
    position: relative;
  }
  .feed_content {
    min-height: 180px;
    margin-bottom: 30px;
  }
  .inputLength{
    position: absolute;
    bottom: 45px;
    right: 15px;
    font-size: 14px;
    color: #666;
  }
  .sub_btn {
    width: 189px;
    height: 52px;
  }
}
</style>
