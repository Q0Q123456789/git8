<template>
<div id='excel'>
    <Card title="导入EXCEL" >
      <Row>
        <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
          <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
        </Upload>
        <Button type="primary" @click="upload()">提交</Button> 
      </Row>
      <Row>
        <div class="ivu-upload-list-file" v-if="file !== null">
          <Icon type="ios-stats"></Icon>
            {{ file.name }}
          <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
        </div>
      </Row>
      <Row>
        <transition name="fade">
          <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
            <div v-if="progressPercent == 100">
              <Icon type="ios-checkmark-circle"></Icon>
              <span>成功</span>
            </div>
          </Progress>
        </transition>
      </Row>
    </Card>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
    </Row>
</div>
</template>
<script>
import excel from "@/config/excel";
export default {
  name: "excel",
  data() {
    return {
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false
    };
  },
  components: {},
  mounted() {},
  methods: {
    initUpload() {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData = [];
      this.tableTitle = [];
    },
    handleUploadFile() {
      this.initUpload();
    },
    handleRemove() {
      this.initUpload();
      this.$Message.info("上传的文件已删除！");
    },
    handleBeforeUpload(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "xlsx" || fileExt === "xls") {
        this.readFile(file);
        this.file = file;
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" +
            file.name +
            "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。"
        });
      }
      return false;
    },
    // 读取文件
    readFile(file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = e => {
        this.uploadLoading = true;
        this.tableLoading = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error("文件读取出错");
      };
      reader.onload = e => {
        this.$Message.info("文件读取成功");
        const data = e.target.result;
        const { header, results } = excel.read(data, "array");
        const tableTitle = header.map(item => {
          return { title: item, key: item };
        });
        this.tableData = results;
        this.tableTitle = tableTitle;
        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;
      };
    },
    upload() {
      var Alist = new Array();
      this.tableData.map(function(i) {
        Alist.push({
          name: i.名称,
          type: i.类型,
          number: i.数量,
          colorNumber: i.色号,
          purchaseTime: i.进货时间,
          Specifications: i.规格
        });
      });
      this.$Ajax.POST("/performance/model/uploadFile", Alist).then(res => {
        console.log(res);
      });
    },
    Transformation(name) {
      let txt = "";
      switch (name) {
        case "名称":
          txt = "Name";
          break;
        case "数量":
          txt = "Number";
          break;
        case "色号":
          txt = "ColorNumber";
          break;
        case "规格":
          txt = "Specifications";
          break;
      }
      return txt;
    }
  }
};
</script>
<style lang='less' >
.margin-top-8 {
  margin-top: 8px;
}
.margin-top-10 {
  margin-top: 10px;
}
.margin-top-20 {
  margin-top: 20px;
}
.margin-left-10 {
  margin-left: 10px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.margin-bottom-100 {
  margin-bottom: 100px;
}
.margin-right-10 {
  margin-right: 10px;
}
.padding-left-6 {
  padding-left: 6px;
}
.padding-left-8 {
  padding-left: 5px;
}
.padding-left-10 {
  padding-left: 10px;
}
.padding-left-20 {
  padding-left: 20px;
}
.height-100 {
  height: 100%;
}
.height-120px {
  height: 100px;
}
.height-200px {
  height: 200px;
}
.height-492px {
  height: 492px;
}
.height-460px {
  height: 460px;
}
.line-gray {
  height: 0;
  border-bottom: 2px solid #dcdcdc;
}
.notwrap {
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.padding-left-5 {
  padding-left: 10px;
}
[v-cloak] {
  display: none;
}
</style>