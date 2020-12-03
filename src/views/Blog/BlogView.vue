<template>
    <q-page class="text-white">
        <loading-alert :display="displayLoading"></loading-alert>
        <div v-if="Object.keys(data).length !== 0">
            <div class="row">
                <q-img :src="data.bannerLocation" style="max-height: 400px;" />
            </div>
            <div class="row q-pa-md">
                <div class="col desktop-only"></div>
                <div class="col-lg-6 col-sm-12 col-xs-12 q-mb-xl">
                    <q-btn
                        class="q-mt-xl q-mb-md"
                        color="warning"
                        label="volver"
                        size="sm"
                        :to="`/blog`"
                    />
                    <h4 style="margin-bottom: 10px; margin-top: 10px">
                        {{ data.title }}
                    </h4>
                    <div class="text-subtitle2 q-mb-md">
                        Por:
                        <span class="text-primary">{{ data.by.name }}</span>
                        - Publicado:
                        <span class="text-primary">{{
                            returnFormatedTime(data.creationTime)
                        }}</span>
                    </div>
                    <q-separator dark class="q-mb-md" />
                    <div
                        class="text-body2 q-mb-md blog-content"
                        v-html="data.body"
                    ></div>
                </div>
                <div class="col desktop-only"></div>
            </div>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import moment from 'moment'

export default {
    data() {
        return {
            data: [],
            displayLoading: false,
        }
    },
    methods: {
        returnFormatedTime(time) {
            return moment(time).format('DD/MM/YYYY')
        },
    },
    mounted() {
        this.displayLoading = true
        api.getBlogById({id: this.$route.params.id})
            .then(response => {
                this.data = response.data.data
            })
            .then(() => {
                this.displayLoading = false
            })
            .catch(err => {
                console.log(err)
            })
    },
    beforeMount() {
        window.scrollTo(0, 0)
    },
}
</script>

<style>
.blog-content * {
    color: #fff;
}
</style>
