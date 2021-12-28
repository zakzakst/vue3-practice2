<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" class="text-center">
      <p class="display-1 py-12">プロフィール</p>
      <v-row>
        <v-col cols="12" md="4">
          <v-avatar :color="profile.themeColor" size="72">
            <span class="white--text body-2" v-text="profile.nickname" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="画像を選択してください"
            prepend-icon="photo_camera"
            label="アバター"
            :error-count="Number.MAX_VALUE"
            :error-messages="avatorErrors"
            @change="saveFileContent"
          />
        </v-col>
      </v-row>
      <label class="v-label theme--light">テーマカラー *</label>
      <v-color-picker
        v-model="newThemeColor"
        class="mx-auto mb-4 mt-2"
        hide-canvas
        show-swatches
        swatches-max-height="120px"
      />
      <v-btn small rounded color="primary" @click="saveThemeColor">
        テーマカラーを決定する
      </v-btn>
      <v-text-field
        v-model="profile.userName"
        readonly
        label="ユーザー名"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editUserName"
      />
      <v-dialog
        v-model="isOpenEditUserNameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <!-- <ValidationObserver v-slot="{ invalid }"> -->
          <ValidationObserver ref="userNameValidationObserver">
            <ValidationProvider
              v-slot="{ errors }"
              name="ユーザー名"
              :rules="validationRules.userName"
            >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="newUserName"
                      label="ユーザー名 *"
                      :error-count="Number.MAX_VALUE"
                      :error-messages="errors"
                    />
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeEditUserNameDialog"
                >
                  キャンセル
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  :disabled="userNameSaveDisabled"
                  @click="saveUserName"
                >
                  保存する
                </v-btn>
              </v-card-actions>
            </ValidationProvider>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.nickname"
        readonly
        label="ニックネーム"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editNickname"
      />
      <v-dialog
        v-model="isOpenEditNicknameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <!-- <ValidationObserver v-slot="{ invalid }"> -->
          <ValidationObserver ref="nicknameValidationObserver">
            <ValidationProvider
              v-slot="{ errors }"
              name="ニックネーム"
              :rules="validationRules.nickname"
            >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="newNickname"
                      label="ニックネーム *"
                      :error-count="Number.MAX_VALUE"
                      :error-messages="errors"
                    />
                  </v-row>
                </v-container>
              </v-card-text>
            </ValidationProvider>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="closeEditNicknameDialog"
              >
                キャンセル
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="nicknameSaveDisabled"
                @click="saveNickname"
              >
                保存する
              </v-btn>
            </v-card-actions>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.mailAddress"
        readonly
        label="メールアドレス"
      />
      <small class="float-left">* 必須フィールドを示します</small>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
  profileStore,
  updateThemeColor,
  updateUserName,
  updateNickname,
} from '@/store/profile';
import { validate, ValidationObserver } from 'vee-validate';

// TODO: ここのエラー回避方法調べる
// eslint-disable-next-line @typescript-eslint/ban-types
type Refs<T extends object> = Vue['$refs'] & T;

@Component
export default class ProfileComponent extends Vue {
  $refs!: Refs<{
    userNameValidationObserver: InstanceType<typeof ValidationObserver>;
    nicknameValidationObserver: InstanceType<typeof ValidationObserver>;
  }>;

  /**
   * 新しいユーザー名の保存が無効かどうかを判断します。
   * 新しいユーザー名の値が変更されるたびに判定を行います。
   */
  @Watch('newUserName')
  private validateUserName() {
    this.$nextTick(() => {
      this.$refs.userNameValidationObserver
        .validate({ silent: true })
        .then((result) => {
          this.userNameSaveDisabled = !result;
        });
    });
  }

  /**
   * 新しいニックネームの保存が無効かどうかを判断します。
   * 新しいニックネームの値が変更されるたびに判定を行います。
   */
  @Watch('newNickName')
  private validateNickname() {
    this.$nextTick(() => {
      this.$refs.nicknameValidationObserver
        .validate({ silent: true })
        .then((result) => {
          this.nicknameSaveDisabled = !result;
        });
    });
  }

  /**
   * プロフィール
   */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private profile = profileStore.profile!;

  /**
   * 新しいユーザー名
   */
  private newUserName: string | null = null;

  /**
   * 新しいニックネーム
   */
  private newNickname: string | null = null;

  /**
   * 新しいユーザー名の保存が無効であるかどうかを示す値です。
   */
  private userNameSaveDisabled = false;

  /**
   * 新しいニックネームの保存が無効であるかどうかを示す値です。
   */
  private nicknameSaveDisabled = false;

  /**
   * 新しいテーマカラー
   */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private newThemeColor: string = profileStore.profile!.themeColor;

  /**
   * ユーザー名編集ダイアログをオープンするかどうかを示す値です。
   */
  private isOpenEditUserNameDialog = false;

  /**
   * ニックネーム編集ダイアログをオープンするかどうかを示す値です。
   */
  private isOpenEditNicknameDialog = false;

  /**
   * アバターのバリデーションエラーです。
   */
  private avatorErrors: string[] | null = null;

  /**
   * アバターを保存します。
   * @param file アバターの画像ファイル
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  private saveFileContent(file: File) {
    this.avatorErrors = null;
    if (!file) {
      // ファイル選択ダイアログでキャンセルされた場合などで、
      // ファイルが選択されていない場合は何もしない。
      return;
    }
    validate(file, this.validationRules.avator, { name: 'アバター' }).then(
      (result) => {
        if (!result.valid) {
          this.avatorErrors = result.errors;
          return;
        }
        // バリデーション成功。WebAPIを呼び出してアバター画像を保存する。
      },
    );
  }

  /**
   * テーマカラーを保存します。
   */
  private saveThemeColor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // profileStore.profile!.themeColor = this.newThemeColor;
    updateThemeColor(this.newThemeColor);
  }

  /**
   * ユーザー名の編集を開始します。
   */
  private editUserName() {
    this.newUserName = this.profile.userName;
    this.isOpenEditUserNameDialog = true;
  }

  /**
   * ユーザー名の編集を終了します。
   */
  private closeEditUserNameDialog() {
    this.isOpenEditUserNameDialog = false;
  }

  /**
   * ユーザー名を保存します。
   */
  private saveUserName() {
    if (this.newUserName) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // profileStore.profile!.userName = this.newUserName;
      updateUserName(this.newUserName);
    }
    this.isOpenEditUserNameDialog = false;
  }

  /**
   * ニックネームの編集を開始します。
   */
  private editNickname() {
    this.newNickname = this.profile.nickname;
    this.isOpenEditNicknameDialog = true;
  }

  /**
   * ニックネームの編集を終了します。
   */
  private closeEditNicknameDialog() {
    this.isOpenEditNicknameDialog = false;
  }

  /**
   * ニックネームを保存します。
   */
  private saveNickname() {
    if (this.newNickname) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // profileStore.profile!.nickname = this.newNickname;
      updateNickname(this.newNickname);
    }
    this.isOpenEditNicknameDialog = false;
  }

  /**
   * バリデーションルールです。
   */
  private get validationRules() {
    return {
      nickname: {
        required: true,
        max: 15,
      },
      userName: {
        required: true,
        userNameAllowedCharacters: true,
        max: 15,
      },
      avator: {
        ext: ['png', 'jpeg', 'bmp'],
        size: 300,
      },
    };
  }
}
</script>
