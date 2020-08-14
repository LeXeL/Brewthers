<template>
    <q-page>
        <div
            class="blog-bg"
            :style="{ backgroundImage: `url('https://images8.alphacoders.com/413/thumb-1920-413078.jpg')`, height: `400px` }"
        ></div>
        <div class="row q-pa-md">
            <div class="col desktop-only"></div>
            <div class="col-lg-6 col-sm-12 col-xs-12 q-mb-xl">
                <q-btn
                    class="q-mt-xl q-mb-md"
                    color="warning"
                    label="volver"
                    size="sm"
                    :to="`/blog`"
                />
                <h4 style="margin-bottom: 10px; margin-top: 10px;">TITULO DEL BLOG</h4>
                <div class="text-subtitle2 q-mb-md">
                    Por:
                    <span class="text-primary">Nombre de la persona</span>
                    - Publicado:
                    <span class="text-primary">15-5-2020</span>
                </div>
                <q-separator dark class="q-mb-md" />
                <div
                    class="text-body2 q-mb-md"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat at mauris id venenatis. Suspendisse potenti. Praesent ornare, eros et sodales ornare, nisi ex ullamcorper libero, sit amet luctus massa turpis ut turpis. Vestibulum tincidunt arcu a sapien suscipit, quis porttitor orci accumsan. Nullam enim purus, imperdiet a nunc et, pellentesque pellentesque sapien. Cras accumsan tortor ante, eu egestas enim vehicula sit amet. In consectetur urna a erat iaculis posuere.</div>
                <div
                    class="text-body2 q-mb-md"
                >Maecenas eget ante at leo luctus egestas non ut arcu. Fusce finibus lectus molestie nibh tempus tristique. Sed maximus ante a gravida porttitor. Vestibulum a odio vel enim facilisis bibendum id nec diam. Etiam quis libero sed orci finibus gravida sed sit amet ligula. Donec ac vehicula ligula, sit amet rutrum orci. Quisque laoreet diam at placerat facilisis. Proin dapibus vel enim eget interdum. Aenean quis lobortis nisi. Nunc vitae nunc interdum, viverra mauris interdum, fermentum dolor.</div>
                <div
                    class="text-body2 q-mb-md"
                >Sed nec dui eu odio viverra commodo sed nec odio. Phasellus eu lacinia ex. Nullam molestie, dui non convallis tempor, tellus nunc aliquam augue, et mattis erat lorem in odio. Sed auctor, nibh et volutpat consectetur, libero erat elementum sem, et porttitor ipsum eros viverra sem. Sed sed sem sapien. Donec volutpat imperdiet dui, a ultricies ligula sodales sed. Mauris aliquam eu est at imperdiet. Mauris pretium pretium orci sed consequat. Duis euismod bibendum vulputate. Nulla facilisi. Morbi venenatis, sapien sit amet dignissim bibendum, elit neque fringilla massa, quis tristique odio metus at est. Sed tristique mi non placerat tempor. Interdum et malesuada fames ac ante ipsum primis in faucibus.</div>
                <div
                    class="text-body2 q-mb-md"
                >Etiam lectus augue, auctor ac tempus sed, pharetra eu orci. Ut sed dolor vehicula, pharetra mi vitae, aliquam lacus. Maecenas lectus est, porttitor vitae fringilla malesuada, consectetur vel urna. Pellentesque justo diam, iaculis ut sodales eu, molestie at ipsum. Aenean vitae consequat nisi. Sed vestibulum cursus ante, et imperdiet purus. Cras sit amet mi vel massa hendrerit rutrum elementum ac lacus. Donec aliquet ex magna, quis dictum nulla consequat at. Pellentesque porta libero vel lorem malesuada iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras rhoncus leo sem, ac venenatis quam accumsan vitae. Aenean at magna venenatis, luctus ante sit amet, sodales metus.</div>
                <div
                    class="text-body2 q-mb-md"
                >Etiam tincidunt mauris sit amet urna blandit faucibus. In porttitor tincidunt est. Nullam molestie varius metus sed bibendum. Phasellus gravida mi nec sapien ultrices, porttitor molestie odio pellentesque. Sed bibendum molestie dui, non vehicula arcu pulvinar et. Phasellus ut vestibulum mauris. Duis risus nulla, ornare in metus vitae, pulvinar tristique libero. Fusce mollis consectetur felis, vitae accumsan ligula pellentesque quis. Suspendisse elementum tellus a dui sodales tristique. In et congue magna, non gravida velit. Ut mattis quis nunc a efficitur. Vivamus nec pharetra felis. Ut ut dignissim purus.</div>
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