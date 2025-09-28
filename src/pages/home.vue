<template>
  <div class="page">
    <!-- HEADER -->


    <main class="content">
      <!-- RANDOM IMAGES (3 naast elkaar) -->
      <div id="main_image">
        <div id="main_image_div">
          <p id="image_title">Your smile, your color,<br> your vibe.</p>
          <button @click="openAppointmentPopup">MAAK EEN AFSPRAAK</button>
        </div>
      </div>



      <!-- AFSPRAAK MAKEN -->
      <div id="explore"><br>
        <p>Explore by catagory</p>
        <div>
          <section id="gallery">
            <div class="gallery-grid">
              <div
                  v-for="(item, index) in galleryItems"
                  :key="index"
                  class="gallery-card"
                  @click="handleCardClick(item)"
              >
                <img :src="item.foto" alt="gallery image" />
                <h3>{{ item.title }}</h3>
              </div>

            </div>
          </section>
        </div>
        <hr style=" width: 100%; padding: 0 10px 0 10px">


        <div id="why_gemistry">
          <p id="why_gemistry_title">Why Gemistry?</p>
          <br>
          <p id="why_gemistry_text">AT GEMISTRY IT’SABOUT SAFE & QUALITY TOOTHGEMS, BUT<br>ALSO
            ABOUT ENERGY, CREATIVITY AND COMMUNITY. EVERY SMILE WE<br>
            TOUCH TELLS A STORY
          </p>
          <br>
          <br>

          <hr style="border: 1px #F2EFE8 solid; width: 100%">

          <div id="post">

            <img src="@/img/random_image/IMG_40655.JPG" alt="">
            <div id="post_text">
              <p id="post_text_title">OUR LATEST SHOOT IN
                AMSTERDAM ZUID
              </p>
              <p id="post_text_text">
                Behind the scenes at our very first Gemistry shoot. Together
                with our models we captured the energy, style and creativity
                that define Gemistry. we placed Swarovski gems on each
                model and every look tells its own story. This shoot is more
                than just photos. it’s the start of building a community where
                every smile counts. The results can be found in the gallery.
                With many thanks to @wendi.regelt for shooting with us on
                location.
              </p>
            </div>
          </div>
        </div>
        <br>
      </div>
      <br>
      <br>





      <div id="gemistry_family">

        <h3>GEMISTRY FAMILY</h3>
        <hr>

      </div>











    </main>

    <!-- FOOTER -->
    <footer>
      <div id="social_media">
        <div id="left">
          <h3>Already following up?</h3>
          <div id="social_media_icons">
            <a href="https://www.instagram.com/gemistry.ams/" target="_blank">
              <img src="@/img/icons/insta_icon.png" alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@gemistry" target="_blank">
              <img src="@/img/icons/tiktok_icon.png" alt="TikTok" />
            </a>
            <a href="" id="contact">
              contact
            </a>
          </div>
        </div>
        <div id="right">
        </div>
      </div>

      <div id="footer_legal">
        <p>Privacy policy | Algemene voorwaarden</p>
        <p>© 2025 Gemistry. Alle rechten voorbehouden.</p>
      </div>
    </footer>










    <!--  popups  -->

    <!-- GEMISTRY GEMS POPUP -->
    <div
        v-if="showGemPopup"
        class="gem-modal-overlay"
        @click.self="closeGemPopup"
    >
      <div class="gem-modal">
        <!-- Close -->
        <button class="gem-close" @click="closeGemPopup" aria-label="Sluiten">×</button>

        <!-- Header -->
        <div class="gem-header">
          <h2>Gemistry’s gems.</h2>
          <div class="gem-divider"></div>
        </div>

        <div class="gem-body">
          <!-- Left: copy -->
          <div class="gem-copy">
            <p>
              Onze klanten en modellen zijn het hart van ons merk. Iedere glimlach die we vastleggen
              vertelt een verhaal. Van subtiel en speels tot opvallend en uniek. Wij gaan altijd tot het uiterste om
              een resultaat neer te zetten dat niet alleen straalt, maar ook past bij de persoonlijkheid van degene die het draagt.
            </p>
            <p>
              We zijn continu op zoek naar mensen die ons merk willen vertegenwoordigen en onderdeel willen worden van de Gemistry fam.
              Door samen te werken met modellen en creators kunnen we laten zien dat toothgems meer zijn dan een accessoire,
              het is een lifestyle, een vibe, een statement.
            </p>
            <p class="gem-cta-wrap">
              <button class="gem-cta" @click="closeGemPopup">MAAK EEN AFSPRAAK</button>
            </p>
          </div>

          <!-- Right: image area -->
          <div class="gem-image-wrap">
            <img :src="selectedGem" alt="Gemistry gallery image" class="gem-image" />

            <!-- Prev / Next -->
            <button class="gem-nav gem-prev" @click="prevGem" aria-label="Vorige">
              <svg width="28" height="28" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="gem-nav gem-next" @click="nextGem" aria-label="Volgende">
              <svg width="28" height="28" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>

            <!-- Dots -->
            <div class="gem-dots">
          <span
              v-for="(g, i) in gemImages"
              :key="g"
              class="gem-dot"
              :class="{ active: i === currentGemIndex }"
              @click="goToGem(i)"
          />
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- CLOSE-UP POPUP -->
    <div
        v-if="showCloseupPopup"
        class="gem-modal-overlay"
        @click.self="closeCloseupPopup"
    >
      <div class="gem-modal">
        <!-- Close -->
        <button class="gem-close" @click="closeCloseupPopup" aria-label="Sluiten">×</button>

        <!-- Header -->
        <div class="gem-header">
          <h2>Close-up view</h2>
          <div class="gem-divider"></div>
        </div>

        <div class="gem-body">
          <!-- Left: tekst -->
          <div class="gem-copy">
            <p>
              Details make the difference. Hier vind je close-up foto’s van onze toothgems.
              Elk design is met zorg geplaatst, van subtiele Swarovski kristallen tot opvallende custom creaties en 18k gouden accenten.
            </p>
            <p>
              Close-ups laten zien waar Gemistry voor staat: precisie, hygiëne en creativiteit.
              Elk tandoppervlak is uniek en vraagt om maatwerk en dat is precies wat wij doen.
            </p>
            <p>
              Deze collectie is bedoeld om je te inspireren. Of je nu kiest voor een minimalistische ontwerp
              of een out going piece, de mogelijkheden zijn eindeloos.
              Scroll door en ontdek welke style bij jouw vibe past.
            </p>
          </div>

          <!-- Right: image + navigatie -->
          <div
              class="gem-image-wrap"
              @touchstart.passive="onCloseupTouchStart"
              @touchend.passive="onCloseupTouchEnd"
          >
            <img :src="selectedCloseup" alt="Closeup image" class="gem-image" />

            <!-- Prev / Next -->
            <button class="gem-nav gem-prev" @click="prevCloseup" aria-label="Vorige">
              <svg width="28" height="28" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="gem-nav gem-next" @click="nextCloseup" aria-label="Volgende">
              <svg width="28" height="28" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>

            <!-- Dots -->
            <div class="gem-dots">
          <span
              v-for="(c, i) in closeupImages"
              :key="c"
              class="gem-dot"
              :class="{ active: i === currentCloseupIndex }"
              @click="goToCloseup(i)"
          />
            </div>
          </div>
        </div>
      </div>
    </div>




    <!-- APPOINTMENT POPUP -->
    <div
        id="appointment-popup"
        class="gem-modal-overlay"
        v-show="showAppointmentPopup"
        @click.self="closeAppointmentPopup"
    >
      <div class="appointment-modal"> <!-- 👈 nieuwe class -->
        <!-- Close -->
        <button class="gem-close" @click="closeAppointmentPopup" aria-label="Sluiten">×</button>

        <!-- Header -->
        <div class="gem-header">
          <h2>Plan een afspraak</h2>
          <div class="gem-divider"></div>
        </div>

        <!-- Body -->
        <div class="gem-body">
          <p>
            Kies hieronder eenvoudig een tijdslot dat jou het beste uitkomt.
            Je afspraak wordt direct bevestigd via Calendly.
          </p>

          <!-- Calendly inline widget -->
          <div
              class="calendly-inline-widget"
              data-url="https://calendly.com/gemistrynl/2-gems"
          ></div>
        </div>
      </div>
    </div>








  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import '@/popup/bevestigen.vue'

// ==============================
// DATE PICKER
// ==============================
const selectedDate = ref(new Date());
const showPopup = ref(false);
const openPopup = () => { showPopup.value = true; };
const closePopup = () => { showPopup.value = false; };

// ==============================
// APPOINTMENT POPUP
// ==============================

const showAppointmentPopup = ref(false);

const openAppointmentPopup = () => {
  showAppointmentPopup.value = true;
};

const closeAppointmentPopup = () => {
  showAppointmentPopup.value = false;
};

// ==============================
// GEM POPUP
// ==============================
const gemModules = import.meta.glob(
    "/src/img/gems/*.{png,jpg,jpeg,gif,webp,JPG}",
    { eager: true }
);
const gemImages = Object.values(gemModules).map((m: any) => m.default) as string[];

const showGemPopup = ref(false);
const currentGemIndex = ref(0);
const selectedGem = ref<string>("");

const preload = (src: string) => { const i = new Image(); i.src = src; };

const openGemPopup = () => {
  if (gemImages.length > 0) {
    currentGemIndex.value = 0;
    selectedGem.value = gemImages[0];
    if (gemImages[1]) preload(gemImages[1]);
  }
  showGemPopup.value = true;
};

const closeGemPopup = () => { showGemPopup.value = false; };

const goToGem = (i: number) => {
  if (!gemImages.length) return;
  currentGemIndex.value = (i + gemImages.length) % gemImages.length;
  selectedGem.value = gemImages[currentGemIndex.value];
  const next = gemImages[(currentGemIndex.value + 1) % gemImages.length];
  const prev = gemImages[(currentGemIndex.value - 1 + gemImages.length) % gemImages.length];
  if (next) preload(next);
  if (prev) preload(prev);
};

const nextGem = () => goToGem(currentGemIndex.value + 1);
const prevGem = () => goToGem(currentGemIndex.value - 1);

// Keyboard controls
const onGemKey = (e: KeyboardEvent) => {
  if (!showGemPopup.value) return;
  if (e.key === "Escape") closeGemPopup();
  if (e.key === "ArrowRight") nextGem();
  if (e.key === "ArrowLeft") prevGem();
};
onMounted(() => { window.addEventListener("keydown", onGemKey); });
onBeforeUnmount(() => { window.removeEventListener("keydown", onGemKey); });

// Scroll lock fix
let originalOverflowGem = "";
watch(showGemPopup, (open) => {
  if (open) {
    originalOverflowGem = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = originalOverflowGem;
  }
});

// Swipe
let gemTouchX = 0;
const onGemTouchStart = (e: TouchEvent) => (gemTouchX = e.touches[0].clientX);
const onGemTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - gemTouchX;
  if (Math.abs(dx) > 50) dx < 0 ? nextGem() : prevGem();
};

// ==============================
// CLOSEUP POPUP
// ==============================
const closeupModules = import.meta.glob(
    "/src/img/closeup/*.{png,jpg,jpeg,gif,webp,JPG}",
    { eager: true }
);
const closeupImages = Object.values(closeupModules).map((m: any) => m.default) as string[];

const showCloseupPopup = ref(false);
const currentCloseupIndex = ref(0);
const selectedCloseup = ref<string>("");

const preloadCloseup = (src: string) => { const i = new Image(); i.src = src; };

const openCloseupPopup = () => {
  if (closeupImages.length > 0) {
    currentCloseupIndex.value = 0;
    selectedCloseup.value = closeupImages[0];
    if (closeupImages[1]) preloadCloseup(closeupImages[1]);
  }
  showCloseupPopup.value = true;
};

const closeCloseupPopup = () => { showCloseupPopup.value = false; };

const goToCloseup = (i: number) => {
  if (!closeupImages.length) return;
  currentCloseupIndex.value = (i + closeupImages.length) % closeupImages.length;
  selectedCloseup.value = closeupImages[currentCloseupIndex.value];
  const next = closeupImages[(currentCloseupIndex.value + 1) % closeupImages.length];
  const prev = closeupImages[(currentCloseupIndex.value - 1 + closeupImages.length) % closeupImages.length];
  if (next) preloadCloseup(next);
  if (prev) preloadCloseup(prev);
};

const nextCloseup = () => goToCloseup(currentCloseupIndex.value + 1);
const prevCloseup = () => goToCloseup(currentCloseupIndex.value - 1);

// Keyboard controls
const onCloseupKey = (e: KeyboardEvent) => {
  if (!showCloseupPopup.value) return;
  if (e.key === "Escape") closeCloseupPopup();
  if (e.key === "ArrowRight") nextCloseup();
  if (e.key === "ArrowLeft") prevCloseup();
};
onMounted(() => { window.addEventListener("keydown", onCloseupKey); });
onBeforeUnmount(() => { window.removeEventListener("keydown", onCloseupKey); });

// Scroll lock fix
let originalOverflowCloseup = "";
watch(showCloseupPopup, (open) => {
  if (open) {
    originalOverflowCloseup = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = originalOverflowCloseup;
  }
});

// Swipe
let closeupTouchX = 0;
const onCloseupTouchStart = (e: TouchEvent) => (closeupTouchX = e.touches[0].clientX);
const onCloseupTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - closeupTouchX;
  if (Math.abs(dx) > 50) dx < 0 ? nextCloseup() : prevCloseup();
};

// ==============================
// VOORWAARDEN POPUP
// ==============================
const showVoorwaardenPopup = ref(false);
const openVoorwaardenPopup = () => { showVoorwaardenPopup.value = true; };
const closeVoorwaardenPopup = () => { showVoorwaardenPopup.value = false; };

// ==============================
// RANDOM IMAGES (3 tegelijk)
// ==============================
const modules = import.meta.glob(
    "/src/img/random_image/*.{png,jpg,jpeg,gif,webp,JPG}",
    { eager: true }
);
const images = Object.values(modules).map((m: any) => m.default);
const currentImages = ref<string[]>([]);
let intervalId: number | null = null;

const pickRandomImages = () => {
  if (images.length === 0) return;
  const chosen: string[] = [];
  while (chosen.length < Math.min(3, images.length)) {
    const next = images[Math.floor(Math.random() * images.length)];
    if (!chosen.includes(next)) chosen.push(next);
  }
  currentImages.value = chosen;
};

onMounted(() => {
  pickRandomImages();
  if (images.length > 1) intervalId = window.setInterval(pickRandomImages, 2000);
});
onBeforeUnmount(() => { if (intervalId) clearInterval(intervalId); });

// ==============================
// GALLERY ITEMS
// ==============================
const galleryItems = ref([
  {
    foto: new URL('@/img/gems/IMG_6667.jpg', import.meta.url).href,
    title: "GEMISTRY GEMS",
    naam: "Ines",
    description:
        '"Ik wilde al een tijd een toothgem uitproberen. Dankzij Gemistry ben ik uit mijn comfortzone gestapt en heb ik niet alleen voor een simpele silver gekozen, maar ook voor extra kleur."',
    popup: "gem",
  },
  {
    foto: new URL('@/img/closeup/kaolo.jpg', import.meta.url).href,
    title: "CLOSE-UP VIEW",
    naam: "Chelsey",
    description:
        '"Ik had een ontwerp uitgekozen en Gemistry hielp me om de juiste maat erbij te vinden. Iedereen zijn tanden zijn anders, en dat maakt het zo fijn: het gaat hen niet alleen om het ontwerp, maar vooral om wat het beste bij jou past."',
    popup: "closeup",
  },
  {
    foto: new URL('@/img/random_image/IMG_4072.jpg', import.meta.url).href,
    title: "EVENTS",
    naam: "Club Nyx",
    description:
        "Bij Club NYX mochten wij bezoekers voorzien van subtiele crystals tot opvallende designs. Voor Club NYX was onze presence meer dan een Service het was een ervaring die bezoekers verraste, blij maakte en zorgde voor extra kijk op social media. Precies de soort beleving die een avond onvergetelijk maakt.",
    popup: "events",
  },
]);

// Card click handler
type GalleryItem = { popup?: string };
const handleCardClick = (item: GalleryItem) => {
  if (item.popup === "gem") return openGemPopup();
  if (item.popup === "closeup") return openCloseupPopup();
  if (item.popup === "events") {
    // TODO: events-popup
  }
};

// ==============================
// PRIJSLIJST
// ==============================
const categories = ref([
  {
    name: "Swarovski",
    items: [
      { label: "1 Gem", price: "€30" },
      { label: "2 Gems", price: "€40" },
      { label: "3 Gems", price: "€45" },
      { label: "4 Gems", price: "€50" },
      { label: "Extra Gem", price: "€10" },
    ],
  },
  {
    name: "Special Designs",
    items: [
      { label: "Butterfly", price: "€60" },
      { label: "Hearts*", price: "€40" },
      { label: "Full Tooth", price: "€100" },
      { label: "Window", price: "€90" },
      { label: "Fairydust", price: "€95" },
      { label: "Cherry", price: "€60" },
      { label: "Flower", price: "€50" },
      { label: "Paw", price: "€55" },
      { label: "Cross", price: "€65" },
      { label: "Custom Designs", price: "v/a €60" },
    ],
  },
  {
    name: "Deals",
    items: [
      { label: "Duo Deal (2 persons, 1 gem)", price: "€50" },
      { label: "Gemistry (2 persons, 2 gems)", price: "€70" },
      { label: "VIP Set (1 gold + 1 gem)", price: "€120" },
      { label: "Golden Duo (2 persons, 1 gold)", price: "€180" },
    ],
  },
  {
    name: "18K Real Gold",
    items: [
      {
        label: "Starts from €100 and must be pre-ordered. A €50 deposit is required.",
        price: "",
      },
    ],
  },
]);
const selectedCategory = ref(categories.value[0]);



</script>






<style scoped>
:global(html, body) {
  margin: 0;
  padding: 0;
  background: rgba(101, 26, 26, 0.2);
  font-family: Georgia, 'Times New Roman', Times, serif;
  scroll-behavior: smooth;
}

@font-face {
  font-family: 'Vogue';
  src: url('@/font/Vogue.ttf');

}



/* Pagina */
.page {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  margin: auto;
  background-color: #F2EFE8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 5px 5px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}



/* Main image */
#main_image {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/img/main/image1.jpeg");
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

#main_image_div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  opacity: 0; /* eerst verborgen */
  transform: translateX(-100px); /* startpositie */
  animation: slideIn 1.5s ease-out forwards; /* start animatie */
}

#main_image_div #image_title {
  color: #F2EFE8;
  font-size: 100px !important;
  font-family: "Vogue";
  text-align: center;
}

/* Keyframes voor insliden */
@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}


#main_image_div button {
  font-size: 24px;                /* groter lettertype */
  padding: 16px 40px;             /* grotere button */
  background: transparent;        /* geen background */
  color: #F2EFE8;                 /* tekstkleur */
  border: 2px solid #F2EFE8;      /* border in zelfde kleur */
  border-radius: 5px;             /* afgeronde hoekjes */
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

/* Hover effect */
#main_image_div button:hover {
  background: #F2EFE8;           /* vult op hover */
  color: #651A1A;                /* tekst donker */
  transform: scale(1.05);        /* lichte vergroting */
}







/* Afspraak blok */
#explore {
  padding: 30px 0 30px 0;
  background: #651A1A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 10px;
}

#explore p{
  font-size: 50px;
  margin: 0;
  color: #F2EFE8;
}



/* Gallery */
#gallery {
}
#gallery h1 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
}
.gallery-grid {
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
}
.gallery-card {
  background: #F2EFE8;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 380px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  height: 440px;
}

.gallery-card img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: 0.3s;
}
.gallery-card h3 {
  margin: 10px 12px 5px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #651a1a;
  border: 1px rgba(101, 26, 26, 0.04) solid;
  border-radius: 2px;
}


.gallery-card a {
  margin: 10px 12px 15px;
  color: #651a1a;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s

}

.gallery-card:hover {
  color: #651a1a;
  transition: 0.3s;
  transform: scale(1.1);
  font-size: 13px;
  cursor: pointer;
}

.gallery-card:hover p{
  transition: 0.3s;
  display: inline;
  transform: scale(1.02);

}

.gallery-card:hover img{
  transform: scale(1.1);
  transition: 0.3s;
  padding-bottom: 15px;
}

.gallery-card a:hover {
  cursor: pointer;
  transform: scale(1.04);
  transition: 0.3s;
}







#why_gemistry{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#why_gemistry_text{
  font-size: 20px!important;
}


#why_gemistry #post{
  display: flex;
  width: 900px;
}

#why_gemistry #post img{
  width: 50%;
  height: 50%;
}

#why_gemistry #post #post_text{
  background-color: #F2EFE8;
  width: 1000px;
  padding: 20px;
}

#why_gemistry #post #post_text #post_text_title{
  color: black;
  font-size: 40px;
}

#why_gemistry #post #post_text #post_text_text {
  color: black;
  font-size: 20px;
}






/* Gemistry family */
#gemistry_family{
  padding: 0 40px 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#gemistry_family h3{
  font-size: 35px;
}

#gemistry_family hr {
  width: 100%;      /* volle breedte */
  align-self: stretch; /* overschrijft flex-breedte */
  border: 1px solid #651A1A;
}









/* Footer */
footer {
  color: white;
  text-align: center;
  margin-top: 60px;
  font-size: 14px;

}

/* Footer Social media*/
#social_media {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 60px 40px;
  background-color: #F2EFE8;
  color: #651A1A;
}

/* Left side */
#social_media #left h3 {
  font-size: 28px;
  margin-bottom: 20px;
}

#social_media_icons {
  display: flex;
  gap: 40px; /* afstand tussen iconen */
}

#social_media_icons img {
  width: 50px;
  height: 50px;
  transition: transform 0.2s ease-in-out;
}

#social_media_icons img:hover {
  transform: scale(1.2);
  cursor: pointer;
}

/* Right side */
#social_media #right img {
  width: 300px;
  border-radius: 8px;
  object-fit: cover;
}

/* Footer legal */
#footer_legal {
  background-color: #651A1A;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}

#footer #contact button{


}


/* ======= GEM POPUP ======= */
.gem-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.gem-modal {
  background: #651A1A;
  border-radius: 10px;
  padding: 20px;
  width: 95%;
  max-width: 800px;
  height: 45vh;
  color: #f2efe8;
}
.gem-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 26px;
  background: none;
  border: none;
  cursor: pointer;
}
.gem-close:hover { transform: scale(1.06); }

.gem-header {
  padding: 20px 26px 10px;
}
.gem-header h2 {
  margin: 0;
  font-family: "Vogue", Georgia, serif;
  font-size: clamp(28px, 3.2vw, 40px);
  letter-spacing: .5px;
}
.gem-divider {
  margin-top: 12px;
  height: 1px;
  background: rgba(242,239,232,.5);
}

.gem-body {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
  padding: 20px 24px 24px;
  overflow: hidden;
}
.gem-copy {
  overflow-y: auto;
  padding-right: 6px;
}
.gem-copy p {
  line-height: 1.6;
  font-size: 15.5px;
  margin: 0 0 14px;
}
.gem-cta-wrap { margin-top: 18px; }
.gem-cta {
  border: 1.5px solid #F2EFE8;
  background: transparent;
  color: #F2EFE8;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: .4px;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, transform .15s ease;
}
.gem-cta:hover { background: #F2EFE8; color: #651A1A; transform: translateY(-1px); }

/* GEM & CLOSEUP POPUP IMAGE */
.gem-image-wrap {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #3b0f0f;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.gem-image {
  width: 100%;
  aspect-ratio: 1 / 1;   /* 👈 altijd vierkant */
  object-fit: cover;     /* 👈 vult vierkant volledig */
  border-radius: 8px;
}


.gem-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px; height: 46px;
  display: grid; place-items: center;
  background: rgba(0,0,0,.35);
  color: #F2EFE8;
  border: 1px solid rgba(242,239,232,.35);
  border-radius: 999px;
  cursor: pointer;
  transition: transform .15s ease, background .15s ease;
}
.gem-nav:hover { transform: translateY(-50%) scale(1.06); background: rgba(0,0,0,.5); }
.gem-prev { left: 12px; }
.gem-next { right: 12px; }

.gem-dots {
  position: absolute;
  bottom: 10px; left: 0; right: 0;
  display: flex; gap: 6px; justify-content: center;
}
.gem-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,.45);
  cursor: pointer;
  transition: transform .15s ease, background .15s ease;
}
.gem-dot.active { background: #F2EFE8; transform: scale(1.15); }

@media (max-width: 900px) {
  .gem-body { grid-template-columns: 1fr; gap: 16px; }
  .gem-image { max-height: 50vh; }
}


/* ======= APPOINTMENT POPUP ======= */
#appointment-popup .appointment-modal {
  width: min(1100px, 96vw);
  height: 80vh;                 /* vaste hoogte */
  background: #651A1A;
  color: #F2EFE8;
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0,0,0,.35);
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Header */
#appointment-popup .gem-header {
  padding: 20px 26px 10px;
}
#appointment-popup .gem-header h2 {
  margin: 0;
  font-family: "Vogue", Georgia, serif;
  font-size: clamp(28px, 3.2vw, 40px);
  letter-spacing: .5px;
}
#appointment-popup .gem-divider {
  margin-top: 12px;
  height: 1px;
  background: rgba(242,239,232,.5);
}

/* Body */
#appointment-popup .gem-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 24px 24px;
  overflow-y: auto;
}
#appointment-popup p {
  line-height: 1.6;
  font-size: 15.5px;
  margin: 0 0 14px;
  flex-shrink: 0;
}

/* Close button */
#appointment-popup .gem-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 44px; height: 44px;
  border: 1px solid rgba(242,239,232,.35);
  border-radius: 999px;
  background: transparent;
  color: #F2EFE8;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  transition: transform .15s ease;
}
#appointment-popup .gem-close:hover {
  transform: scale(1.06);
}

/* Calendly widget */
#appointment-popup .calendly-inline-widget {
  flex: 1;
  border-radius: 10px;
  height: 100% !important;  /* vult netjes de 45vh */
  overflow: hidden !important;
}





</style>
