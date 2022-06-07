<template>
  <div class="about">
    <Footer />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import Footer from '../components/Footer.vue';
  export default defineComponent({
    name: 'About',
    components: {
      Footer
    }
  });
</script>
