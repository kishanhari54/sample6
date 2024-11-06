<template>
  <v-data-table
    sticky-header
    :headers="headers"
    :items="items"
    :loading="loading"
    :footer-props="{ itemsPerPageOptions: [1, 10, -1] }"
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { VDataTable } from "vuetify/lib/components";
import { useAlertsDataTableStore } from "../../stores/useAlertsStore";

const dataTableStore = useAlertsDataTableStore();

onMounted(() => {
  dataTableStore.fetchData();
});

const headers = [
  { title: "Asset Name", key: "assetName" },
  { title: "Asset Type", key: "alertTypeDescription" },
  { title: "Message", key: "alertMessage" },
  { title: "Acknowledged By", key: "acknowledgedByName" },
  // ... other headers
];
const loading = computed(() => dataTableStore.isLoading);
const items = computed(() => {
  return dataTableStore.tableData;
});
/*
const items = [
  {
    id: "672a14cf081e786c0e5ad77b",
    subTenantId: "5d003e36-3c76-4c20-95d8-037b9ff354ec",
    assetId: "31f58d12-d5c5-452d-aeca-11895cdb73af",
    assetIdentifier: "Turbine_1",
    assetName: "Turbine_1",
    propertyNames: [
      "Turbine_1_Machines.Turbine_1.temperature_LPC_outlet",
      "Turbine_1_Machines.Turbine_1.temperature_HPC_outlet",
      "Turbine_1_Machines.Turbine_1.pressure_HPC_outlet",
      "Turbine_1_Machines.Turbine_1.fan_speed",
      "Turbine_1_Machines.Turbine_1.core_speed",
      "Turbine_1_Machines.Turbine_1.static_pressure_HPC",
    ],
    alertType: "ANOMALYDETECTION",
    alertTypeDescription: "Anomaly Warning",
    alertMessage:
      "Actual sensor values are deviating from their normal behavior",
    timeStamp: "2024-11-05T12:51:27.018Z",
    isAcknowledged: false,
    acknowledgedOn: null,
    acknowledgedById: null,
    acknowledgedByName: null,
    severity: "Medium",
  },
  {
    id: "672a14ca081e786c0e5ad77a",
    subTenantId: "5d003e36-3c76-4c20-95d8-037b9ff354ec",
    assetId: "31f58d12-d5c5-452d-aeca-11895cdb73af",
    assetIdentifier: "Turbine_1",
    assetName: "Turbine_1",
    propertyNames: [
      "Turbine_1_Machines.Turbine_1.temperature_LPC_outlet",
      "Turbine_1_Machines.Turbine_1.temperature_HPC_outlet",
      "Turbine_1_Machines.Turbine_1.pressure_HPC_outlet",
      "Turbine_1_Machines.Turbine_1.fan_speed",
      "Turbine_1_Machines.Turbine_1.core_speed",
      "Turbine_1_Machines.Turbine_1.static_pressure_HPC",
    ],
    alertType: "ANOMALYDETECTION",
    alertTypeDescription: "Anomaly Warning",
    alertMessage:
      "Actual sensor values are deviating from their normal behavior",
    timeStamp: "2024-11-05T12:51:22.016Z",
    isAcknowledged: false,
    acknowledgedOn: null,
    acknowledgedById: null,
    acknowledgedByName: null,
    severity: "Medium",
  },
];
*/
/*
const items = ref([
  { id: 1, name: "John Doe", email: "johndoe@example.com" },
  // ... more items
]);

const headers = ref([
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
]); */
</script>
