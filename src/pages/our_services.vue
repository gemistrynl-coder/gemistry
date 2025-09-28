<template>
  <div class="page">
    <section id="services">
      <h2>Our Services</h2>

      <!-- GRID: 4 per row -->
      <div class="services-grid">
        <!-- CUSTOM DESIGNS -->
        <div class="service-card">
          <img src="@/img/closeup/img1.jpg" alt="Custom Designs" />
          <h3>CUSTOM DESIGNS</h3>
          <hr>
          <p class="price">vanaf €60,-</p>
          <p class="desc">Maak jou creativiteit,<br />realiteit.</p>
        </div>

        <!-- SHAPES -->
        <div class="service-card">
          <img src="@/img/closeup/kaolo.JPG" alt="Shapes" />
          <h3>SHAPES</h3>
          <hr>
          <p class="price">vanaf €40,-</p>
          <p class="desc">Verschillende vormen en<br />maten, kies jou stijl.</p>
        </div>

        <!-- SIMPLE -->
        <div class="service-card">
          <img src="@/img/closeup/img2.jpg" alt="Simple" />
          <h3>SIMPLE</h3>
          <hr>
          <p class="price">vanaf €30,-</p>
          <p class="desc">Basic designs</p>
        </div>

        <!-- DUO DEALS -->
        <div class="service-card">
          <img src="@/img/random_image/IMG_4111.JPG" alt="Duo Deals" />
          <h3>DUO DEALS</h3>
          <hr>
          <p class="price">€50,-</p>
          <p class="desc">
            Breng een vriend of vriendin en<br />krijg beide een gem met korting.
          </p>
        </div>

        <!-- GEMISTRY -->
        <div class="service-card">
          <img src="@/img/random_image/IMG_4118.JPG" alt="Gemistry" />
          <h3>GEMISTRY</h3>
          <hr>
          <p class="price">€70,-</p>
          <p class="desc">
            Breng een vriend of vriendin en<br />krijg beide twee gems met korting.
          </p>
        </div>

        <!-- VIP SETS -->
        <div class="service-card">
          <img src="@/img/random_image/IMG_6666.jpg" alt="VIP Sets" />
          <h3>VIP SETS</h3>
          <hr>
          <p class="price">€120,-</p>
          <p class="desc">
            Zet een gouden design en<br />krijg er een swarovski gem bij.
          </p>
        </div>

        <!-- 18 KARAAT GOUD -->
        <div class="service-card">
          <img src="@/img/placeholder.jpg" alt="18 Karaat Goud" />
          <h3>18 KARAAT GOUD</h3>
          <hr>
          <p class="price">€100,-</p>
          <p class="desc">
            Exclusieve 18 karaat gouden designs<br />voor een luxe uitstraling.
          </p>
        </div>

        <!-- GOLDEN DUO -->
        <div class="service-card">
          <img src="@/img/placeholder.jpg" alt="Golden Duo" />
          <h3>GOLDEN DUO</h3>
          <hr>
          <p class="price">€180,-</p>
          <p class="desc">
            Een gouden combinatie voor jou<br />en je beste vriend(in).
          </p>
        </div>
      </div>
    </section>
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
// Geen speciale script nodig hier
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  background-color: #f2efe8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 5px 5px;
  clip-path: inset(0px -20px -20px -20px); /* voorkomt shadow boven */
}

#services {
  text-align: center;
  padding: 40px;
}

#services h2 {
  font-size: 36px;
  margin-bottom: 40px;
  color: #651a1a;
}

/* GRID: 4 per rij op desktop */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

/* Card styling */
.service-card {
  text-align: center;
}

.service-card hr {
  border: none;
  border-top: 2px solid #651a1a;
  margin: 10px auto 15px auto;
  width: 60%;
}

.service-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
}

.service-card h3 {
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #651a1a;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.service-card .price {
  margin: 8px 0;
  font-size: 16px;
  font-weight: bold;
  color: #651a1a;
}

.service-card .desc {
  font-size: 15px;
  color: #333;
  line-height: 1.4;
}

/* ✅ Responsive: 2 per rij op tablet, 1 per rij mobiel */
@media (max-width: 1000px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

/* Footer */
footer {
  color: white;
  text-align: center;
  margin-top: 60px;
  font-size: 14px;
  border-radius: 0 0 5px 5px;
}

/* Footer legal */
#footer_legal {
  background-color: #651A1A;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  border-radius: 0 0 5px 5px;
}
</style>
