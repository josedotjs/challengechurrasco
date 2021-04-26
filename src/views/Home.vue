<template>
  <v-main class="main">
    <v-container class="fill-height fluid">
      <v-row>
        <v-col class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-12">
          <v-img
            src="../assets/logo_churrasco.png"
            height="150"
            contain
            class="mb-4"
          />
          <v-form
            style="background-color: white;"
            class="pa-6"
            ref="form"
            v-model="valid"
          >
            <v-text-field
              label="Username or email"
              prepend-inner-icon="mdi-account"
              :rules="userNameRules"
              v-model="userName"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              prepend-inner-icon="mdi-key"
              type="password"
              v-model="password"
              :rules="passwordRules"
            ></v-text-field>
            <v-divider class="mb-3"></v-divider>
            <!-- Cambio por snackbar
            <v-alert type="error" v-if="hasServerError">
              {{ serverErrorMessage }}
            </v-alert>
            -->
            <div style="text-align: right;">
              <v-btn color="primary" @click="onClickLogin" :disabled="!valid"
                >Log in</v-btn
              >
            </div>
          </v-form>
          <v-snackbar v-model="hasServerError">
            {{ serverErrorMessage }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="serverErrorMessage = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
// @ is an alias to /src
import { login } from '@/services/auth'

export default {
  name: 'Home',
  data: () => ({
    //
    valid: false,
    hasServerError: false,
    serverErrorMessage: '',
    userName: '',
    password: '',
    userNameRules: [
      (v) => !!v || 'El nombre de usuario o email es requerido',
      (v) =>
        (v && v.length >= 4) ||
        'El nombre de usuario debe contener 4 caracteres como mínimo',
    ],
    passwordRules: [
      (v) =>
        (v && v.length >= 6) ||
        'El password debe contener al menos 6 caracteres',
    ],
  }),
  methods: {
    onClickLogin() {
      this.hasServerError = false
      this.serverErrorMessage = ''
      login({
        username: this.userName,
        password: this.password,
      })
        .then(({ token, user }) => {
          this.$emit('user-logged', user, token)
          this.$router.push('products')
        })
        .catch((e) => {
          this.hasServerError = true
          this.serverErrorMessage = e.response.data
        })
    },
  },
  created() {
    this.$emit('user-logout')
  },
}
</script>
