<template>
  <div class="page">
    <main class="content">
      <!-- Intro -->
      <section id="over_ons">
        <div class="intro">
          <div class="founders">
            <div class="names">
              <div>
                <h3>Didi Zeilstra</h3>
                <p>OPRICHTER</p>
              </div>
              <div>
                <h3>Dean Davis</h3>
                <p>OPRICHTER</p>
              </div>
            </div>
            <img src="@/img/ons/didi_dean.jpg" alt="Didi en Dean" />
          </div>

          <div class="intro-text">
            <p>
              Wij zijn Didi en Dean, de gezichten achter Gemistry. Wat begon als een gedeelde passie
              voor creativiteit en zelfexpressie, groeide uit tot een eigen concept: toothgems die verder
              gaan dan alleen een accessoire. Samen combineren we onze energie, ideeën en skills om iets
              unieks neer te zetten. Voor ons draait het niet alleen om tanden laten stralen, maar ook om
              mensen meer zelfvertrouwen en plezier mee te geven.
            </p>
            <p>
              Didi is heel creatief en voor haar is niks te gek. Terwijl Dean graag klanten zelfverzekerder
              laat voelen. Deze combinatie zorgt voor een veilige en leuke plek om jezelf even iets extra’s
              te gunnen.
            </p>
          </div>
        </div>

        <!-- Verhaal -->
        <div class="story-container">
          <div class="story">
            <p>
              Bij Gemistry draait alles om jouw glimlach. Wij zijn gespecialiseerd in het zetten van
              Swarovski toothgems en unieke designs die passen bij jouw stijl. Kwaliteit en hygiëne staan bij
              ons altijd voorop.
            </p>
            <p>
              Een toothgem is meer dan een accessoire, het is een statement. Of je nu kiest voor een subtiel
              kristal of een opvallend design, wij zorgen dat jouw smile de aandacht krijgt die hij verdient.
            </p>
            <p>
              Achter Gemistry staan Didi en Dean, twee ondernemers met een passie voor creativiteit en
              zelfexpressie. Onze missie is simpel: iedereen een stukje extra confidence meegeven.
            </p>
            <p><b>Your smile, your color, your vibe.</b></p>
          </div>

          <div class="story-images">
            <img src="@/img/ons/krant.jpg" alt="Krant" />
            <img src="@/img/ons/gems.jpg" alt="Gems" />
          </div>
        </div>

        <!-- Producten -->
        <div id="products">
          <h2>The products we use</h2>
          <hr />
          <div class="product-grid">
            <div class="product-card">
              <h3 class="product-title">REAL SWAROVSKI</h3>
              <div class="product-body">
                <p>
                  Bij Gemistry kiezen we bewust voor originele Swarovski kristallen. Swarovski staat wereldwijd
                  bekend om de hoge kwaliteit, zuiverheid en sprankeling.
                </p>
              </div>
            </div>
            <div class="product-card">
              <h3 class="product-title">18 KARAAT GOUD</h3>
              <div class="product-body">
                <p>
                  Voor klanten die een luxere uitstraling willen, werken wij met 18 karaat gouden toothgems.
                  Goud is stijlvol, tijdloos en hypoallergeen.
                </p>
              </div>
            </div>
            <div class="product-card">
              <h3 class="product-title">HYGIENE</h3>
              <div class="product-body">
                <p>
                  Hygiëne en veiligheid vormen de basis. Wij werken met medische lijm en professionele
                  tandheelkundige materialen.
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
  min-height: 100vh;
  margin: auto;
  background-color: #F2EFE8;
  display: flex;
  flex-direction: column;
}

/* Intro */
.intro {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.founders {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}

.founders .names {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.founders img {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}

.intro-text {
  font-size: 20px;
  line-height: 1.5;
  color: #651a1a;
}

/* Verhaal */
.story-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.story {
  font-size: 20px;
  line-height: 1.6;
  color: #651a1a;
}

.story-images {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.story-images img {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}

/* Products */
#products {
  margin-top: 20px;
  text-align: center;
  padding: 20px;
}

#products h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #651a1a;
}

#products hr {
  border: 1px solid #651A1A;
  margin-bottom: 20px;
}

.product-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  color: #651a1a;
}

.product-body {
  background: #651a1a;
  color: #fff;
  padding: 15px;
  border-radius: 6px;
  font-size: 14px;
  text-align: left;
}

/* Footer */
footer {
  margin-top: 40px;
}

#footer_legal {
  background-color: #651A1A;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 12px;
}
</style>