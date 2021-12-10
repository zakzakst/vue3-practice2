<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from '@/components/organisms/Footer.vue';

export default defineComponent({
  components: {
    Footer,
  },
});
</script>
