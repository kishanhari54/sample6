<template>
  <v-data-table sticky-header :headers="headers" :items="items">
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table>
</template>
<script setup>
const headers = [
  { title: "S No", key: "itemId" },
  { title: "Process", key: "processName" },
  { title: "Description", key: "description" },
];

const items = [];
</script>
