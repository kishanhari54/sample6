<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Process</span>
      </v-card-title>

      <v-card-subtitle>
        <v-form v-model="valid" ref="form">
          <div v-for="(field, index) in fields" :key="index" class="mb-4">
            <!-- Problem Field (Mandatory) -->
            <v-row>
              <v-col cols="12" md="4">
                <v-label>
                  <span>Problem</span>
                  <span class="text-danger"> *</span>
                  <!-- Asterisk for mandatory -->
                </v-label>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="field.problem"
                  label="Problem"
                  required
                  :rules="[(value) => !!value || 'Problem is required']"
                />
              </v-col>
            </v-row>

            <!-- Description Field (Text Area) -->
            <v-row>
              <v-col cols="12" md="4">
                <v-label>Description</v-label>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea
                  v-model="field.description"
                  label="Description"
                  rows="3"
                  clearable
                />
              </v-col>
            </v-row>
          </div>

          <!-- Add More Button -->
          <v-btn @click="addMoreFields" color="primary" class="mt-3">
            Add More
          </v-btn>
        </v-form>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn @click="closeDialog" text>Cancel</v-btn>
        <v-btn @click="submitForm" :disabled="!valid" color="primary"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

// Reactive state for the form
const dialog = ref(false);
const valid = ref(true);
const fields = ref([{ problem: "", description: "" }]); // Initial field

// Add more fields
const addMoreFields = () => {
  fields.value.push({ problem: "", description: "" });
};

// Close the dialog
const closeDialog = () => {
  dialog.value = false;
};

// Submit the form
const submitForm = () => {
  // Process form submission
  console.log(fields.value);
  closeDialog();
};

// Show the dialog (you can trigger this from the parent)
// eslint-disable-next-line
const showDialog = () => {
  dialog.value = true;
};
</script>

<style scoped>
.v-label {
  display: flex;
  align-items: center;
}

.text-danger {
  color: red;
}
</style>
