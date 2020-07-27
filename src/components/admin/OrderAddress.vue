<template>
    <div>
        <q-input
            filled
            dark
            type="text"
            label="Direccion de entrega"
            :value="data[0].address"
            class="q-mb-md"
            readonly
        />
        <p>
            <iframe
                :src="`https://maps.google.com/maps?q=${data[0].location.lat}, ${data[0].location.lng}&z=15&output=embed`"
                height="450"
                frameborder="0"
                style="border:0;"
                allowfullscreen
                aria-hidden="false"
                tabindex="0"
            ></iframe>
        </p>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
}
</script>