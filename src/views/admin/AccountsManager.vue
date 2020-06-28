<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Administrador de cuentas</div>
        <div class="row q-mb-lg">
            <div class="col-lg-6 q-pa-md">
                <active-accounts-table />
            </div>
            <div class="col-lg-6 q-pa-md">
                <pending-accounts-table />
                <admin-accounts-table />
            </div>
        </div>
    </div>
</template>

<script>
import ActiveAccountsTable from '@/components/admin/ActiveAccountsTable'
import PendingAccoutsTable from '@/components/admin/PendingAccountsTable'
import AdminAccountsTable from '@/components/admin/AdminAccountsTable'

export default {
    data() {
        return {}
    },
    components: {
        'active-accounts-table': ActiveAccountsTable,
        'pending-accounts-table': PendingAccoutsTable,
        'admin-accounts-table': AdminAccountsTable,
    },
}
</script>