<template>
  <!-- 报价单 -->
  <div class="inquiry">
    <div class="con-data">
      <div class="data-item" v-for="(ite,idx) in listOrder" :key="idx">
        <van-cell-group>
          <van-switch-cell v-model="ite.checked" :title="ite.name" class="item-title" />
        </van-cell-group>
        <div class="con-card" v-show="ite.checked">
          <van-cell class="con-item" v-for="(item,index) in ite.list" :key="index" :is-link="buttonValue.show" @click="buttonValue.show && !buttonValue.disabled ? jumpPage(item) : ''">
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">{{item[14]}}</span>
                <span class="row-right">
                  <van-tag :type="item[13] === '初始状态' ? '' : 'danger'">{{item[13]}}</van-tag>
                </span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[16]}}</span>
                <span class="row-right"> {{item[11]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[15]}}</span>
                <span class="row-right"> {{item[12]}}</span>
              </div>
            </div>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { index, offer } from "../../../assets/js/api.js";
export default {
  data() {
    return {
      listOrder: [],
      buttonValue: {
        show: false,
        disabled: true
      }
    };
  },
  computed,
  methods: {
    getData() {
      const params = {
        pid: this.userId.UCML_OrganizeOID,
        sid: this.userId.UCML_UserOID,
        type: 4
      };
      offer.getPriceList(params).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            const list = eval("[[" + csp[0]);
            const listOrder = [];
            let tmp = "";
            // 数据分组
            list.forEach(val => {
              if (val[3] !== tmp) {
                listOrder.push({
                  name: val[9],
                  checked: true,
                  list: []
                });
                listOrder[listOrder.length - 1].list.push(val);
                tmp = val[3];
              } else {
                listOrder[listOrder.length - 1].list.push(val);
              }
            });
            this.listOrder = listOrder;
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    jumpPage(item) {
      this.$store.commit("confirmParams", item);
      this.$router.push({
        name: "tranrial"
      });
    },
    pageInit() {
      this.getData();

      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_Order_SetPrice")
        .then(res => {
          if (res.status) {
            const arr = JSON.parse(res.text);
            arr.forEach(val => {
              if (val.Allowvisible === "1" && val.text === "编辑单据") {
                this.buttonValue.show = true;
                this.buttonValue.disabled = val.Enabled !== "1";
              }
            });
          }
        });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.inquiry {
  width: 100%;
  .con-data {
    margin-bottom: 50px;
    .data-item {
      background-color: #fff;
      margin-bottom: 10px;
      .item-title {
        font-size: 14px;
        font-weight: 600;
      }
      .con-card {
        width: 100%;
        .con-item {
          .item-content {
            font-size: 13px;
            color: #666;
            .content-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 2px 0;
            }
          }
        }
      }
    }
  }
}
</style>

