<template>
  <!-- <v-data-table sticky-header :headers="headers" :items="items">
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table> -->
  <v-container>
    <!-- v-data-table with sticky header -->
    <v-data-table
      sticky-header
      :headers="headers"
      :items="filteredItems"
      item-value="id"
      :loading="loading"
      :search="searchQuery"
      :items-length="totalItems"
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
    >
      <!-- Loading state for the table -->
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>

      <!-- Actions column template -->
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.sno }}</td>
          <td>{{ props.item.process }}</td>
          <td>{{ props.item.description }}</td>
          <td>
            <!-- Action buttons with icons -->
            <v-btn icon @click="editProcess(props.item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteProcess(props.item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="toggleActiveStatus(props.item)">
              <v-icon>{{
                props.item.isActive
                  ? "mdi-toggle-switch"
                  : "mdi-toggle-switch-off"
              }}</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>

      <template v-slot:bottom>
        <div class="d-flex align-center justify-space-between pa-4">
          <div class="d-flex flex-column">
            <div class="d-flex ga-2 align-center">
              Items Per Page
              <v-select
                v-model="itemsPerPage"
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
            v-model="page"
            :length="Math.ceil(totalItems / itemsPerPage)"
            :total-visible="7"
            class="custom-pagination"
            @update:model-value="handlePageChange"
          >
            <template v-slot:prev="{ props }">
              <v-btn
                variant="text"
                v-bind="props"
                :disabled="page === 1"
                class="text-none px-2"
                size="small"
                @click="changePage(page - 1)"
              >
                Previous
              </v-btn>
            </template>

            <template v-slot:next="{ props }">
              <v-btn
                variant="text"
                v-bind="props"
                :disabled="page === Math.ceil(totalItems / itemsPerPage)"
                class="text-none px-2"
                size="small"
                @click="changePage(page + 1)"
              >
                Next
              </v-btn>
            </template></v-pagination
          >
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>
<script setup>
import axios from "axios";
import { computed, defineProps, onMounted, ref, watch } from "vue";
const loading = ref(true); // Loading state
const processes = ref([]); // List of processes

const filteredItems = computed(() => {
  return processes.value.filter((item) => {
    return (
      item.description &&
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
// Pagination state
const page = ref(1);
const itemsPerPage = ref(10);
const itemsPerPageOptions = [5, 10, 15, 20, 25];
const totalItems = computed(() => filteredItems.value.length);

/*
// Computed properties for showing items range
const startIndex = computed(() => {
  return (page.value - 1) * itemsPerPage.value + 1;
});

const endIndex = computed(() => {
  const end = page.value * itemsPerPage.value;
  return end > filteredItems.value ? filteredItems.value.length : end;
});
*/

const changePage = (value) => {
  console.log(value);
  debugger;
  page.value = value;
};
// Event handlers
const handlePageChange = (newPage) => {
  loading.value = true;
  page.value = newPage;
  setTimeout(() => {
    loading.value = false;
  }, 200);
};
// Declare props to receive selectedPlant from parent
const props = defineProps({
  selectedPlant: {
    type: Number,
    default: null,
  },
  tableSearch: {
    type: String,
    default: "",
  },
});

const headers = [
  { title: "S No", key: "itemId" },
  { title: "Process", key: "processName" },
  { title: "Description", key: "description" },
  { title: "Actions", key: "actions" },
];
const searchQuery = ref("");

// Fetch processes from API
const fetchProcesses = async (plantId) => {
  let url = " http://localhost:3000/processes";
  // "https://my-json-server.typicode.com/kishanhari54/sample6/processes";
  if (plantId) {
    url = url + `?plantId=${plantId}`;
  }

  try {
    const response = await axios.get(url);
    processes.value = response.data; // Store the data in the processes array
    loading.value = false; // Set loading to false once data is loaded
  } catch (error) {
    console.error("Error fetching processes:", error);
    loading.value = false;
  }
};

// Watch for changes in the selected plant and refetch processes
watch(
  () => props.selectedPlant,
  (newPlantId) => {
    //console.log(newPlantId);
    fetchProcesses(newPlantId);

    /*if (newPlantId) {
      fetchProcesses(newPlantId);
    } else {

      //processes.value = []; // Clear processes if no plant is selected
    } */
  },
  { immediate: true } // Trigger fetchProcesses immediately when component mounts
);

watch(
  () => props.tableSearch,
  (value) => {
    console.log(value);
    searchQuery.value = value;
  }
);

// Edit process function
const editProcess = (process) => {
  // Logic for editing the process (can be a modal or navigation to an edit page)
  console.log("Editing process:", process);
};

// Delete process function
const deleteProcess = (id) => {
  // Logic for deleting the process (confirm and remove from the list or make API call)
  console.log("Deleting process with ID:", id);
  const index = processes.value.findIndex((process) => process.id === id);
  if (index !== -1) {
    processes.value.splice(index, 1); // Remove from the list
  }
};

// Toggle active/inactive status function
const toggleActiveStatus = async (process) => {
  // Toggle the local state first (optimistic UI update)
  const newStatus = !process.isActive;
  // process.isActive = newStatus;

  try {
    // Construct the URL for the process API
    //const url = `https://my-json-server.typicode.com/kishanhari54/sample6/processes/${process.id}`;
    const url = `http://localhost:3000/processes/${process.id}`;

    // Send the PATCH request to update the process status
    const response = await axios.patch(
      url,
      {
        isActive: newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    process.isActive = response.data.isActive;
    console.log("Status updated successfully:", response.data);
  } catch (error) {
    // If the request fails, revert the local state to the previous value
    // process.isActive = !newStatus;
    console.error("Error updating status:", error);
  }
};

onMounted(fetchProcesses);
</script>
