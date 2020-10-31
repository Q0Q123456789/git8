<template>
  <div id="AddOrder">
    <Upload
      multiple
      type="drag"
      :action="url"
      :on-progress="progress"
      :on-success="success"
      :on-remove="remove"
      :data="data"
      :before-upload="upload"
      :on-preview="preview"
      :default-file-list="defaultList"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>
  </div>
</template>
<script>
import common from '@/config/common.js'
export default {
  name: "AddOrder",
  data() {
    return {
      url: common.$Api() + "/performance/model/uploadFile",
      data: {},
      defaultList: []
    };
  },
  components: {},
  mounted() {},
  methods: {
    upload(file) {
      console.log(file);
      // this.data = file
    },
    progress(event, file, fileList) {
      console.log(event);
      console.log(file);
      console.log(fileList);
    },
    success(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    file(val) {
      console.log(val);
      console.log(this.fileList);
    },
    //删除
    remove(file) {
      console.log(file);
      let that = this;
      let params = {
        name: file.response.data.name,
        file: file.response.data.fileUrl
      };
      that.$Ajax.POST("/performance/model/del", params).then(res => {
        console.log(res);
      });
    },
    //下载
    preview(file) {
      let that = this;
      let params = {
        name: file.name,
        file: file.response.fileUrl
      };
      that.$Ajax.GET("/performance/model/download", params).then(res => {
        console.log(res);
      });
    },
    uploadAvatar(avatar) {
      var url = "http://localhost:3000";
      console.log(avatar.target.files[0])
      let file = avatar.target.files[0]
      let data = new FormData();
      data.append("file", file, file.name); 
      data.append('data', 112)
      console.log(data.get('file'))
      
      this.$http.post(url + '/product/zhutu', data).then(function(data) {
      console.log(data)
      }, function(response) {
      console.log(response)
      })
    }
  }
};
</script>
<style lang='less' >
</style>