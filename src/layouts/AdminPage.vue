<template>
    <q-layout view="hHh lpR fFf" class="brewthers-dark-bg">
        <admin-navbar @toggleCart="drawer = !drawer" />
        <admin-drawer :showDrawer="drawer" />
        <q-page-container>
            <div class="q-pa-md">
                <div class="text-h5">Bienvenido, Fulanito</div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import Navbar from '@/components/admin/Navbar'
import Drawer from '@/components/admin/Drawer'

export default {
    data() {
        return {
            drawer: true,
        }
    },
    methods: {
        async logout() {
            firebase
                .auth()
                .signOut()
                .then(async () => {
                    await this.$store.dispatch('UserLogout')
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    components: {
        'admin-navbar': Navbar,
        'admin-drawer': Drawer,
    },
}
</script>

<style lang="scss" scoped>
</style>