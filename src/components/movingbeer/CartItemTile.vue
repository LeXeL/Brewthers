<template>
    <q-item clickable ripple>
        <q-item class="full-width">
            <q-avatar rounded>
                <img :src="item.photoLocation" />
            </q-avatar>
            <q-item-section>
                <span class="on-right">{{item.name}}</span>
                <span class="on-right">Cant. {{item.amount}}</span>
            </q-item-section>

            <q-item-section side>
                <span class="on-left">${{parseFloat(item.price).toFixed(2)}} c/u</span>
            </q-item-section>
            <q-item-section side>
                <q-spinner-ios color="red-7" size="2em" v-if="spinner" />
                <i
                    v-if="!spinner"
                    class="fas fa-times"
                    style="font-size: 20px;"
                    @click="deleteItemFromCart(item)"
                ></i>
            </q-item-section>
        </q-item>
    </q-item>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            spinner: false,
        }
    },
    methods: {
        deleteItemFromCart(item) {
            this.spinner = true
            this.$emit('deleteItemFromCart', item)
        },
    },
}
</script>

<style lang="scss" scoped>
</style>