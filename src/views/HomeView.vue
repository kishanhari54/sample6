<template>
  <!--<HelloWorld />-->

  Header Component

  <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";

// Components

export default defineComponent({
  name: "HomeView",

  components: {
    //  HelloWorld,
  },
});
</script>
