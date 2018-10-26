<template>
<div id='userEdit'>
    <Icon class="icon-font" type="ios-close-circle-outline" size='30' color='#fff' @click="Return()" />
    <div class="content">

    </div>
</div>
</template>
<script>
export default {
  name: "userEdit",
  props:['userEdit'],
  data() {
    return {};
  },
  components: {},
  mounted() {
     
  },
  methods: {
      Return(){
          let that = this;
          that.userEdit.isHide = false;
          that.$emit('EditReturn',that.userEdit.isHide);
      }
  }
};
</script>
<style lang='less' >
#userEdit {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .icon-font {
    float: right;
    margin: 16px 16px 0 0;
    cursor: pointer;
  }
  .content {
    width: 650px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -325px;
    margin-top: -250px;
    background: #fff;
  }
}
</style>