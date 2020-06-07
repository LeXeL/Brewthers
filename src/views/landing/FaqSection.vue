<template>
    <div class="pattern-bg faq-section">
        <h2 class="title-section">FAQ</h2>
        <h4 class="desktop-only">
            ¿Tienes alguna duda o necesitas ayuda? Chequea estas preguntas
            frecuentes para ver si encuentras la información que estas buscando.
        </h4>
        <div v-for="(faq, i) in faqs" :key="i">
            <h5 @click="hideAllQuestionExceptSelected(i)" class="desktop-only">{{ faq.q }}</h5>
            <h5 @click="displayFaqPrompt(i)" class="mobile-only">{{ faq.q }}</h5>
            <q-slide-transition class="desktop-only">
                <div v-show="faq.show">
                    <p v-html="faq.a">{{ faq.a }}</p>
                </div>
            </q-slide-transition>
        </div>
        <q-dialog v-model="faqPrompt">
            <q-card dark style="background-color: #111;">
                <q-card-section v-html="faqs[promptAns].a">{{ faqs[promptAns].a }}</q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="¡Fino!" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            faqPrompt: false,
            promptAns: 0,
            faqs: [
                {
                    q: '¿Cómo me contacto con Brewthers?',
                    a:
                        'R. Favor dirigirse a la sección de <strong><a href="#contact" style="color: #27a3c3">Contáctenos</a></strong>',
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
                    a:
                        'R. Al momento de realizar su pedido, tendrá la oportunidad de cancelar el mismo si no ha sido contactado por personal de Brewthers. En caso de no poder hacerlo y ser contactado, solo debe notificarnos y nosotros cancelaremos el pedido. De igual manera, se traté de hacer una corrección, quitar o añadir un producto a su pedido, una vez es contactado por personal de Brewthers se hará una revisión de su pedido, donde usted tendrá la oportunidad de indicarnos las modificaciones que se le deban hacer al mismo. Es importante señalar que tendrá opciones limitadas a 3 cambios por su número de orden.',
                    show: false,
                },
                {
                    q: '¿Cuál es su Política de Privacidad?',
                    a:
                        'Para leer sobre nuestras politicas de privacidad, puede entrar <strong><a href="#" style="color: #27a3c3">aqui</a></strong>.',
                    show: false,
                },
                {
                    q: '¿Cuáles son sus Términos y Condiciones?',
                    a:
                        'Para leer sobre nuestros terminos de condiciones, puedes entrar <strong><a href="#" style="color: #27a3c3">aqui</a></strong>.',
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
        displayFaqPrompt(index) {
            this.promptAns = index
            this.faqPrompt = true
        },
    },
}
</script>

<style></style>
