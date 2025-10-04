<template>
  <div class="page">
    <!-- HEADER / MAIN -->
    <main class="content">
      <!-- MAIN IMAGE -->
      <div id="main_image">
        <div id="main_image_div">
          <p id="image_title">Your smile, your vibe,<br /> your color.</p>
          <a href="/services"><button class="gem-cta">MAAK EEN AFSPRAAK</button></a>
        </div>
      </div>

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
      <div class="blog-slider" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <button class="nav prev" @click="prevPost">‹</button>

        <div class="post" v-for="(post, i) in visiblePosts" :key="i" @click="openBlogPopup(post)">
          <div class="post-image">
            <img :src="post.image" alt="blog image" />
          </div>
          <div class="post-text">
            <p class="post-title">{{ post.title }}</p>
            <p class="post-body">{{ post.text }}</p>
            <small>{{ post.date }}</small>
          </div>
        </div>

        <button class="nav next" @click="nextPost">›</button>
      </div>

      <div id="gemistry_family">
        <h3>GEMISTRY FAMILY</h3>
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
                <p><strong>Didi Zeilstra</strong><br />KvK: 97986178<br />Btw: NL005301771B83</p>
                <p><strong>Dean Davies</strong><br />KvK: 97986178<br />Btw: NL005301771B83</p>
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
        <p>Privacy policy | Algemene voorwaarden</p>
        <p>© 2025 Gemistry. Alle rechten voorbehouden.</p>
      </div>
    </footer>

    <!-- ✅ FULLSCREEN POPUP MET SWIPE -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

/* === POPUP SYSTEM MET SWIPE === */
const showPopup = ref(false);
const popupTitle = ref("");
const popupText = ref("");
const popupImages = ref<string[]>([]);
const popupCTA = ref("");
const currentImageIndex = ref(0);

const openPopup = (title: string, text?: string, images?: string[] | string, cta?: string) => {
  popupTitle.value = title;
  popupText.value = text || "";
  popupImages.value = Array.isArray(images) ? images : [images || ""];
  popupCTA.value = cta || "";
  currentImageIndex.value = 0;
  showPopup.value = true;
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
};

const closePopup = () => {
  showPopup.value = false;
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
};

const nextImage = () => {
  if (popupImages.value.length > 1)
    currentImageIndex.value = (currentImageIndex.value + 1) % popupImages.value.length;
};
const prevImage = () => {
  if (popupImages.value.length > 1)
    currentImageIndex.value =
        (currentImageIndex.value - 1 + popupImages.value.length) % popupImages.value.length;
};

/* === Touch Controls Popup === */
let touchStartXPopup = 0;
let touchEndXPopup = 0;
const handleTouchStartPopup = (e: TouchEvent) => (touchStartXPopup = e.changedTouches[0].screenX);
const handleTouchEndPopup = (e: TouchEvent) => {
  touchEndXPopup = e.changedTouches[0].screenX;
  if (touchStartXPopup - touchEndXPopup > 50) nextImage();
  if (touchEndXPopup - touchStartXPopup > 50) prevImage();
};

/* === GALLERY & BLOG === */
const gemModules = import.meta.glob("@/mobile/assets/img/gems/*.{png,jpg,jpeg,webp,JPG}", { eager: true });
const gemImages = Object.values(gemModules).map((m: any) => m.default);
const closeupModules = import.meta.glob("@/mobile/assets/img/closeup/*.{png,jpg,jpeg,webp,JPG}", { eager: true });
const closeupImages = Object.values(closeupModules).map((m: any) => m.default);

const galleryItems = ref([
  { foto: gemImages[0], title: "GEMISTRY GEMS", popup: "gem" },
  { foto: closeupImages[0], title: "CLOSE-UP VIEW", popup: "closeup" },
  { foto: new URL("@/mobile/assets/img/random_image/IMG_4072.jpg", import.meta.url).href, title: "EVENTS", popup: "events" },
]);

const handleCardClick = (item: any) => {
  if (item.popup === "gem")
    openPopup("Gemistry’s Gems", "Onze klanten en modellen zijn het hart van ons merk...", gemImages, "/services");
  else if (item.popup === "closeup")
    openPopup("Close-up View", "Details make the difference...", closeupImages, "/services");
  else openPopup(item.title, "Coming soon...");
};

/* === BLOG === */
const blogPosts = ref([
  {
    title: "OUR LATEST SHOOT IN AMSTERDAM ZUID",
    text: "Behind the scenes at our very first Gemistry shoot...",
    date: "Oct 2025",
    image: new URL("@/mobile/assets/img/blog_img/img.png", import.meta.url).href,
  },
  {
    title: "FESTIVAL VIBES",
    text: "Gemistry joined a summer festival – spreading smiles and shiny vibes.",
    date: "Aug 2025",
    image: new URL("@/mobile/assets/img/random_image/IMG_6667.jpg", import.meta.url).href,
  },
]);
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

const openBlogPopup = (post: any) => openPopup(post.title, post.text, post.image, "/services");
</script>

<style scoped>
/* === BASIS === */
.page {
  width: 100%;
  background-color: #f2efe8;
  overflow-x: hidden;
}

/* === MAIN IMAGE === */
#main_image {
  height: 100svh;
  background: url("../assets/img/main/image1.jpeg") center center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
#main_image_div {
  text-align: center;
}
#image_title {
  color: #f2efe8;
  font-size: 66px;
  font-family: 'Vogue';
  margin: 0 10px 20px;
}
#main_image_div button {
  font-size: 20px;
  padding: 12px 28px;
  background: transparent;
  border: 2px solid #f2efe8;
  color: #f2efe8;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}
#main_image_div button:hover {
  background: #f2efe8;
  color: #651a1a;
}

/* === EXPLORE === */
#explore {
  background: #651a1a;
  color: #f2efe8;
  text-align: center;
  padding: 40px 10px;
}
#explore p {
  font-size: 32px;
  margin-bottom: 20px;
}
.gallery-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin-bottom: 40px;
}
.gallery-card {
  background: #f2efe8;
  border-radius: 15px;
  width: 90%;
  max-width: 360px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: 0.3s;
}
.gallery-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.gallery-card h3 {
  color: #651a1a;
  margin: 10px;
  font-size: 22px;
  font-weight: bold;
}
.gallery-card:active {
  transform: scale(0.97);
}

/* === BLOG SLIDER === */
.blog-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 40px auto;
  width: 100%;
  max-width: 420px;
}
.post {
  background: #f2efe8;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.post-image img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.post-text {
  padding: 16px;
  color: #333;
}
.post-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
}
.nav {
  background: #651a1a;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 24px;
  cursor: pointer;
}

/* === FOOTER === */
footer {
  text-align: center;
  background: #f2efe8;
  color: #651a1a;
}
#social_media_icons img {
  width: 40px;
  height: 40px;
  margin: 0 10px;
}
#footer_legal {
  background: #651a1a;
  color: #fff;
  padding: 20px;
}

/* === FULLSCREEN POPUP (LUXE STIJL) === */
.gem-modal-overlay {
  position: fixed;
  inset: 0;
  background: #f2efe8;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  width: 100vw;
  height: 100svh;
  padding: 24px 0 40px;
  box-sizing: border-box;
}

/* === HEADER MET TITEL EN SLUITKNOP === */
.popup-header {
  width: 100%;
  max-width: 800px;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 12px;
}

.popup-header h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 30px;
  font-weight: 700;
  color: #651a1a;
  text-align: center;
  margin: 0;
  line-height: 1.3;
  letter-spacing: 0.3px;
}

.gem-close {
  position: absolute;
  right: 24px;
  top: 2px;
  font-size: 30px;
  color: #651a1a;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}
.gem-close:hover {
  transform: scale(1.15);
  color: #9b2e2e;
}

/* === CONTENT === */
.popup-content {
  flex: 1;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;
}

/* === FOTO === */
.popup-image {
  width: 94%;
  max-width: 800px;
  height: auto;
  border-radius: 22px;
  object-fit: cover;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  margin: 0 auto 20px;
  transition: all 0.4s ease;
}

/* === NAVIGATIE KNOPPEN === */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(101, 26, 26, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 26px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}
.nav-btn.prev {
  left: 6%;
}
.nav-btn.next {
  right: 6%;
}
.nav-btn:hover {
  background: #7a2222;
  transform: translateY(-50%) scale(1.1);
}

/* === DOTS INDICATOREN === */
.dot-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 20px;
}
.dot {
  width: 9px;
  height: 9px;
  background: #c4bdb4;
  border-radius: 50%;
  transition: background 0.25s ease;
}
.dot.active {
  background: #651a1a;
}

/* === TEKST === */
.popup-text {
  font-size: 17px;
  font-style: italic;
  color: #4a3b3b;
  text-align: center;
  max-width: 620px;
  margin: 0 auto 15px;
  line-height: 1.6;
  padding: 0 16px;
}

/* === CTA KNOP === */
.gem-cta {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 28px;
  border-radius: 25px;
  background: #7a2222;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.gem-cta:hover {
  background: #9b2e2e;
  transform: translateY(-2px);
}

/* === FADE TRANSITIE === */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.35s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

/* === RESPONSIVE === */
@media (max-width: 600px) {
  .popup-header h2 {
    font-size: 22px;
  }
  .popup-image {
    width: 92%;
    border-radius: 18px;
  }
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 22px;
  }
  .popup-text {
    font-size: 15px;
  }
}


</style>
