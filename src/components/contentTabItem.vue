<template>
    <v-layout row wrap>
        <v-flex xs12 xl6 v-for="(n, index) in contentFilter" :key="index">
            <v-card style="margin: 0px;" class="pa-2">
                    <v-layout row wrap fill-height align-center justify-center class="px-3 my-2">
                        <v-flex xs12>
                            <v-layout row wrap>
                                <v-flex xs12 md2>
                                    <v-layout row wrap align-center fill-height>
                                            <v-img height="200" contain
                                            :src="n.thumbnail">
                                            </v-img>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 md10 class="pl-3">
                                    <v-layout column justify-space-between fill-height :text-xs-center="$vuetify.breakpoint.xsOnly">
                                        <v-flex xs12>
                                            <v-layout row wrap fill-height>
                                                <v-flex xs12>
                                                    <div class="headline">{{n.name}}</div>
                                                    <v-divider class="my-1"></v-divider>
                                                    <v-chip v-for="(tag, index) in n.Tags" :key="index">{{tag}}</v-chip>
                                                    <v-divider class="my-1" v-if="n.Tags"></v-divider>
                                                    <div class="body-2">
                                                        {{n.Descripcion}}
                                                    </div>
                                                </v-flex>                                
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-layout row wrap align-end style="height: 100%;">
                                                <v-flex xs12>
                                                    <v-btn color="primary" block flat 
                                                    outline @click="goToHolder (n.url)">{{ver[lang]}}</v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['type', 'content'],
    data () {
        return {
            // Placeholders
            ver: ['Ver', 'Explore']
        }
    },
    computed: {
        contentFilter () {
            let res = []
            this.content.forEach(element => {
                console.log(element)
                if (element.type === this.type) {
                    res.push(element)
                }
            });
            console.log("RES ",res)
            return res
        },
        ...mapGetters({
            lang: 'getUserLang',
        }),
    },
    methods: {
        goToHolder (URLHolder) {
            this.$router.push(this.$route.params.urlSaga + "/" + URLHolder)
        }
    }
}
</script>