<template>
<div id='mian'>
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
        <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                </template>
                <MenuItem name="1-1"><router-link to="/home_page">Home</router-link></MenuItem>
                <MenuItem name="1-2"><router-link to="/about_page">About</router-link></MenuItem>
            </Submenu>
        </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
        <Content :style="{padding: '0 16px 16px'}">
            <Breadcrumb :style="{margin: '16px 0'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Card>
                <router-view/>
            </Card>
        </Content>
    </Layout>
</div>
</template>
<script>
export default {
  name: "mian",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' >
</style>