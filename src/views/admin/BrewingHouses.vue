<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Administrador de casas cerveceras</div>
        <div class="row">
            <div class="col-lg-8 q-pa-md">
                <brewing-houses-table />
            </div>
            <div class="col-lg-4 q-pa-md">
                <brewing-houses-form />
            </div>
        </div>
    </div>
</template>

<script>
import BrewingHousesTable from '@/components/admin/BrewingHousesTable'
import BrewingHousesForm from '@/components/admin/BrewingHousesForm'

export default {
    components: {
        'brewing-houses-table': BrewingHousesTable,
        'brewing-houses-form': BrewingHousesForm,
    },
}
</script>