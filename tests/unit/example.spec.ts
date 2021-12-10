import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders text when passed', () => {
    const text = 'ホーム';
    const wrapper = shallowMount(Home);
    expect(wrapper.text()).toMatch(text);
  });
});
