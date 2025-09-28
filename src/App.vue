<template>
  <div id="app">
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="over_ons">Over ons</a>
        <a href="services">Services</a>
        <h3>. GEMISTRY .</h3>
        <a href="contact">Contact</a>
        <a href="prijslijst">Afspraak maken</a>
        <a href=""></a>
      </nav>
    </header>


    <!-- Hier wisselt de content -->
    <router-view />

  </div>
</template>



<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  background: rgba(101, 26, 26, 0.2);
  font-family: Georgia, 'Times New Roman', Times, serif;
  scroll-behavior: smooth;
}

/* Header */
header {
  background: #F2EFE8;
  color: #651a1a;
  display: flex;
  justify-content: center;   /* centreren */
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px 0 10px;
}

header nav {
  display: flex;
  justify-content: center;   /* alles in het midden */
  align-items: center;
  width: 100%;
  font-size: 25px;
  padding: 0;
  margin: 0;
  gap: 40px; /* ruimte tussen de links + titel */
}

header nav a {
  color: #651a1a;
  margin: 0;
  text-decoration: none;
  font-weight: bold;
  padding: 0;
  font-family: Arial;
}

header nav a:hover {
  text-decoration: underline;
}

header nav h3 {
  font-size: 58px;
  font-weight: bold;
  margin: 0;
  flex-shrink: 0; /* zorgt dat GEMISTRY niet geplet wordt */
}

</style>
