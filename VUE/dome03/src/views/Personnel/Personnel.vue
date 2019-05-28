<template>
  <div id="personnel">
    <Table border :columns="columns" :data="data6"></Table>
  </div>
</template>
<script>
export default {
  name: "personnel",
  data() {
    return {
      columns: [
        {
          title: "名称",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "电话",
          key: "address"
        },
        {
          title: "职位",
          key: "txt"
        },
        {
          title: "编辑",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      data6: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          txt: "123123213"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
        }
      ]
    };
  },
  components: {  },
  mounted() {},
  methods: {
    show(index) {
      //   this.$Modal.info({
      //     title: "User Info",
      //     content: `Name：${this.data6[index].name}<br>Age：${
      //       this.data6[index].age
      //     }<br>Address：${this.data6[index].address}`
      //   });
      console.log(this.data6[index]);
    },
    remove(index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>
<style lang='less' >
</style>