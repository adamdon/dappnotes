export default {
    name: "HomeInput",

    data()
    {
        return {
            formDisabled: false,
            selectedFile: null,
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
                    server: 'http://localhost/api/uploadNote'
                });
            window.FilePond.parse(document.body);


        },

        onFileChange(event)
        {
            console.log(event);
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
 
    <p class="card-text">
        text
    </p>
    
    <label class="form-label" for="customFile">Text Label</label>
    <input @change="onFileChange" class="form-control filepond" type="file" id="customFile" />
    
  </div>
</div>

`,

};