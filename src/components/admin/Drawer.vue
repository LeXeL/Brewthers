<template>
    <q-drawer v-model="showDrawer" show-if-above :width="300" :breakpoint="400" dark>
        <q-scroll-area style="height: calc(100% - 150px);">
            <q-list padding>
                <q-item active clickable v-ripple to="/admin">
                    <q-avatar rounded>
                        <i class="fas fa-home" style="font-size: 15px;"></i>
                    </q-avatar>
                    <q-item-section>Inicio</q-item-section>
                </q-item>
                <q-item active clickable v-ripple to="/accounts-manager">
                    <q-avatar rounded>
                        <i class="fas fa-user-circle" style="font-size: 15px;"></i>
                    </q-avatar>
                    <q-item-section>Cuentas</q-item-section>
                </q-item>
                <q-item active clickable v-ripple>
                    <q-avatar rounded>
                        <i class="fas fa-dolly" style="font-size: 15px;"></i>
                    </q-avatar>
                    <q-item-section>Pedidos</q-item-section>
                </q-item>
                <q-item active clickable v-ripple>
                    <q-avatar rounded>
                        <i class="fas fa-boxes" style="font-size: 15px;"></i>
                    </q-avatar>
                    <q-item-section>Inventario</q-item-section>
                </q-item>
                <q-item active clickable v-ripple to="/brewing-houses">
                    <q-avatar rounded>
                        <i class="fas fa-beer" style="font-size: 15px;"></i>
                    </q-avatar>
                    <q-item-section>Casas cervezeras</q-item-section>
                </q-item>
                <q-item active clickable v-ripple>
                    <q-avatar rounded>
                        <i class="fas fa-file-alt" style="font-size: 15px;"></i>
                    </q-avatar>
                    <q-item-section>Reportes</q-item-section>
                </q-item>
                <q-item active clickable v-ripple>
                    <q-avatar rounded>
                        <i class="fas fa-rss" style="font-size: 15px;"></i>
                    </q-avatar>
                    <q-item-section>Blog</q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<script>
export default {
    props: ['showDrawer'],
}
</script>