<template>
  <div class="combinationInfo">
    <header-top></header-top>
    <Header></Header>
    <div class="combination_Div">
      <div class="combination_box">
        <div class="combination_title">
          <div class="banxin">
            <h2>{{groupData.group_name}}</h2>
            <div class="combination_title_info">
              <span v-for="item in groupData.title_arr" :key="item.index">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="combination_content banxin">
          <!-- 任选商品 -->
          <div class="optional">
            <div class="content_title">
              <h3>任选商品</h3>
            </div>
            <div class="goodsLIst">
              <ul>
                <li v-for="item in groupData.goods" :key="item.index">
                  <div class="goodsImg">
                    <img :src="item.thumb">
                  </div>
                  <div class="goodsInfo">
                    <h3>{{item.title}}</h3>
                    <p class="goodsSpec">规格：{{item.product_attr}}</p>
                    <div class="fr goodsNumbox">
                      <p class="goodsPrice">￥{{item.price}} /箱</p>
                      <span style="color: red" v-show="parseInt(item.stock-item.count) == 0">库存不足</span>
                      <el-input-number
                        class="numbox_butteon"
                        v-model="item.count"
                        :min="0"
                        :max='parseInt(item.stock)'
                        :step="1"
                        @change="addGoodsClass(item.product_id, item.count)"
                      ></el-input-number>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 件数和组数 -->
        <div class="groupNumber banxin">
          <span class="AllNumber">件数: {{ $store.getters.totalGoodsNum.count }} 件</span>
        </div>
        <!-- 赠品 -->
        <div class="gift_Div banxin">
          <div class="content_title">
            <h3>赠品</h3>
            <span>可选赠品 {{ $store.getters.totalGoodsNum.okNum }} 组</span>
          </div>
          <div class="goodsLIst">
            <ul>
              <li v-for="item in groupData.gift" :key="item.index">
                <div class="goodsImg">
                  <img :src="item.thumb">
                </div>
                <div class="goodsInfo">
                  <p class="goodsInfo_title">{{item.title}}</p>
                  <p class="goodsPrice">市场价：¥ {{item.price}}</p>
                  <div class="goodsNumbox">
                    <el-input-number
                      class="numbox_butteon"
                      v-model="item.count"
                      :min="0"
                      :step="1"
                      :max="giftAdd > 0 ? $store.getters.totalGoodsNum.okNum : 0"
                      @change="addGiftClass(item.gift_id, item.count)"
                    ></el-input-number>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 备注 -->
        <div class="remarks banxin">
          <div class="content_title">
            <h3>备注</h3>
          </div>
          <div class="goodsLIst">
            <el-input
              placeholder="请在此输入备注内容"
              v-model="userMsg"
              clearable
            ></el-input>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submitOrder banxin clearfix">
          <span class="AllPrice">总计: <b>￥{{ $store.getters.totalGoodsNum.totalMoney | numFilter }}</b></span>
          <el-button class="goods_buy_btn fr" @click="combinationSubmit">提交订单</el-button>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import {
  b2bGetCombinationDetail,
  b2bGetCombinationSubmit
} from '../../api/index.js'
export default {
  data () {
    return {
      groupId: this.$route.query.group_id, // 组合活动的 groupId
      groupData: [], // 组合活动详情数据
      groupType: '',  // 活动类型
      ratio: 0,    // 限制购买数量的数
      giftAdd: 0, // 控制赠品增加按钮的数
      idArr: [], // 放入已选商品的id
      giftIdArr: [], // 放入已选赠品id
      typeNum: 0,  // 限制品类的数量
      // typeFlag: false, // 限制品类的标识
      userMsg: "",  // 用户留言
    }
  },
	created() {
    this.getCombinationData()
  },
  updated() {
    this.giftNum()
  },
	methods: {
    // 组合活动详情数据
		getCombinationData() {
			let params = {
				group_id: this.groupId
			}
			b2bGetCombinationDetail(params).then(res => {
        console.log(res)
				if(res.code == 0) {
          console.log(res)
          this.groupData = res.data
          this.groupType = res.data.group_type
          this.typeNum = res.data.type_num
          this.ratio = res.data.ratio
          this.$store.commit('combinationGroupData', this.groupData)  // 传入vuex
				}
			})
    },
    // 赠品数量的限制
    giftNum() {
      let giftTol = this.$store.getters.getGiftNum.totalNum
      let okGift = this.$store.getters.totalGoodsNum.okNum
      this.giftAdd = okGift - giftTol
    },
    // 商品品类限制的操作
    addGoodsClass(id, value) {
      if(value > 0) {
        if(this.idArr.indexOf(id) == -1) {
          this.idArr.push(id)
        }
        // if(this.idArr.length >= this.typeNum) {
        //   this.typeFlag = true
        // } else {
        //   this.typeFlag = false
        // }
      } else if (value == 0) {
        let index = this.idArr.indexOf(id)
        if(index > -1) {
          this.idArr.splice(index, 1)
        }
      }
    },
    // 所选赠品
    addGiftClass(id, value) {
      if(value > 0) {
        if(this.giftIdArr.indexOf(id) == -1) {
          this.giftIdArr.push(id)
        }
      } else if (value == 0) {
        let index = this.giftIdArr.indexOf(id)
        if(index > -1) {
          this.giftIdArr.splice(index, 1)
        }
      }
    },

    // 提交订单
    combinationSubmit() {
      let goodArr = []
      let giftArr = []
      let that = this
      let totalNum = this.$store.getters.totalGoodsNum.count

      this.groupData.goods.forEach(item => {
        if(that.idArr.indexOf(item.product_id) > -1) {
          goodArr.push(item.product_id +';'+item.count)
        }
        return goodArr
      })

      this.groupData.gift.forEach(item => {
        if(that.giftIdArr.indexOf(item.gift_id) > -1) {
          giftArr.push(item.gift_id + ';' + item.count)
        }
        return giftArr
      })
      // 提交的时候的业务逻辑的判断
      if(this.idArr.length < this.typeNum) {
        this.$message.error('您没有满足商品种类')
      } else if(totalNum < this.ratio) {
        this.$message.error('商品不能少于' + this.ratio + '件')
      } else if(this.$store.getters.getGiftNum.totalNum  < this.$store.getters.totalGoodsNum.okNum) {
        this.$message.error('请把您应该得到的赠品全部拿走')
      } else {
        let params = {
          address_id: this.groupData.address_id,
          product_id_num: goodArr.toString(), // (商品id;购买数量,商品id;购买数量)
          gift_id_num: giftArr.toString(), // (赠品id;购买数量,赠品id;购买数量)
          price_total: this.$store.getters.totalGoodsNum.totalMoney, // 总价
          brand_member_id: this.groupData.brand_member_id,
          brand_member_pos_id: this.groupData.brand_member_pos_id,
          comment: this.userMsg, // 用户备注
          group_id: this.groupData.group_id, // 组合活动id
        }
        console.log(params)
        b2bGetCombinationSubmit(params).then(res => {
          if(res.code == 0) {
            console.log(res)
            let params = {
              order_no: res.data.order_no,
              price_total: res.data.price_total,
              form: 1
            };
            this.$router.push({ name: "BOrderPaytypeConfirm", query: params });
          }else{
            this.$alert( res.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                
              }
            });
          }
        })
      }
    },
	},
}
</script>

<style scoped lang="scss">
.combinationInfo {
  background-color: #f5f5f5;
}

.combination_box {
  .combination_title {
    height: 228px;
    background-color: #e4393c;
    padding-top: 40px;
    box-sizing: border-box;
    h2 {
      font-size: 32px;
      color: #fff;
    }
    .combination_title_info {
      padding-top: 30px;
      span {
        font-size: 18px;
        display:inline-block;
        min-width: 20%;
        color: #fff;
        margin-right: 50px;
        padding-bottom: 10px;
        &::before {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          vertical-align: middle;
          border-radius: 2px;
          margin-right: 5px;
          background-color: #f7c883;
        }
      }
    }
  }
  .content_title {
    display: flex;
    align-items: center;
    >span {
      padding-left: 20px;
    }
    h3 {
      color: #333;
      font-size: 22px;
      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 23px;
        vertical-align: top;
        border-radius: 2px;
        margin-right: 12px;
        background-color: #e22a34;
      }
    }
  }
  .combination_content {
    background-color: #fff;
    margin-top: -65px;
    padding: 30px;
    border-radius: 10px 10px 0 0;
    box-sizing: border-box;
    .goodsLIst {
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 560px;
          height: 168px;
          border: 1px solid #ececec;
          margin: 20px 0 0;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          .goodsImg {
            width: 166px;
            height: 166px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 100%;
            }
          }
          .goodsInfo {
            width: 394px;
            padding: 20px;
            box-sizing: border-box;
            .goodsSpec {
              color: #999;
              font-size: 16px;
              margin-top: 13px;
            }
            .goodsNumbox {
              width: 100%;
              margin-top: 38px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .goodsPrice {
                font-size: 16px;
                color: #e51818;
              }
              .numbox_butteon {
                & /deep/ .el-input__inner {
                  height: 40px;
                  border-radius: 18px;
                }
                & /deep/ .el-input-number__decrease {
                  border-radius: 18px 0 0 18px;
                }
                & /deep/ .el-input-number__increase {
                  border-radius: 0 18px 18px 0;
                }
              }
              .el-input-number {
                width: 128px;
                height: 36px;
              }
            }
          }
        }
      }
    }
  }
  // 件数和组数
  .groupNumber {
    height: 112px;
    line-height: 112px;
    padding: 0 20px;
    box-shadow: 0 -5px 5px rgba(219, 216, 216, 0.57);
    background-color: #fff;
    box-sizing: border-box;
    .AllNumber {
      color: #333;
      font-size: 24px;
      font-weight: bold;
    }
  }
  // 赠品
  .gift_Div {
    margin-top: 30px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    .goodsLIst {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 366px;
          height: 168px;
          border: 1px solid #ececec;
          margin: 20px 30px 0 0;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .goodsImg {
            width: 166px;
            height: 166px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 100%;
            }
          }
          .goodsInfo {
            width: 199px;
            padding: 20px;
            box-sizing: border-box;
            .goodsInfo_title {
              color: #333;
              font-size: 20px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .goodsPrice {
              color: #f72333;
              font-size: 16px;
              margin-top: 15px;
            }
            .goodsNumbox {
              margin-top: 40px;
              .numbox_butteon {
                & /deep/ .el-input__inner {
                  height: 40px;
                  border-radius: 18px;
                }
                & /deep/ .el-input-number__decrease {
                  border-radius: 18px 0 0 18px;
                }
                & /deep/ .el-input-number__increase {
                  border-radius: 0 18px 18px 0;
                }
              }
              .el-input-number {
                width: 128px;
                height: 36px;
              }
            }
          }
        }
      }
    }
  }
  // 备注
  .remarks {
    margin-top: 30px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    .goodsLIst {
      margin-top: 30px;
    }
  }
  // 提交订单
  .submitOrder {
    margin-top: 50px;
    padding: 0 0 0 20px;
    box-sizing: border-box;
    box-shadow: 0 -5px 5px rgba(223, 223, 223, 0.81);
    background-color: #fff;
    .AllPrice {
      font-size: 18px;
      color: #333;
      line-height: 80px;
      b {
        font-weight: bold;
        color: #e51818;
        font-size: 24px;
      }
    }
    .goods_buy_btn {
      height: 80px;
      width: 220px;
      border-radius: 4px;
      font-size: 20px;
      color: #fff;
      border: 1px solid #e51818;
      background-color: #e51818;
    }
  }
}
</style>