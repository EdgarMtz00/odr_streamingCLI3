<template>
    <div>
        <!-- <unity src="static/Build/Avatar.json" width="1000" height="600" unityLoader="static/Build/UnityLoader.js"></unity> -->
        <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
        <!-- <v-btn color="primary" :disabled="uploaded" @click="submitFile()">{{btnText}}</v-btn> -->
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
      submitFile(){
          let urlBase = this.$store.getters.urlBase
          this.uploaded = true
          this.btnText = "Subiendo"
        let formData = new FormData();
        formData.append('file', this.file);
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
      handleFileUpload(){
          this.file = this.$refs.file.files[0];
        //   console.log("THIS FILE XD",this.file)
          this.$emit("refFile", this.file)
      },        
    },
    created () {
    }
}
</script>