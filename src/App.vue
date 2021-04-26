<template>
  <v-app>
    <v-app-bar app v-if="user" class="mb-4">
      <v-container class="py-0 fill-height">
        <v-toolbar-title class="mr-4 d-none d-lg-flex d-xl-none"
          >Churrasco challenge</v-toolbar-title
        >
        <v-btn v-for="link in links" exact :key="link.to" :to="link.to" text>
          {{ link.label }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-chip class="ma-2 d-none d-lg-flex d-xl-none">
          {{ user.firstName }} {{ user.lastName }}
        </v-chip>
        <v-btn depressed color="error" @click="onUserLogout">
          Logout
        </v-btn>
      </v-container>
    </v-app-bar>
    <router-view
      @user-logged="onUserLogged"
      :user="user"
      :key="$route.fullPath"
    />
  </v-app>
</template>

<script>
import { checkToken } from '@/services/auth'
export default {
  name: 'App',
  components: {},
  created() {
    // const token = localStorage.getItem('token')

    checkToken()
      .then(() => {
        this.user = JSON.parse(localStorage.getItem('user'))
        this.$router.push('/products')
      })
      .catch(() => this.onUserLogout())
  },
  data() {
    return {
      user: null,
      links: [
        {
          label: 'Productos',
          to: '/products',
        },
        {
          label: 'Crear producto',
          to: '/products/new',
        },
      ],
    }
  },
  methods: {
    onUserLogged(user, token) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    },
    onUserLogout() {
      console.log('')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.user = null
      if (this.$route.fullPath !== '/') {
        this.$router.push('/')
      }
    },
  },
}
</script>
<style scoped>
.main {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 20%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>
