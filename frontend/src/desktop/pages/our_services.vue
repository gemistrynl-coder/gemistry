<template>
  <div class="page">
    <section id="services">
      <div v-for="group in groupedServices" :key="group.type" class="group-block">
        <h1 class="group-title">{{ group.type.toUpperCase() }}</h1>
        <div class="category-divider"></div>

        <!-- grid met alle categories van dit type -->
        <div class="services-grid">
          <div v-for="cat in group.categories" :key="cat.id" class="service-card"
               @click="openServicePopup(cat.items?.[0], cat)">
            <div class="card-image">
              <img :src="resolveImage(cat.image_url)" :alt="cat.naam" />
            </div>
            <div class="card-body">
              <h3>{{ cat.naam }}</h3>
              <p class="desc">{{ cat.tldr }}</p>
              <p v-if="Array.isArray(cat.items) && cat.items.length">
                {{ cat.items.length }} opties beschikbaar
              </p>

              <!-- ✅ nieuwe regel voor aanbetaling -->
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

    <!-- SERVICE POPUP -->
    <div v-if="showPopup" class="gem-modal-overlay" @click.self="closeServicePopup">
      <div class="service-modal">
        <button class="gem-close" @click="closeServicePopup" aria-label="Sluiten">×</button>

        <div class="gem-header">
          <h2>{{ selectedService?.naam }}</h2>
          <div class="gem-divider"></div>
        </div>

        <div class="gem-body">
          <div class="popup-left">
            <img :src="resolveImage(selectedService?.image_url)" :alt="selectedService?.naam" />
          </div>

          <div class="popup-right">
            <p class="popup-tldr">{{ selectedService?.description }}</p>

            <!-- ✅ ALLEEN hier de items -->
            <div v-if="selectedService && hasAnyPopupItems">
              <h4>Afspraken</h4>

              <!-- gegroepeerd -->
              <template v-if="Object.keys(popupGroupedItems).length">
                <div v-for="(items, t) in popupGroupedItems" :key="t" class="type-block">
                  <h5>Type: {{ t }}</h5>
                  <ul>
                    <li v-for="(it, idx) in items" :key="`${it.naam}-${idx}`" style="margin-bottom:10px">
                      {{ it.naam }} —
                      <span v-if="hasPrijs(it.prijs)">€{{ formatPrice(it.prijs) }}</span>
                      <span v-else>Prijs op aanvraag</span>
                      ({{ it.duration }})
                      <a class="cta-button" :href="it.url" target="_blank" rel="noopener noreferrer">Maak afspraak</a>
                    </li>
                  </ul>
                </div>
              </template>

              <!-- fallback on-groepeerd -->
              <template v-else>
                <ul>
                  <li v-for="(it, idx) in popupItems" :key="`${it.naam}-${idx}`" style="margin-bottom:10px">
                    {{ it.naam }} —
                    <span v-if="hasPrijs(it.prijs)">€{{ formatPrice(it.prijs) }}</span>
                    <span v-else>Prijs op aanvraag</span>
                    ({{ it.duration }})
                    <a class="cta-button" :href="it.url" target="_blank" rel="noopener noreferrer">Maak afspraak</a>
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

    <!-- CALENDLY POPUP -->
    <div v-if="showCalendly" class="gem-modal-overlay" @click.self="closeCalendly">
      <div class="service-modal" style="max-width:900px; width:95%; height:90vh;">
        <button class="gem-close" @click="closeCalendly" aria-label="Sluiten">×</button>
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
    items: [
      { url: "https://calendly.com/gemistrynl/1-gem", naam: "1 Gem", prijs: 30, duration: "15m", type: "basic" },
      { url: "https://calendly.com/gemistrynl/2-gems", naam: "2 Gems", prijs: 40, duration: "30m", type: "basic" },
    ],
  },
]);

const showPopup = ref(false);
const showCalendly = ref(false);

// data voor popup
const selectedService = ref(null);
const popupItems = ref([]);            // platte lijst in popup (altijd array)
const popupGroupedItems = ref({});     // gegroepeerd per item.type

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/prijslijst`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    // defensief: forceer items naar array
    services.value = (Array.isArray(json) ? json : []).map((row) => ({
      ...row,
      items: safeParseItems(row.items),
    }));
  } catch (err) {
    console.error("DEBUG: API fout =", err);
  }
});

// Scroll lock
function lockScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (scrollBarWidth > 0) document.body.style.paddingRight = scrollBarWidth + "px";
}
function unlockScroll() { document.body.style.overflow = ""; document.body.style.paddingRight = ""; }
watch([showPopup, showCalendly], (states) => { states.some(Boolean) ? lockScroll() : unlockScroll(); });

// === PAGE GROUPING (buiten popup) ===
const groupedServices = computed(() => {
  const buckets = {};
  for (const cat of services.value) {
    const gtype = cat.type || "Onbekend";
    if (!buckets[gtype]) buckets[gtype] = { type: gtype, categories: [] };

    const itemBuckets = {};
    const items = Array.isArray(cat.items) ? cat.items : [];
    for (const it of items) {
      const t = it?.type || "Onbekend";
      if (!itemBuckets[t]) itemBuckets[t] = [];
      itemBuckets[t].push(it);
    }

    buckets[gtype].categories.push({ ...cat, groupedItems: itemBuckets });
  }
  return Object.values(buckets);
});

// === POPUP HELPERS ===
const hasAnyPopupItems = computed(() => Array.isArray(popupItems.value) && popupItems.value.length > 0);

function openServicePopup(item, cat) {
  // 1) zorg dat items een array is
  const items = safeParseItems(cat.items);

  // 2) groepeer voor de popup (onafhankelijk van page-computed)
  const grouped = {};
  for (const it of items) {
    const t = it?.type || "Onbekend";
    (grouped[t] ||= []).push(it);
  }

  // 3) set state
  selectedService.value = { ...cat, selectedItem: item };
  popupItems.value = items;
  popupGroupedItems.value = grouped;

  // 4) UI aan
  showPopup.value = true;

  // Debug (laat even in console zien wat er binnenkomt)
  console.log("POPUP selectedService:", selectedService.value);
  console.log("POPUP items length:", popupItems.value.length, popupItems.value);
  console.log("POPUP grouped keys:", Object.keys(popupGroupedItems.value));
}

function closeServicePopup() {
  showPopup.value = false;
  selectedService.value = null;
  popupItems.value = [];
  popupGroupedItems.value = {};
}

// Calendly
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
function closeCalendly() { showCalendly.value = false; }

// Utils
function safeParseItems(maybe) {
  if (Array.isArray(maybe)) return maybe;
  if (maybe == null || maybe === "") return [];
  try {
    const parsed = typeof maybe === "string" ? JSON.parse(maybe) : maybe;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function hasPrijs(p) { return p !== null && p !== undefined && p !== ""; }
function formatPrice(price) {
  const n = Number(price);
  if (Number.isFinite(n)) return String(n).replace(".", ",");
  return String(price ?? "");
}
function resolveImage(path) {
  if (!path) return "/img/placeholder.jpg";
  if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
  return path.replace(/^@\//, "/");
}
</script>

<style scoped>
.page { width: 100%; min-height: 100vh; background-color: #f2efe8; clip-path: inset(0px -20px -20px -20px); }

/* GROUP */
.group-block { margin-bottom: 40px; text-align: center; }

/* CATEGORIE */
.category-block { margin-bottom: 60px; text-align: center; }
.category-title { font-size: 28px; font-weight: bold; color: #651a1a; text-transform: uppercase; letter-spacing: 2px; }
.type-chip { font-size: 18px; text-transform: none; margin-left: 8px; color: #8a2a2a; }
.category-divider { width: 80px; height: 3px; background: #651a1a; margin: 10px auto 30px auto; border-radius: 2px; }

/* GRID */
.services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); max-width: 1400px; margin: 0 auto; gap: 35px; padding: 0 20px; }
.service-card { display: flex; flex-direction: column; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,.1); transition: transform .25s ease, box-shadow .25s ease; }
.service-card:hover { transform: translateY(-8px); cursor: pointer; box-shadow: 0 12px 24px rgba(0,0,0,.2); }
.card-image img { width: 100%; height: 200px; object-fit: cover; }
.card-body { padding: 18px; display: flex; flex-direction: column; gap: 8px; }
.service-card h3 { font-size: 24px; font-weight: bold; color: #651a1a; text-transform: uppercase; margin: 0; }
.desc { font-size: 17px; color: #444; line-height: 1.4; min-height: 40px; }

/* Items per type */
.type-block { text-align: left; max-width: 900px; margin: 0 auto 14px; }
.type-block h4, .type-block h5 { margin: 16px 0 8px; }
.type-block ul { padding-left: 18px; }

/* POPUP */
.gem-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.55); display: flex; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(4px); }
.service-modal { background: #f2efe8; color: #651a1a; border-radius: 18px; padding: 30px; width: 90%; max-width: 750px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 12px 40px rgba(0,0,0,.25); animation: fadeInUp .25s ease; }
@keyframes fadeInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.gem-close { position: absolute; top: 15px; right: 18px; font-size: 26px; background: #fff; border: 2px solid #651a1a; border-radius: 50%; width: 36px; height: 36px; line-height: 32px; text-align: center; color: #651a1a; cursor: pointer; transition: all .2s ease; }
.gem-close:hover { background: #651a1a; color: #fff; }
.gem-header { text-align: center; margin-bottom: 25px; }
.gem-header h2 { margin: 0; font-size: 28px; font-weight: bold; letter-spacing: .5px; }
.gem-divider { margin: 12px auto 0; height: 2px; width: 60px; background: #651a1a; border-radius: 2px; }
.gem-body { display: flex; flex-direction: row; gap: 25px; align-items: flex-start; }
.gem-body img { width: 260px; height: auto; border-radius: 12px; object-fit: cover; box-shadow: 0 6px 18px rgba(0,0,0,.15); }




.popup-right li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 16px;
  line-height: 1.6;
  gap: 12px;
  border-bottom: 1px solid #eee; /* subtiele scheiding */
}

.popup-right li:last-child {
  border-bottom: none;
}

.popup-right li span.price {
  color: #444;
  font-weight: 500;
}

.popup-right li span.duration {
  font-size: 0.9em;
  color: #777;
  margin-left: 4px;
}

.cta-button {
  white-space: nowrap;       /* nooit afbreken */
  display: inline-flex;      /* altijd flex binnen de knop */
  align-items: center;       /* tekst netjes verticaal centreren */
  justify-content: center;   /* tekst mooi horizontaal centreren */
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}




.popup-tldr { font-style: italic; color: #555; margin-top: 4px; }
.popup-right h4 { margin-top: 15px; font-size: 18px; text-decoration: underline; }
.popup-right ul { margin: 0; padding-left: 18px; }
.popup-right li { margin-bottom: 6px; }

.cta-button { margin-left: 8px; padding: 6px 12px; font-size: 16px; font-weight: bold; color: #fff; background: #651a1a; border: none; border-radius: 10px; cursor: pointer; transition: all .25s ease; }
.cta-button:hover { background: #8a2a2a; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.2); }

@media (max-width: 800px) { .cta-button { display: inline-block; margin-top: 10px; } }

/* FOOTER */
#footer_legal { background-color: #651A1A; color: #fff; text-align: center; padding: 20px; font-size: 14px; }
#calendly-container { width: 100%; padding: 0; margin: 0; }

.deposit {
  font-style: italic;
  color: #777;
  font-size: 0.9em;
  margin-top: 6px;
}


.group-title{
  font-size: 28px;
  font-weight: bold;
  color: #651a1a;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: "Vogue", Georgia, serif;
}


</style>
