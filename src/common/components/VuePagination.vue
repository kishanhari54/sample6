<template>
  <div class="d-flex align-center justify-space-between pa-4 pagination">
    <div class="d-flex flex-column">
      <div class="d-flex ga-2 align-center">
        Items Per Page
        <v-select
          v-model="localItemsPerPage"
          :items="itemsPerPageOptions"
          variant="outlined"
          density="compact"
          class="items-per-page-select"
          hide-details
        />
      </div>
      <div>Total Items : {{ totalItems }}</div>
    </div>

    <v-pagination
      v-model="localCurrentPage"
      :length="Math.ceil(totalItems / localItemsPerPage)"
      :total-visible="7"
      class="custom-pagination"
      @update:model-value="handlePageChange"
    >
      <template v-slot:prev="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
          :disabled="localCurrentPage === 1"
          class="text-none px-2"
          size="small"
          @click="changePage(localCurrentPage - 1)"
        >
          Previous
        </v-btn>
      </template>

      <template v-slot:next="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
          :disabled="
            localCurrentPage === Math.ceil(totalItems / localItemsPerPage)
          "
          class="text-none px-2"
          size="small"
          @click="changePage(localCurrentPage + 1)"
        >
          Next
        </v-btn>
      </template>
    </v-pagination>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from "vue";

// Props passed from the parent component
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [5, 10, 15, 20, 25],
  },
});

// Emit the page and itemsPerPage values back to the parent component
const emit = defineEmits(["update:currentPage", "update:itemsPerPage"]);

// Local reactive states
const localCurrentPage = ref(props.currentPage); // Local state for currentPage
const localItemsPerPage = ref(props.itemsPerPage); // Local state for itemsPerPage

// Emit changes when page is changed
const handlePageChange = (newPage) => {
  emit("update:currentPage", newPage);
  localCurrentPage.value = newPage;
};

// Watch for changes in localItemsPerPage and emit to parent
watch(localItemsPerPage, (newValue) => {
  emit("update:itemsPerPage", newValue);
});

// Change page function for custom Next/Previous buttons
const changePage = (newPage) => {
  // Ensure newPage is within valid range
  const totalPages = Math.ceil(props.totalItems / localItemsPerPage.value);
  if (newPage >= 1 && newPage <= totalPages) {
    localCurrentPage.value = newPage;
    emit("update:currentPage", newPage);
  }
};
</script>

<style scoped>
.pagination {
  height: 20%;
}
</style>
