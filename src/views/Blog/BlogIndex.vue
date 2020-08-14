<template>
    <q-page>
        <div class="blog-bg" style="height: 400px;"></div>
        <div class="row q-pa-md">
            <div class="col desktop-only"></div>
            <div class="col-lg-6 col-sm-12 col-xs-12 q-mb-xl">
                <h4>BIENVENIDO A BREWTHERS BLOG</h4>
                <q-separator dark />
                <div
                    style="padding: 35px 0; border-bottom: solid 2px #27a3c3"
                    v-for="(blog, i) in 3"
                    :key="i"
                >
                    <div class="text-h5">Blog title</div>
                    <div class="text-subtitle2">
                        Por:
                        <span class="text-primary">Nombre de la persona</span>
                        - Publicado:
                        <span class="text-primary">15-5-2020</span>
                    </div>
                    <br />
                    <div
                        class="text-body2"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat at mauris id venenatis. Suspendisse potenti. Praesent ornare, eros et sodales ornare, nisi ex ullamcorper libero, sit amet luctus massa turpis ut turpis. Vestibulum tincidunt arcu a sapien suscipit, quis porttitor orci accumsan. Nullam enim purus, imperdiet a nunc et, pellentesque pellentesque sapien.</div>
                    <div class="row">
                        <q-space />
                        <q-btn
                            class="q-mt-md"
                            color="info"
                            label="leer mas"
                            size="sm"
                            :to="`blog/id`"
                        />
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
</template>

<script>
export default {
    beforeMount() {
        window.scrollTo(0, 0)
    },
}
</script>

