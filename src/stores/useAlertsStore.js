import axiosInstance from "@/services/axiosInstance";
import { defineStore } from "pinia";
import { ref } from "vue";
const baseUrl = "https://c-iota-dev31-apigateway.azure-api.net";
export const useAlertsDataTableStore = defineStore("alertsTable", () => {
  const tableData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchData = async () => {
    isLoading.value = true;
    try {
      // Replace with your actual API call
      const response = await axiosInstance.get(
        baseUrl +
          "notification/api/Alerts/?StartTime=2023-10-24T09:26:18.747Z&EndTime=2024-11-05T23:26:18.747Z"
      );
      const data = await response.data;
      tableData.value = data;
      console.log(tableData);
    } catch (error) {
      error.value = error.message;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tableData,
    isLoading,
    error,
    fetchData,
  };
});
