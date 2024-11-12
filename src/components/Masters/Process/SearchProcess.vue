<template>
  <div class="search-field">
    <v-text-field
      v-model="searchQuery"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      label="Search"
      variant="solo"
      hide-details
      single-line
    ></v-text-field>
  </div>
</template>
<script setup>
import { watchDebounced } from "@vueuse/core";
import { defineEmits, ref } from "vue";
// Reactive variable to hold the search query
const searchQuery = ref("");

// Define the event to emit the search query to the parent
const emit = defineEmits("searchChanged");

watchDebounced(
  searchQuery,
  (value) => {
    console.log(value);
    emit("searchProcess", value);
  },
  { debounce: 500, maxWait: 1000 }
);
</script>

<style scoped>
.search-field {
  width: 300px;
}
</style>
