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

    <!-- Privacy & Voorwaarden -->
    <transition name="popup-fade">
      <div v-if="showVoorwaardenPopup" class="gem-modal-overlay">
        <div class="popup-header">
          <h2>Algemene voorwaarden</h2>
          <button class="gem-close" @click="closeVoorwaardenPopup">×</button>
        </div>
        <div class="popup-content">
          <p class="popup-text">
            Dit zijn de algemene voorwaarden van Gemistry. Hierin staat informatie over afspraken,
            betalingen, annuleringen en aansprakelijkheid. Door gebruik te maken van onze diensten
            stemt u in met deze voorwaarden.
          </p>
        </div>
      </div>
    </transition>

    <transition name="popup-fade">
      <div v-if="showPrivacyPopup" class="gem-modal-overlay">
        <div class="popup-header">
          <h2>Privacy policy</h2>
          <button class="gem-close" @click="closePrivacyPopup">×</button>
        </div>
        <div class="popup-content">
          <p class="popup-text">
            Wij hechten waarde aan uw privacy. Gemistry verwerkt uw gegevens uitsluitend om afspraken
            te beheren en contact te onderhouden. We delen geen informatie met derden zonder uw toestemming.
          </p>
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

</style>
