<template>
<div id='AddPersonnel'>
增加员工
<Cascader :data="data" v-model="value" :props="defaultProps"></Cascader>
<br>
<img v-for="(item,index) in imgList" :key="index" :src="url + item.fileUrl" :alt="item.name" width="200px" height="200px">
</div>
</template>
<script>
import common from '@/config/common.js'
export default {
  name: "AddPersonnel",
  data() {
    return {
      data:[],
      value:[],
      defaultProps: {
        children: 'children',
        label: 'areaName'
      },
      imgList:[],
      url:common.$Api() 
    };
  },
  components: {},
  mounted() {
    this.init()
    this.img()
  },
  methods: {
    init(){
      this.$Ajax.POST("/performance/model/mysqlQuery", {}).then(res => {
        this.data = res.data
      });
    },
    img(){
      this.$Ajax.GET("/performance/model/images", {}).then(res => {
        console.log(res)
        this.imgList = res.data
      });
    }
  }
};
</script>
<style lang='less' >
</style>