<template>
  <footer class="full-container footer"> 
    <div class="grid-container">
      <div class="footer-menu">
          <router-link to="/TOS" class="footer-link">Terms of Service</router-link>
          <span class="footer-separator">|</span>
          <router-link to="/privacy" class="footer-link">Privacy Policy</router-link>
          <span class="footer-separator">|</span>
          <router-link to="/FAQ" class="footer-link">FAQs</router-link>
          <span class="footer-separator">|</span>
          <router-link to="/contact" class="footer-link">Contact Us</router-link>
      </div>
      <div class="footer-rights">
          <p class="footer-rights-text">© 2020 by FileFlorida.com. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Footer'
    });
</script>

<style>
    .footer {
        background-color: #A9A9A9;
    }
    .footer-menu {
        padding-top: 2rem;
        padding-bottom: 4rem;
        grid-column: 3/11;
        grid-row: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .footer-link {
        color: black;
        touch-action: manipulation;
        text-decoration: none;
        background-color: transparent;
        cursor: pointer;
        white-space: nowrap;
        font-family: Helvetica, Arial, sans-serif;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
    }
    .footer-separator {
        color: #044187;
    }
    .footer-rights {
        grid-column: 1/11;
        grid-row: 2;
    }
    .footer-rights-text {
        color: #044187;
        font-size: 15px;
        margin-top: 0;
        margin-bottom: 1rem;
        font-family: Helvetica, Arial, sans-serif;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
    }
</style>