<template>
  <div class="search-field">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      density="compact"
      label="Search"
      variant="solo"
      hide-details
      single-line
    ></v-text-field>
  </div>
</template>
<script setup></script>

<style scoped>
.search-field {
  width: 300px;
}
</style>
