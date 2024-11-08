<template>
  <!--<HelloWorld />-->

  <section class="page">
    <section class="header">
      <HeaderComponent></HeaderComponent>
    </section>
    <section class="route-content">
      <router-view></router-view>
    </section>
    <section class="footer">
      <FooterComponent></FooterComponent>
    </section>
  </section>
</template>

<script setup>
import FooterComponent from "../components/Footer/FooterComponent.vue";
import HeaderComponent from "../components/Header/HeaderComponent.vue";
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  .route-content {
    height: calc(100vh - 100px);
    max-width: 1200px;
    min-width: 1000px;
  }
  .footer,
  .header {
    height: 50px;
  }
}
</style>
<!-- 
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",

  components: {
    //  HelloWorld,
    HeaderComponent,
    FooterComponent,
  },
});
</script>
-->
