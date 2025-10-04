<template>
  <div class="page">
    <section id="services">
      <!-- Loop door de categorieën (basic, deal, gold) -->
      <div v-for="group in groupedServices" :key="group.type" class="category-block">
        <h3 class="category-title">{{ formatType(group.type) }}</h3>
        <div class="category-divider"></div>

        <!-- grid met alle categories van dit type -->
        <div class="services-grid">
          <div
              class="service-card"
              v-for="cat in group.categories"
              :key="cat.id"
              @click="openServicePopup(cat.items?.[0], cat)"
          >
            <div class="card-image">
              <img :src="resolveImage(cat.image_url)" :alt="cat.naam" />
            </div>
            <div class="card-body">
              <h3>{{ cat.naam }}</h3>
              <p class="desc">{{ cat.tldr }}</p>
              <p v-if="Array.isArray(cat.items) && cat.items.length">
                {{ cat.items.length }} opties beschikbaar
              </p>
              <!-- ✅ Aanbetaling -->
              <p v-if="cat.aanbetaling" class="deposit">
                Aanbetaling: €{{ formatPrice(cat.aanbetaling) }}
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

    <!-- SERVICE POPUP (volledig scherm) -->
    <transition name="popup-fade">
      <div v-if="showPopup" class="gem-modal-overlay">
        <div class="service-modal">
          <div class="gem-header">
            <h2>{{ selectedService?.naam }}</h2>
            <button class="gem-close" @click="closeServicePopup" aria-label="Sluiten">×</button>
          </div>
          <div class="gem-divider"></div>

          <div class="gem-body">
            <div class="popup-left">
              <img :src="resolveImage(selectedService?.image_url)" :alt="selectedService?.naam" />
            </div>
            <div class="popup-right">
              <p class="popup-tldr">{{ selectedService?.description }}</p>

              <div v-if="selectedService && hasAnyPopupItems">
                <h4>Afspraken</h4>
                <template v-if="Object.keys(popupGroupedItems).length">
                  <div v-for="(items, t) in popupGroupedItems" :key="t" class="type-block">
                    <h5>Type: {{ t }}</h5>
                    <ul>
                      <li
                          v-for="(it, idx) in items"
                          :key="`${it.naam}-${idx}`"
                          style="margin-bottom:10px"
                      >
                        {{ it.naam }} —
                        <span v-if="hasPrijs(it.prijs)">€{{ formatPrice(it.prijs) }}</span>
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
                </template>

                <template v-else>
                  <ul>
                    <li
                        v-for="(it, idx) in popupItems"
                        :key="`${it.naam}-${idx}`"
                        style="margin-bottom:10px"
                    >
                      {{ it.naam }} —
                      <span v-if="hasPrijs(it.prijs)">€{{ formatPrice(it.prijs) }}</span>
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
                </template>
              </div>

              <div v-else>
                <em>Geen opties beschikbaar.</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const API_BASE_URL = "https://gemistrybackend-production.up.railway.app";

const services = ref([]);
const showPopup = ref(false);
const selectedService = ref(null);
const popupItems = ref([]);
const popupGroupedItems = ref({});

// === Fetch prijslijst ===
onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/prijslijst`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    services.value = json.map((row) => ({
      ...row,
      items: safeParseItems(row.items),
    }));
  } catch (err) {
    console.error("❌ API error:", err);
  }
});

// === Data groeperen ===
const groupedServices = computed(() => {
  const buckets = {};
  for (const cat of services.value) {
    const gtype = cat.type || "Onbekend";
    if (!buckets[gtype]) buckets[gtype] = { type: gtype, categories: [] };

    const itemBuckets = {};
    for (const it of cat.items || []) {
      const t = it?.type || "Onbekend";
      (itemBuckets[t] ||= []).push(it);
    }
    buckets[gtype].categories.push({ ...cat, groupedItems: itemBuckets });
  }
  return Object.values(buckets);
});

// === Helpers ===
function formatPrice(price) {
  const n = Number(price);
  return Number.isFinite(n) ? String(n).replace(".", ",") : String(price ?? "");
}
function resolveImage(path) {
  if (!path) return "/img/placeholder.jpg";
  if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
  return path.replace(/^@\//, "/");
}
function formatType(type) {
  switch (type) {
    case "basic": return "Basic Services";
    case "deal": return "Deals";
    case "gold": return "Gold Collection";
    default: return type;
  }
}
function safeParseItems(maybe) {
  try {
    return Array.isArray(maybe) ? maybe : JSON.parse(maybe || "[]");
  } catch {
    return [];
  }
}
function hasPrijs(p) {
  return p !== null && p !== undefined && p !== "";
}
const hasAnyPopupItems = computed(() => popupItems.value.length > 0);

// === Popup controls ===
function openServicePopup(item, cat) {
  const items = safeParseItems(cat.items);
  const grouped = {};
  for (const it of items) {
    const t = it?.type || "Onbekend";
    (grouped[t] ||= []).push(it);
  }

  selectedService.value = { ...cat, selectedItem: item };
  popupItems.value = items;
  popupGroupedItems.value = grouped;

  showPopup.value = true;

  // 🔒 alles blokkeren behalve popup
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  document.body.style.height = "100%";
  document.documentElement.style.height = "100%";
}

function closeServicePopup() {
  showPopup.value = false;
  selectedService.value = null;
  popupItems.value = [];
  popupGroupedItems.value = {};

  // 🔓 scroll herstellen
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.height = "";
  document.documentElement.style.height = "";
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
  grid-template-columns: 1fr;
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

.desc {
  font-size: 17px;
  color: #444;
  line-height: 1.4;
  min-height: 40px;
}

.deposit {
  font-style: italic;
  color: #777;
  font-size: 0.9em;
  margin-top: 6px;
}

/* ======= POPUP ======= */
.gem-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  background: #f2efe8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 9999;
  overflow: hidden; /* achtergrond niet scrollen */
  overscroll-behavior: contain;
}

.service-modal {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 30px;
  color: #651a1a;
  box-sizing: border-box;
  overflow-y: auto; /* enkel popup scrollt */
}

.gem-close {
  font-size: 26px;
  background: none;
  border: none;
  color: #651a1a;
  cursor: pointer;
}

.gem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.gem-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
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
  flex-direction: column;
  gap: 25px;
  margin-top: 20px;
}

.gem-body img {
  width: 100%;
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

.popup-tldr {
  font-style: italic;
  color: #555;
  margin-top: 4px;
}

.cta-button {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 20px;
  background: #7a2222;
  color: #fff;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cta-button:hover {
  background: #9b2e2e;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* TRANSITIONS */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* FOOTER */
#footer_legal {
  background-color: #651A1A;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}
</style>
