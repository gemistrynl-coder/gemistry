<template>
  <div class="page">
    <section id="services">

      <!-- Loop door de categorieën (basic, deal, gold) -->
      <div
          v-for="(items, type) in groupedServices"
          :key="type"
          class="category-block"
      >
        <h3 class="category-title">{{ formatType(type) }}</h3>
        <div class="category-divider"></div>

        <div class="services-grid">
          <div
              class="service-card"
              v-for="item in items"
              :key="item.id"
              @click="openServicePopup(item)"
          >
            <div class="card-image">
              <img :src="resolveImage(item.image_url)" :alt="item.naam" />
            </div>
            <div class="card-body">
              <h3>{{ item.naam }}</h3>
              <p class="price">€{{ formatPrice(item.prijs) }}</p>
              <p class="desc">{{ item.tldr }}</p>
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

    <!-- SERVICE POPUP (volledig scherm) -->
    <div v-if="showPopup" class="gem-modal-overlay">
      <div class="service-modal">
        <!-- Header -->
        <!-- Header -->
        <div class="gem-header">
          <h2>{{ selectedService?.naam }}</h2>
          <button class="gem-close" @click="closeServicePopup" aria-label="Sluiten">×</button>
        </div>
        <div class="gem-divider"></div>


        <!-- Body -->
        <div class="gem-body">
          <div class="popup-left">
            <img :src="resolveImage(selectedService?.image_url)" :alt="selectedService?.naam" />
          </div>
          <div class="popup-right">
            <p class="popup-price">€{{ formatPrice(selectedService?.prijs) }}</p>
            <p>{{ selectedService?.description }}</p>
            <p class="popup-tldr">{{ selectedService?.tldr }}</p>

            <div v-if="popupItems.length">
              <h4>Items</h4>
              <ul>
                <li v-for="it in popupItems" :key="it.id">
                  {{ it.naam }} - €{{ formatPrice(it.prijs) }}
                </li>
              </ul>
            </div>

            <button class="cta-button" @click="openBooking">
              Maak nu een afspraak
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"

// 🚀 Railway backend URL
const API_BASE_URL = "https://gemistrybackend-production.up.railway.app"

const services = ref([])
const showPopup = ref(false)
const selectedService = ref(null)
const popupItems = ref([])

// services.value = [
//   {
//     id: 1,
//     naam: "Nep Service",
//     prijs: 49.99,
//     tldr: "Dit is een korte beschrijving van een nep service.",
//     description: "Hier staat een uitgebreide uitleg over de nep service die je normaal in de database hebt staan.",
//     type: "basic",
//     image_url: "/img/placeholder.jpg"
//   }
// ]


// Data ophalen
onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/prijslijst`)
    services.value = await res.json()
  } catch (err) {
    console.error("❌ API error:", err)
  }
})

// Items ophalen per categorie_id
async function fetchItems(categorieId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/prijslijst-items/${categorieId}`)
    return await res.json()
  } catch (err) {
    console.error("❌ API error:", err)
    return []
  }
}

// Data groeperen per type
const groupedServices = computed(() => {
  return services.value.reduce((groups, item) => {
    if (!groups[item.type]) groups[item.type] = []
    groups[item.type].push(item)
    return groups
  }, {})
})

// Helpers
function formatPrice(price) {
  return price ? parseFloat(price).toFixed(2).replace(".", ",") : "n.v.t."
}

function resolveImage(path) {
  if (!path) return "/img/placeholder.jpg"
  const cleanPath = path.replace(/^@\//, "/")
  if (!cleanPath.startsWith("/img/")) return "/img/placeholder.jpg"
  return cleanPath
}

function formatType(type) {
  switch (type) {
    case "basic": return "Basic Services"
    case "deal": return "Deals"
    case "gold": return "Gold Collection"
    default: return type
  }
}

// Popup
// Popup openen
async function openServicePopup(item) {
  selectedService.value = item;
  showPopup.value = true;

  // lock body scroll
  document.body.style.overflow = "hidden";

  // Neppe items voor test
  popupItems.value = [
    { id: 101, categorie_id: 1, naam: "Extra glitter", prijs: 9.99 },
    { id: 102, categorie_id: 1, naam: "Deluxe afwerking", prijs: 19.99 }
  ];
}

// Popup sluiten
function closeServicePopup() {
  showPopup.value = false;
  popupItems.value = [];

  // restore body scroll
  document.body.style.overflow = "";
}


// Dummy booking
function openBooking() {
  alert("Boekingsfunctie hier 🚀")
}
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background-color: #f2efe8;
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
  grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
  margin: 0 auto;
  gap: 35px;
  padding: 0 20px;
  justify-items: center;
}

.service-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  width: 90%;
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
  background: #f2efe8; /* geen blur, gewoon achtergrond */
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow-y: auto;
}

.service-modal {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;
  color: #651a1a;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
}


.gem-close {
  font-size: 26px;
  background: none;
  border: none;
  color: #651a1a;
  cursor: pointer;
  transition: all 0.2s ease;
}
.gem-close:hover {
  background: #651a1a;
  color: #fff;
}

.gem-header {
  display: flex;
  justify-content: space-between; /* titel links, kruisje rechts */
  align-items: center;
  margin-bottom: 15px;
}

.gem-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: #651a1a;
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
  margin-top: 20px;
}
.gem-body img {
  width: 260px;
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

.cta-button { margin-top: 20px; padding: 12px 24px; font-size: 18px; font-weight: bold; color: #fff; background: #651a1a; border: none; border-radius: 10px; cursor: pointer; transition: all 0.25s ease; align-self: flex-start; }

@media (max-width: 800px) {
  .gem-body {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
