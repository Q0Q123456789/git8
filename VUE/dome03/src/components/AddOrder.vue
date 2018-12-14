<template>
<div id='AddOrder'>
    <Upload multiple type="drag" :action="url" :on-progress='progress' :on-success='success' :on-remove='remove' :on-preview='preview'>
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
</div>
</template>
<script>
export default {
  name: "AddOrder",
  data() {
    return {
      url:'http://127.0.0.1:10086/performance/model/uploadFile'
    };
  },
  components: {},
  mounted() {},
  methods: {
    progress(event, file, fileList){
      // console.log(event)
      // console.log(file)
      // console.log(fileList)
    },
    success(response, file, fileList){
      console.log(response)
      // console.log(file)
      // console.log(fileList)
    },
    //删除
    remove(file, fileList){
      console.log(file)
      let that = this;
      let params = {
        name:file.response.data.name,
        file:file.response.data.fileUrl
      }
      that.$Ajax.POST('/performance/model/del',params).then( res => {
        console.log(res)
      })
    },
    //下载
    preview(file){
      let that = this;
      let params = {
        name:file.name,
        file:file.response.fileUrl
      }
      that.$Ajax.GET('/performance/model/download',params).then( res => {
        console.log(res)
      })
    }
  }
};
</script>
<style lang='less' >
</style>