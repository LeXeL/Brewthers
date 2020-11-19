<template>
    <footer>
        <div class="row">
            <div class="col-lg-3 col-md-4 desktop-only">
                <img src="@/assets/brewthers-logo.png" width="60%" />
            </div>
            <div class="col-lg-3 col-md-4 q-pr-md">
                <div class="text-h6" style="font-family: GilroyExtraBold">
                    Navegación
                </div>
                <ul>
                    <li v-for="(link, i) in navLinks" :key="i">
                        <a :href="link.ref" v-smooth-scroll>{{ link.text }}</a>
                    </li>
                    <li>
                        <a href="#">terminos & condiciones</a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-4 q-pr-md">
                <div class="text-h6" style="font-family: GilroyExtraBold">
                    Contáctanos
                </div>
                <p>(+507) 6216-6095</p>
                <a href="mailto:brewthers3@gmail.com">brewthers3@gmail.com</a>
            </div>
            <div class="col-lg-3 col-md-4 q-pr-md">
                <div
                    class="text-h6"
                    style="font-family: GilroyExtraBold; margin-bottom: 12px;"
                >
                    Conectate
                </div>
                <a href="#">
                    <i class="fab fa-instagram" style="font-size: 40px;"></i>
                </a>
                <a href="#" class="on-right">
                    <i class="fab fa-facebook" style="font-size: 40px;"></i>
                </a>
                <br />
                <br />
                <span>
                    {{ new Date().getFullYear() }} &copy; Developed by.
                    <a href="#" style="color: #27a3c3">BlueBaloon Inc.</a>
                </span>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    props: ['links'],
}
</script>
