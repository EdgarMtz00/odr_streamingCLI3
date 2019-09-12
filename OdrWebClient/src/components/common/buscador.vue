<template>
    <div>
        <v-autocomplete :items="buscadorData" item-text="titulo" prepend-inner-icon="search"
        color="black" background-color="white" label="Buscar" clearable v-model="selected">
            <template slot="item" slot-scope="data">
                <v-list-tile-avatar  @click="goToRoute(data.item.type, data.item.url)">
                    <img :src="data.item.thumbnail">
                </v-list-tile-avatar>
                <v-list-tile-content @click="goToRoute(data.item.type, data.item.url)">
                    <v-list-tile-title v-html="data.item.titulo"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.type"></v-list-tile-sub-title>
                </v-list-tile-content>
            </template>
        </v-autocomplete>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selected: '',
        }
    },
    mounted () {
        this.$store.dispatch('loadBuscadorData')
    },
    methods: {
        goToRoute (type, route) {
            switch (type) {
                case 'Saga': {
                    this.$nextTick(() => {
                        this.$router.push('/sagas/' + route)
                    })
                    break;
                }
                case 'Character': {
                    this.$nextTick(() => {
                        this.$router.push('/characters/' + route)
                    })
                    break;
                }
                case 'User': {
                    this.$nextTick(() => {
                        this.$router.push(route)
                    })
                    break;
                }
                // Si no es ninguna de las anteriores entonces es un holder
                default: {
                    this.$nextTick(() => {
                        this.$router.push('/sagas/' + route)
                    })
                    break;
                }
            }
        },
    },
    computed: {
        sagasLength () {
        },
        sagas () {
            return this.$store.getters.getBuscadorSagas
        },
        holders () {
            return this.$store.getters.getBuscadorHolders
        },
        personajes () {
            return this.$store.getters.getBuscadorPersonajes
        },
        usuarios () {
            return this.$store.getters.getBuscadorUsuarios
        },
        buscadorData () {
            let aux = []
            this.sagas.forEach(elementSagas => {
                aux.push(elementSagas)
            });
            this.holders.forEach(elementHolders => {
                aux.push(elementHolders)
            });
            this.personajes.forEach(elementPersonajes => {
                aux.push(elementPersonajes)
            });
            this.usuarios.forEach(elementUsuarios => {
                aux.push(elementUsuarios)
            });
            return aux
        }
    }
    
}
</script>

<style>

</style>