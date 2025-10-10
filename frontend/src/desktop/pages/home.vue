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
                <p><strong>Phone</strong><br>+31 658965703</p>
                <p><strong>Email</strong><br>gemistrynl@gmail.com</p>
                <p><strong>BTW-NUMMER</strong><br>NL005301771B83</p>
                <p><strong>Didi Zeilstra</strong></p>
              </div>
              <div class="contact-col"></div>
              <div class="contact-col">
                <p><strong>Address</strong><br>Amsterdam Zuid</p>
                <p><strong>Dean Davies</strong></p>
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
        <p>Privacy policy | Algemene voorwaarden</p>
        <p>© 2025 Gemistry. Alle rechten voorbehouden.</p>
      </div>
    </footer>

    <!-- GEM POPUP -->
    <div v-if="showGemPopup" class="gem-modal-overlay" @click.self="closeGemPopup">
      <div class="gem-modal">
        <button class="gem-close" @click="closeGemPopup" aria-label="Sluiten">×</button>
        <div class="gem-header">
          <h2>Gemistry’s gems.</h2>
          <div class="gem-divider"></div>
        </div>
        <div class="gem-body">
          <div class="gem-copy">
            <p>Onze klanten en modellen zijn het hart van ons merk...</p>
            <p>We zijn continu op zoek naar mensen die ons merk willen vertegenwoordigen...</p>
            <p class="gem-cta-wrap">
              <a href="/services"><button class="gem-cta">MAAK EEN AFSPRAAK</button></a>
            </p>
          </div>
          <div class="gem-image-wrap">
            <img :src="selectedGem" alt="Gemistry gallery image" class="gem-image" />
            <button class="gem-nav gem-prev" @click="prevGem" aria-label="Vorige">‹</button>
            <button class="gem-nav gem-next" @click="nextGem" aria-label="Volgende">›</button>
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

    <!-- CLOSEUP POPUP -->
    <div v-if="showCloseupPopup" class="gem-modal-overlay" @click.self="closeCloseupPopup">
      <div class="gem-modal">
        <button class="gem-close" @click="closeCloseupPopup" aria-label="Sluiten">×</button>
        <div class="gem-header">
          <h2>Close-up view</h2>
          <div class="gem-divider"></div>
        </div>
        <div class="gem-body">
          <div class="gem-copy">
            <p>Details make the difference...</p>
          </div>
          <div class="gem-image-wrap">
            <img :src="selectedCloseup" alt="Closeup image" class="gem-image" />
            <button class="gem-nav gem-prev" @click="prevCloseup" aria-label="Vorige">‹</button>
            <button class="gem-nav gem-next" @click="nextCloseup" aria-label="Volgende">›</button>
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
  src: url('@/desktop/assets/font/Vogue.ttf');
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

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
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

/* Explore blok */
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

/* Gallery */
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

.gallery-card:hover {
  transform: scale(1.1);
  cursor: pointer;
}

/* Why Gemistry */
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

/* Gemistry family */
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

/* Footer */
footer {
  color: white;
  text-align: center;
  margin-top: 60px;
  font-size: 14px;
}

/* Social media */
#social_media {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 60px 40px;
  background-color: #F2EFE8;
  color: #651A1A;
}

#social_media #left h3 {
  font-size: 28px;
  margin-bottom: 20px;
}

#social_media_icons {
  display: flex;
  gap: 40px;
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

#footer_legal {
  background-color: #651A1A;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}

/* ===== GEM POPUP ===== */
.gem-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .45);
  backdrop-filter: blur(6px);
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

/* Appointment popup */
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

/* Blog Slider */
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
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

/* ==============================
   BLOG POST HOVER EFFECT
============================== */

/* Cover image licht inzoomen bij hover */
.post:hover .post-image img {
  transform: scale(1.08);
  filter: brightness(0.85);
  transition: transform 0.4s ease, filter 0.4s ease;
}

/* Subtiele schaduwversterking en optische lift */
.post:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
}

/* Extra overlay die verschijnt bij hover */
.post::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.25));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 6px;
}
.post:hover::after {
  opacity: 1;
}

/* Tekst subtiel donkerder of iets meer focus */
.post:hover .post-text {
  color: #111;
  transition: color 0.3s ease;
}

/* Cursor + pointer */
.post:hover {
  cursor: pointer;
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
  display: block;
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

.nav:hover {
  background: #8a2a2a;
}

/* Blog Popup */
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

/* BLOG POPUP SLIDESHOW */
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

/* Navigatiepijlen */
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

.popup-nav.left {
  left: 12px;
}

.popup-nav.right {
  right: 12px;
}

/* Bolletjes */
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

/* Blog info popup */
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

/* Fade animatie */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

