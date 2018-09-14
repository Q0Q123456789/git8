<template>
<div id='mian'>
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
        <Menu accordion :active-name="activeName" theme="dark" width="auto" :open-names="openName" >
            <Submenu  v-for="(item,index) in routes" v-if="!item.hidden&&item.children" :key="index" :name="item.meta.name">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    {{item.meta.title}}
                </template>
                <MenuItem v-for="(iten,index) in item.children" :name="iten.meta.name" :key="index">
                    <router-link :to="iten.path">{{iten.meta.title}}</router-link>
                </MenuItem>
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
import { inArray } from "@/config/util"
export default {
  name: "mian",
  data() {
    return {
        activeName:1,
        openName:['1']
    };
  },
  components: {},
  computed:{
    routes() {
        const path = this.$router.options.routes
        path.forEach((item, index) => {
            if (item.hidden !== true && item.name !== 'dashboard') {
                // if ( inArray(this.adminNode, item.name) === false ) {
                //     path[index].hidden = true
                // }
                // if (item.children.length > 0) {
                //     const child = item.children
                //     child.forEach((item2, index2) => {
                //         if (inArray(this.adminNode, item2.name) === false) {
                //             path[index].children[index2].hidden = true
                //         }
                //     })
                // }
                
            }
        })
        return path
    }
  },
  mounted() {

  },
  methods: {}
};
</script>
<style lang='less' >
</style>