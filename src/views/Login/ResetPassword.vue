    <template>
    <q-page class="pattern-bg">
        <div class="absolute-bottom"></div>
        <div class="absolute-center">
            <div class="row">
                <q-img :src="require('@/assets/logo-horizontal.png')" class="q-mb-lg" />
                <q-card dark square class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input
                                dark
                                square
                                filled
                                v-model="newPassword"
                                type="password"
                                label="Nueva contraseña"
                                :rules="[
                                        val => val.length > 0 || 'El campo es obligatorio',
                                        val => strongPass.test(val) || 'Debe tener 8 caracteres e incluir mayuscula, miniscula, numero, y caracter especial.'
                                    ]"
                            />
                            <q-input
                                dark
                                square
                                filled
                                v-model="repassword"
                                type="password"
                                label="Repite contraseña"
                                :rules="[
                                        val => val.length > 0 || 'El campo es obligatorio',
                                        val => val == form.password || 'Las contraseñas no coinciden'
                                    ]"
                            ></q-input>
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn
                            unelevated
                            color="primary"
                            size="lg"
                            class="full-width"
                            label="Cambiar Contraseña"
                            @click="updatePassword"
                        />
                    </q-card-actions>
                    <q-card-section v-if="dismissCountDown > 0">
                        <q-banner inline-actions rounded class="bg-red text-white">
                            {{errorMessage}}
                            <template v-slot:action>
                                <q-btn flat @click="dismissCountDown = 0">
                                    <i class="fas fa-times"></i>
                                </q-btn>
                            </template>
                        </q-banner>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>


<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data() {
        return {
            mode: '',
            actionCode: '',
            email: '',
            newPassword: '',
            repassword: '',
            dismissSecs: 15,
            dismissCountDown: 0,
            errorMessage: '',
            strongPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        }
    },
    methods: {
        updatePassword() {
            if (this.newPassword === this.repassword) {
                firebase
                    .auth()
                    .confirmPasswordReset(this.actionCode, this.newPassword)
                    .then(() => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage = 'Contraseña cambiada con exito!'
                        this.alertType = 'success'
                        this.displayAlert = true
                    })
                    .then(() => {
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
                    })
                    .catch(error => {
                        this.dismissCountDown = this.dismissSecs
                        this.errorMessage = error
                    })
            } else {
                this.dismissCountDown = this.dismissSecs
                this.errorMessage = 'Las Contraseñas no son iguales'
            }
        },
    },
    created() {
        this.mode = this.$route.query.mode
        this.actionCode = this.$route.query.oobCode
        firebase
            .auth()
            .verifyPasswordResetCode(this.actionCode)
            .then(email => {
                this.email = email
            })
            .catch(error => {
                this.dismissCountDown = this.dismissSecs
                this.errorMessage = error
            })
    },
}
</script>

<style scoped>
</style>