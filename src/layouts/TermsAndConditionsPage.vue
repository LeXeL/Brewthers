<template>
    <q-layout view="lHh Lpr lFf" class="brewthers-dark-bg">
        <generic-navbar />
        <q-page-container>
            <q-page>
                <div class="row">
                    <div class="col"></div>
                    <div class="col-6">
                        <div class="text-h4 text-center">TÉRMINOS Y CONDICIONES</div>
                        <div
                            class="text-h5"
                        >1- Términos y Condiciones de Uso y Compra del Sitio “BREWTHERS”.</div>
                        <div class="text-body2 text-justify">
                            El presente documento contiene los términos y condiciones que regulan el uso de
                            <a
                                href="http://www.brewthersco.com"
                            >www.brewthersco.com</a> (“Sitio”) así como del contrato (en adelante los “Términos y Condiciones”) que vincula a el/los usuario/s (en adelante “Usted”/”su” / “Comprador/”) con BREWTHERS (en adelante “nosotros” / “nuestro” / “el Vendedor”) en relación con los productos y/o servicios que ofrecemos a través de nuestro sitio web
                            <a
                                href="http://www.brewthersco.com"
                            >www.brewthersco.com</a>.
                        </div>
                        <div
                            class="text-body2 text-justify"
                        >Exhortamos al usuario a leer, entender y aceptar todas las condiciones establecidas en los Términos y Condiciones y en las Políticas de Privacidad así como en los demás documentos incorporados a los mismos por referencia.</div>
                        <div
                            class="text-body2 text-justify"
                        >Lea atentamente los presentes Términos y Condiciones previo a su incorporación como usuario en BREWTHERS y antes de realizar el pedido. Al utilizar este sitio web o hacer un pedido a través del mismo, Usted está consciente de quedar vinculado por estos Términos y Condiciones, por lo que, si no está de acuerdo con todas las condiciones, no debe realizar ningún pedido.</div>
                        <div
                            class="text-body2 text-justify"
                        >De igual manera hacemos de su conocimiento que los “Términos y Condiciones” podrían ser modificados sin previo aviso. En caso de tener alguna pregunta relacionada con los Términos y Condiciones de compra usted podrá contactarnos a través de nuestra pestaña de “Contáctanos”.</div>
                        <div class="text-h5">
                            2- USO DEL SITIO WEB (
                            <a
                                href="http://www.brewthersco.com"
                            >www.brewthersco.com)</a>
                        </div>
                        <div
                            class="text-body2 text-justify"
                        >Estas condiciones son importantes tanto para Usted como para nosotros puesto que han sido diseñadas para crear un acuerdo legalmente vinculante entre nosotros, protegiendo sus derechos como cliente y nuestros derechos como empresa. Usted declara que, al hacer su pedido, ha leído y acepta sin reserva alguna los presentes Términos y Condiciones. Si Usted no acepta estos Términos y Condiciones, los cuales tienen un carácter obligatorio y vinculante, deberá abstenerse a utilizar el Sitio y/o los servicios y de realizar cualquier compra.</div>
                        <div class="text-body2 text-justify">Al utilizar el sitio Usted acepta que:</div>
                        <ul>
                            <li>*.-Sólo podrá hacer uso del sitio web para realizar consultas o pedidos legalmente válidos.</li>
                            <li>*.-Se obliga a facilitarnos de manera cierta y correcta su dirección de correo electrónico, dirección de envío, número telefónico, así como otros datos de contacto, y consciente que podremos hacer uso de esta información para despachar su pedido, a través de una empresa de envíos o para ponernos en contacto con usted si es necesario. Si no nos facilita toda la información requerida, no podremos tramitar su pedido. Los servicios sólo están disponibles para personas que tengan capacidad legal para contratar. Al realizar un pedido en este sitio web usted, nos garantiza que es mayor de 18 años y que tiene capacidad legal para celebrar contratos vinculantes.</li>
                        </ul>
                        <div class="text-h5">3- DISPONIBILIDAD DEL SERVICIO</div>
                        <div
                            class="text-body2"
                        >Los artículos que se ofrecen a través de este sitio web estarán disponibles solamente para ser enviados en La Ciudad de Panamá.</div>
                        <div class="text-h5">4- REALIZACIÓN DE PEDIDOS</div>
                        <div
                            class="text-body2"
                        >Para realizar un pedido, deberá seguir todos los pasos de compra online, y hacer clic en el botón “Completar compra”; posteriormente, recibirá un correo electrónico con acuse de recibo de su pedido (“Orden de compra”). Al momento de efectuar el pago de la compra, le enviaremos un correo en el que le informaremos acerca de todos los detalles del envío de la mercancía comprada.</div>
                    </div>
                    <div class="col"></div>
                </div>
            </q-page>
        </q-page-container>
        <brewthers-footer />
    </q-layout>
</template>

<script>
import GenericNavbar from '@/components/general/GenericNavbar'
import Footer from '@/components/general/Footer'

export default {
    components: {
        'generic-navbar': GenericNavbar,
        'brewthers-footer': Footer,
    },
}
</script>