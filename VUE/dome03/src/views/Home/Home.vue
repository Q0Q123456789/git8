<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i-Input v-model="value">
            <Select v-model="select" slot="prepend" style="width: 80px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="initElement()"></Button>
        </i-Input>
      </div>
      <div class="right">
        <i-Switch size="large" @on-change="change">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
        </i-Switch>
      </div>

    </div>
    <div class="card" v-if="!isTabel">
      <Row :gutter="16" class="code-row-bg">
        <template v-for="(item,index) in list">
          <i-Col span="4" class="code-col-padbottom" :key="index"> 
            <Card>
                <p slot="title">{{item.type}}</p>
                <ul>
                  <li>
                    <p><span>名称：</span><span>{{item.name}}</span></p>
                    <p><span>色号：</span><span>{{item.colorNumber}}</span></p>
                    <p><span>数量：</span><span>{{item.number}}</span></p>
                    <p><span>进货时间：</span><span>{{item.purchaseTime}}</span></p>
                    <p><span>入库时间：</span><span>{{item.addTime}}</span></p>
                  </li>
                </ul>
                <div class="bottom-button">
                  <ButtonGroup size="small" shape="circle">
                      <Button type="primary" @click="edit(item)">编辑</Button>
                      <Button type="error" @click="modal = true,umID = item._id">删除</Button>
                  </ButtonGroup>
                </div>
            </Card>
          </i-Col>
        </template>
      </Row>
    </div>
    <div class="tabel" v-if="isTabel">
      <Table border :columns="columns" :data="list"></Table>
    </div>
    <div class="page" v-if="isPage">
      <Page :total="totalCount" @on-change='changePage' show-sizer @on-page-size-change='changePageSize' />
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Modal v-model="modal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除确认</span>
      </p>
      <div style="text-align:center">
          <p class="model-center">···将删除此条信息···</p>
      </div>
      <div slot="footer">
          <Button type="error" size="large" long :loading="modal_loading" @click="V_delete(umID)">删除</Button>
      </div>
    </Modal>
    <vm-user v-if="userEdit.isHide" :userEdit='userEdit' @EditReturn = 'EditReturn'></vm-user>
  </div>
</template>

<script>
// @ is an alias to /src
import userEdit from "@/components/userEdit.vue";

export default {
  name: "home_page",
  data() {
    return {
      list: [],
      spinShow: false,
      modal_loading: false,
      modal: false,
      isTabel: false,
      isPage: false,
      umID: "",
      value: "",
      select: "",
      totalCount: new Number(),
      pageSize: 10,
      page: 1,
      cityList: [
        {
          value: "微晶石",
          label: "微晶石"
        },
        {
          value: "全抛釉",
          label: "全抛釉"
        },
        {
          value: "抛光砖",
          label: "抛光砖"
        },
        {
          value: "仿古砖",
          label: "仿古砖"
        },
        {
          value: "瓷片",
          label: "瓷片"
        }
      ],
      columns: [
        {
          title: "类型",
          key: "type"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "色号",
          key: "colorNumber"
        },
        {
          title: "数量",
          key: "number"
        },
        {
          title: "进货时间",
          key: "purchaseTime"
        },
        {
          title: "入库时间",
          key: "addTime"
        },
        {
          title: "编辑",
          key: "edit",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.userEdit.list = [];
                      this.userEdit.isHide = true;
                      this.userEdit.list.push(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.modal = true;
                      this.umID = params.row._id;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      userEdit: {
        isHide: false,
        list: []
      }
    };
  },
  components: {
    "vm-user": userEdit
  },
  mounted() {
    this.initElement();
  },
  methods: {
    initElement() {
      let that = this;
      let params = {
        name: that.value,
        type: that.select,
        pageSize: that.pageSize,
        page: that.page
      };
      that.spinShow = true;
      that.$Ajax.POST("/performance/model/findQuery", params).then(res => {
        that.spinShow = false;
        if (res.data && res.responseCode == "10001") {
          that.list = res.data.list;
          that.totalCount = res.data.totalCount; //总页数
          that.isPage = res.data.totalCount >= 10 ? true : false; //判断分页是否显示
        }
      });
    },
    V_delete(val) {
      let that = this;
      that.modal_loading = true;
      that.$Ajax.POST("/performance/model/delete", { id: val }).then(res => {
        that.modal_loading = false;
        that.modal = false;
        if (res.data && res.responseCode == "10001") {
          that.$Message.success("删除成功！");
          that.initElement();
        }
      });
    },
    change(status) {
      this.isTabel = status;
    },
    changePage(val) {
      let that = this;
      that.page = val;
      that.initElement();
    },
    changePageSize(val) {
      let that = this;
      that.page = 1;
      that.pageSize = val;
      that.initElement();
    },
    edit(val) {
      let that = this;
      that.userEdit.list = [];
      that.userEdit.isHide = true;
      that.userEdit.list.push(val);
    },
    EditReturn(val) {
      this.userEdit.isHide = val;
    }
  }
};
</script>
<style lang='less'>
.home {
  .header {
    width: 100%;
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
    .right {
      padding-top: 5px;
    }
  }
  .page {
    padding-top: 16px;
  }
  .code-col-padbottom {
    padding-bottom: 16px;
    .bottom-button {
      padding-top: 8px;
      border-top: 1px solid #e8eaec;
    }
  }
}
.model-center,
.ivu-message {
  color: #000;
}
</style>
