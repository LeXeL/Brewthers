<template>
    <div class="pattern-bg faq-section">
        <h2 class="title-section">FAQ</h2>
        <h4 class="desktop-only">
            ¿Tienes alguna duda o necesitas ayuda? Chequea estas preguntas frecuentes
            para ver si encuentras la información que estas buscando.
        </h4>
        <div v-for="(faq, i) in faqs" :key="i">
            <h5 @click="hideAllQuestionExceptSelected(i)">{{ faq.q }}</h5>
            <q-slide-transition>
                <div v-show="faq.show">
                    <p>{{ faq.a }}</p>
                </div>
            </q-slide-transition>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            faqs: [
                {
                    q: '¿Cómo me contacto con Brewthers?',
                    a: 'asdaf',
                    show: false,
                },
                {
                    q: '¿Cuál es su política para cambios de producto?',
                    a:
                        'R. Una vez el pedido es creado, realizamos una llamada al local comercial responsable del mismo para corroborar y confirmar que el pedido que tenemos registrado está completo y correcto. Al momento de realizar la entrega del producto se hará una revisado en sitio del producto entregado por parte de Brewthers, con la finalidad de comprobar se encuentra en buen estado. Todo esto se hará en presencia de una persona asignada por el local comercial',
                    show: true,
                },
                {
                    q:
                        '¿Cómo puedo realizar cambios o cancelaciones en mis pedidos?',
                    a: 'asdaf',
                    show: false,
                },
                {
                    q: '¿Cuál es su Política de Privacidad?',
                    a: 'asdaf',
                    show: false,
                },
                {
                    q: '¿Cuáles son sus Términos y Condiciones?',
                    a: 'asdaf',
                    show: false,
                },
            ],
        }
    },
    methods: {
        hideAllQuestionExceptSelected(index) {
            this.faqs.forEach((faq, i) => {
                if (i === index) {
                    this.faqs[i].show = true
                    return
                }
                this.faqs[i].show = false
            })
        },
    },
}
</script>

<style></style>
