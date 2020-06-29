<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Administrador de cuentas</div>
        <div class="row q-mb-lg">
            <div class="col-lg-6 q-pa-md">
                <active-accounts-table />
            </div>
            <div class="col-lg-6 q-pa-md">
                <pending-accounts-table />
                <admin-accounts-table @openDialog="openNewAdminAccountDialog" />
            </div>
        </div>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px" dark>
                <q-card-section>
                    <div class="text-h6">Nueva cuenta de administrador</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input label="Nombre" class="q-mb-md" dark filled type="text" />
                    <q-input label="Apellido" class="q-mb-md" dark filled type="text" />
                    <q-input label="Correo" class="q-mb-md" dark filled type="email" />
                    <q-input label="Contraseña" class="q-mb-md" dark filled type="password" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Crear" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import ActiveAccountsTable from '@/components/admin/ActiveAccountsTable'
import PendingAccoutsTable from '@/components/admin/PendingAccountsTable'
import AdminAccountsTable from '@/components/admin/AdminAccountsTable'

export default {
    data() {
        return {
            prompt: false,
        }
    },
    methods: {
        openNewAdminAccountDialog() {
            this.prompt = true
        },
    },
    components: {
        'active-accounts-table': ActiveAccountsTable,
        'pending-accounts-table': PendingAccoutsTable,
        'admin-accounts-table': AdminAccountsTable,
    },
}
</script>