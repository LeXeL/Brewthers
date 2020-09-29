<template>
    <div class="blog-bg" style="position: relative">
        <h2 class="title-section absolute-center">blog</h2>
        <q-input
            rounded
            standout
            v-model="email"
            label="Rounded standout"
            class="title-section absolute-center"
        />
        <q-btn
            class="q-mt-md title-section absolute-center"
            color="info"
            label="leer mas"
            size="sm"
            @click="addToEmailToNewsLetter()"
        />
        <router-link
            to="/blog"
            class="title-section-link absolute-bottom q-pb-xl"
            >leer más</router-link
        >
    </div>
</template>
<script>
import * as api from '@/api/api'
export default {
    data() {
        return {
            email: '',
        }
    },
    methods: {
        addToEmailToNewsLetter() {
            if (this.email != '') {
                api.addToNewsletter({userEmail: this.email}).then(response => {
                    console.log(response)
                })
            }
        },
    },
}
</script>