<template>
    <q-page>
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="blog-bg" style="height: 400px"></div>
        <div class="row q-pa-md" v-if="Object.keys(blogs).length !== 0">
            <div class="col desktop-only"></div>
            <div class="col-lg-6 col-sm-12 col-xs-12 q-mb-xl">
                <h4>BIENVENIDO A BREWTHERS BLOG</h4>
                <q-separator dark />
                <div
                    style="padding: 35px 0; border-bottom: solid 2px #27a3c3"
                    v-for="(blog, i) in this.blogs"
                    :key="i"
                >
                    <div class="text-h5">{{ blog.title }}</div>
                    <div class="text-subtitle2">
                        Por:
                        <span class="text-primary">{{ blog.by.name }}</span>
                        - Publicado:
                        <span class="text-primary">{{
                            returnFormatedTime(blog.createdTime)
                        }}</span>
                    </div>
                    <br />
                    <div class="text-body2" v-html="blog.body"></div>
                    <div class="row">
                        <q-space />
                        <q-btn
                            class="q-mt-md"
                            color="info"
                            label="leer mas"
                            size="sm"
                            :to="`blog/${blog.id}`"
                        />
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import moment from 'moment'
export default {
    data() {
        return {
            blogs: [],
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        returnFormatedTime(time) {
            return moment(time).format('DD/MM/YYYY')
        },
    },
    watch: {
        blogs(newValue, oldValue) {
            if (newValue.length > 0) {
                this.sortedBlogs = newValue.sort((a, b) => {
                    return moment(b.createdTime).diff(a.createdTime)
                })
            }
        },
    },
    mounted() {
        this.displayLoading = true
        api.returnPublicBlogs()
            .then(response => {
                this.blogs = response.data.data
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

