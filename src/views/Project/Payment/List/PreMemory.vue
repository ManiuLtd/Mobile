<template>
  <!-- 预存列表 -->
  <div class="prememory">
    <div class="pre-data">
      <div class="pre-card">
        <van-cell-group class="pre-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">收款账号：{{item[12]}}</span>
            <span class="option" v-if="item[30] != '1'">
              <van-button type="danger" size="mini" plain @click="onDelete(item[0])" v-if="buttonValue.delete.show" :disabled="buttonValue.delete.disabled">删除</van-button>
            </span>
          </div>
          <van-cell class="item-content" :is-link="buttonValue.edit.show" @click="buttonValue.edit.show && !buttonValue.edit.disabled ? jumpPage(item) : ''">
            <div class="content-row">
              <span>所属项目：{{item[28]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">审核日期：{{item[8] | formatDate}}</span>
              <span class="row-right">
                <van-tag v-if="item[31] == 'false'">单据状态：未提交</van-tag>
                <van-tag type="danger" v-else-if="item[6] == '0'">单据状态：未审核</van-tag>
                <van-tag type="success" v-else-if="item[30] == '1'">单据状态：已审批</van-tag>
                <van-tag type="primary" v-else-if="item[31] == 'true'">单据状态：审批中</van-tag>
                <van-tag v-else-if="item[6] == '1'">单据状态：待审批</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span>预存单号：{{item[1]}}</span>
            </div>
            <div class="content-row">
              <span>预存金额：{{item[9] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span>经手人：{{item[13]}}</span>
            </div>
            <div class="content-row">
              <span>备注：{{item[16]}}</span>
            </div>
          </van-cell>
        </van-cell-group>
        <div class="margin-top-sm" v-if="filterParams === 1">
          <van-button type="primary" size="large" @click="onAdd" v-if="buttonValue.add.show" :disabled="buttonValue.add.disabled">新增预存登记</van-button>
        </div>
      </div>
    </div>
    <!--分页组件-->
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="getData" />
  </div>
</template>
<script>
import computed from "../../../../assets/js/computed.js";
import { index, financial } from "../../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      curPage: 1,
      pages: {},
      buttonValue: {
        add: {
          show: false,
          disabled: true
        },
        edit: {
          show: false,
          disabled: true
        },
        delete: {
          show: false,
          disabled: true
        }
      }
    };
  },
  computed,
  methods: {
    // 获取数据
    jumpPage(item) {
      if (item[31] == "true") {
        const params = {
          InstanceID: item[32],
          name: "预存登记详情",
          bpoName: "SupplyChain/BizFinance/BPO_WF_Apply_Info"
        };
        this.$store.commit("taskParams", params);
        financial
          .updateReadInfo({
            BPOName: this.taskModel,
            key_value: item[0]
          })
          .then(res => {
            if (res.status && res.text == "True") {
              this.$router.push({
                name: "taskYCFrom"
              });
            } else {
              this.$toast.fail("获取数据失败，请重试");
            }
          });
      } else {
        const params = {
          InstanceID: item[0],
          name: "编辑预存登记",
          bpoName: "SupplyChain/BizFinance/BPO_WF_Apply_Info"
        };
        this.$store.commit("taskParams", params);
        this.$router.push({
          name: "paymentAddYC"
        });
      }
    },
    // 新增预存单
    onAdd() {
      this.$store.commit("taskParams", "");
      this.$router.push({
        name: "paymentAddYC"
      });
    },
    // 删除预存单
    onDelete(id) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "是否删除单据？"
        })
        .then(() => {
          financial.deleteStored(id).then(res => {
            if (res && res.status === 1) {
              if (res.text == "0") {
                this.$toast.fail("单据已审核，不能删除！");
              } else if (res.text == "1") {
                this.getData().then(() => {
                  this.$toast.success("删除数据成功");
                });
              } else {
                this.$toast.fail("删除数据失败");
              }
            } else if (res && res.text) {
              this.$toast(res.text);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    getData() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      return financial
        .getPremomey(this.userId.UCML_OrganizeOID, page, this.filter)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("[[");
              const csp = sp[1].split(";");
              this.list = eval("[[" + csp[0]);
              this.pages = eval("(" + csp[1].split("=")[1] + ")");
              return true;
            }
            return false;
          } catch (e) {
            console.log(e);
            return false;
          }
        });
    },
    pageInit() {
      if (this.filterParams === 1) {
        this.filter = "AND SC_Money_InOut.StartFlowFlag is null";
      } else {
        this.filter = "AND SC_Money_InOut.BusinessState='1'";
        this.filter +=
          " AND SC_Money_InOutOID not in (SELECT Key_Value FROM SC_ReadBill_Info WHERE UserOID='" +
          this.userId.UCML_UserOID +
          "' AND Table_Name='SC_Money_InOut' AND Read_Flag='1')";
      }
      this.getData().then(res => {
        if (!res && this.list.length === 0) {
          this.$router.go(-1);
        } else {
          index
            .getAppletButton(this.userId.UCML_UserOID, "BPO_Money_YC_Info")
            .then(res => {
              if (res.status) {
                const arr = JSON.parse(res.text);
                arr.forEach(val => {
                  if (val.Allowvisible === "1") {
                    switch (val.text) {
                      case "新增":
                        this.buttonValue.add.show = true;
                        this.buttonValue.add.disabled = val.Enabled !== "1";
                        break;
                      case "删除":
                        this.buttonValue.delete.show = true;
                        this.buttonValue.delete.disabled = val.Enabled !== "1";
                        break;
                      case "编辑":
                        this.buttonValue.edit.show = true;
                        this.buttonValue.edit.disabled = val.Enabled !== "1";
                        break;
                    }
                  }
                });
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
.prememory {
  width: 100%;
  padding: 10px;
  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
  .pre-data {
    margin-bottom: 40px;
    .pre-card {
      width: 100%;
      .pre-item {
        background-color: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          padding: 10px 0;
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px 0;
          font-size: 13px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
          }
        }
      }
    }
  }
}
</style>


