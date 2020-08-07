<template>
    <q-page class="q-pa-md">
        <div class="text-h5 q-mb-md">Redactar blog</div>
        <div class="row">
            <div class="col q-pa-md">
                <q-input
                    filled
                    dark
                    type="text"
                    label="Titulo del blog"
                    :rules="[val => !!val || 'El campo es obligatorio']"
                />
            </div>
            <div class="col q-pa-md">
                <q-file append filled dark label="Blog banner">
                    <template v-slot:prepend>
                        <i class="fas fa-paperclip"></i>
                    </template>
                </q-file>
            </div>
        </div>
        <div class="row">
            <div class="col q-pa-md">
                <q-editor
                    dark
                    v-model="body"
                    toolbar-bg="grey-9"
                    :dense="$q.screen.lt.md"
                    :toolbar="[
                        [
                        {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            list: 'only-icons',
                            options: ['left', 'center', 'right', 'justify']
                        },
                        ],
                        ['hr', 'link'],
                        ['fullscreen'],
                        [
                        {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: [
                            'p',
                            'h1',
                            'h2',
                            'h3',
                            'h4',
                            'h5',
                            'h6',
                            'code'
                            ]
                        },
                        {
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                            'size-1',
                            'size-2',
                            'size-3',
                            'size-4',
                            'size-5',
                            'size-6',
                            'size-7'
                            ]
                        },
                        'removeFormat'
                        ],
                        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                        ['undo', 'redo'],
                        ['viewsource']
                    ]"
                />
            </div>
        </div>
        <div class="row q-pa-md">
            <q-space />
            <q-btn
                class="on-left"
                color="warning"
                label="Guardar como borrador"
                to="/blog-manager"
            />
            <q-btn color="secondary" label="Guardar y publicar" to="/blog-manager" />
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            body: '',
        }
    },
}
</script>