<template>
    <header class="home-view-header">
      <div class="home-view-header-content">
        <div class="home-view-header-left-block">
          <p class="home-view-header-left-text1">File Florida Co.</p>
          <p class="home-view-header-left-text2">Florida Corporation Filing Company</p>
          <p class="home-view-header-left-text3">Fast and easy filing services</p>
        </div>
       <div class="home-view-header-right-block">
         <nav class="home-view-navbar">
           <ul class="home-view-block-elements">
             <li class="home-view-nav-element">
              <router-link to="/" class="home-view-nav-link">File Online</router-link>
             </li>
             <li class="home-view-nav-element">
              <router-link to="/about" class="home-view-nav-link">About Us</router-link>
             </li>
             <li class="home-view-nav-element">
              <router-link to="FAQ" class="home-view-nav-link">FAQs</router-link>
             </li>
             <li class="home-view-nav-element">
              <router-link to="/contact" class="home-view-nav-link">Contact</router-link>
             </li>
           </ul>
         </nav>
         <div class="home-view-header-notice">
           <p>IMPORTANT NOTICE: You are NOT required to purchase anything from this company and the company is NOT affiliated, endorsed, or approved by any governmental entity. The item offered in this advertisement has NOT been approved or endorsed by any governmental agency, and this offer is NOT being made by an agency of the government.</p>
         </div>
       </div>
      </div>
    </header>  
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header'
});
</script>

<style>
  .home-view-header {
    color: white;
    background-color: #044187;
    width: 100%;
  }
  .home-view-header-content {
    width: 100%;
    max-width: 1100px;
    margin: auto;
    display: flex;
  }
  .home-view-header-right-block, .home-view-header-left-block {
    display: flex;
    flex-direction: column;
    align-content: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 400;
    text-indent: 0;
    padding: 23px 18px 16px;
  }
  .home-view-header-left-block {
    justify-content: flex-start;
    width: 42%;
  }
  .home-view-header-right-block {
    justify-content: center;
    width: 58%;
    margin: 0 1.4rem;
    color: #e6e6e6;
  }
  .home-view-header-left-text1 {
    font-size: 35px;
  }
  .home-view-header-left-text2 {
    font-size: 20px;
    margin: 0.3rem 0;
  }
  .home-view-header-left-text3 {
    font-size: 16px;
    margin: 0.3rem 0;
  }
  .home-view-navbar {
    width: 100%;
  }
  .home-view-block-elements {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
    color: #e6e6e6;
  }
  .home-view-nav-element {
    color: white;
    padding-right: 39px;
  }
  .home-view-nav-link {
    color: white;
  }
  .home-view-header-notice {
    margin: 1rem 0;
    width: 480px;
    max-width: 700px;
    font-size: 18px;
  }
</style>