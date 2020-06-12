<template>
    <div class="pattern-bg" style="height: auto;">
        <div class="row us-content">
            <div class="col q-pt-xl q-pl-xl q-pr-xl">
                <p>Brewthers es el emprendimiento de 3 amigos que les gusta mucho la cerveza y tiene como misión, ser el principal enlace entre las nano, micro y cervecerías panameñas y todo aquel con ganas de tomar buena cerveza.</p>
                <p>Con la idea de apoyar a la cultura cervecera, queremos convertirnos en el punto de contacto para todo el que quiera aprender, conocer y disfrutar de la buena cerveza.</p>
            </div>
        </div>
        <div class="row q-pb-xl">
            <div
                class="col-lg-4 col-md-4 us-partner-tile q-pt-xl q-pl-xl q-pr-xl"
                v-for="(partner, i) in partners"
                :key="i"
            >
                <img :src="require(`@/assets/${partner.pic}`)" width="100%" />
                <p>
                    {{ partner.name }}
                    <br />
                    {{ partner.rol }}
                </p>
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
            partners: [
                {
                    name: 'Diego Gomez',
                    rol: 'Gerente Marketing',
                    pic: 'photo_1.jpg',
                },
                {
                    name: 'Francesco Mosca',
                    rol: 'Gerente Comercial',
                    pic: 'photo_2.jpg',
                },
                {
                    name: 'Plinio Samaniego',
                    rol: 'Gerente Operaciones',
                    pic: 'photo_3.jpg',
                },
            ],
        }
    },
}
</script>

<style></style>
