<template>
  <transition name="slide" mode="out-in" appear>
    <div class="page-wrapper">
      <main id="upload">

        <h1>
          <span>Upload Document</span>
          <router-link to="/"></router-link>
        </h1>

        <div v-if="uploading">
          <p id="upload-status" v-html="uploadStatus"></p>
        </div>

        <form v-else class="upload-form" @submit.prevent="upload()">

          <div class="upload-form_item">
            <label for="upload-name">Your name<span style="color: red">*</span></label>
            <input
              id="upload-name"
              :class="{red: errors.find(e => e.type === 'username')}"
              name="upload-name"
              type="text"
              v-model="username">
          </div>

          <div class="upload-form_item">
            <label for="upload-type_document">Document type</label>
            <input
              id="upload-type_document"
              :class="{red: errors.find(e => e.type === 'typeDocument')}"
              name="upload-type_document"
              type="text"
              v-model="typeDocument"
              placeholder="Photo">
          </div>

          <div class="upload-form_item">
            <label for="upload-file">
              Document
              <span class="upload-break_mobile">
                (PDF or image)
                <span style="color: red">*</span>
              </span>
            </label>
            <input
              id="upload-file"
              :class="{red: errors.find(e => e.type === 'file')}"
              type="file"
              ref="file"
              accept="application/pdf,image/*"
              @change="onFileChange">
          </div>

          <div class="errors" v-if="errors.length">
            <h4>Unsuccessful upload:</h4>
            <ol>
              <li v-for="(error, i) of errors" :key="i">
                {{ error.message }}
              </li>
            </ol>
          </div>

          <div class="buttons">
            <button class="btn-next" @click.prevent="validation()" type="submit">Submit</button>
          </div>

        </form>

      </main>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import axios from 'axios'

export default {
  data: () => ({
    username: '',
    typeDocument: '',
    extension: '',
    fullname: '',
    blob: '',
    url: '',
    errors: [],
    uploading: false,
    uploadStatus: 'Document is uploading...',
    document: null
  }),
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length)
        return;

      this.blob = files[0];

      if(files[0]['type'] === 'application/pdf'){
        this.extension = files[0]['type'].replace('application/', '');
      } else {
        this.extension = files[0]['type'].replace('image/', '');
      }
    },
    validation() {
      const types = ['pdf', 'bmp', 'gif', 'x-icon', 'jpeg', 'png', 'webp', 'tiff']

      this.errors = []
      if(!this.username.length) this.errors.push({ type: 'username', message: 'please, fill \"Your name\" field' })
      // if(!this.typeDocument.length) this.errors.push({ type: 'typeDocument', message: 'please, fill \"Type document\" field' })
      if(!this.blob.type) this.errors.push({ type: 'file', message: 'please, upload the document' })
      if(this.blob.type && types.findIndex(i => i === this.extension) < 0) this.errors.push({ type: 'file', message: 'this file extension cannot be uploaded' })

      this.upload()
    },
    async upload() {
      if (this.errors.length < 1) {
        this.fullname = Date.now() + "_" + this.typeDocument + "_" + this.username + '.' + this.extension
        const storageRef = firebase.storage().ref("upload/" + this.fullname)
        this.url = await storageRef.put(this.blob).then(() => {
          return storageRef.getDownloadURL().then(data => {
            return data
          })
        })
        try {
          await this.$store.dispatch('upload', {
            username: this.username,
            typeDocument: this.typeDocument,
            url: this.url
          })
          this.uploadStatus = '<span style="color: green">File was successfully uploaded!</span>'
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        } catch(e) {
          this.uploadStatus = `<span style="color: red">Upload error: ${e}</span>`
        }

         await axios.post("https://trucks-xpress.herokuapp.com/document", {
            username: this.username,
            type: this.typeDocument,
            url: this.url
            })
         .then(response => {
              console.log('success!')
              // console.log(response)
            })
         .catch(e => {
              console.log(e)
            })

        this.uploading = true
      }
    }
  }
}
</script>

<style scoped>
.errors {
  margin-bottom: 2rem
}
.errors h4 {
  color: red
}
</style>
