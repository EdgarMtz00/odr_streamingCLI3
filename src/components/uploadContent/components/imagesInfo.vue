<template>
    <div>
    <!-- Separacion -->
    <v-layout row justify-center>
        <v-subheader>Information</v-subheader>
        <v-divider class="my-4"></v-divider>
    </v-layout>
    <v-text-field
        name="bookTitle"
        label="Titulo del articulo"
        v-model="modelGeneros"
        id="bookTitle"
        box
        @change="changeTitulo"
        required>
    </v-text-field>
    </div>
</template>

<script>
export default {
    data () {
        return {
            modelTitulo: '',
            modelGeneros: '',
            generosCargados: ['Nose'],
        }
    },
    methods: {
        changeGenero ($event) {
            this.$emit('changeGenero', $event)
        },
        changeTitulo ($event) {
            this.$emit('changeTitulo', $event)
        }
    }
}
</script>

<style>
    
</style>