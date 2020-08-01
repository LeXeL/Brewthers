<template>
    <q-item>
        <q-item class="full-width">
            <q-avatar rounded>
                <img :src="item.photoLocation" />
            </q-avatar>
            <q-item-section>
                <span class="on-right">{{item.name}}</span>
                <span class="on-right">
                    <i class="fas fa-minus q-mr-sm" style="color: #27a3c3; cursor: pointer;"></i>
                    {{item.amount}}
                    <i
                        class="fas fa-plus on-right q-ml-sm"
                        style="color: #27a3c3; cursor: pointer;"
                    ></i>
                </span>
            </q-item-section>

            <q-item-section side>
                <span class="on-left">${{parseFloat(item.price).toFixed(2)}} c/u</span>
            </q-item-section>
            <q-item-section side>
                <q-spinner-ios color="red-7" size="2em" v-if="spinner" />
                <i
                    v-if="!spinner"
                    class="fas fa-times"
                    style="font-size: 20px; cursor: pointer;"
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