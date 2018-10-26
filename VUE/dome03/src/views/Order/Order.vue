<template>
<div id='Order'>
编辑订单
    <center>{{html}}</center>
</div>
</template>
<script>
export default {
name: 'Order',
data() {
return {
    html:''
};
},
components: {},
mounted() {
    this.init();
},
methods: {
    init(){
        this.$Ajax.GET('/performance/model/log',{}).then(res => {
            this.html = res;
            console.log(res)
        })
    }
}
};
</script>
<style lang='less' >

</style>