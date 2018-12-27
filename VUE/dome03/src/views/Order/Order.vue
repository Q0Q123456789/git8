<template>
  <div id="Order"></div>
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
  components: {
    vtree
  },
  watch: {},
  mounted() {},
  methods: {
    init(value) {
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