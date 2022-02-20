<template>
  <transition name="slide" mode="out-in" appear>
    <div class="page-wrapper">
      <main id="application">

        <h1>
          Application
          <router-link to="/"></router-link>
        </h1>

        <form @submit.prevent v-if="step === 0">

          <div v-if="preApplicationPage">
            <!-- eslint-disable-next-line -->
            <p>Thank you for your interest in Northeast Xpress Inc. To apply for a driving position, please complete our online application for employment. Incomplete information will delay the processing of your application or prevent it from being submitted.</p>

            <!-- eslint-disable-next-line -->
            <p>In compliance with Federal and State equal employment opportunity laws, qualified applicants are considered for all positions without regard to race, color, religion, sex, national origin, age, marital status, veteran status, non-job related disability, or any other protected group status. To fill out this form, you will need to know the following:</p>

            <ul>
              <li>Social Security Number</li>
              <!-- eslint-disable-next-line -->
              <li>Home address history for the past 3 years</li>
              <!-- eslint-disable-next-line -->
              <li>Current drivers license number and drivers license history for the past 3 years</li>
              <li>Employment history up to 10 years</li>
              <!-- eslint-disable-next-line -->
              <li>History of traffic accidents, violations, and / or convictions from the last 5 years (including DUI or reckless driving convictions and license suspensions)</li>
              <li>Military history (if applicable)</li>
            </ul>

            <!-- eslint-disable-next-line -->
            <p>Required entry fields are followed by *, meaning you must provide the requested information to continue. If you encounter any errors during this process and cannot continue, please contact us at 484-484-6666.</p>
            <div class="buttons">
              <button class="btn-next" @click="preApplicationPage = false">Next</button>
            </div>
          </div>

          <div v-else>
            <p>To qualify with Northeast Xpress Inc you must meet the following criteria:</p>

            <ul>
              <!-- eslint-disable-next-line -->
              <li>No DUI within 10 years if CDL-A holder, none within 5 years if Non CDL-A holder</li>
              <!-- eslint-disable-next-line -->
              <li>No more than 1 preventable accident in the past 2 years, no major accident within 5 years</li>
              <li>No more than 2 moving violations in the past 2 years</li>
              <li>Able to pass a DOT physical and drug test (urine and hair)</li>
              <li>Must be at least 21 years old</li>
            </ul>

            <div class="buttons">
              <button class="btn-back" @click="preApplicationPage = true">back</button>
              <button class="btn-next" @click="nextStep()">Next</button>
            </div>
          </div>

        </form>

        <form v-else class="step-form">

          <div v-for="item in applicationData" :key="item.step" :class="`step-${item.step}`">
            <div v-if="item.step === step" class="form-item_wrapper">
              <h3>
                Step {{item.step}}/{{totalSteps}}.
                <span class="upload-break_mobile"> {{ item.description }}</span>
                <br>
                <span class="sub-title">{{ item.descriptionSecond }}</span>
              </h3>

              <div v-for="(field, i) in item.fields" :key="i" class="form-item">

                <div class="form-item_field" v-if="field.type === 'title'">
                  <h4>{{ field.value }}</h4>
                </div>

                <div class="form-item_field" v-else-if="field.type === 'paragraph'">
                  <p>{{ field.value }}</p>
                </div>

                <div class="form-item_field" v-else-if="field.type === 'text'">
                  <label class="label" :for="`step-${item.step}_item-${i}`">
                    {{field.label}}
                    <span v-if="field.required" style="color:red">*</span>
                  </label>
                  <input
                    type="text"
                    class="text"
                    :name="`step-${item.step}_item-${i}`"
                    :id="`step-${item.step}_item-${i}`"
                    v-model="field.value"
                    :required="field.required"
                    :ref="`step-${item.step}`">
                </div>

                <div class="form-item_field" v-else-if="field.type === 'select'">
                  <label class="label" :for="`step-${item.step}_item-${i}`">
                    {{field.label}}
                    <span v-if="field.required" style="color:red">*</span>
                  </label>
                  <select
                    :name="`step-${item.step}_item-${i}`"
                    :id="`step-${item.step}_item-${i}`"
                    :ref="`step-${item.step}`"
                    v-model="field.value">
                    <option
                      v-for="(option, i) of field.options"
                      :value="option"
                      :key="i">
                      {{option}}
                    </option>
                  </select>
                </div>

                <div class="form-item_field radios" v-else-if="field.type === 'radio'">
                  <p>
                    {{field.label}}
                    <span v-if="field.required" style="color:red">*</span>
                  </p>
                  <input
                    type="radio"
                    class="radio"
                    :value="field.value"
                    :name="field.name"
                    :id="`step-${item.step}_item-${i}-1`"
                    :required="field.required"
                    :ref="`step-${item.step}`"
                    :checked="field.value === 'yes'">
                  <label
                    :class="['label', 'radio', field.name]"
                    :for="`step-${item.step}_item-${i}-1`"
                    @click="field.value = 'yes'">
                      yes
                  </label>

                  <input
                    type="radio"
                    class="radio"
                    :value="field.value"
                    :name="field.name"
                    :id="`step-${item.step}_item-${i}-2`"
                    :required="field.required"
                    :ref="`step-${item.step}`"
                    :checked="field.value === 'no'">
                  <label
                    :class="['label', 'radio', field.name]"
                    :for="`step-${item.step}_item-${i}-2`"
                    @click="field.value = 'no'">
                      no
                  </label>
                </div>

                <div class="form-item_field checkboxes" v-else-if="field.type === 'checkbox'">
                  <input
                    type="checkbox"
                    class="checkbox"
                    :name="field.name"
                    :id="`step-${item.step}_item-${i}`"
                    :required="field.required"
                    :ref="`step-${item.step}`"
                    :checked="Boolean(field.value)"
                    @click="field.value ? field.value = false : field.value = true">
                  <label
                    :class="['label', 'checkbox', field.name]"
                    :for="`step-${item.step}_item-${i}`">
                    {{field.label}}
                    <span v-if="field.required" style="color:red">*</span>
                  </label>
                </div>

                <div class="form-item_field" v-else-if="field.type === 'date'">
                  <label class="label" :for="`step-${item.step}_item-${i}`">
                    {{field.label}}
                    <span v-if="field.required" style="color:red">*</span>
                  </label>
                  <input
                    type="hidden"
                    class="date"
                    :name="`step-${item.step}_item-${i}`"
                    :id="`step-${item.step}_item-${i}`"
                    v-model="field.value"
                    :required="field.required"
                    :ref="`step-${item.step}`">
                  <date-picker
                    type="date"
                    :id="`date-${item.step}`"
                    :value="new Date(field.value)"
                    @input="field.value = $event"
                    @clear="field.value = ''">
                  </date-picker>
                </div>

                <!-- eslint-disable-next-line -->
                <div class="form-item_field signature-wrapper" v-else-if="field.type === 'signature'">
                  <p>{{field.label}}</p>
                  <input
                    type="hidden"
                    class="signature"
                    :name="field.name"
                    v-model="field.value"
                    :id="`step-${item.step}_item-${i}`"
                    :ref="`step-${item.step}`"
                    required>
                  <vueSignature
                    class="signature"
                    :id="`signature-${item.step}`"
                    :ref="`signature-${item.step}`"
                    :sigOption="signOption"
                    :defaultUrl="field.value"
                    :w="'99.7%'" :h="'250px'">
                  </vueSignature>
                  <div class="buttons signature">
                    <button @click.prevent="save(i)">Save</button>
                    <button @click.prevent="clear(i)">Clear</button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div class="buttons">
            <button v-if="step > 0" class="btn-back" @click="prevStep()">back</button>
            <!-- eslint-disable-next-line -->
            <button class="btn-next" v-if="step < totalSteps" @click.prevent="submit()" type="submit">Next</button>
            <button class="btn-next" v-else @click.prevent="sendForm()" type="submit">Done</button>
          </div>

        </form>

      </main>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import firebase from 'firebase'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      applicationData: this.$store.getters.applicationData,
      preApplicationPage: true,
      signOption: {
        penColor:"blue",
        backgroundColor:"rgb(255,255,255)"
      },
      worksheet: {},
      url: null
    };
  },
  methods: {
    ...mapMutations(['prevStep', 'nextStep']),

    b64toBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: 'image/png' });
    },

    async save(i){
      const canvas = this.$refs[`signature-${this.step}`][0]
      const input = this.$refs[`step-${this.step}`].find(i => i.className === 'signature')
			const png = canvas.save()
      document.getElementById(`signature-${this.step}`).children[0].removeAttribute('style')

      const filename = String("signature_" + this.step + "_" + Date.now())

      const blob = this.b64toBlob(png);
      const storageRef = firebase.storage().ref("signatures/" + filename + ".png")
        this.url = await storageRef.put(blob).then(function(result) {
          return storageRef.getDownloadURL().then(data => {
            return data
          })
        })

      input.value = this.url
      input.dispatchEvent(new Event('input'))
      alert('Signature is saved')
    },

		clear(i){
      const canvas = this.$refs[`signature-${this.step}`][0]
      const input = this.$refs[`step-${this.step}`].find(i => i.className === 'signature')

			canvas.clear()
      input.value = ''
      input.dispatchEvent(new Event('input'))
		},
    submit() {
      // removing red borders
      let inp = document.getElementsByTagName('input'),
          dateInp = document.getElementById(`date-${this.step}`),
          radios = document.querySelectorAll(`label.radio`),
          checkboxes = document.querySelectorAll(`label.checkbox`)

      // if (inp) inp.forEach(el => el.removeAttribute("style"))
      if (dateInp) dateInp.children[0].children[0].removeAttribute("style")
      if (radios) radios.forEach(el => el.removeAttribute("style"))
      if (checkboxes) checkboxes.forEach(el => el.removeAttribute("style"))

      // getting prev step form
      Object.keys(this.$refs).forEach( refStep => {
        if(refStep.split('-').shift() !== 'signature') {
          const refStepCurrent = Number(refStep.split('-').pop())

          // check inputs in current step form
          if (refStepCurrent === this.step) {
            const refCurrent = this.$refs[`step-${refStepCurrent}`]
            if (refCurrent.length) {
              let isAllFilled = true

              this.$refs[refStep].forEach( input => {
                // check if required
                if (input.attributes.required) {
                  // check input type
                  if(input.className === 'radio' || input.className === 'checkbox') {
                    let group = input.attributes.name.value,
                        selected = document.querySelectorAll(`[name=${group}]:checked`)

                    if( selected.length === 0 ) {
                      document.querySelectorAll(`label.${group}`).forEach(r => {
                        r.style.color = 'red'
                      })
                      isAllFilled = false
                    }

                  } else if(!input.value.trim()) {

                    if(input.className === 'signature') document.getElementById(`signature-${this.step}`).children[0].style.borderColor = 'red'
                    if(input.className === 'date') document.getElementById(`date-${this.step}`).children[0].children[0].style.borderColor = 'red'
                    if(input.className === 'text') document.getElementById(input.attributes.id.nodeValue).style.borderColor = 'red'
                    isAllFilled = false

                  }

                }
              })

              if (isAllFilled) {
                window.scrollTo(0, 0)
                this.nextStep()
              }
            }
          }
        }
      });
    },
    async sendForm() {
      this.submit()

      this.worksheet = localStorage.getItem('vuex')

      try {
        const data = JSON.parse(this.worksheet).applicationData.data
        const filename = `${data[0].fields[0].value}_${data[0].fields[1].value}_${data[0].fields[2].value} (${new Date(Date.now())})`

        await axios.post('https://trucks-xpress.herokuapp.com/contract', { filename, data })
        await this.$store.dispatch('uploadWorksheet', { worksheet: this.worksheet })

        console.log('success uploading')

        await this.$router.push('/')
        location.reload()
        localStorage.removeItem('vuex')
      } catch (error) {
        console.log(error)
      }

    }
  },
  computed: {
    ...mapState(['company', 'step']),
    totalSteps() {
      return Math.max(...this.applicationData.map( i => i.step ))
    },
  }
};
</script>
