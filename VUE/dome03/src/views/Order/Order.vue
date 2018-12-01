<template>
<div id='Order'>
    <Tabs value="name1">
        <TabPane label="标签一" name="name1">
          <div class="tree">
            <!-- <input class="tree-search-input" type="text" v-model.lazy="searchword" placeholder="search..."/>
            <button class=" tree-search-btn" type="button" @click="search">GO</button>
            <v-tree ref='tree' :searchable="true" :data='treeData1' :multiple="true" :tpl='tpl' :halfcheck='true' /> -->
             <vtree ref="tree"   v-on:value-change='valueChange'  :searchable="true" @node-click='getSelect' @node-select='getSelect' :data='treeData1' :multiple="true"  :halfcheck='true' :allowGetParentNode='true' @ee='init' 
            ></vtree>
            <!-- <v-select-tree ></v-select-tree> -->
          </div>
        </TabPane>
        <TabPane label="标签二" name="name2">
          <a-tree-select
            showSearch
            style="width: 300px"
            :value="value"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder='Please select'
            allowClear
            treeCheckable
            treeDefaultExpandAll
            @change="onChange"
            :showCheckedStrategy="SHOW_PARENT"
     :treeData="treeData3"
          >
          </a-tree-select>
        </TabPane>
        <TabPane label="标签三" name="name3">

           <a-tree-select
    showSearch
    style="width: 300px"
    :value="value"
    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
    placeholder='Please select'
    allowClear
    treeDefaultExpandAll
    treeCheckable
    @change="onChange"
  >
    <a-tree-select-node value='parent 1' title='parent 1' key='0-1'>
      <a-tree-select-node value='parent 1-0' title='parent 1-0' key='0-1-1'>
        <a-tree-select-node value='leaf1' title='my leaf' key='random' />
        <a-tree-select-node value='leaf2' title='your leaf' key='random1' />
      </a-tree-select-node>
      <a-tree-select-node value='parent 1-1' title='parent 1-1' key='random2'>
        <a-tree-select-node value='sss' key='random3'>
          <b style="color: #08c" slot="title">sss</b>
        </a-tree-select-node>
      </a-tree-select-node>
    </a-tree-select-node>
  </a-tree-select>
        </TabPane>
    </Tabs>
</div>
</template>
<script>
import vtree from "../../components/tree";
import { TreeSelect } from "ant-design-vue";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
export default {
  name: "Order",
  data() {
    return {
      SHOW_PARENT,
      value: [],
      html: "",
      data: [],
      searchword: "",
      treeData1: [
        {
          title: "一级 1",
          children: [
            {
              title: "二级 1-1",
              children: [
                {
                  title: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          title: "一级 2",
          children: [
            {
              title: "二级 2-1",
              children: [
                {
                  title: "三级 2-1-1"
                }
              ]
            },
            {
              title: "二级 2-2",
              children: [
                {
                  title: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          title: "一级 3",
          children: [
            {
              title: "二级 3-1",
              children: [
                {
                  title: "三级 3-1-1"
                }
              ]
            },
            {
              title: "二级 3-2",
              children: [
                {
                  title: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      treeData2: [
        {
          id: 1,
          title: "水果",
          children: [
            {
              id: 4,
              title: "菠萝",
              children: [
                {
                  id: 9,
                  title: "香蕉"
                },
                {
                  id: 10,
                  title: "橘子"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          title: "大米 ",
          children: [
            {
              id: 5,
              title: "小米"
            },
            {
              id: 6,
              title: "糯米"
            }
          ]
        }
      ],
      treeData3: [
        {
          label: "Node1",
          value: "0-0",
          key: "0-0",
          children: [
            {
              label: "Child Node1",
              value: "0-0-0",
              key: "0-0-0"
            }
          ]
        },
        {
          label: "Node2",
          value: "0-1",
          key: "0-1",
          children: [
            {
              label: "Child Node3",
              value: "0-1-0",
              key: "0-1-0",
              disabled: true
            },
            {
              label: "Child Node4",
              value: "0-1-1",
              key: "0-1-1"
            },
            {
              label: "Child Node5",
              value: "0-1-2",
              key: "0-1-2"
            }
          ]
        }
      ]
    };
  },
  components: {
    vtree
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
    },
    tpl(...args) {
      let { 0: node, 2: parent, 3: index } = args;
      let titleClass = node.selected
        ? "node-title node-selected"
        : "node-title";
      if (node.searched) titleClass += " node-searched";
      return (
        <span>
          <button
            class="treebtn1"
            onClick={() =>
              this.$refs.tree.addNode(node, { title: "sync node" })
            }
          >
            +
          </button>
          <span
            class={titleClass}
            domPropsInnerHTML={node.title}
            onClick={() => {
              this.$refs.tree.nodeSelected(node);
            }}
          />
          <button class="treebtn2" onClick={() => this.asyncLoad(node)}>
            async
          </button>
          <button
            class="treebtn3"
            onClick={() => this.$refs.tree.delNode(node, parent, index)}
          >
            delete
          </button>
        </span>
      );
    },
    async asyncLoad(node) {
      this.$set(node, "loading", true);
      let pro = new Promise(resolve => {
        setTimeout(resolve, 2000, ["async node1", "async node2"]);
      });
      this.$refs.tree1.addNodes(node, await pro);
      this.$set(node, "loading", false);
    },
    search() {
      this.$refs.tree.searchNodes(this.searchword);
    },
    valueChange(value) {
      console.log(value);
      console.log(this.$refs.tree);
    },
    getSelect(node, selected) {
      // console.log(node);
      // console.log(this.valueChange);
    },
    onChange(value) {
      console.log(arguments);
      this.value = value;
    }
  }
};
</script>
<style lang='less' >
</style>