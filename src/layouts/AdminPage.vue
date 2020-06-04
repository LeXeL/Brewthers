<template>
    <q-layout>
        <q-page-container>
            SUPER SECRET ADMIN
            <q-page>
                <q-btn @click="logout()" color="primary">logout</q-btn>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
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
}
</script>

<style lang="scss" scoped>
</style>