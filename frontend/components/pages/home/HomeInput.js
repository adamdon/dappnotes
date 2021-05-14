export default {
    name: "HomeInput",

    data()
    {
        return {
            formDisabled: false,
            selectedFile: null,
            dataUri: "null",
        };
    },




    methods: {
        setupFilePond()
        {
            console.log("setupFilePond");

            window.FilePond.registerPlugin(FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginImagePreview);
            window.FilePond.setOptions(
                {
                    credits: false,
                    // server: 'http://localhost/api/uploadNote'
                });

            let inputElement = document.querySelector('input[type="file"]');
            let filePondInstance = FilePond.create(inputElement);
            filePondInstance.onpreparefile = function (file){window.dataUri = file.getFileEncodeDataURL()};

        },

        async uploadNote()
        {
            console.log("uploadNote");

            if(window.dataUri)
            {
                this.dataUri = window.dataUri;
                this.formDisabled = true;

                let requestBody = {dataUri: this.dataUri,};
                let requestUrl = "/api/uploadNote";
                let requestHeaders = {"Content-Type": "application/json"};
                console.log(requestBody);

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();

                if(data.errors)
                {
                    console.log(data.errors[0].message);
                }
                else if(data.message)
                {
                    console.log("Worked response");
                    this.dataUri = data.message;

                }
                else
                {
                    console.log("Unexpected response");
                    console.log(data);
                }
            }
            else
            {
                this.dataUri = "upload data first";
            }
            this.formDisabled = false;

        },


        // onFileChange(event)
        // {
        //     console.log(event);
        // },


    },

    mounted()
    {
         this.setupFilePond();
    },




    template: `
<div class="card text-white bg-primary">
  <div class="card-header"><i class="fas fa-upload"></i> Input</div>
  
  <div class="card-body">
    
    <label class="form-label" for="customFile">Text Label</label>
    <input  class="form-control filepond" type="file" id="customFile" />
 
    
    <div class="form-group">
        <button v-on:click="uploadNote" :disabled="formDisabled" type="button" onclick="" class="btn btn-dark w-100">Upload</button>
    </div> <!-- form-group// -->
 
 
     <p class="card-text">
        {{dataUri}}
    </p>
    
  </div>
</div>

`,

};