<template>
  <div id="Order">
    <barcode value="1234567890987654321" :options="{ displayValue: false }"></barcode>
    <br>
    <Input v-model="value1" placeholder="Enter something..." style="width: 300px" /> <Button @click="tijiao()">提交</Button>
    <br>
    <vue-qr  :logoSrc="config.logo" :text="config.value" :size="300" :margin="0"></vue-qr>
  </div>
</template>
<script>
import VueQr from 'vue-qr'
import img from '@/assets/logo.png'
export default {
  name: "Order",
  data() {
    return {
      value: [],
      value1:'',
      html: "",
      data: [],
      searchword: "",
      config:{
        value:'你这个吊毛，密码是1734',
        logo:img
      }
    };
  },
  watch: {},
  components:{VueQr},
  mounted() {
    console.log(this.img)
  },
  methods: {
    init() {
      this.$Ajax.GET("/performance/model/log", {}).then(res => {
        this.html = res;
        console.log(res);
      });
    },
    tijiao(){
      this.config.value = this.value1
    }
  }
};
</script>
<style lang='less' >
</style>