<template>
<div id='login'>
    <article class="article">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="username">
                <Input type="text" v-model="formInline.username" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
        </Form>
    </article>
</div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      formInline: {
        username: "admin",
        password: "123456"
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "账号不能为空！",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空！",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码不能少于6位！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  mounted() {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
        //   this.$Message.success("Success!");
        } else {
          this.$Message.error("错误!");
        }
      });
    }
  }
};
</script>
<style lang='less' >
#login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .article {
    width: 350px;
    height: 300px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 30%;
    left: 20%;
    padding:70px 20px;
  }
  .ivu-form-item{
      width: 100%;
  }
}
</style>