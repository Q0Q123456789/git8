<template>
  <div id="Order">
    <barcode value="1234567890" :options="{ displayValue: false }"></barcode>
  </div>
</template>
<script>
export default {
  name: "Order",
  data() {
    return {
      value: [],
      html: "",
      data: [],
      searchword: ""
    };
  },
  watch: {},
  mounted() {},
  methods: {
    init() {
      this.$Ajax.GET("/performance/model/log", {}).then(res => {
        this.html = res;
        console.log(res);
      });
    }
  }
};
</script>
<style lang='less' >
</style>