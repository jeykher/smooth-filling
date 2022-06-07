<template>
  <div class="faq">
      <Footer />
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import Footer from '../components/Footer.vue';
    export default defineComponent({
        name: 'FAQ',
        components: {
            Footer
        }
    });
</script>

<style>

</style>