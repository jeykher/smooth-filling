<template>
  <div class="home">
    <div class="grid-container">
      <div class="home-view-container-selector-title">
        <h2 class="home-view-selector-title">Please select the appropriate service for your entity.</h2>
      </div>
    </div>
    <div class="grid-container">
      <div class="home-view-container-message1">
        <p class="home-view-message">
          Common questions, including our company's fees and important dates, are answered on the 
          <router-link to="/FAQ" class="home-view-message-link">
            FAQ page.
          </router-link>
        </p>
      </div>
      <div class="home-view-container-message2">
        <p class="home-view-message">
          To contact us for assistance, please 
          <router-link to="/contact" class="home-view-message-link">
            click here.
          </router-link>
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Footer from '../components/Footer.vue';
  export default defineComponent({
    name: 'Home',
    components: {
      Footer
    }
  });
</script>

<style>
  .home {
    width: 100%;
  }
  .home-view-container-message1, .home-view-container-message2 {
    grid-column: 3/11;
  }
  .home-view-container-message1 {
    margin-top: 2rem;
    grid-row: 1;
  }
  .home-view-container-message2 {
    grid-row: 2;
  }
  .home-view-message {
    text-align: center;
    color: #044187;
    margin-top: 0;
    margin-bottom: 1rem;
    font-family: Helvetica, Arial, sans-serif;
  }
  .home-view-message-link {
    color: #007bff;
    font-size: 15px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
  .home-view-container-selector-title {
    grid-column: 2/12;
    grid-row: 1;
  }
  .home-view-selector-title {
    padding-top: 2rem;
    color: black;
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    margin-top: 0;
    text-align: center;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }
</style>
