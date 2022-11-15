<template>
    <v-container fluid>
        <!-- Sidebar -->
        <div class="manual-content">
            <v-navigation-drawer permanent floating touchless app class="nav-drawer">
                <div class="style-guide-title">
                    <h1>Components</h1>
                </div>
                <div class="side-nav">
                    <!-- nav -->
                    <v-list class="list-parent">
                        <!-- Items -->
                        <v-list-item-group v-model="selectedItem" class="list-item-group">
                            <!-- link -->
                            <v-list-item
                                v-for="(doc, i) in docs"
                                :key="i"
                                class="list-item"
                                active-class="active-item"
                            >
                                <v-list-item-content class="item-content">
                                    <v-list-item-title class="list-item-title" v-text="doc.title" />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-navigation-drawer>
            <v-row justify="center">
                <!-- Content -->
                <v-col cols="11">
                    <Doc :document="docs[selectedItem]" />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
// import '~/assets/css/docs.css'
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        docs: {},
        selectedItem: 0,
    }),
    async fetch() {
        this.docs = await this.$content('definitions', { deep: true }).sortBy('title').fetch()
    },
}
</script>
