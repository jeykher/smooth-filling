<template>
  <div class="privacy">
      <Footer />
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import Footer from '../components/Footer.vue';
    export default defineComponent({
        name: 'Privacy',
        components: {
            Footer
        }
    });
</script>

<style>

</style>