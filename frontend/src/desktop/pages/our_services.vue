<template>
  <div class="page">
    <section id="services">
      <!-- Loop door de categorieën (basic, deal, gold, enz.) -->
      <div
          v-for="cat in groupedServices"
          :key="cat.id"
          class="category-block"
      >
        <h3 class="category-title">{{ cat.naam }}</h3>
        <div class="category-divider"></div>

        <div class="services-grid">
          <div
              class="service-card"
              :key="cat.id"
              @click="openServicePopup(cat.items[0], cat)"
          >
            <div class="card-image">
              <img :src="resolveImage(cat.image_url)" :alt="cat.naam" />
            </div>
            <div class="card-body">
              <h3>{{ cat.naam }}</h3>
              <p class="desc">{{ cat.tldr }}</p>
              <p v-if="cat.items.length">
                {{ cat.items.length }} opties beschikbaar
              </p>
            </div>
          </div>
        </div>

    </div>
    </section>

    <!-- FOOTER -->
    <footer>
      <div id="footer_legal">
        <p>Privacy policy | Algemene voorwaarden</p>
        <p>© 2025 Gemistry. Alle rechten voorbehouden.</p>
      </div>
    </footer>

    <!-- SERVICE POPUP -->
    <div
        v-if="showPopup"
        class="gem-modal-overlay"
        @click.self="closeServicePopup"
    >
      <div class="service-modal">
        <!-- Close -->
        <button class="gem-close" @click="closeServicePopup" aria-label="Sluiten">
          ×
        </button>

        <!-- Header -->
        <!-- Header -->
        <div class="gem-header">
          <h2>{{ selectedService?.naam }}</h2>
          <div class="gem-divider"></div>
        </div>

        <!-- Body -->
        <div class="gem-body">
          <div class="popup-left">
            <img
                :src="resolveImage(selectedService?.image_url)"
                :alt="selectedService?.naam"
            />
          </div>
          <div class="popup-right">
            <!-- categorie info -->
            <p class="popup-tldr">{{ selectedService?.description }}</p>

            <!-- items -->
            <div v-if="selectedService?.items?.length">
              <h4>Afspraken</h4>
              <ul>
                <li
                    v-for="it in selectedService.items"
                    :key="it.naam"
                    style="margin-bottom: 10px"
                >
                  {{ it.naam }} —
                  <span v-if="it.prijs">€{{ formatPrice(it.prijs) }}</span>
                  <span v-else>Prijs op aanvraag</span>
                  ({{ it.duration }})

                  <a
                      class="cta-button"
                      :href="it.url"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    Maak afspraak
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CALENDLY POPUP (optioneel) -->
    <div
        v-if="showCalendly"
        class="gem-modal-overlay"
        @click.self="closeCalendly"
    >
      <div class="service-modal" style="max-width:900px; width:95%; height:90vh;">
        <button class="gem-close" @click="closeCalendly" aria-label="Sluiten">
          ×
        </button>
        <div class="gem-header">
          <div class="gem-divider"></div>
        </div>
        <div class="gem-body" style="flex-direction: column; height:100%;">
          <div id="calendly-container" style="flex:1;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";

const API_BASE_URL = "https://gemistrybackend-production.up.railway.app";


const services = ref([
  {
    id: 1,
    naam: "Simple (TEST)",
    description: "Testobject om frontend te debuggen",
    tldr: "Basic designs",
    prijs: null,
    type: "basic",
    image_url: "/img/closeup/img2.jpg",
    afspraken: [],
    items: [
      { url: "https://calendly.com/gemistrynl/1-gem", naam: "1 Gem", prijs: 30, duration: "15m" },
      { url: "https://calendly.com/gemistrynl/2-gems", naam: "2 Gems", prijs: 40, duration: "30m" },
    ],
  }
]);

const showPopup = ref(false);
const selectedService = ref(null);
const showCalendly = ref(false);

console.log("hiii");

onMounted(async () => {
  console.log("DEBUG: onMounted gestart");
  try {
    const res = await fetch(`${API_BASE_URL}/api/prijslijst`);
    console.log("DEBUG: API response status =", res.status);
    const json = await res.json();
    console.log("DEBUG: API response JSON =", json);

    // eerst API data laden
    services.value = json;



  } catch (err) {
    console.error("DEBUG: API fout =", err);
  }

  console.log("DEBUG: services.value na fetch+test =", services.value);
});

// Scroll lock helpers
function lockScroll() {
  const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = scrollBarWidth + "px";
  }
}
function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

// Watchers
watch([showPopup, showCalendly], (states) => {
  if (states.some(Boolean)) {
    lockScroll();
  } else {
    unlockScroll();
  }
});

// Groepering
const groupedServices = computed(() => {
  console.log("DEBUG: groupedServices.value =", services.value);
  return services.value;
});

// Helpers
function formatPrice(price) {
  return price ? parseFloat(price).toFixed(2).replace(".", ",") : "n.v.t.";
}
function resolveImage(path) {
  if (!path) return "../assets/img/placeholder.jpg";
  return path.replace(/^@\//, "/");
}

// Popup functies
function openServicePopup(item, cat) {
    console.log("DEBUG: openServicePopup → cat =", cat);
    console.log("DEBUG: openServicePopup → item =", item);

    selectedService.value = { ...cat, selectedItem: item };
    showPopup.value = true;
  }

function closeServicePopup() {
  showPopup.value = false;
  selectedService.value = null;
}

// Calendly functies
async function openBooking(url) {
  closeServicePopup();
  showCalendly.value = true;

  await nextTick();

  if (window.Calendly) {
    window.Calendly.initInlineWidget({
      url,
      parentElement: document.getElementById("calendly-container"),
      prefill: {},
      utm: {},
    });
  }
}
function closeCalendly() {
  showCalendly.value = false;
}
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background-color: #f2efe8;
  clip-path: inset(0px -20px -20px -20px);
}

/* ===== CATEGORIE ===== */
.category-block {
  margin-bottom: 60px;
  text-align: center;
}
.category-title {
  font-size: 28px;
  font-weight: bold;
  color: #651a1a;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.category-divider {
  width: 80px;
  height: 3px;
  background: #651a1a;
  margin: 10px auto 30px auto;
  border-radius: 2px;
}

/* ===== GRID ===== */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  max-width: 1400px;
  margin: 0 auto;
  gap: 35px;
  padding: 0 20px;
}
.service-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.service-card:hover {
  transform: translateY(-8px);
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.service-card h3 {
  font-size: 24px;
  font-weight: bold;
  color: #651a1a;
  text-transform: uppercase;
  margin: 0;
}
.price {
  font-size: 16px;
  font-weight: bold;
  color: #651a1a;
}
.desc {
  font-size: 17px;
  color: #444;
  line-height: 1.4;
  min-height: 40px;
}

/* ======= POPUP ======= */
.gem-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}
.service-modal {
  background: #f2efe8;
  color: #651a1a;
  border-radius: 18px;
  padding: 30px;
  width: 90%;
  max-width: 750px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  animation: fadeInUp 0.25s ease;
}
@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.gem-close {
  position: absolute;
  top: 15px;
  right: 18px;
  font-size: 26px;
  background: #fff;
  border: 2px solid #651a1a;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  line-height: 32px;
  text-align: center;
  color: #651a1a;
  cursor: pointer;
  transition: all 0.2s ease;
}
.gem-close:hover {
  background: #651a1a;
  color: #fff;
}
.gem-header {
  text-align: center;
  margin-bottom: 25px;
}
.gem-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 0.5px;
}
.gem-divider {
  margin: 12px auto 0 auto;
  height: 2px;
  width: 60px;
  background: #651a1a;
  border-radius: 2px;
}
.gem-body {
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: flex-start;
}
.gem-body img {
  width: 260px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
.popup-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
  overflow-y: auto;
  padding-right: 6px;
}
.popup-price {
  font-weight: bold;
  font-size: 22px;
  background: #651a1a0d;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-block;
}
.popup-tldr {
  font-style: italic;
  color: #555;
  margin-top: 4px;
}
.popup-right h4 {
  margin-top: 15px;
  font-size: 18px;
  text-decoration: underline;
}
.popup-right ul {
  margin: 0;
  padding-left: 18px;
}
.popup-right li {
  margin-bottom: 6px;
}

.cta-button {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: #651a1a;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  align-self: flex-start;
}
.cta-button:hover {
  background: #8a2a2a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
@media (max-width: 800px) {
  .cta-button {
    align-self: center;
    width: 100%;
    max-width: 280px;
  }
}

/* ===== FOOTER ===== */
#footer_legal {
  background-color: #651A1A;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}

#calendly-container {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
