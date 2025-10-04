<template>
  <div class="page">
    <!-- HEADER -->
    <main class="content">
      <!-- MAIN IMAGE -->
      <div id="main_image">
        <div id="main_image_div">
          <p id="image_title">Your smile, your color,<br /> your vibe.</p>
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
      <div
          class="blog-slider"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
      >
        <button class="nav prev" @click="prevPost">‹</button>

        <div class="post" v-for="(post, i) in visiblePosts" :key="i">
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
                <p><strong>Phone</strong><br />+31 658965703</p>
                <p><strong>Email</strong><br />gemistrynl@gmail.com</p>
                <p><strong>BTW-NUMMER</strong><br />NL005301771B83</p>
                <p><strong>Didi Zeilstra</strong></p>
              </div>

              <div class="contact-col">
                <p><strong>Address</strong><br />Amsterdam Zuid</p>
                <p><strong>Dean Davies</strong></p>
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

    <!-- GEM POPUP -->
    <div v-if="showGemPopup" class="gem-modal-overlay" @click.self="closeGemPopup">
      <div class="gem-modal">
        <div class="gem-header">
          <h2>Gemistry’s gems.</h2>
          <button class="gem-close" @click="closeGemPopup">×</button>
        </div>
        <div class="gem-divider"></div>
        <div class="gem-body">
          <div class="gem-copy">
            <p>Onze klanten en modellen zijn het hart van ons merk...</p>
            <p>We zijn continu op zoek naar mensen die ons merk willen vertegenwoordigen...</p>
          </div>
          <div class="gem-image-wrap">
            <img :src="selectedGem" alt="Gemistry image" class="gem-image" />
            <button class="gem-nav gem-prev" @click="prevGem">‹</button>
            <button class="gem-nav gem-next" @click="nextGem">›</button>
          </div>
          <a href="/services"><button class="gem-cta">MAAK EEN AFSPRAAK</button></a>
        </div>
      </div>
    </div>

    <!-- CLOSEUP POPUP -->
    <div
        v-if="showCloseupPopup"
        class="gem-modal-overlay"
        @click.self="closeCloseupPopup"
    >
      <div class="gem-modal">
        <div class="gem-header">
          <h2>Close-up view</h2>
          <button class="gem-close" @click="closeCloseupPopup">×</button>
        </div>
        <div class="gem-divider"></div>
        <div class="gem-body">
          <div class="gem-copy">
            <p>Details make the difference...</p>
          </div>
          <div class="gem-image-wrap">
            <img :src="selectedCloseup" class="gem-image" />
            <button class="gem-nav gem-prev" @click="prevCloseup">‹</button>
            <button class="gem-nav gem-next" @click="nextCloseup">›</button>
          </div>
          <a href="/services"><button class="gem-cta">MAAK EEN AFSPRAAK</button></a>

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
        <button class="gem-close" @click="closeAppointmentPopup">×</button>
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

const showAppointmentPopup = ref(false);
const showGemPopup = ref(false);
const showCloseupPopup = ref(false);
const lockScroll = () => (document.body.style.overflow = "hidden");
const unlockScroll = () => (document.body.style.overflow = "");
watch([showAppointmentPopup, showGemPopup, showCloseupPopup], (v) => v.some(Boolean) ? lockScroll() : unlockScroll());

const openAppointmentPopup = () => (showAppointmentPopup.value = true);
const closeAppointmentPopup = () => (showAppointmentPopup.value = false);

const gemModules = import.meta.glob("@/mobile/assets/img/gems/*.{png,jpg,jpeg,webp,JPG}", { eager: true });
const gemImages = Object.values(gemModules).map((m: any) => m.default);
const currentGemIndex = ref(0);
const selectedGem = ref<string>(gemImages[0]);
const nextGem = () => (currentGemIndex.value = (currentGemIndex.value + 1) % gemImages.length, selectedGem.value = gemImages[currentGemIndex.value]);
const prevGem = () => (currentGemIndex.value = (currentGemIndex.value - 1 + gemImages.length) % gemImages.length, selectedGem.value = gemImages[currentGemIndex.value]);
const closeGemPopup = () => (showGemPopup.value = false);
const openGemPopup = () => (showGemPopup.value = true);

const closeupModules = import.meta.glob("@/mobile/assets/img/closeup/*.{png,jpg,jpeg,webp,JPG}", { eager: true });
const closeupImages = Object.values(closeupModules).map((m: any) => m.default);
const currentCloseupIndex = ref(0);
const selectedCloseup = ref<string>(closeupImages[0]);
const nextCloseup = () => (currentCloseupIndex.value = (currentCloseupIndex.value + 1) % closeupImages.length, selectedCloseup.value = closeupImages[currentCloseupIndex.value]);
const prevCloseup = () => (currentCloseupIndex.value = (currentCloseupIndex.value - 1 + closeupImages.length) % closeupImages.length, selectedCloseup.value = closeupImages[currentCloseupIndex.value]);
const closeCloseupPopup = () => (showCloseupPopup.value = false);
const openCloseupPopup = () => (showCloseupPopup.value = true);

const galleryItems = ref([
  { foto: new URL("@/mobile/assets/img/gems/IMG_6667.jpg", import.meta.url).href, title: "GEMISTRY GEMS", popup: "gem" },
  { foto: new URL("@/mobile/assets/img/closeup/kaolo.JPG", import.meta.url).href, title: "CLOSE-UP VIEW", popup: "closeup" },
  { foto: new URL("@/mobile/assets/img/random_image/IMG_4072.jpg", import.meta.url).href, title: "EVENTS", popup: "events" },
]);
const handleCardClick = (item: any) => {
  if (item.popup === "gem") openGemPopup();
  if (item.popup === "closeup") openCloseupPopup();
};

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
</script>

<style scoped>
:global(html, body) {
  margin: 0;
  padding: 0;
  background: #f2efe8;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

@font-face {
  font-family: "Vogue";
  src: url("@/mobile/assets/font/Vogue.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}


.page {
  width: 100%;
  background-color: #f2efe8;
  overflow-x: hidden;
}
#main_image {
  height: 100svh;
  background: url("../assets/img/main/image1.jpeg") center center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
#main_image_div {
  text-align: center;
  animation: slideIn 1.5s ease-out forwards;
}
#image_title {
  color: #f2efe8;
  font-size: 66px;
  font-family: 'Vogue';
  margin: 0 10px 20px;
}
@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
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
#why_gemistry {
  margin-top: 40px;
}
#why_gemistry_text {
  font-size: 18px;
  padding: 0 20px;
}
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
  text-align: left;
}
.post-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
}
.post-body {
  font-size: 15px;
  margin-bottom: 10px;
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
.nav:active {
  transform: scale(0.95);
}

#gemistry_family {
  margin-top: 40px;
  text-align: center;
}
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
.gem-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}
.gem-modal {
  background: #651a1a;
  border-radius: 12px;
  color: #f2efe8;
  width: 90%;
  max-width: 500px;
  padding: 20px;
}
.gem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gem-close {
  font-size: 30px;
  background: none;
  color: #f2efe8;
  border: none;
  cursor: pointer;
}
.gem-image {
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
}
.gem-cta {
  border: 1.5px solid #f2efe8;
  background: transparent;
  color: #f2efe8;
  padding: 10px 18px;
  border-radius: 8px;
  margin-top: 10px;
}
.appointment-modal {
  width: 90%;
  max-width: 600px;
  height: 80vh;
  background: #651a1a;
  color: #f2efe8;
  border-radius: 16px;
  overflow: hidden;
}
.calendly-inline-widget {
  width: 100%;
  height: 100%;
}
</style>
