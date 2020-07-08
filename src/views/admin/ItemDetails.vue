<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Detalles de articulo</div>
        <div class="row">
            <div class="col-lg-4 q-pa-md">
                <div class="row q-mb-md">
                    <q-input
                        filled
                        dark
                        label="Nombre"
                        type="text"
                        class="q-mb-md full-width"
                        :value="itemData.name"
                        disable
                    />
                    <q-input
                        filled
                        class="q-mb-md full-width"
                        dark
                        label="Estilo"
                        :value="itemData.style"
                        readonly
                    />
                    <q-input
                        filled
                        class="q-mb-md full-width"
                        dark
                        label="Presentacion"
                        :value="itemData.presentation"
                        readonly
                    />
                    <q-input
                        filled
                        class="q-mb-md full-width"
                        dark
                        label="Casa"
                        :value="itemData.house"
                        readonly
                    />
                    <q-input
                        filled
                        dark
                        label="ABV"
                        type="number"
                        class="q-mb-md full-width"
                        :value="itemData.abv"
                        disable
                    />
                    <q-input
                        filled
                        dark
                        label="IBU"
                        type="number"
                        class="q-mb-md full-width"
                        :value="itemData.abu"
                        disable
                    />
                    <q-input
                        filled
                        dark
                        label="Descripcion"
                        type="textarea"
                        class="q-mb-md full-width"
                        :value="itemData.description"
                        disable
                    />
                    <q-file filled dark label="Foto" class="q-mb-md full-width" disable>
                        <template v-slot:prepend>
                            <i class="fas fa-paperclip"></i>
                        </template>
                    </q-file>
                    <q-input
                        filled
                        dark
                        label="Precio"
                        type="number"
                        class="q-mb-md full-width"
                        :value="itemData.price"
                        disable
                    />
                    <q-btn color="info" label="Editar" class="on-left" />
                    <q-btn
                        :color="itemData.disabled == false ? 'warning' : 'secondary'"
                        :label="itemData.disabled == false ? 'deshabilitar' : 'habilitar'"
                        @click="itemData.disabled = !itemData.disabled"
                        class="on-left"
                    />
                    <q-btn color="red-7" label="Eliminar" />
                </div>
            </div>
            <div class="col-lg-4 q-pa-md">
                <q-img :src="require('@/assets/beer.jpg')" />
            </div>
            <div class="col-lg-4 q-pa-md">
                <div class="text-h6 q-mb-md">Cantidad en inventario: {{ itemData.stock }}</div>
                <q-input
                    dark
                    filled
                    v-model="addToInventory"
                    class="q-mb-md"
                    label="Agregar a inventario"
                    type="number"
                >
                    <template v-slot:after>
                        <q-btn
                            round
                            color="secondary"
                            @click="itemData.stock += parseInt(addToInventory)"
                        >
                            <i class="fas fa-plus"></i>
                        </q-btn>
                    </template>
                </q-input>
                <q-input
                    dark
                    filled
                    v-model="substractFromInventory"
                    class="q-mb-md"
                    label="Disminuir de inventario"
                    type="number"
                >
                    <template v-slot:after>
                        <q-btn
                            round
                            color="red-7"
                            @click="itemData.stock -= parseInt(substractFromInventory)"
                        >
                            <i class="fas fa-minus"></i>
                        </q-btn>
                    </template>
                </q-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemData: {
                name: 'Beer item A',
                style: 'style 1',
                presentation: 'KEG',
                house: 'House Name',
                abv: 500,
                ibu: 4.7,
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ipsum nisl, scelerisque non nibh eget, bibendum fringilla turpis.',
                photo: 'foto.jpg',
                price: 15.6,
                stock: 7,
                disabled: false,
            },
            addToInventory: null,
            substractFromInventory: null,
        }
    },
}
</script>