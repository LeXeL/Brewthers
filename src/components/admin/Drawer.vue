<template>
    <q-drawer
        v-model="showDrawer"
        :show-if-above="desktopDrawer"
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
                    link: '',
                    icon: 'fas fa-rss',
                },
            ],
        }
    },
    beforeMount() {
        if (this.$q.platform.is.desktop) {
            this.desktopDrawer = true
            this.mobileDrawer = false
        } else {
            this.desktopDrawer = false
            this.mobileDrawer = true
        }
    },
}
</script>
