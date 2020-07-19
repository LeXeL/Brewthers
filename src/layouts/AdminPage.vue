<template>
    <q-layout view="hHh lpR fFf" class="brewthers-dark-bg">
        <!-- NAVBAR -->
        <admin-navbar @toggleCart="drawer = !drawer" />
        <!-- END NAVBAR -->

        <!-- DRAWER -->
        <admin-drawer :showDrawer="drawer" />
        <!-- END DRAWER -->

        <!-- CONTENT -->
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
        <!-- END CONTENT -->
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
            drawer: false,
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

<style lang="scss" scoped></style>
