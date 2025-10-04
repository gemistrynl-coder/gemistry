<template>
  <div class="page">
    <main class="content">
      <!-- TITEL -->
      <section id="over_ons">
        <div class="section-header">
          <h1>Over Ons</h1>
          <hr />
        </div>

        <!-- INTRO (Foto + tekst) -->
        <div class="intro slide-in-left">
          <div class="founders">
            <div class="names">
              <div>
                <h3>Didi Zeilstra</h3>
                <p>OPRICHTER</p>
              </div>
              <div>
                <h3>Dean Davies</h3>
                <p>OPRICHTER</p>
              </div>
            </div>
            <img src="@/desktop/assets/img/ons/didi_dean.jpg" alt="Didi en Dean" />
          </div>
          <div class="intro-text">
            <p>
              Wij zijn Didi en Dean, de gezichten achter Gemistry. Wat begon als een gedeelde passie
              voor creativiteit en zelfexpressie, groeide uit tot een eigen concept: toothgems die verder
              gaan dan alleen een accessoire. Samen combineren we onze energie, ideeën en skills om iets
              unieks neer te zetten.
            </p>
            <p>
              Voor ons draait het niet alleen om tanden laten stralen, maar ook om mensen meer
              zelfvertrouwen en plezier mee te geven. Gemistry is onze creatieve uitlaatklep, maar vooral
              een plek waar iedereen welkom is om zijn of haar eigen vibe te laten zien.
            </p>
            <p>
              Didi is heel creatief en voor haar is niks te gek. Terwijl Dean graag klanten zelfverzekerder
              laat voelen. Deze combinatie zorgt voor een veilige en leuke plek om jezelf even iets extra’s
              te gunnen.
            </p>
          </div>
        </div>

        <!-- VERHAAL -->
        <div class="story-container slide-in-right">
          <div class="story">
            <p>
              Bij Gemistry draait alles om jouw glimlach. Wij zijn gespecialiseerd in het zetten van
              Swarovski toothgems en unieke designs die passen bij jouw stijl. Kwaliteit en hygiëne staan
              bij ons altijd voorop.
            </p>
            <p>
              Een toothgem is meer dan een accessoire, het is een statement. Of je nu kiest voor een subtiel
              kristal of een opvallend design, wij zorgen dat jouw smile de aandacht krijgt die hij verdient.
              Gemistry staat voor creativiteit, fun en persoonlijke aandacht.
            </p>
            <p>
              In onze salon nemen we de tijd voor je, maar je vindt ons ook op evenementen waar we zorgen
              voor extra sparkle en beleving.
            </p>
            <p>
              Achter Gemistry staan Didi en Dean, twee ondernemers met een passie voor creativiteit en
              zelfexpressie. Wij geloven dat een glimlach de krachtigste accessoire is die je kunt dragen.
            </p>
            <p><b>Your smile, your color, your vibe.</b></p>
          </div>

          <div class="story-images">
            <img src="@/desktop/assets/img/ons/krant.jpg" alt="Krant" />
            <img src="@/desktop/assets/img/ons/gems.jpg" alt="Gems" />
          </div>
        </div>

        <!-- PRODUCTS -->
        <div id="products" class="slide-in-up">
          <h2>The products we use</h2>
          <hr />
          <div class="product-grid">
            <div class="product-card">
              <h3 class="product-title">REAL SWAROVSKI</h3>
              <div class="product-body">
                <p>
                  Bij Gemistry kiezen we bewust voor originele Swarovski kristallen. Swarovski staat
                  wereldwijd bekend om de hoge kwaliteit, zuiverheid en sprankeling van hun crystals.
                </p>
              </div>
            </div>
            <div class="product-card">
              <h3 class="product-title">18 KARAAT GOUD</h3>
              <div class="product-body">
                <p>
                  Voor klanten die een luxere en meer blijvende uitstraling willen, werken wij met 18 karaat
                  gouden toothgems. Goud is stijlvol, tijdloos en hypoallergeen.
                </p>
              </div>
            </div>
            <div class="product-card">
              <h3 class="product-title">HYGIENE</h3>
              <div class="product-body">
                <p>
                  Hygiëne en veiligheid vormen de basis van iedere behandeling bij Gemistry. Wij werken met
                  medische lijm en professionele tandheelkundige materialen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer>
      <div id="footer_legal">
        <p>Privacy policy | Algemene voorwaarden</p>
        <p>© 2025 Gemistry. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// geen speciale scripts hier nodig
</script>

<style scoped>
.page {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  margin: auto;
  background-color: #f2efe8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* --- HEADER --- */
.section-header {
  text-align: center;
  margin: 40px 0;
}
.section-header h1 {
  font-family: "Vogue", Georgia, serif;
  font-size: 64px;
  color: #651a1a;
  margin-bottom: 10px;
}
.section-header hr {
  border: none;
  height: 3px;
  background: #651a1a;
  width: 120px;
  margin: auto;
  border-radius: 2px;
}

.intro {
  display: flex;
  max-width: 1200px;
  margin: 0 auto 60px auto; /* centreren horizontaal */
  align-items: center;
  gap: 40px;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}


.founders {
  max-width: 400px;
}
.founders .names {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.founders img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}
.founders img:hover {
  transform: scale(1.03);
}
.intro-text {
  flex: 1;
  font-size: 18px;
  line-height: 1.7;
  color: #651a1a;
}

/* --- STORY --- */
.story-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto 60px auto; /* centreren horizontaal */
  align-items: center;
  gap: 40px;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.story {
  flex: unset;
  max-width: 1200px;
  margin: 0 auto 60px auto; /* centreren horizontaal *    /* tekst niet te breed */
  font-size: 18px;
  line-height: 1.8;
  color: #651a1a;
  background: #fff;        /* achtergrond blijft wit */
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.story-images {
  width: 100%;
  max-width: 800px;        /* zelfde breedte als de tekst */
  display: flex;
  flex-direction: column;  /* onder elkaar */
  gap: 20px;
}

.story-images img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}


/* --- PRODUCTS --- */
#products {
  margin-top: 60px;
  text-align: center;
  padding: 40px;
}
#products h2 {
  font-family: "Vogue", Georgia, serif;
  font-size: 36px;
  color: #651a1a;
  margin-bottom: 20px;
}
#products hr {
  border: 1px solid #651a1a;
  width: 80px;
  margin: 20px auto;
}
.product-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.product-card {
  flex: 1;
  min-width: 260px;
  max-width: 340px;
}
.product-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #651a1a;
}
.product-body {
  background: #651a1a;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  transition: transform 0.3s ease;
  min-height: 150px;
}
.product-body:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

/* --- FOOTER --- */
footer {
  width: 100%;
  background-color: #f2efe8;
}

#footer_legal {
  background-color: #651a1a;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  margin-top: 80px;
  width: 100%;
}

/* --- ANIMATIES --- */
.slide-in-left {
  opacity: 0;
  transform: translateX(-80px);
  animation: slideInLeft 1s ease forwards;
}
.slide-in-right {
  opacity: 0;
  transform: translateX(80px);
  animation: slideInRight 1s ease forwards;
}
.slide-in-up {
  opacity: 0;
  transform: translateY(60px);
  animation: slideInUp 1s ease forwards;
}
@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .intro, .story-container {
    flex-direction: column;
  }
  .founders {
    max-width: 100%;
  }
}
</style>
