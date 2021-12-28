import Vue from 'vue';
import {
  configure,
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import { required, max, ext, size } from 'vee-validate/dist/rules';
import { customRules } from '@/validation/custom-rules';

// 設定
const config = {
  // 全てのバリデーションルールを検証
  bails: false,
  // input, blurのタイミングでバリデーションを実行。
  // mode: 'aggressive',
  // change, blurのタイミングでバリデーションを実行。
  // 入力値が有効な値に復帰した場合は即時にエラーを消す。
  mode: 'eager',
};
configure(config);

// 日本語ローカライズ
localize('ja', ja);

// バリデーション用コンポーネントをグローバルコンポーネントとして登録
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// バリデーションルールの登録
extend('required', required);
extend('max', max);
extend('ext', ext);
extend('size', size);
// extend('userNameAllowedCharacters', {
//   message: '{_field_}は英字、数字、「_」のみ使用できます。',
//   validate: (value) => {
//     return /^[0-9A-z_]*$/i.test(value);
//   },
// });

// カスタムルールの登録
for (const key in customRules) {
  extend(key, customRules[key]);
}
