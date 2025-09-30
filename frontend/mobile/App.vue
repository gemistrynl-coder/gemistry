<template>
  <div id="app">
    <header>
      <h3>. GEMISTRY .</h3>
      <!-- Hamburger knop -->
      <button class="hamburger" @click="toggleMenu" aria-label="Menu">
        ☰
      </button>
    </header>

    <!-- Mobiel menu -->
    <nav v-if="menuOpen" class="mobile-nav">
      <router-link to="/" @click="closeMenu">Home</router-link>
      <router-link to="/over_ons" @click="closeMenu">Over ons</router-link>
      <router-link to="/services" @click="closeMenu">Services</router-link>
      <router-link to="/contact" @click="closeMenu">Contact</router-link>
      <router-link to="/prijslijst" @click="closeMenu">Afspraak maken</router-link>
    </nav>



    <!-- Hier wisselt de content -->
    <router-view />
  </div>
</template>

<script setup>
import { ref } from "vue"

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  font-family: Georgia, "Times New Roman", Times, serif;
  scroll-behavior: smooth;
}

#app {
  margin: 0;
  padding: 0;
  background: #f2efe8;
}

hr {
  border: 1px solid #651a1a;
  outline: 1px solid #f2efe8;
  margin: 1px;
  padding: 0;
}

/* ===== HEADER ===== */
header {
  background: #651a1a;
  color: #f2efe8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

header h3 {
  font-size: 38px;
  font-weight: bold;
  margin: 0;
}

/* ===== HAMBURGER ===== */
.hamburger {
  font-size: 55px;
  background: none;
  border: none;
  color: #f2efe8;
  cursor: pointer;
  border-radius: 5px;
}

/* ===== MOBIEL MENU ===== */
.mobile-nav {
  border-top: 1px solid #f2efe8;
  display: flex;
  flex-direction: column;
  background: #651a1a;
  padding: 10px 0;
}

.mobile-nav a {
  color: #f2efe8;
  text-decoration: none;
  padding: 12px 20px;
  font-weight: bold;
  font-size: 18px;
}

.mobile-nav a:hover {
  background: #8a2a2a;
}
</style>
