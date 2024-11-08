<template>
  <v-row>
    <v-col cols="3">
      Select Plant:

      <v-select
        label="Select"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        variant="solo-filled"
      ></v-select>
    </v-col>
  </v-row>
</template>
<script setup></script>
<style scoped></style>
