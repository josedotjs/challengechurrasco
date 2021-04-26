<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="4" sm="12">
          <v-form class="mt-6" ref="form" v-model="valid">
            <v-text-field
              label="Nombre"
              v-model="formData.name"
              :rules="nameRules"
            ></v-text-field>
            <v-text-field
              label="SKU"
              v-model="formData.SKU"
              :rules="SKURules"
            ></v-text-field>
            <v-text-field
              label="Código"
              v-model.number="formData.code"
              :rules="codeRules"
            ></v-text-field>
            <v-text-field
              label="Descripción"
              v-model="formData.description"
              :rules="descriptionRules"
            ></v-text-field>
            <v-text-field
              label="Precio"
              v-model.number="formData.price"
              :rules="priceRules"
            ></v-text-field>
            <v-text-field
              label="Moneda"
              v-model="formData.currency"
              :rules="currencyRules"
            ></v-text-field>
            <v-file-input
              show-size
              counter
              chips
              multiple
              accept="image/png, image/jpeg"
              placeholder="Fotos"
              prepend-icon="mdi-camera"
              ref="fileUpload"
              v-model="files"
            ></v-file-input>
            <v-row>
              <v-col cols="8">
                <v-chip
                  v-if="files.length > 0"
                  class="ma-2 text-center"
                  color="orange"
                  label
                  outlined
                >
                  Las imágenes todavía no se subieron al servidor
                </v-chip>
              </v-col>
              <v-col cols="4">
                <v-btn depressed color="error" @click="submitFiles"
                  >Subir imágenes</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card
                  class="mx-auto mt-6"
                  max-width="500"
                  tile
                  v-if="formData.pictures.length"
                >
                  <v-toolbar color="light-blue" dark>
                    <v-toolbar-title>Imágenes subidas</v-toolbar-title>
                  </v-toolbar>
                  <v-list-item
                    v-for="(photo, idx) in formData.pictures"
                    :key="photo"
                  >
                    <v-list-item-avatar>
                      <v-icon class="grey lighten-1" dark>
                        mdi-image
                      </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title></v-list-item-title>

                      <v-list-item-subtitle class="text-center">
                        <v-img
                          :lazy-src="photo"
                          max-height="50"
                          max-width="150"
                          :src="photo"
                        ></v-img>
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon @click="onClickDeleteImage(idx)">
                        <v-icon color="grey lighten-1">mdi-close-box</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="serverErrors.length">
              <v-list color="error" class="mx-auto">
                <v-list-item v-for="(error, idx) in serverErrors" :key="idx">
                  <v-list-item-content>
                    <v-list-item-title>{{ error }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-row>
            <v-btn
              class="primary mt-6"
              block
              :disabled="!valid"
              @click="submitForm"
              >Guardar producto</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { uploadPhotos, create } from '@/services/products'

export default {
  data() {
    return {
      valid: false,
      files: [],
      serverErrors: [],
      formData: {
        name: '',
        SKU: '',
        code: 0,
        description: '',
        price: 0,
        currency: '',
        pictures: [],
      },
      nameRules: [
        (v) => !!v || 'El nombre es requerido',
        (v) =>
          (v && v.length >= 4) ||
          'El nombre  debe contener 4 caracteres como mínimo',
      ],
      SKURules: [(v) => !!v || 'El SKU es requerido'],
      codeRules: [
        (v) =>
          (!isNaN(v) && v > 0) || 'El código debe ser un número mayor a cero',
      ],
      descriptionRules: [(v) => !!v || 'Debe agregar una descripción'],
      priceRules: [
        (v) =>
          (!isNaN(v) && v > 0) || 'El precio debe ser un número mayor a cero',
      ],
      currencyRules: [(v) => !!v || 'Debe agregar una moneda'],
    }
  },
  methods: {
    submitFiles() {
      if (this.files.length > 0) {
        let formData = new FormData()

        // files
        for (let file of this.files) {
          formData.append('files', file, file.name)
        }

        uploadPhotos(formData)
          .then((response) => {
            console.log({ response })
            this.formData.pictures.push(...response)
            this.files = []
          })
          .catch((error) => {
            console.log({ error })
          })
      } else {
        console.log('No hay fotos.')
      }
    },
    onClickDeleteImage(idx) {
      this.formData.pictures.splice(idx, 1)
    },
    submitForm() {
      if (this.valid) {
        this.serverErrors = []
        create(this.formData)
          .then(() => {
            this.$router.push('/products')
          })
          .catch((e) => {
            console.error(e.response.data.errors)
            this.serverErrors = e.response.data.errors
          })
      }
    },
  },
}
</script>

<style></style>
