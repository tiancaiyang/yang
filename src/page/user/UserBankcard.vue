<template>
  <div class="user_bankcard">
    <h2>银行卡</h2>
    <!-- 银行卡列表 -->
    <ul class="bankcard_list">
      <li class="add_card" @click="addBankCard()">
        <span class="add_img"></span>
        <span>添加银行卡</span>
      </li>
      <!-- 银行卡展示盒子 -->
      <li class="card_show" ref="bankcard_show_box" v-for="item in bankCardData" :key="item.index">
        <div class="card_show_top">
          <span class="bank_icon">
            <!-- <img src="../../assets/common/bankIcon/zs.png"> -->
            {{item.plantBankName}}
          </span>
          <span v-if="item.bankType == '01'" class="bank_flag">储蓄卡</span>
          <span v-if="item.bankType == '02'" class="bank_flag">信用卡</span>
        </div>
        <p class="card_num">**** **** **** {{item.accNo}}</p>
        <p class="card_usertel">
          <span>手机号：{{item.telephone}}</span>
          <span class="jiebang" @click="untyingCard(item.id)">解绑</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from "axios";
  import {
    bankCardList,
    untyingBankCard,
  } from "../../api/index.js";
  export default {
    inject: ['reload'],
    data() {
      return {
        token: localStorage.getItem("token"), // token
        bankCardData: [], // 银行卡数据
        // bankIcon: [
        //   CCB, // 建设
        //   BOC, // 中国银行
        //   ABC, // 农业
        //   ICBC, // 工商
        //   CMSB, // 民生
        //   CMB, // 招商
        //   CIB, // 兴业
        //   CEB, // 光大
        //   HFB, // 恒丰银行
        // ],
      };
    },
    created() {
      this.getBankList();
    },
    methods: {
      // 添加银行卡
      addBankCard() {

        this.token =
          "http://test.silutianyu.com/api/PayPingAnKj/UnionAPI_Add_Card.php" +
          "?" +
          "token=" +
          this.token + "&type=0" ;
          // console.log(this.token)
        window.location.href = this.token;
      },
      // 获取银行卡列表
      getBankList() {
        var fd = new FormData();
        fd.append("token", this.token);
        bankCardList(fd).then(res => {
          if (res.code == 0) {
            this.bankCardData = res.data;
            console.log(res.data);
          }
        });
      },
      // 解绑银行卡
      untyingCard(id) {
        let that = this
        this.$confirm('是否解绑该银行卡 ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            token: that.token,
            kjid: id
          };
          var fd = new FormData();
          fd.append("token", that.token);
          fd.append('kjid', id);
          untyingBankCard(fd).then(res => {
            console.log(res)
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.reload();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  };

</script>

<style lang="scss" scoped>
  .user_bankcard {
    height: 1050px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;

    h2 {
      font-size: 24px;
      color: #666;
      margin: 10px 0 30px 0;
    }

    .bankcard_list {
      border-top: 1px solid #e0e0e0;
      padding-top: 20px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 290px;
        height: 188px;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        background-color: #fff;
        margin-bottom: 20px;
        margin-right: 16px;
      }

      // 添加银行卡的li标签
      li:first-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .add_img {
          display: block;
          width: 49px;
          height: 49px;
          background-image: url("../../assets/images/user/add.png");
          margin-bottom: 25px;
        }

        span:nth-child(2) {
          font-size: 18px;
          color: #999;
        }
      }

      // 银行卡展示盒子
      .card_show {
        padding: 20px;
        box-sizing: border-box;

        .card_show_top {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .bank_icon {
            height: 26px;

            img {
              max-height: 26px;
            }
          }

          .bank_flag {
            display: block;
            width: 60px;
            height: 26px;
            background-color: #4e94f4;
            line-height: 26px;
            text-align: center;
            font-size: 14px;
            color: #fffefe;
          }
        }

        .card_num {
          font-size: 28px;
          color: #333;
          margin-top: 38px;
        }

        .card_usertel {
          display: flex;
          justify-content: space-between;
          margin-top: 36px;

          span:first-child {
            font-size: 14px;
            color: #666;
          }

          span:last-child {
            font-size: 14px;
            color: #4e94f4;
            cursor: pointer;
          }
        }
      }

      li:nth-child(3n) {
        margin-right: 0;
      }

      .active {
        border-color: #4e94f4;
      }
    }
  }

</style>
