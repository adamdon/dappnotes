export default {
    name: "HomeInput",

    data()
    {
        return {
            formDisabled: false
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
                });
            window.FilePond.parse(document.body);


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
    
    <label class="form-label" for="customFile">Default file input example</label>
    <input type="file" class="form-control filepond" id="customFile" />
    
  </div>
</div>
    `,
};