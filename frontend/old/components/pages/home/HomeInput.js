export default {
    name: "HomeInput",

    data()
    {
        return {
            formDisabled: false,
            blockchainMode: false,

            currentNote: {_id: ""},
        };
    },




    methods: {
        setupFilePond()
        {
            window.FilePond.registerPlugin(FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginImageResize);
            window.FilePond.setOptions(
                {
                    credits: false,
                    // server: 'http://localhost/api/uploadNote'
                });

            let inputElement = document.querySelector('input[type="file"]');
            let filePondInstance = FilePond.create(inputElement);
            filePondInstance.onpreparefile = function (file){window.file = file};
        },

        async createNote()
        {
            this.formDisabled = true;

            if(this.blockchainMode === true)
            {
                //TODO add blockchainMode logic
            }
            else
            {
                if(window.file)
                {
                    let dataUri = window.file.getFileEncodeDataURL();
                    let name = window.file.filenameWithoutExtension;

                    this.currentNote = {name: name, dataUri: dataUri};
                    await this.databaseUploadNote(this.currentNote);
                }
            }

            this.formDisabled = false;
        },

        async databaseUploadNote(note)
        {
            let requestBody = {note: note,};
            let requestUrl = "/api/uploadNote";
            let requestHeaders = {"Content-Type": "application/json"};

            const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
            const data = await response.json();

            if(data.errors)
            {
                this.emitter.emit("toastError", data.errors[0].message);
            }
            else if(data.message)
            {
                this.currentNote = data.note;
                this.emitter.emit("toastSuccess", data.message);
                this.emitter.emit("toastMessage", ("ID: " + data.note._id));
            }
            else
            {
                this.emitter.emit("toastError", "Unexpected response");
                console.log(data);
            }
        },


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
        <button v-on:click="createNote" :disabled="formDisabled" type="button" onclick="" class="btn btn-dark w-100">Upload</button>
    </div> <!-- form-group// -->
 
 
     <p class="card-text">
        {{currentNote._id}}
    </p>
    
  </div>
</div>

`,

};