<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="4" sm="12">
          <v-form>
            <v-file-input
              show-size
              counter
              chips
              multiple
              accept="image/png, image/jpeg, image/webp"
              placeholder="Fotos"
              prepend-icon="mdi-camera"
              ref="fileUpload"
              v-model="files"
            ></v-file-input>
            <v-btn color="primary" text @click="submitFiles">test</v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
          v-for="photo in formData.uploadedPhotos"
          :key="photo"
        >
          <v-img
            :lazy-src="photo"
            max-height="150"
            max-width="250"
            :src="photo"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { uploadPhotos } from '@/services/products'

export default {
  data() {
    return {
      files: [],
      formData: {
        uploadedPhotos: [],
      },
    }
  },
  methods: {
    submitFiles() {
      if (this.files) {
        let formData = new FormData()

        // files
        for (let file of this.files) {
          formData.append('files', file, file.name)
        }

        uploadPhotos(formData)
          .then((response) => {
            console.log({ response })
            this.formData.uploadedPhotos.push(...response)
            this.files = []
          })
          .catch((error) => {
            console.log({ error })
          })
      } else {
        console.log('there are no files.')
      }
    },
  },
}
</script>

<style></style>
