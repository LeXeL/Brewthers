<template>
    <footer>
        <div class="row">
            <div class="col-lg-3 col-md-4 desktop-only">
                <img src="@/assets/brewthers-logo.png" width="60%" />
            </div>
            <div class="col-lg-3 col-md-4 q-pr-md">
                <div class="text-h6" style="font-family: GilroyExtraBold">Navegación</div>
                <ul>
                    <li v-for="(link, i) in links" :key="i">
                        <a :href="link.landing" v-smooth-scroll style="text-decoration: none;">
                            {{
                            link.text
                            }}
                        </a>
                    </li>
                    <li>
                        <router-link
                            to="/terminos-y-condiciones"
                            style="text-decoration: none;"
                        >Terminos & Condiciones</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-4 q-pr-md">
                <div class="text-h6" style="font-family: GilroyExtraBold">Contacto</div>
                <p style="margin-top: 12px;">(+507) 236-1111</p>
                <p>correo@brewthersco.com</p>
            </div>
            <div class="col-lg-3 col-md-4 q-pr-md">
                <div
                    class="text-h6"
                    style="font-family: GilroyExtraBold; margin-bottom: 12px;"
                >Conectate</div>
                <a href="https://www.instagram.com/brew.thers/" target="_blank">
                    <i class="fab fa-instagram" style="font-size: 40px;"></i>
                </a>
                <a href="https://www.facebook.com/brew.thers3/" class="on-right" target="_blank">
                    <i class="fab fa-facebook" style="font-size: 40px;"></i>
                </a>
                <br />
                <br />
                <span>
                    {{ new Date().getFullYear() }} &copy; Developed by.
                    <a
                        href="#"
                        style="color: #27a3c3; text-decoration: none;"
                    >BlueBalloon Inc.</a>
                </span>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    props: ['page'],
    data() {
        return {
            links: [
                {
                    text: 'inicio',
                    landing: '#hero',
                    movingbeer: '#',
                    name: 'tab1',
                },
                {
                    text: 'nosotros',
                    landing: '#title',
                    movingbeer: '#',
                    name: 'tab2',
                },
                {
                    text: 'blog',
                    landing: '#blog',
                    movingbeer: '#',
                    name: 'tab3',
                },
                {
                    text: 'tiendita',
                    landing: '#tienditatitle',
                    movingbeer: '#',
                    name: 'tab4',
                },
                {
                    text: 'movingbeer',
                    landing: '#movingbeer',
                    movingbeer: '#',
                    name: 'tab5',
                },
                {
                    text: 'faq',
                    landing: '#faq',
                    movingbeer: '#',
                    name: 'tab6',
                },
                {
                    text: 'contáctanos',
                    landing: '#contact',
                    movingbeer: '#',
                    name: 'tab7',
                },
            ],
        }
    },
}
</script>
