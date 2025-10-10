<template>
  <div class="page">
    <main class="content">
      <!-- MAIN IMAGE -->
      <transition name="main-text" appear>
        <div id="main_image" v-if="showTitle">
          <div id="main_image_div">
            <transition name="main-text" appear>
              <p v-if="showTitle" id="image_title">Your smile, your vibe,<br /> your color.</p>
            </transition>
            <transition name="main-text" appear>
              <a href="/services"><button class="gem-cta">MAAK EEN AFSPRAAK</button></a>
            </transition>
          </div>
        </div>
      </transition>

      <!-- EXPLORE -->
      <div id="explore">
        <p>Explore by category</p>
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

        <hr style="width: 100%; border: 1px solid #f2efe8" />

        <!-- WHY GEMISTRY -->
        <div id="why_gemistry">
          <p id="why_gemistry_title">Why Gemistry?</p>
          <p id="why_gemistry_text">
            AT GEMISTRY IT’S ABOUT SAFE & QUALITY TOOTHGEMS, BUT<br />
            ALSO ABOUT ENERGY, CREATIVITY AND COMMUNITY.<br />
            EVERY SMILE WE TOUCH TELLS A STORY.
          </p>
          <hr style="border: 1px solid #f2efe8; width: 100%" />
        </div>
      </div>

      <!-- BLOG SLIDER -->
      <div
          class="blog-slider"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
      >
        <button class="nav prev" @click="prevPost">‹</button>

        <transition name="blog-fade" mode="out-in">
          <div
              class="post"
              :key="blogPosts[currentIndex].title"
              @click="openBlogPopup(blogPosts[currentIndex])"
          >
            <div class="post-image">
              <img :src="blogPosts[currentIndex].images[0]" alt="blog image" />
            </div>
            <div class="post-text">
              <p class="post-title">{{ blogPosts[currentIndex].title }}</p>
              <p class="post-body">{{ blogPosts[currentIndex].text }}</p>
              <small>{{ blogPosts[currentIndex].date }}</small>
            </div>
          </div>
        </transition>

        <button class="nav next" @click="nextPost">›</button>
      </div>


      <div id="gemistry_family">
        <hr />
      </div>
    </main>

    <!-- FOOTER -->
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
            <div class="contact-columns">
              <div class="contact-col">
                <p><strong>Email</strong><br />gemistrynl@gmail.com</p>
                <p><strong>Address</strong><br />Amsterdam Zuid</p>
              </div>
              <div class="contact-col">
                <p><strong>Didi Zeilstra</strong><br />KvK: 97986178<br /></p>
                <p><strong>Dean Davies</strong><br />KvK: 98163221<br /></p>
              </div>
            </div>
            <p style="margin-top: 20px">
              Voor samenwerkingen of meer informatie mail naar:
              <a href="mailto:gemistrynl@gmail.com">gemistrynl@gmail.com</a>
            </p>
          </div>
        </div>
      </div>

      <div id="footer_legal">
        <p>
          <span @click="openVoorwaardenPopup">Algemene voorwaarden</span> |
          <span @click="openPrivacyPopup">Privacy policy</span>
        </p>
        <p>© 2025 Gemistry. Alle rechten voorbehouden.</p>
      </div>
    </footer>

    <!-- POPUPS -->
    <transition name="popup-fade">
      <div
          v-if="showPopup"
          class="gem-modal-overlay"
          @touchstart="handleTouchStartPopup"
          @touchend="handleTouchEndPopup"
      >
        <div class="popup-header">
          <h2>{{ popupTitle }}</h2>
          <button class="gem-close" @click="closePopup">×</button>
        </div>

        <div class="popup-content">
          <img
              v-if="popupImages.length"
              :src="popupImages[currentImageIndex]"
              alt="popup image"
              class="popup-image"
          />

          <button v-if="popupImages.length > 1" class="nav-btn prev" @click="prevImage">‹</button>
          <button v-if="popupImages.length > 1" class="nav-btn next" @click="nextImage">›</button>

          <div v-if="popupImages.length > 1" class="dot-container">
            <span
                v-for="(img, i) in popupImages"
                :key="i"
                class="dot"
                :class="{ active: i === currentImageIndex }"
            ></span>
          </div>

          <p v-if="popupText" class="popup-text">{{ popupText }}</p>

          <a v-if="popupCTA" :href="popupCTA" target="_blank">
            <button class="gem-cta">MAAK EEN AFSPRAAK</button>
          </a>
        </div>
      </div>
    </transition>

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
            <h3>Privacyverklaring</h3>
            <p>
              Bij Gemistry hechten wij veel waarde aan jouw privacy. In deze privacyverklaring leggen wij
              uit welke persoonsgegevens wij verzamelen, waarom we dat doen en hoe we zorgvuldig met
              deze gegevens omgaan.
            </p>

            <h3>1. Persoonsgegevens die wij verwerken</h3>
            <p>
              Gemistry verwerkt jouw persoonsgegevens doordat je gebruikmaakt van onze diensten en/of
              omdat je deze zelf aan ons verstrekt. Wij kunnen de volgende gegevens verwerken:
            </p>
            <ul>
              <li>Voor- en achternaam</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres</li>
              <li>Social media-account (indien via DM contact)</li>
              <li>Betaalgegevens (alleen voor afhandeling van een aanbetaling of betaling)</li>
              <li>Foto’s of video’s (uitsluitend met jouw toestemming)</li>
            </ul>

            <h3>2. Doeleinden van gegevensverwerking</h3>
            <p>Wij gebruiken jouw gegevens voor:</p>
            <ul>
              <li>Het plannen en bevestigen van afspraken</li>
              <li>Het verwerken van betalingen en aanbetalingen</li>
              <li>Het versturen van bevestigingen of updates over jouw afspraak</li>
              <li>Het beantwoorden van vragen via e-mail of social media</li>
              <li>Marketingdoeleinden (zoals foto’s of video’s van jouw behandeling, uitsluitend na toestemming)</li>
            </ul>

            <h3>3. Bewaartermijn</h3>
            <p>
              Wij bewaren jouw gegevens niet langer dan noodzakelijk is voor het doel waarvoor ze zijn
              verzameld. Financiële gegevens worden bewaard volgens de wettelijke bewaarplicht (7 jaar).
            </p>

            <h3>4. Delen van persoonsgegevens</h3>
            <p>
              Gemistry verkoopt jouw gegevens niet aan derden. Wij delen gegevens alleen als dit nodig
              is voor onze dienstverlening, bijvoorbeeld met:
            </p>
            <ul>
              <li>Betaalproviders</li>
              <li>Boekingssystemen</li>
              <li>Webhostingdiensten</li>
            </ul>
            <p>
              Met deze partijen sluiten wij een verwerkersovereenkomst om jouw gegevens te beschermen.
            </p>

            <h3>5. Foto- en videomateriaal</h3>
            <p>
              Soms maken wij tijdens of na een behandeling foto’s of video’s voor promotie op onze
              website of social media. Dit gebeurt alleen met jouw expliciete toestemming. Je kunt jouw
              toestemming altijd intrekken.
            </p>

            <h3>6. Beveiliging van jouw gegevens</h3>
            <p>
              Wij nemen passende maatregelen om misbruik, verlies of onbevoegde toegang te
              voorkomen. Denk aan beveiligde verbindingen (SSL) en beperkte toegang tot gegevens.
            </p>

            <h3>7. Jouw rechten</h3>
            <p>Je hebt het recht om:</p>
            <ul>
              <li>Je gegevens in te zien, te laten corrigeren of verwijderen</li>
              <li>Je toestemming in te trekken</li>
              <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
            </ul>
            <p>
              Wil je gebruikmaken van je rechten? Stuur dan een e-mail naar
              <b><a href="mailto:gemistry.ams@gmail.com">gemistry.ams@gmail.com</a></b>.
            </p>

            <h3>8. Wijzigingen in deze privacyverklaring</h3>
            <p>
              Gemistry behoudt zich het recht voor deze verklaring te wijzigen. De meest recente versie is
              altijd te vinden op onze website.
            </p>

            <p><strong>Laatste update:</strong> oktober 2025<br>© Gemistry – All rights reserved</p>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

/* === BLOG POSTS DYNAMISCH LADEN === */
interface BlogPost {
  title: string;
  text: string;
  date: string;
  images: string[];
}

const blogPosts = ref<BlogPost[]>([]);
const showTitle = ref(false)

// Laad JSON + Afbeeldingen uit blog-map
const blogFolders = import.meta.glob("@/mobile/assets/blog/*/post.json", {
  eager: true,
  import: "default",
});
const allGalleryModules = import.meta.glob(
    "@/mobile/assets/blog/**/gallery/*.{jpg,jpeg,png,webp,JPG}",
    { eager: true }
);

for (const path in blogFolders) {
  const folder = path.replace("/post.json", "");
  const postData = blogFolders[path] as Omit<BlogPost, "images">;
  const mainImg = new URL(`${folder}/main.jpg`, import.meta.url).href;
  const galleryImages = Object.entries(allGalleryModules)
      .filter(([imgPath]) => imgPath.startsWith(folder))
      .map(([_, mod]: any) => mod.default);

  blogPosts.value.push({
    ...postData,
    images: [mainImg, ...galleryImages],
  });
}

blogPosts.value.sort((a, b) => (a.date < b.date ? 1 : -1));

/* === SLIDER === */
const currentIndex = ref(0);
const visiblePosts = computed(() => [blogPosts.value[currentIndex.value]]);
const nextPost = () => (currentIndex.value = (currentIndex.value + 1) % blogPosts.value.length);
const prevPost = () => (currentIndex.value = (currentIndex.value - 1 + blogPosts.value.length) % blogPosts.value.length);

let touchStartX = 0;
let touchEndX = 0;
const handleTouchStart = (e: TouchEvent) => (touchStartX = e.changedTouches[0].screenX);
const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) nextPost();
  if (touchEndX - touchStartX > 50) prevPost();
};

/* === POPUP === */
const showPopup = ref(false);
const popupTitle = ref("");
const popupText = ref("");
const popupImages = ref<string[]>([]);
const popupCTA = ref("");
const currentImageIndex = ref(0);

const openBlogPopup = (post: any) => {
  popupTitle.value = post.title;
  popupText.value = post.text;
  popupImages.value = post.images || [];
  popupCTA.value = "/services";
  showPopup.value = true;
};

const closePopup = () => (showPopup.value = false);
const nextImage = () =>
    (currentImageIndex.value = (currentImageIndex.value + 1) % popupImages.value.length);
const prevImage = () =>
    (currentImageIndex.value =
        (currentImageIndex.value - 1 + popupImages.value.length) % popupImages.value.length);
const handleTouchStartPopup = (e: TouchEvent) => (touchStartX = e.changedTouches[0].screenX);
const handleTouchEndPopup = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) nextImage();
  if (touchEndX - touchStartX > 50) prevImage();
};

/* === FOOTER POPUPS === */
const showVoorwaardenPopup = ref(false);
const showPrivacyPopup = ref(false);
const openVoorwaardenPopup = () => (showVoorwaardenPopup.value = true);
const closeVoorwaardenPopup = () => (showVoorwaardenPopup.value = false);
const openPrivacyPopup = () => (showPrivacyPopup.value = true);
const closePrivacyPopup = () => (showPrivacyPopup.value = false);

/* === GALLERY === */
const gemModules = import.meta.glob("@/mobile/assets/img/gems/*.{png,jpg,jpeg,webp,JPG}", { eager: true });
const gemImages = Object.values(gemModules).map((m: any) => m.default);
const closeupModules = import.meta.glob("@/mobile/assets/img/closeup/*.{png,jpg,jpeg,webp,JPG}", { eager: true });
const closeupImages = Object.values(closeupModules).map((m: any) => m.default);

const galleryItems = ref([
  { foto: gemImages[0], title: "GEMISTRY GEMS", popup: "gem" },
  { foto: closeupImages[0], title: "CLOSE-UP VIEW", popup: "closeup" },
  {
    foto: new URL("@/mobile/assets/img/random_image/IMG_4072.jpg", import.meta.url).href,
    title: "EVENTS",
    popup: "events",
  },
]);

const handleCardClick = (item: any) => {
  if (item.popup === "gem")
    openBlogPopup({
      title: "Gemistry’s Gems",
      text: "Onze klanten en modellen zijn het hart van ons merk...",
      images: gemImages,
    });
  else if (item.popup === "closeup")
    openBlogPopup({
      title: "Close-up View",
      text: "Details make the difference...",
      images: closeupImages,
    });
  else openBlogPopup({ title: item.title, text: "Coming soon...", images: [] });
};


onMounted(() => {
  showTitle.value = true
})
</script>

<style scoped>
.page {
  width: 100%;
  background: #f2efe8;
  overflow-x: hidden;
}

/* MAIN IMAGE */
#main_image {
  height: 100svh;
  background: url("../assets/img/main/image1.jpeg") center center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
#image_title {
  color: #fff;
  font-size: 58px;
  font-family: 'Vogue';
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  padding: 0 16px;
}
.gem-cta {
  font-size: 18px;
  padding: 12px 28px;
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  border-radius: 6px;
  transition: 0.3s;
}
.gem-cta:hover {
  background: #fff;
  color: #651a1a;
}

/* EXPLORE */
#explore {
  background: #651a1a;
  color: #fff;
  text-align: center;
  padding: 40px 10px;
}
.gallery-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.gallery-card {
  background: #fff;
  border-radius: 15px;
  width: 90%;
  max-width: 360px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  transition: 0.3s;
}

.gallery-card h3{
  color: #651a1a;
}

.gallery-card:hover {
  transform: scale(1.03);
}
.gallery-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

/* BLOG */
.blog-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  gap: 8px;
  width: 100%;
  max-width: 420px;
}
.post {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: opacity 0.4s ease;
  cursor: pointer;
}
.post:hover {
  transform: translateY(-3px);
}
.post-image img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.post-text {
  padding: 16px;
}
.post-title {
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 6px;
  color: #651a1a;
}
.post-body {
  font-size: 15px;
  color: #4a3b3b;
  line-height: 1.4;
}
.nav {
  background: #651a1a;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 24px;
}

/* FOOTER */
/* === FOOTER MODERN LOOK === */
footer {
  background: #f2efe8;
  color: #651a1a;
  font-family: 'Didot', 'Playfair Display', 'Georgia', serif;
  text-align: center;
}

/* Socials */
#social_media h3 {
  font-size: 20px;
  font-weight: 700;
  text-transform: none;
  color: #651a1a;
  margin-bottom: 12px;
}

#social_media_icons {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 28px;
}
#social_media_icons img {
  width: 58px;
  height: 58px;
  object-fit: contain;
  filter: drop-shadow(0 3px 6px rgba(0,0,0,0.2));
  transition: 0.3s ease;
}
#social_media_icons img:hover {
  transform: scale(1.08);
}

/* Contact section */
#contact_us h2 {
  font-size: 22px;
  margin-bottom: 12px;
  font-weight: 700;
  text-transform: capitalize;
  color: #651a1a;
}

#contact_us p {
  font-size: 16px;
  color: #4a3b3b;
  margin: 6px 0;
  line-height: 1.5;
}

#contact_us strong {
  color: #651a1a;
}

.contact-columns {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

#contact_us a {
  color: #651a1a;
  font-weight: 600;
  text-decoration: underline;
  transition: 0.3s;
}
#contact_us a:hover {
  color: #a42c2c;
}

/* Footer legal strip */
#footer_legal {
  background: #651a1a;
  color: #fff;
  padding: 24px 16px;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  letter-spacing: 0.3px;
  width: 100%;
}

#footer_legal span {
  cursor: pointer;
  text-decoration: underline;
  margin: 0 6px;
  transition: 0.2s ease;
}
#footer_legal span:hover {
  color: #f2efe8;
}
#footer_legal p {
  margin: 6px 0;
}

/* Responsive touch */
@media (min-width: 768px) {
  #contact_us p {
    font-size: 17px;
  }
  #footer_legal {
    font-size: 15px;
  }
}


#footer_legal {
  background: #651a1a;
  color: #fff;
  padding: 20px;
}
#footer_legal span {
  cursor: pointer;
  text-decoration: underline;
}

/* === BLOG MODAL === */
.gem-modal-overlay {
  position: fixed;
  inset: 0;
  background: #f2efe8;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  overflow-y: auto;
  padding-bottom: 40px;
}

.popup-header {
  width: 100%;
  text-align: center;
  position: relative;
  margin-top: 30px;
  padding: 0 56px 0 24px; /* ← meer ruimte rechts */
  box-sizing: border-box;
}

.popup-header h2 {
  font-size: 26px;
  color: #651a1a;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.3;
  word-break: break-word; /* voorkomt overlap bij lange titels */
}


.gem-close {
  position: absolute;
  right: 20px;
  top: 8px;
  font-size: 34px;
  background: none;
  border: none;
  color: #651a1a;
  cursor: pointer;
  line-height: 1;
}

/* popup content */
.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  padding: 0 16px;
}
.popup-image {
  width: 92%;
  max-width: 640px;
  border-radius: 18px;
  margin-bottom: 18px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  object-fit: cover;
}

/* navigation buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(101, 26, 26, 0.8);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 26px;
  cursor: pointer;
  transition: 0.3s;
}
.nav-btn:hover {
  background: #651a1a;
}
.nav-btn.prev {
  left: 12px;
}
.nav-btn.next {
  right: 12px;
}

/* image dots */
.dot-container {
  display: flex;
  gap: 8px;
  margin-top: 6px;
  margin-bottom: 16px;
}
.dot {
  width: 10px;
  height: 10px;
  background: #ccc;
  border-radius: 50%;
}
.dot.active {
  background: #651a1a;
}

/* text */
.popup-text {
  font-size: 16px;
  color: #4a3b3b;
  text-align: center;
  max-width: 700px;
  line-height: 1.7;
  margin-top: 10px;
  padding: 0 18px;
}

/* CTA button inside modal */
.popup-content .gem-cta {
  margin-top: 24px;
  background: transparent;
  border: 2px solid #651a1a;
  color: #651a1a;
  transition: 0.3s;
}
.popup-content .gem-cta:hover {
  background: #651a1a;
  color: #fff;
}

/* FADE ANIMATIONS */
.popup-fade-enter-active,
.popup-fade-leave-active,
.blog-fade-enter-active,
.blog-fade-leave-active {
  transition: opacity 0.6s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to,
.blog-fade-enter-from,
.blog-fade-leave-to {
  opacity: 0;
}
.main-text-enter-active,
.main-text-leave-active {
  transition: opacity 0.6s ease;
}
.main-text-enter-from,
.main-text-leave-to {
  opacity: 0;
}

/* === Responsive modal === */
@media (min-width: 768px) {
  .popup-header h2 {
    font-size: 32px;
  }
  .popup-image {
    width: 80%;
  }
  .popup-text {
    font-size: 17px;
  }
}

/* === VOORWAARDEN & PRIVACY POPUPS === */
.voorwaarden-modal {
  background: #fdfdfd;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  width: 82%;
  height: 100%;
  max-width: 700px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  padding: 28px 22px 40px;
  margin-top: 50px;
  color: #333;
  scrollbar-gutter: stable;
}

.voorwaarden-header {
  text-align: center;
  margin-bottom: 18px;
}

.voorwaarden-header h2 {
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  color: #651a1a;
  margin: 0;
  letter-spacing: 0.5px;
}

.gem-divider {
  width: 50px;
  height: 3px;
  background: #651a1a;
  margin: 10px auto 20px auto;
  border-radius: 3px;
}

.voorwaarden-content {
  font-size: 15px;
  line-height: 1.7;
  text-align: left;
  overflow-y: auto;
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE/Edge */
}
.voorwaarden-content::-webkit-scrollbar {
  display: none;               /* Chrome/Safari */
}

.voorwaarden-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: #651a1a;
  margin: 18px 0 6px;
  text-transform: uppercase;
}

.voorwaarden-content p {
  margin: 8px 0 12px;
  color: #333;
}

.voorwaarden-content ul {
  margin: 6px 0 12px 18px;
  padding: 0;
  list-style: disc;
}

.voorwaarden-content li {
  margin-bottom: 6px;
  line-height: 1.6;
}

.voorwaarden-content a {
  color: #651a1a;
  text-decoration: underline;
  transition: color 0.2s ease;
}
.voorwaarden-content a:hover {
  color: #a42c2c;
}

/* Responsiveness */
@media (max-width: 480px) {
  .voorwaarden-modal {
    width: 95%;
    padding: 22px 18px 30px;
    max-height: 88vh;
  }
  .voorwaarden-header h2 {
    font-size: 20px;
  }
  .voorwaarden-content {
    font-size: 14px;
    line-height: 1.6;
  }
}


</style>
