<template>
  <div>
    <h1>ホーム</h1>
    <p><router-link to="sign-in">サインイン</router-link></p>
    <p><button @click="calendar">カレンダー</button></p>
    <p><button @click="profile">プロフィール</button></p>
    <p><button @click="share">共有</button></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const calendar = () => {
      router.push({
        name: 'calendar',
        params: {
          type: 'month',
        },
      });
    };

    const profile = () => {
      router.push('/profile');
    };

    const share = () => {
      router.push('/share');
    };

    return {
      calendar,
      profile,
      share,
    };
  },
});
</script>
