<template>
  <div class="tos">
      <Footer />
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import Footer from '../components/Footer.vue';
    export default defineComponent({
        name: 'TOS',
        components: {
            Footer
        }
    });
</script>

<style>

</style>