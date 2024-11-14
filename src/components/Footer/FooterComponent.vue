<template>
  <div class="footer-container">
    <section class="date-selection">Date</section>
    <section class="actions">
      <v-btn icon="mdi-home"></v-btn>
    </section>
  </div>
</template>

<style scoped>
.footer-container {
  color: white;
  padding: 10px 30px;
  background: #5a5a5a;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 21.79px;
  letter-spacing: 0.02em;
  text-align: right;
}

.v-btn--icon {
  height: 32px !important;
  width: 32px !important;
}
</style>
