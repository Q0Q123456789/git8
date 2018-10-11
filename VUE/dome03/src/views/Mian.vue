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
                <BreadcrumbItem>{{time}}</BreadcrumbItem>
            </Breadcrumb>
            <Card>
              <div id="mian_content">
                <router-view/>
              </div>
            </Card>
        </Content>
    </Layout>
</div>
</template>
<script>
import { inArray } from "@/config/util";
export default {
  name: "mian",
  data() {
    return {
      activeName: 1,
      openName: ["1"],
      time: ""
    };
  },
  components: {},
  computed: {
    routes() {
      const path = this.$router.options.routes;
      path.forEach((item, index) => {
        if (item.hidden !== true && item.name !== "dashboard") {
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
      });
      return path;
    }
  },
  mounted() {
    let that = this;
    that.getTime();
    setInterval(function() {
      that.getTime();
    }, 999);
  },
  methods: {
    getTime() {
      let that = this;
      let d = new Date();
      that.time = d.toLocaleTimeString();
    }
  }
};
</script>
<style lang='less' >
#mian {
  #mian_content {
    min-height: 800px;
  }
  .ivu-menu {
    .ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
      background: orangered !important;
      a{
        color: #fff;
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
  }
}
</style>