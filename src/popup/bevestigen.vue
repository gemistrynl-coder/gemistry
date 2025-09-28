<script setup>

</script>

<template>
  <!-- POPUP -->
  <div v-if="showPopup" class="bevestig_popup" @click.self="closePopup">
    <div class="popup">
      <div class="popup-content">
        <!-- Gallery Popup -->
        <div v-if="popupType === 'gallery' && popupItem">
          <img :src="popupItem.foto" alt="" style="width: 100%; height: 60%; object-fit: cover;" />
          <h2>{{ popupItem.title }}</h2>
          <p>{{ popupItem.description }}</p>
        </div>

        <!-- Afspraak Popup -->
        <div v-else-if="popupType === 'afspraak'">
          <h2>Afspraak bevestigd!</h2>
          <p>
            Bedankt {{ formData.naam }}. Je afspraak staat op
            {{ formData.datum?.toLocaleDateString() }} om
            {{ formData.tijd }}.
          </p>
        </div>

        <button class="close-btn" @click="closePopup">×</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>