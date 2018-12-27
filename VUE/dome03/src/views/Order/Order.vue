<template>
  <div id="Order">
    <Tabs value="name1">
      <TabPane label="标签一" name="name1">
      </TabPane>
      <TabPane label="标签二" name="name2">
      </TabPane>
      <TabPane label="标签三" name="name3"></TabPane>
    </Tabs>
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
      searchword: "",
    };
  },
  components: {
    vtree
  },
  watch: {

  },
  mounted() {
    this.data = this.treeData1;
  },
  methods: {
    init(value) {
      console.log(value);
      this.data = this.treeData2;
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