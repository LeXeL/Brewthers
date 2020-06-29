<template>
    <div
        class="pattern-bg q-pa-xl"
        style="height: auto; background-repeat: repeat-y; background-position: top;"
    >
        <div class="row q-mb-lg q-mt-xl justify-center">
            <q-btn-group
                push
                class="desktop-only"
                style="font-family: GilroyExtraBold;"
            >
                <q-btn
                    color="primary"
                    push
                    label="Cervezas"
                    @click="categorySelected = 'beer'"
                />
                <q-btn
                    color="primary"
                    push
                    label="T-shirts"
                    @click="categorySelected = 'tshirt'"
                />
                <q-btn
                    color="primary"
                    push
                    label="Gorras"
                    @click="categorySelected = 'cap'"
                />
                <q-btn
                    color="primary"
                    push
                    label="Vasos"
                    @click="categorySelected = 'cup'"
                />
                <q-btn
                    color="primary"
                    push
                    label="Todo"
                    @click="categorySelected = 'all'"
                />
            </q-btn-group>
            <q-select
                filled
                v-model="categorySelected"
                :options="options"
                label="Categoria"
                class="mobile-only full-width"
                dark
                emit-value
            />
        </div>
        <div class="row q-mb-lg">
            <div class="text-h6 text-center full-width">
                Todo pedido de mercancia debe ser realizado a traves denuestro
                numero de Whatsapp o Instagram.
            </div>
            <div
                class="text-h6 text-center full-width"
                style="font-family: GilroyLight; font-size: 15px;"
                v-if="categorySelected == 'beer'"
            >
                ¿Interesado en comprar caja o keg? ¡Dirígete a Contáctanos!
            </div>
        </div>
        <div class="row">
            <div
                class="col-lg-3 col-md-3 col-sm-3 q-pa-md"
                v-for="(item, i) in categoryFilter"
                :key="i"
            >
                <img
                    :src="require(`@/assets/tiendita-items/${item.photo}`)"
                    width="100%"
                />
                <div
                    class="text-h6 text-center"
                    style="font-family: GilroyExtraBold;"
                >
                    {{ item.name }} - ${{ item.price.toFixed(2) }}
                </div>
            </div>
        </div>
        <div class="row">
            <p class="title-section-link full-width" style="text-align: center">
                <i
                    class="fas fa-chevron-up"
                    style="font-size: 40px;"
                    @click="$emit('toggleSection')"
                ></i>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categorySelected: 'all',
            // options: ['beer', 'tshirt', 'cap', 'cup', 'all'],
            // options: {
            //     camiseta: 'tshirt',
            //     pitas: 'beer',
            //     gorras: 'cap',
            //     vasos: 'cup',
            //     todo: 'all',
            // },
            options: [
                {
                    label: 'Pintas',
                    value: 'beer',
                },
                {
                    label: 'T-shirts',
                    value: 'tshirt',
                },
                {
                    label: 'Gorras',
                    value: 'cap',
                },
                {
                    label: 'Vasos',
                    value: 'cup',
                },
                {
                    label: 'Todo',
                    value: 'all',
                },
            ],
            items: [
                {
                    name: 'Logo Brewthers',
                    price: 17,
                    photo: 'item_1.jpg',
                    category: 'tshirt',
                },
                {
                    name: 'Una es Ninguna',
                    price: 17,
                    photo: 'item_2.jpg',
                    category: 'tshirt',
                },
                {
                    name: 'Brewthers',
                    price: 17,
                    photo: 'item_3.jpg',
                    category: 'beer',
                },
                {
                    name: 'Brewthers Owl',
                    price: 17,
                    photo: 'item_4.jpg',
                    category: 'cap',
                },
                {
                    name: 'Brewthers Owl',
                    price: 17,
                    photo: 'item_5.jpg',
                    category: 'cup',
                },
            ],
        }
    },
    computed: {
        categoryFilter() {
            let items = []
            for (let item of this.items) {
                if (item.category === this.categorySelected) items.push(item)
                if (this.categorySelected === 'all') items.push(item)
            }
            return items
        },
    },
}
</script>

<style></style>
