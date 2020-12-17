<template>
    <q-drawer
        v-model="showDrawer"
        :overlay="mobileDrawer"
        :width="300"
        :breakpoint="400"
        side="left"
        dark
        elevated
    >
        <q-scroll-area style="height: calc(100% - 150px);">
            <q-list padding>
                <q-item
                    active
                    clickable
                    v-ripple
                    v-for="(link, i) in drawerLinks"
                    :key="i"
                    :to="link.link"
                    class="text-white"
                >
                    <q-avatar rounded>
                        <i :class="link.icon" style="font-size: 15px;"></i>
                    </q-avatar>
                    <q-item-section>{{ link.name }}</q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<script>
export default {
    props: ['showDrawer'],
    data() {
        return {
            desktopDrawer: true,
            mobileDrawer: false,
            drawerLinks: [
                {
                    name: 'Inicio',
                    link: '/admin',
                    icon: 'fas fa-home',
                },
                {
                    name: 'Cuentas',
                    link: '/accounts-manager',
                    icon: 'fas fa-user-circle',
                },
                {
                    name: 'Exclusividad y precios',
                    link: '/exclusiveness-and-prices',
                    icon: 'fas fa-dollar-sign',
                },
                {
                    name: 'Ordenes',
                    link: '/orders-manager',
                    icon: 'fas fa-dolly',
                },
                {
                    name: 'Inventario',
                    link: '/inventory-manager',
                    icon: 'fas fa-boxes',
                },
                {
                    name: 'Casas cerveceras',
                    link: '/brewing-houses',
                    icon: 'fas fa-beer',
                },
                {
                    name: 'Reportes',
                    link: '/admin-reports',
                    icon: 'fas fa-file-alt',
                },
                {
                    name: 'Blog',
                    link: '/blog-manager',
                    icon: 'fas fa-rss',
                },
                {
                    name: 'Mi inventario',
                    link: '/my-inventory',
                    icon: 'fas fa-boxes',
                },
                {
                    name: 'Clientes',
                    link: '/clients',
                    icon: 'fas fa-utensils',
                },
            ],
        }
    },
    beforeMount() {
        if (this.$q.platform.is.mobile) this.mobileDrawer = true
    },
}
</script>
