<template>
  <div class="page">
    <main class="content">
      <section id="over_ons">

        <!-- 👇 aparte sectie voor founders -->
        <div class="founders slide-in-left">
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
          <img src="@/mobile/assets/img/ons/didi_dean.jpg" alt="Didi en Dean" />
        </div>

        <!-- 👇 intro-text los daarna -->
        <div class="intro-text slide-in-right">
          <p>
            Wij zijn Didi en Dean, de gezichten achter Gemistry. Wat begon als een gedeelde passie
            voor creativiteit en zelfexpressie, groeide uit tot een eigen concept: toothgems die verder
            gaan dan alleen een accessoire. Samen combineren we onze energie, ideeën en skills om iets
            unieks neer te zetten.
          </p>
          <p>
            Didi is heel creatief en voor haar is niks te gek. Terwijl Dean graag klanten zelfverzekerder
            laat voelen. Deze combinatie zorgt voor een veilige en leuke plek om jezelf iets extra’s
            te gunnen.
          </p>
        </div>

        <!-- Story -->
        <div class="story-container">
          <div class="story slide-in-left">
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

          <div class="story-images slide-in-right">
            <img src="@/mobile/assets/img/ons/krant.jpg" alt="Krant" />
            <img src="@/mobile/assets/img/ons/gems.jpg" alt="Gems" />
          </div>
        </div>

        <!-- Products -->
        <div id="products">
          <h2 class="slide-in-up">The products we use</h2>
          <hr class="slide-in-up" />
          <div class="product-grid">
            <div class="product-card slide-in-left">
              <h3 class="product-title">REAL SWAROVSKI</h3>
              <div class="product-body">
                <p>
                  Bij Gemistry kiezen we bewust voor originele Swarovski kristallen. Swarovski staat wereldwijd
                  bekend om de hoge kwaliteit, zuiverheid en sprankeling.
                </p>
              </div>
            </div>
            <div class="product-card slide-in-up">
              <h3 class="product-title">18 KARAAT GOUD</h3>
              <div class="product-body">
                <p>
                  Voor klanten die een luxere uitstraling willen, werken wij met 18 karaat gouden toothgems.
                  Goud is stijlvol, tijdloos en hypoallergeen.
                </p>
              </div>
            </div>
            <div class="product-card slide-in-right">
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

    <!-- Footer -->
    <footer>
      <div id="footer_legal">
        <p>Privacy policy | Algemene voorwaarden</p>
        <p>© 2025 Gemistry. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue"

onMounted(() => {
  const elements = document.querySelectorAll(".slide-in-left, .slide-in-right, .slide-in-up")

  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 }
  )

  elements.forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.page {
  width: 100%;
  background-color: #f2efe8;
  display: flex;
  flex-direction: column;
}

/* --- SLIDE-IN EFFECTEN --- */
.slide-in-left,
.slide-in-right,
.slide-in-up {
  opacity: 0;
  transform: scale(0.95);
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}

.slide-in-left {
  transform: translateX(-120px) scale(0.95);
}
.slide-in-left.visible {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.slide-in-right {
  transform: translateX(120px) scale(0.95);
}
.slide-in-right.visible {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.slide-in-up {
  transform: translateY(120px) scale(0.95);
}
.slide-in-up.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* --- CONTENT STYLING --- */
.founders {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
}

.founders .names {
  display: flex;
  justify-content: space-around;
}

.founders img {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
  margin-top: 10px;
}

.intro-text {
  padding: 20px;
  font-size: 18px;
  line-height: 1.5;
  color: #651a1a;
}

.story-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.story {
  font-size: 18px;
  line-height: 1.6;
  color: #651a1a;
}

.story-images img {
  width: 100%;
  border-radius: 6px;
  margin-top: 10px;
}

#products {
  margin-top: 40px;
  text-align: center;
  padding: 20px;
}

#products h2 {
  font-size: 20px;
  color: #651a1a;
}

#products hr {
  border: 1px solid #651a1a;
  margin: 10px auto 20px;
  width: 80%;
}

.product-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

/* FOOTER */
#footer_legal {
  margin-top: 50px;
  background-color: #651a1a;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 12px;
}
</style>
