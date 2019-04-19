<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-btn @click="back()"> Return </v-btn>
                <v-data-table :items="postData" rows-per-page-text="Posts por página">
                    <template slot="items" slot-scope="data">
                        <v-layout>
                            <td class="text-xs-right">{{ data.item.contenidoPost }}</td>
                            <td class="text-xs-right">{{ data.item.nickname }}</td>
                            <td class="text-xs-right">{{ data.item.fecha }}</td>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="goToRoute('New', 'createPost')"> New Post </v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
                case 'New': {
                    this.$nextTick(() => {
                        this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory + '/' + this.urlThread + '/' + route)
                    })
                    break;
                }
            }
        },
        back () {
            this.$nextTick(() => {
                    this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory)
            })
        }
    },
    computed: {
        posts () {
            return this.$store.getters.getPostsTopic
        },
        postData () {
            let aux = []
            this.posts.forEach(elementPosts => {
                if (elementPosts.idThread == this.topicElegido) {
                    aux.push(elementPosts)
                }
            });
            return aux
        },
        topicElegido () {
            return this.$store.getters.getTopicElegido
        },
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadPosts")
        this.urlSaga = this.$route.params.urlSaga
        this.urlCategory = this.$route.params.urlCategory
        this.urlThread = this.$route.params.urlThread
    }
}
</script>

<style>

</style>