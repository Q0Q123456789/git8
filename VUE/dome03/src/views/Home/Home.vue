<template>
  <div class="home">
    <Row :gutter="16" class="code-row-bg">
      <template v-for="item in 7">
        <Col span="6" class="code-col-padbottom"> 
          <Card >
              <p slot="title">Disable card with hover shadows</p>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
          </Card>
        </Col>
      </template>
    </Row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home_page",
  components: {
    HelloWorld
  }
};
</script>
<style lang='less'>
  .home{
    .code-col-padbottom{
      padding-bottom: 16px;
    }
  }
</style>
