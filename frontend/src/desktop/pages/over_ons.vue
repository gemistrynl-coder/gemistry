<template>
  <div class="page">
    <main class="content">
      <!-- Titel -->
      <section id="over_ons">
        <!-- Intro met foto en tekst -->
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
            <img src="@/desktop/assets/img/ons/didi_dean.jpg" alt="Didi en Dean" />
          </div>
          <div class="intro-text">
            <p>
              Wij zijn Didi en Dean, de gezichten achter Gemistry. Wat begon als een gedeelde passie
              voor creativiteit en zelfexpressie, groeide uit tot een eigen concept: toothgems die verder
              gaan dan alleen een accessoire. Samen combineren we onze energie, ideeën en skills om iets
              unieks neer te zetten. Voor ons draait het niet alleen om tanden laten stralen, maar ook om
              mensen meer zelfvertrouwen en plezier mee te geven. Gemistry is onze creatieve uitlaatklep,
              maar vooral een plek waar iedereen welkom is om zijn of haar eigen vibe te laten zien.
            </p>
            <p>
              Didi is heel creatief en voor haar is niks te gek. Terwijl Dean graag klanten zelfverzekerder
              laat voelen. Deze combinatie zorgt voor een veilige en leuke plek om jezelf even iets extra’s
              te gunnen.
            </p>
          </div>
        </div>

        <!-- Verhaal -->
        <!-- Verhaal + Afbeeldingen -->
        <div class="story-container">
          <div class="story">
            <p>
              Bij Gemistry draait alles om jouw glimlach. Wij zijn gespecialiseerd in het zetten van
              Swarovski toothgems en unieke designs die passen bij jouw stijl. Kwaliteit en hygiëne staan bij
              ons altijd voorop: we werken met professionele materialen en zorgen dat elke behandeling veilig
              en comfortabel verloopt.
            </p>
            <p>
              Een toothgem is meer dan een accessoire, het is een statement. Of je nu kiest voor een subtiel
              kristal of een opvallend design, wij zorgen dat jouw smile de aandacht krijgt die hij verdient.
              Gemistry staat voor creativiteit, fun en persoonlijke aandacht. In onze salon nemen we de tijd
              voor je, maar je vindt ons ook op evenementen waar we zorgen voor extra sparkle en beleving.
            </p>
            <p>
              Achter Gemistry staan Didi en Dean, twee ondernemers met een passie voor creativiteit en
              zelfexpressie. Wij geloven dat een glimlach de krachtigste accessoire is die je kunt dragen en
              we willen mensen helpen die nog mooier en unieker te maken. Onze missie is simpel: iedereen een
              stukje extra confidence meegeven, op een manier die past bij zijn of haar persoonlijkheid.
            </p>
            <p><b>Your smile, your color, your vibe.</b></p>
          </div>

          <div class="story-images">
            <img src="@/desktop/assets/img/ons/krant.jpg" alt="Krant" />
            <img src="@/desktop/assets/img/ons/gems.jpg" alt="Gems" />
          </div>
        </div>




        <!-- Producten -->
        <div id="products">
          <h2>The products we use</h2>
          <hr>
          <div class="product-grid">
            <div class="product-card">
              <h3 class="product-title">REAL SWAROVSKI</h3>
              <div class="product-body">
                <p>
                  Bij Gemistry kiezen we bewust voor originele Swarovski kristallen. Swarovski staat wereldwijd
                  bekend om de hoge kwaliteit, zuiverheid en sprankeling van hun crystals.
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

    <!-- FOOTER (zelfde als home.vue) -->
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
  background-color: #F2EFE8;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 5px 5px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  clip-path: inset(0px -20px -20px -20px); /* voorkomt shadow boven */
}

/* Intro sectie */
.intro {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  justify-content: flex-start; /* FOTO LINKS - TEKST RECHTS */
  align-items: center; /* netjes bovenaan uitlijnen */
  padding: 40px;
}

.founders {
  display: flex;
  flex-direction: column; /* namen boven foto */
  align-items: flex-start; /* alles links uitlijnen */
  gap: 20px;
  text-align: left;
  max-width: 400px; /* blok breedte */
  flex-shrink: 0; /* voorkomt dat de foto te klein gedrukt wordt */
}

.founders .names {
  display: flex;
  justify-content: space-around;
  flex-direction: row; /* namen naast elkaar */
  gap: 20px;
  width: 100%;
}

.founders img {
  width: 100%;   /* past zich aan de max-width van founders aan */
  border-radius: 8px;
  object-fit: cover;
}

.intro-text {
  flex: 1; /* neemt de rest van de ruimte */
  font-size: 18px;
  line-height: 1.6;
  color: #651a1a;
}


/* Nieuwe container om tekst + foto's naast elkaar te zetten */
.story-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  padding: 40px;
}

.story {
  flex: 2;
  font-size: 18px;
  line-height: 1.8;
  color: #651a1a;
}

.story-images {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.story-images img {
  width: 100%;   /* neemt volledige kolombreedte */
  border-radius: 8px;
  object-fit: cover;
}

/* Products */
#products {
  margin-top: 40px;
  text-align: center;
  padding: 40px;
}
#products h2 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #651a1a;
}
#products hr{
  border: 1px #651A1A solid;
}
.product-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
}

.product-card {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-title {
  font-size: 20px;
  font-weight: bold;
  color: #651a1a;   /* donkerrood */
  text-align: center;
}

.product-body {
  background: #651a1a;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  flex: 1;
}


.product-card h3 {
  margin-bottom: 10px;
  font-size: 20px;
}


/* Footer */
footer {
  color: white;
  text-align: center;
  margin-top: 60px;
  font-size: 14px;

}

/* Footer legal */
#footer_legal {
  background-color: #651A1A;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}
</style>
