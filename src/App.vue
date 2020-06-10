<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import * as api from '@/api/api'
export default {
    computed: {
        uid() {
            return this.$store.getters.uid
        },
        user() {
            return this.$store.getters.user
        },
    },
    watch: {
        uid(newValue, oldValue) {
            if (newValue != null && this.user === '') {
                //llamar al api para settiar el user de acuerdo al whoami
                console.log('Esta logeado pero no tenemos info de el')
                api.getuserinformatiobyid({uid: this.uid}).then(response => {
                    console.log(response)
                })
            }
        },
    },
}
</script>