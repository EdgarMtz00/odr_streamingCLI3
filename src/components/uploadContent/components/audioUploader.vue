<template>
    <div>
        <label>File
            <input type="file" id="file" ref="file" accept="audio/*" v-on:change="handleFileUpload()"/>
        </label>
    </div>
</template>

<script>
export default {
    data () {
        return {
            uploaded: false,
            btnText: "Subir"
        }
    },
    methods: {
        // Esto deberia estar en el store wtf >_>
      submitFile(){
          let urlBase = this.$store.getters.urlBase
          this.uploaded = true
          this.btnText = "Subiendo"
        let formData = new FormData();
        formData.append('file', this.file);
        // El mismo PHP sirve para todo tipo de archivo, deberia cambiarle el nombre xd
        this.axios.post(urlBase + 'connections/streamingContent/content/uploadVideo.php',
            formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }
        ).then(response => {
            console.log("Subido xd", response.data.dir  )
            this.$emit("loadVideo", this.file)
            this.btnText = "Subido"
        }).catch(function(){
            console.log('FAILURE!!');
        });
      },
      // Obtener la referencia del fichero
      handleFileUpload(){
          this.file = this.$refs.file.files[0];
          console.log("THIS FILE XD",this.file)
          this.$emit("refFile", this.file)
      },        
    },
    created () {
    }
}
</script>