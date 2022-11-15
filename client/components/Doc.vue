<template>
    <div>
        <div v-if="name">
            <v-dialog v-model="dialog" width="600px" scrollable transition="dialog-top-transition">
                <template #activator="{ on, attrs }">
                    <v-btn color="primary" depressed icon dark v-bind="attrs" v-on="on">
                        <!--                        <Icon color="green" name="InformationOutline" size="22" />-->
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="user-manual-toolbar">
                        <div class="page-title">{{ markdown.title }}</div>
                        <!--                        <Icon color="green" class="ml-2" name="InformationOutline" size="22" />-->
                    </v-card-title>
                    <v-divider />
                    <v-card-text>
                        <div class="user-title">
                            <p class="description user-manual">
                                {{ markdown.description }}
                            </p>
                        </div>
                        <nuxt-content :document="markdown" />
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <div v-else>
            <div class="title">
                <div class="page-title">
                    <h2>{{ markdown.title }}</h2>
                </div>
                <p class="description">
                    {{ markdown.description }}
                </p>
            </div>
            <nuxt-content :document="markdown" />
            <div v-if="$slots.default">
                <v-divider class="my-5" />
                <h5 class="header">Example component</h5>
                <client-only>
                    <slot />
                </client-only>
            </div>
        </div>
    </div>
</template>
<script>
import '~/assets/css/docs.css'
export default {
    props: {
        /**
         * Name
         *
         */
        name: {
            type: String,
            default: null,
        },
        /**
         * Prop to pass a nuxt content document
         *
         * Hover on @example
         * @example
         {
             example:{
                 // example comment
                 exampleProp: "exampleValue"
             }
         }
         */
        document: {
            type: Object,
            default: () => ({}),
        },
    },
    data: () => ({
        doc: {},
        dialog: false,
    }),
    async fetch() {
        if (this.name) this.doc = await this.$content(this.name).fetch()
    },
    computed: {
        markdown() {
            const doc = this.name ? this.doc : this.document
            const table = doc?.body?.children[2]
            const objectContent = doc?.body?.children[4]?.children?.filter((i) => i?.type !== 'text')

            if (table?.tag !== 'table') return doc
            const tbody = table.children?.[1]
            if (tbody?.tag !== 'tbody') return doc

            for (const row of tbody.children) {
                const desc = row?.children?.[1]?.children
                if (desc?.find((ln) => ln.props?.className?.[0] === 'display-example'))
                    desc.push(objectContent.shift())
            }
            return doc
        },

        description() {
            return this.doc.description || ''
        },
    },
}
</script>
