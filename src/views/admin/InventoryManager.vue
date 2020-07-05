<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Administrador de inventario</div>
        <div class="row">
            <div class="col-lg-8 q-pa-md">
                <inventory-manager-table />
            </div>
            <div class="col-lg-4 q-pa-md">
                <inventory-manager-form />
            </div>
        </div>
    </div>
</template>

<script>
import InventoryManagerTable from '@/components/admin/InventoryManagerTable'
import InventoryManagerForm from '@/components/admin/InventoryManagerForm'

export default {
    components: {
        'inventory-manager-table': InventoryManagerTable,
        'inventory-manager-form': InventoryManagerForm,
    },
}
</script>