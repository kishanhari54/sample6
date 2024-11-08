<template>
  <v-row>
    <v-col cols="3">
      <span class="company-name"> Asa-ichi </span>
      <span>
        <!--  <v-img contain :src="require('../assets/icons/PRD.svg')" height="40" /> -->
      </span>
    </v-col>
    <v-col cols="5">
      <section class="nav-links">
        <ul>
          <li>
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/masterprocess">Master Process</router-link>
          </li>
          <li>Data Entry</li>
          <li>Trends</li>
          <li>
            <router-link to="/alerts">Alerts</router-link>
          </li>
        </ul>
      </section>
    </v-col>
    <v-col cols="4"> </v-col>
  </v-row>
</template>
<script setup></script>

<style scoped>
.nav-links {
  ul {
    list-style: none;
    margin: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    li {
    }
  }
}
</style>
