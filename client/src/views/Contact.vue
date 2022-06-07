<template>
  <div class="contact">
      <Footer />
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import Footer from '../components/Footer.vue';
    export default defineComponent({
        name: 'Contact',
        components: {
            Footer
        }
    });
</script>

<style>

</style>