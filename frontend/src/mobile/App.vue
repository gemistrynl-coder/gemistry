<template>
  <div id="app">
    <!-- HEADER -->
    <header>
      <div class="header-inner">
        <!-- LOGO / TITEL -->
        <a href="/" style="text-decoration: none;"><h3 class="logo">GEMISTRY</h3></a>

        <!-- HAMBURGER BUTTON (alleen mobiel) -->
        <button
            class="menu-toggle"
            @click="menuOpen = !menuOpen"
            :aria-expanded="menuOpen.toString()"
            aria-label="Toggle navigation"
        >
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>

        <!-- NAV LINKS -->
        <nav :class="{ open: menuOpen }">
          <a href="/">Home</a>
          <a href="/over_ons">Over ons</a>
          <a href="/services">Services</a>
          <br>
        </nav>
      </div>
    </header>

    <hr />

    <!-- DYNAMISCHE CONTENT -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const menuOpen = ref(false);
</script>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  font-family: Georgia, "Times New Roman", Times, serif;
  scroll-behavior: smooth;
  background: #f2efe8;
}

/* --- BASISSTRUCTUUR --- */
#app {
  background: #f2efe8;
}

/* --- HEADER --- */
header {
  background: #651a1a;
  color: #f2efe8;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  max-width: 1200px;
  margin: auto;
}

/* --- LOGO --- */
.logo {
  font-size: 42px;
  font-weight: bold;
  font-family: "Vogue", Georgia, serif;
  letter-spacing: 1px;
  margin: 0;
  color: #f2efe8;
}

/* --- NAV LINKS --- */
nav {
  display: flex;
  align-items: center;
  gap: 36px;
  transition: max-height 0.4s ease, opacity 0.4s ease;
}

nav a {
  color: #f2efe8;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  font-family: Arial, sans-serif;
  transition: 0.3s;
}

nav a:hover {
  text-decoration: underline;
}

/* --- HR --- */
hr {
  border: 1px solid #651a1a;
  margin: 0;
  padding: 0;
}

/* --- HAMBURGER BUTTON (verborgen op desktop) --- */
.menu-toggle {
  background: none;
  border: none;
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 10px;
}

.menu-toggle span {
  width: 28px;
  height: 3px;
  background: #f2efe8;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* --- Hamburger animatie bij open --- */
.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}
.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}
.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

/* --- MOBIEL MENU --- */
@media (max-width: 900px) {
  .menu-toggle {
    display: flex;
  }

  nav {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: #651a1a;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

  nav.open {
    max-height: 320px;
    opacity: 1;
    pointer-events: auto;
  }

  nav a {
    padding: 12px 0;
    font-size: 22px;
  }
}

/* --- TRANSITION SMOOTHNESS --- */
nav,
nav a,
.menu-toggle span {
  transition: all 0.35s ease;
}

/* --- OPTIONELE VOGUE FONT --- */
@font-face {
  font-family: "Vogue";
  src: url("@/mobile/assets/font/Vogue.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
</style>
