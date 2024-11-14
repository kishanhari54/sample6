<template>
  <div class="header">
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
  </div>
</template>
<script setup></script>

<style scoped>
.nav-links {
  color: #5a5a5a;

  ul {
    list-style: none;
    margin: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    li {
      text-decoration: none;
    }
  }
}

.header {
  background-color: #ebebeb;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
}

/* Remove the default styling for router-link */
.nav-links a {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit text color from parent */
  font-weight: normal; /* Reset any bold styling */
  color: #5a5a5a;

  /* Styling for active links */ /* Use the default Vue Router classes to make active links bold */
  &.router-link-active {
    font-weight: bold;

    color: #000000;
  }

  /* Optional: You can also apply styles when it's an exact match */
  &.router-link-exact-active {
    font-weight: bold;
    color: #000000; /* You can also change the color */
  }
}
</style>
