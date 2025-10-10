<template>
  <div class="page">
    <!-- HEADER -->
    <!-- (ongewijzigd, jouw originele header-structuur kan erboven zitten) -->

    <main class="content">
      <!-- RANDOM IMAGES -->
      <div id="main_image">
        <div id="main_image_div">
          <p id="image_title">Your smile, your color,<br> your vibe.</p>
          <a href="/services"><button class="gem-cta">MAAK EEN AFSPRAAK</button></a>
        </div>
      </div>

      <!-- EXPLORE -->
      <div id="explore"><br>
        <p>Explore by category</p>
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

        <hr style="width: 100%; padding: 0 10px 0 10px">

        <div id="why_gemistry">
          <p id="why_gemistry_title">Why Gemistry?</p>
          <br>
          <p id="why_gemistry_text">
            AT GEMISTRY IT’S ABOUT SAFE & QUALITY TOOTHGEMS, BUT<br>
            ALSO ABOUT ENERGY, CREATIVITY AND COMMUNITY. EVERY SMILE WE<br>
            TOUCH TELLS A STORY
          </p>
          <br><br>
          <hr style="border: 1px #F2EFE8 solid; width: 100%">
        </div>
      </div>

      <!-- ✅ NIEUWE BLOG SLIDER MET POPUP -->
      <div class="blog-slider">
        <button class="nav prev" @click="prevPost">‹</button>

        <div
            class="post"
            v-for="(post, i) in visiblePosts"
            :key="i"
            @click="openBlogPopup(post)"
        >
          <div class="post-image">
            <img :src="post.images[0]" alt="blog cover image" />
          </div>


          <div class="post-text">
            <p class="post-title">{{ post.title }}</p>
            <p class="post-body">{{ post.text }}</p>
            <small>{{ post.date }}</small>
          </div>
        </div>

        <button class="nav next" @click="nextPost">›</button>
      </div>

      <!-- BLOG POPUP -->
      <div
          v-if="showBlogPopup"
          class="blog-modal-overlay"
          @click.self="closeBlogPopup"
      >
        <div class="blog-modal">
          <button class="blog-close" @click="closeBlogPopup">×</button>

          <div class="blog-slider-popup">
            <img
                :src="selectedPost.images[currentImageIndex]"
                alt="Popup image"
                class="popup-img"
            />

            <button class="popup-nav left" @click="prevImage">‹</button>
            <button class="popup-nav right" @click="nextImage">›</button>

            <div class="popup-dots">
        <span
            v-for="(img, i) in selectedPost.images"
            :key="i"
            class="dot"
            :class="{ active: i === currentImageIndex }"
            @click="goToImage(i)"
        ></span>
            </div>
          </div>

          <div class="blog-info">
            <h2>{{ selectedPost.title }}</h2>
            <p class="date">{{ selectedPost.date }}</p>
            <p class="text">{{ selectedPost.text }}</p>
            <p class="extra">{{ selectedPost.extra }}</p>
          </div>
        </div>
      </div>


      <br><br>

      <div id="gemistry_family">
        <hr>
      </div>
    </main>

    <footer>
      <div id="social_media">
        <div id="left">
          <h3>Already following up?</h3>
          <div id="social_media_icons">
            <a href="https://www.instagram.com/gemistry.ams/" target="_blank">
              <img src="../assets/img/icons/insta_icon.png" alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@gemistry" target="_blank">
              <img src="../assets/img/icons/tiktok_icon.png" alt="TikTok" />
            </a>
          </div>

          <div id="contact_us">
            <h2>Contact Us</h2>
            <p><strong>Email</strong><br>gemistrynl@gmail.com</p>

            <div class="contact-columns">
              <div class="contact-col">
                <p><strong>Phone</strong><br>+31 658965703</p>

                <p><strong>Didi Zeilstra</strong><br />KvK: 97986178<br /></p>
              </div>
              <div class="contact-col"></div>
              <div class="contact-col">
                <p><strong>Address</strong><br>Amsterdam Zuid</p>
                <p><strong>Dean Davies</strong><br />KvK: 98163221<br /></p>
              </div>
            </div>
            <p style="margin-top:20px;">
              Voor samenwerkingen of meer informatie mail naar:
              <b><a href="mailto:gemistrynl@gmail.com" style="text-decoration: none; color: #651A1A;">gemistrynl@gmail.com</a></b>
            </p>
          </div>
        </div>
      </div>

      <div id="footer_legal">
        <p>
          <span @click="openPrivacyPopup">Privacy policy</span> |
          <span @click="openVoorwaardenPopup">Algemene voorwaarden</span>
        </p>
        <p>© 2025 Gemistry. Alle rechten voorbehouden.</p>
      </div>
    </footer>

    <!-- === ALGEMENE VOORWAARDEN POPUP === -->
    <transition name="popup-fade">
      <div v-if="showVoorwaardenPopup" class="gem-modal-overlay" @click.self="closeVoorwaardenPopup">
        <div class="voorwaarden-modal">
          <button class="gem-close" @click="closeVoorwaardenPopup">×</button>
          <div class="voorwaarden-header">
            <h2>Algemene voorwaarden</h2>
            <div class="gem-divider"></div>
          </div>

          <div class="voorwaarden-content">
            <p><strong>Algemene voorwaarden Gemistry.</strong></p>
            <p>
              Deze algemene voorwaarden zijn van toepassing op alle afspraken en behandelingen bij
              Gemistry. Door een afspraak te maken bij Gemistry gaat de klant akkoord met deze
              voorwaarden.
            </p>

            <h3>Gezondheid & verantwoordelijkheid</h3>
            <p>
              De klant is zelf verantwoordelijk voor het correct en volledig invullen van het intakeformulier.
              Behandelingen worden niet uitgevoerd bij slechte mondgezondheid, losse tanden,
              tandvleesproblemen of medische aandoeningen die risico’s kunnen opleveren. Gemistry
              plaatst geen toothgems bij klanten jonger dan 16 jaar zonder toestemming van een ouder of
              voogd.
            </p>

            <h3>Voorbereiding & nazorg</h3>
            <p>
              Klanten dienen met gepoetste tanden op de afspraak te verschijnen. Na de behandeling
              mogen gedurende 24 uur geen harde of kleverige etenswaren genuttigd worden. Gemistry is
              niet aansprakelijk voor verlies of beschadiging van de gem door onvoldoende nazorg of het
              niet opvolgen van de adviezen.
            </p>

            <h3>Duur & resultaat</h3>
            <p>
              Toothgems zijn een semi-permanente behandeling: de duur varieert van enkele maanden tot
              jaren. Gemistry kan geen garantie geven op de exacte draagtijd, aangezien dit afhankelijk is
              van mondhygiëne en leefstijl.
            </p>

            <h3>Aansprakelijkheid</h3>
            <p>
              Gemistry werkt uitsluitend met veilige en professionele materialen, waaronder Swarovski
              kristallen en 18k goud. Er wordt zorgvuldig gewerkt, maar Gemistry is niet aansprakelijk voor
              schade die ontstaat door oneigenlijk gebruik, eigenhandig verwijderen van de gem of
              onderliggende tandproblemen.
            </p>

            <h3>Betaling & annulering</h3>
            <p>
              Voor iedere afspraak wordt een aanbetaling gevraagd. Deze aanbetaling bedraagt 50% van
              het totaalbedrag bij alle gems of custom designs. De aanbetaling wordt verrekend met het
              totaalbedrag op de dag van de afspraak. Bij annulering binnen 24 uur voor de afspraak of bij
              niet verschijnen vervalt de aanbetaling. Annuleert de klant eerder dan 24 uur voor de
              afspraak, dan wordt de aanbetaling teruggestort.
            </p>
            <p>
              Klanten wordt verzocht op tijd aanwezig te zijn. Bij meer dan 10 minuten te laat kan de
              afspraak worden geannuleerd om het dagschema niet te verstoren. In dat geval vervalt de
              aanbetaling. Alleen indien de agenda dit toelaat, kan de behandeling doorgaan. Hierbij
              kunnen extra kosten in rekening worden gebracht.
            </p>

            <h3>Events</h3>
            <p>
              Tijdens evenementen gelden aangepaste prijzen. Custom designs zijn afhankelijk van
              beschikbaarheid en kunnen bij drukte beperkt zijn. Gemistry behoudt zich het recht voor om
              een behandeling te weigeren indien dit niet veilig of haalbaar is binnen de eventsetting.
            </p>

            <h3>Foto en videomateriaal</h3>
            <p>
              Gemistry kan tijdens afspraken en evenementen foto’s of video’s maken van het resultaat
              van de behandeling. Dit materiaal kan worden gebruikt voor promotionele doeleinden, zoals
              op de website, sociale media en marketinguitingen van Gemistry.
            </p>
            <p>
              Indien de klant niet zichtbaar in beeld wil komen, kan dit voorafgaand aan de behandeling
              worden aangegeven. In dat geval worden uitsluitend detailfoto’s van de tanden en het
              geplaatste design gebruikt, zonder dat het gezicht herkenbaar in beeld komt.
            </p>

            <h3>Overig</h3>
            <p>
              Persoonlijke gegevens worden uitsluitend gebruikt voor communicatie rondom afspraken en
              worden vertrouwelijk behandeld. Door akkoord te gaan met deze voorwaarden bevestigt de
              klant dat hij of zij begrijpt dat een toothgem een cosmetische en tijdelijke toevoeging is.
            </p>
          </div>
        </div>
      </div>
    </transition>

    <!-- === PRIVACY POLICY POPUP === -->
    <transition name="popup-fade">
      <div v-if="showPrivacyPopup" class="gem-modal-overlay" @click.self="closePrivacyPopup">
        <div class="voorwaarden-modal">
          <button class="gem-close" @click="closePrivacyPopup">×</button>
          <div class="voorwaarden-header">
            <h2>Privacy Policy</h2>
            <div class="gem-divider"></div>
          </div>

          <div class="voorwaarden-content">
            <p>
              Wij hechten veel waarde aan uw privacy. Gemistry verwerkt uw gegevens uitsluitend om afspraken te beheren en contact te onderhouden.
              Wij delen geen persoonlijke gegevens met derden, tenzij dit noodzakelijk is voor de uitvoering van onze diensten of wettelijk verplicht is.
            </p>
            <p>
              Uw gegevens worden zorgvuldig bewaard en uitsluitend gebruikt voor communicatie rondom afspraken of promoties waarvoor u toestemming heeft gegeven.
            </p>
            <p>
              Voor vragen over ons privacybeleid kunt u contact opnemen via <b>gemistrynl@gmail.com</b>.
            </p>
          </div>
        </div>
      </div>
    </transition>




    <!-- === GEMISTRY GEM POPUP === -->
    <div v-if="showGemPopup" class="gem-modal-overlay" @click.self="closeGemPopup">
      <div class="gem-modal">
        <div class="gem-header">
          <h2>Gemistry’s gems.</h2>
          <button class="gem-close" @click="closeGemPopup" aria-label="Sluiten">×</button>
        </div>

        <div class="gem-divider"></div>

        <div class="gem-body">
          <div class="gem-copy">
            <p>Onze klanten en modellen zijn het hart van ons
              merk. Iedere glimlach die we vastleggen vertelt
              een verhaal. Van subtiel en speels tot opvallend
              en uniek. Wij gaan altijd tot het uiterste om een
              resultaat neer te zetten dat niet alleen straalt,
              maar ook past bij de persoonlijkheid van degene
              die het draagt.
              We zijn continu op zoek naar mensen die ons merk
              willen vertegenwoordigen en onderdeel willen
              worden van de Gemistry fam. Door samen te
              werken met modellen en creators kunnen we laten
              zien dat toothgems meer zijn dan een accessoire,
              het is een lifestyle, een vibe, een statement.
              Een deel van onze foto’s is prachtig vastgelegd
              door @wendi.regelt op Instagram. Haar oog voor
              detail en stijl helpt ons om de energie van
              Gemistry tot leven te brengen.</p>
            <p class="gem-cta-wrap">
              <a href="/services"><button class="gem-cta">MAAK EEN AFSPRAAK</button></a>
            </p>
          </div>

          <div class="gem-image-wrap">
            <img :src="selectedGem" alt="Gemistry gallery image" class="gem-image" />
            <div id="gem-image-wrap-nav">
              <button class="gem-nav gem-prev" @click="prevGem" aria-label="Vorige">‹</button>
              <button class="gem-nav gem-next" @click="nextGem" aria-label="Volgende">›</button>
            </div>

          </div>
        </div>

        <div class="gem-dots">
      <span
          v-for="(g, i) in gemImages"
          :key="g"
          class="gem-dot"
          :class="{ active: i === currentGemIndex }"
          @click="goToGem(i)"
      ></span>
        </div>
      </div>
    </div>

    <!-- === CLOSE-UP VIEW POPUP === -->
    <div v-if="showCloseupPopup" class="gem-modal-overlay" @click.self="closeCloseupPopup">
      <div class="gem-modal">
        <div class="gem-header">
          <h2>Close-up view</h2>
          <button class="gem-close" @click="closeCloseupPopup" aria-label="Sluiten">×</button>
        </div>

        <div class="gem-divider"></div>

        <div class="gem-body">
          <div class="gem-copy">
            <p>
              Details make the difference. Hier vind je close-upfoto’s van onze toothgems.
              Elk design is met zorg geplaatst, van subtiele Swarovski kristallen tot opvallende
              custom creaties en 18k gouden accenten. Close-ups laten zien waar Gemistry
              voor staat — precisie, hygiëne en creativiteit.
            </p>
          </div>

          <div class="gem-image-wrap">
            <img :src="selectedCloseup" alt="Close-up gallery image" class="gem-image" />
            <div id="gem-image-wrap-nav">
              <button class="gem-nav gem-prev" @click="prevCloseup" aria-label="Vorige">‹</button>
              <button class="gem-nav gem-next" @click="nextCloseup" aria-label="Volgende">›</button>
            </div>
          </div>
        </div>

        <div class="gem-dots">
      <span
          v-for="(c, i) in closeupImages"
          :key="c"
          class="gem-dot"
          :class="{ active: i === currentCloseupIndex }"
          @click="goToCloseup(i)"
      ></span>
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
      <div class="appointment-modal">
        <button class="gem-close" @click="closeAppointmentPopup" aria-label="Sluiten">×</button>
        <div class="gem-header">
          <h2>Plan een afspraak</h2>
          <div class="gem-divider"></div>
        </div>
        <div class="gem-body">
          <p>Kies hieronder eenvoudig een tijdslot dat jou het beste uitkomt.</p>
          <div class="calendly-inline-widget" data-url="https://calendly.com/gemistrynl/2-gems"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";

// ==============================
// DATE PICKER
// ==============================
const selectedDate = ref(new Date());
const showPopup = ref(false);
const openPopup = () => { showPopup.value = true; };
const closePopup = () => { showPopup.value = false; };

// ==============================
// POPUP STATES
// ==============================
const showAppointmentPopup = ref(false);
const showGemPopup = ref(false);
const showCloseupPopup = ref(false);
const showVoorwaardenPopup = ref(false);

// ==============================
// Scroll lock helpers
// ==============================
function lockScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = scrollBarWidth + "px";
  }
}
function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

watch([showAppointmentPopup, showGemPopup, showCloseupPopup, showVoorwaardenPopup], (states) => {
  if (states.some(Boolean)) lockScroll();
  else unlockScroll();
});

// ==============================
// APPOINTMENT POPUP
// ==============================
const openAppointmentPopup = () => { showAppointmentPopup.value = true; };
const closeAppointmentPopup = () => { showAppointmentPopup.value = false; };

// ==============================
// GEM POPUP
// ==============================
const gemModules = import.meta.glob(
    "@/desktop/assets/img/gems/*.{png,jpg,jpeg,gif,webp,JPG}",
    { eager: true }
);
const gemImages = Object.values(gemModules).map((m: any) => m.default) as string[];

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

// ==============================
// CLOSEUP POPUP
// ==============================
const closeupModules = import.meta.glob(
    "@/desktop/assets/img/closeup/*.{png,jpg,jpeg,gif,webp,JPG}",
    { eager: true }
);
const closeupImages = Object.values(closeupModules).map((m: any) => m.default) as string[];

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

// ==============================
// RANDOM IMAGES (3 tegelijk)
// ==============================
const modules = import.meta.glob(
    "@/desktop/assets/img/random_image/*.{png,jpg,jpeg,gif,webp,JPG}",
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
    foto: new URL('@/desktop/assets/img/gems/IMG_6667.jpg', import.meta.url).href,
    title: "GEMISTRY GEMS",
    naam: "Ines",
    description: '"Ik wilde al een tijd een toothgem uitproberen..."',
    popup: "gem",
  },
  {
    foto: new URL('@/desktop/assets/img/closeup/kaolo.JPG', import.meta.url).href,
    title: "CLOSE-UP VIEW",
    naam: "Chelsey",
    description: '"Ik had een ontwerp uitgekozen..."',
    popup: "closeup",
  },
  {
    foto: new URL('@/desktop/assets/img/random_image/IMG_4072.jpg', import.meta.url).href,
    title: "EVENTS",
    naam: "Club Nyx",
    description: "Bij Club NYX mochten wij bezoekers voorzien...",
    popup: "events",
  },
]);

type GalleryItem = { popup?: string };
const handleCardClick = (item: GalleryItem) => {
  if (item.popup === "gem") return openGemPopup();
  if (item.popup === "closeup") return openCloseupPopup();
  if (item.popup === "events") {
    // TODO: events-popup
  }
};

// ==============================
// BLOGPOSTS – Dynamisch laden uit /assets/blog/
// ==============================
interface BlogPost {
  title: string;
  text: string;
  date: string;
  images: string[];
  extra?: string;
}

const blogPosts = ref<BlogPost[]>([]);

// Zoek naar alle post.json-bestanden in /assets/blog/
const blogFolders = import.meta.glob(
    "@/desktop/assets/blog/*/post.json",
    { eager: true, import: "default" }
);

for (const path in blogFolders) {
  const folder = path.replace("/post.json", "");
  const postData = blogFolders[path] as Omit<BlogPost, "images">;

  // hoofdafbeelding (main.jpg)
  const mainImg = new URL(`${folder}/main.jpg`, import.meta.url).href;

  // alle galerij-afbeeldingen (gallery/)
// Laad ALLE galerij-afbeeldingen in één keer
  const galleryModules = import.meta.glob(
      "@/desktop/assets/blog/**/gallery/*.{jpg,jpeg,png,webp,JPG}",
      { eager: true }
  );

  for (const path in blogFolders) {
    const folder = path.replace("/post.json", "");
    const postData = blogFolders[path] as Omit<BlogPost, "images">;

    // hoofdafbeelding
    const mainImg = new URL(`${folder}/main.jpg`, import.meta.url).href;

    // filter galerij-afbeeldingen voor dit specifieke folderpad
    const galleryImages = Object.entries(galleryModules)
        .filter(([imgPath]) => imgPath.startsWith(folder))
        .map(([_, mod]: any) => mod.default);

    blogPosts.value.push({
      ...postData,
      images: [mainImg, ...galleryImages],
    });
  }



}

// optioneel sorteren op datum
blogPosts.value.sort((a, b) => (a.date < b.date ? 1 : -1));

// ==============================
// BLOG SLIDER
// ==============================
const currentIndex = ref(0);
const visiblePosts = computed(() => [blogPosts.value[currentIndex.value]]);

function nextPost() {
  if (blogPosts.value.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % blogPosts.value.length;
}
function prevPost() {
  if (blogPosts.value.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + blogPosts.value.length) % blogPosts.value.length;
}

// ==============================
// BLOG POPUP STATE
// ==============================
const showBlogPopup = ref(false);
const selectedPost = ref<BlogPost>({} as BlogPost);
const currentImageIndex = ref(0);

function openBlogPopup(post: BlogPost) {
  selectedPost.value = post;
  currentImageIndex.value = 0;
  showBlogPopup.value = true;
}
function closeBlogPopup() {
  showBlogPopup.value = false;
}

function nextImage() {
  if (!selectedPost.value.images) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % selectedPost.value.images.length;
}
function prevImage() {
  if (!selectedPost.value.images) return;
  currentImageIndex.value =
      (currentImageIndex.value - 1 + selectedPost.value.images.length) %
      selectedPost.value.images.length;
}
function goToImage(i: number) {
  currentImageIndex.value = i;
}

const showPrivacyPopup = ref(false);

const openVoorwaardenPopup = () => (showVoorwaardenPopup.value = true);
const closeVoorwaardenPopup = () => (showVoorwaardenPopup.value = false);
const openPrivacyPopup = () => (showPrivacyPopup.value = true);
const closePrivacyPopup = () => (showPrivacyPopup.value = false);

/* Scroll lock bij open modals */
watch([showVoorwaardenPopup, showPrivacyPopup], (states) => {
  if (states.some(Boolean)) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "";
});
</script>





<style scoped>

/* ==========================================================
   🌍 GLOBAL SETTINGS
========================================================== */
:global(html, body) {
  margin: 0;
  padding: 0;
  background: rgba(101, 26, 26, 0.2);
  font-family: Georgia, 'Times New Roman', Times, serif;
  scroll-behavior: smooth;
}

@font-face {
  font-family: 'Vogue';
  src: url('@/desktop/assets/font/Vogue.ttf');
}

/* ==========================================================
   🧱 PAGE LAYOUT
========================================================== */
.page {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  margin: auto;
  background-color: #F2EFE8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

/* ==========================================================
   🖼️ MAIN IMAGE SECTION
========================================================== */
#main_image {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/img/main/image1.jpeg");
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
  opacity: 0;
  transform: translateX(-100px);
  animation: slideIn 1.5s ease-out forwards;
}

#main_image_div #image_title {
  color: #F2EFE8;
  font-size: 100px !important;
  font-family: "Vogue";
  text-align: center;
}

#main_image_div button {
  font-size: 24px;
  padding: 16px 40px;
  background: transparent;
  color: #F2EFE8;
  border: 2px solid #F2EFE8;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

#main_image_div button:hover {
  background: #F2EFE8;
  color: #651A1A;
  transform: scale(1.05);
}

/* ==========================================================
   🔎 EXPLORE SECTION
========================================================== */
#explore {
  padding: 30px 0;
  background: #651A1A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 10px;
}

#explore p {
  font-size: 50px;
  margin: 0;
  color: #F2EFE8;
}

/* ==========================================================
   🖼️ GALLERY GRID
========================================================== */
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
  height: 440px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
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

.gallery-card:hover {
  transform: scale(1.1);
  cursor: pointer;
}

/* ==========================================================
   💎 WHY GEMISTRY
========================================================== */
#why_gemistry {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#why_gemistry_text {
  font-size: 20px !important;
}

/* ==========================================================
   👨‍👩‍👧 GEMISTRY FAMILY
========================================================== */
#gemistry_family {
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#gemistry_family h3 {
  font-size: 35px;
}

#gemistry_family hr {
  width: 100%;
  align-self: stretch;
  border: 1px solid #651A1A;
}

/* ==========================================================
   🦶 FOOTER SECTION
========================================================== */

/* --- General --- */
footer {
  background: #f2efe8;
  color: #651a1a;
  text-align: center;
  font-family: 'Didot', 'Playfair Display', 'Georgia', serif;
}

/* --- Social Media --- */
#social_media {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#social_media h3 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #651a1a;
}

#social_media_icons {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 32px;
}

#social_media_icons img {
  width: 58px;
  height: 58px;
  object-fit: contain;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

#social_media_icons img:hover {
  transform: scale(1.1);
}

/* --- Contact Section --- */
#contact_us {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0 50px;
  border-top: 1px solid rgba(101, 26, 26, 0.15);
}

#contact_us h2 {
  font-size: 24px;
  font-weight: 700;
  color: #651a1a;
  margin: 30px 0 20px;
}

#contact_us p {
  font-size: 16px;
  color: #4a3b3b;
  line-height: 1.6;
  margin: 8px 0;
}

#contact_us strong {
  color: #651a1a;
  font-weight: 700;
}

#contact_us a {
  color: #651a1a;
  text-decoration: underline;
  transition: 0.3s ease;
}

#contact_us a:hover {
  color: #a42c2c;
  text-decoration-color: #a42c2c;
}

/* --- Contact Columns --- */
.contact-columns {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

@media (min-width: 768px) {
  .contact-columns {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }
}

/* --- Legal Bar --- */
#footer_legal {
  background: #651a1a;
  color: #f2efe8;
  padding: 24px 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  border-top: 3px solid #501313;
  letter-spacing: 0.3px;
}

#footer_legal p {
  margin: 6px 0;
}

#footer_legal span {
  text-decoration: underline;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

#footer_legal span:hover {
  color: #fff;
}

#footer_legal span::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #f2efe8;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

#footer_legal span:hover::after {
  transform: scaleX(1);
}

/* ==========================================================
   💬 MODALS (Gemistry, Terms, Appointment, Blog)
========================================================== */

/* --- Overlay --- */
.gem-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

/* --- Algemene voorwaarden / privacy modals --- */
.voorwaarden-modal {
  background: #fdfdfd;
  border-radius: 18px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  max-width: 900px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 40px 50px;
  position: relative;
  color: #333;
  animation: popupSlide 0.4s ease;
}

.voorwaarden-header {
  text-align: center;
  margin-bottom: 20px;
}

.voorwaarden-header h2 {
  font-size: 28px;
  color: #651a1a;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0;
}

.gem-divider {
  width: 60px;
  height: 3px;
  background: #f2efe8;
  margin: 12px 0 20px 0;
  border-radius: 2px;
}

.voorwaarden-content {
  font-size: 16px;
  line-height: 1.7;
  text-align: left;
  max-height: 65vh;
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding-right: 10px;
}

/* Scrollbar verborgen */
.voorwaarden-content::-webkit-scrollbar { width: 0; background: transparent; }
.voorwaarden-content { scrollbar-width: none; -ms-overflow-style: none; }
.voorwaarden-content::-webkit-scrollbar-thumb { background: transparent; }

/* --- Tekststructuur --- */
.voorwaarden-content h3 {
  margin-top: 20px;
  color: #651a1a;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 700;
}
.voorwaarden-content p { margin: 10px 0; }

/* --- GEM POPUP ALGEMEEN --- */
.gem-modal {
  background: #651A1A;
  border-radius: 14px;
  padding: 32px;
  width: 95%;
  max-width: 950px;
  color: #f2efe8;
  animation: fadeIn 0.4s ease-out;
  box-shadow: 0 10px 40px rgba(0,0,0,0.35);
  position: relative;
}

.gem-header {
  text-align: left;
  margin-bottom: 10px;
}

.gem-header h2 {
  font-size: 30px;
  font-weight: 700;
  color: #f2efe8;
  margin: 0;
}

/* --- Body layout --- */
.gem-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

/* --- Tekstdeel links --- */
.gem-copy {
  flex: 1;
  min-width: 260px;
}

.gem-copy p {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 14px;
}

.gem-cta {
  background: #f2efe8;
  color: #651A1A;
  border: none;
  padding: 10px 22px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.gem-cta:hover {
  background: #fff;
  transform: scale(1.05);
}

/* --- Afbeelding rechts --- */
.gem-image-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.gem-image-wrap img {
  width: 100%;
  max-width: 360px;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

/* --- Navigatiepijlen --- */
.gem-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 0, 0.9);
  color: #000;
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 5;
}

.gem-nav:hover {
  background: rgba(255, 255, 0, 1);
  transform: translateY(-50%) scale(1.1);
}

.gem-prev {
  left: -20px;
}

.gem-next {
  right: -20px;
}

/* --- Sluitknop --- */
.gem-close {
  position: absolute;
  right: 20px;
  top: 18px;
  font-size: 34px;
  background: none;
  border: none;
  color: #f2efe8;
  cursor: pointer;
  transition: color 0.2s ease;
  line-height: 1;
}
.gem-close:hover { color: #fff; }

/* --- Responsive --- */
@media (max-width: 768px) {
  .gem-body {
    flex-direction: column;
    align-items: center;
  }

  .gem-image-wrap img {
    max-width: 80%;
  }

  .gem-nav {
    width: 34px;
    height: 34px;
    font-size: 20px;
  }

  .gem-prev { left: 6px; }
  .gem-next { right: 6px; }

  .gem-divider {
    margin: 10px auto 20px auto;
  }

  .gem-header { text-align: center; }
}


/* ==========================================================
   🕑 APPOINTMENT POPUP
========================================================== */
#appointment-popup .appointment-modal {
  width: min(1100px, 96vw);
  height: 80vh;
  background: #651A1A;
  color: #F2EFE8;
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .35);
  display: flex;
  flex-direction: column;
  position: relative;
}

/* ==========================================================
   📰 BLOG SECTION & POPUPS
========================================================== */
.blog-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 40px;
}

.post {
  display: flex;
  background: #f2efe8;
  width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

/* Hover effecten */
.post:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.post:hover .post-image img {
  transform: scale(1.08);
  filter: brightness(0.85);
  transition: transform 0.4s ease, filter 0.4s ease;
}
.post:hover::after {
  opacity: 1;
}
.post:hover .post-text {
  color: #111;
}

/* Overlay effect */
.post::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.25));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 6px;
}

.post-image {
  flex: 0 0 50%;
  height: 100%;
  overflow: hidden;
}
.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s;
}

.post-text {
  flex: 1;
  padding: 20px !important;
  text-align: left;
  color: #333 !important;
}

.post-title {
  font-size: 39px !important;
  font-weight: bold;
  color: #000 !important;
}

.post-body {
  font-size: 18px;
  color: #333;
  margin: 15px 0;
}

/* Navigatie knoppen */
.nav {
  background: #651a1a;
  color: white;
  border: none;
  font-size: 32px;
  cursor: pointer;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  transition: 0.2s;
}
.nav:hover { background: #8a2a2a; }

/* --- Blog Popup --- */
.blog-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.blog-modal {
  background: #fff;
  border-radius: 12px;
  max-width: 900px;
  width: 90%;
  overflow: hidden;
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.blog-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}

/* --- Slideshow binnen blog popup --- */
.blog-slider-popup {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  background-color: #000;
}

.popup-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease-in-out;
}

/* --- Navigatiepijlen --- */
.popup-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 28px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.popup-nav:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.05);
}
.popup-nav.left { left: 12px; }
.popup-nav.right { right: 12px; }

/* --- Bolletjes indicatoren --- */
.popup-dots {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.dot.active {
  background: #fff;
  transform: scale(1.2);
}

/* --- Blog info binnen popup --- */
.blog-info {
  padding: 28px;
  background: #fff;
  color: #333;
}
.blog-info h2 {
  color: #651a1a;
  font-size: 32px;
  margin-bottom: 8px;
}
.blog-info .date {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}
.blog-info .text {
  font-size: 18px;
  line-height: 1.6;
}
.blog-info .extra {
  font-size: 16px;
  margin-top: 12px;
  color: #444;
}

/* ==========================================================
   ⚙️ ANIMATIONS
========================================================== */
@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes popupSlide {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Vue transitions */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.35s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}


</style>

