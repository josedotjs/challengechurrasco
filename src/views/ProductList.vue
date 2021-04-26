<template>
  <v-main>
    <v-container>
      <v-data-iterator
        :items="products"
        item-key="_id"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        :hide-default-footer="true"
      >
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>
        <template v-slot:default="props">
          <v-row>
            <v-col
              class="col-lg-4 col-md-6 col-sm-12"
              v-for="product in props.items"
              :key="product._id"
            >
              <v-card class="mx-auto" max-width="344">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>

                <v-card-title>
                  {{ product.name }}
                </v-card-title>

                <v-card-subtitle>
                  {{ product.price }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="itemsPerPage = number"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span
              class="mr-4
            grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
        <!--
        <template v-slot:footer>
          <v-toolbar class="mt-2" color="indigo" dark flat>
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="itemsPerPage = number"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </template>
        -->
      </v-data-iterator>
    </v-container>
  </v-main>
</template>

<script>
import { getAll } from '@/services/products'

export default {
  async created() {
    this.products = await getAll()
  },
  data() {
    return {
      itemsPerPageArray: [3, 6, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 6,
      sortBy: 'name',
      keys: ['SKU', 'name', 'price', 'currency', 'code'],
      products: [],
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.products.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name')
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
  },
}
</script>

<style></style>
