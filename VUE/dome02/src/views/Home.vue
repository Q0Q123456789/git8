<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    {{msg}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  msg = '张萌你这个吊毛！'
  lists=  require('./list.json')
  mounted () {
    this.init()
  }
  init(){
    let map =  {}
    this.lists.RECORDS.forEach(element => {
      map[element.areaId] = element
    });
    let val = [];
    this.lists.RECORDS.forEach(function (item) {
        let parent = map[item.parentId];
        if (parent) {
            (parent.children || ( parent.children = [] )).push(item);
        } else {
            val.push(item);
        }
    })
  }
}
</script>
