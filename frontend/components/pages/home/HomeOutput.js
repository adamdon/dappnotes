export default {
    name: "HomeOutput",

    data()
    {
        return {
            formDisabled: false,
            noteIdInput: "",
        };
    },




    methods: {
        async method(event)
        {

        },

        async downloadNote()
        {
            this.emitter.emit("toastMessage", ("Downloading note: " + this.noteIdInput));

        },


    },




    template: `
<div class="card text-white bg-primary">
  <div class="card-header"><i class="fas fa-download"></i> Output</div>
  
  <div class="card-body">
 
    <p class="card-text">
        text
    </p>
    
    <form @submit.prevent="onSubmit">
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default"><i class="fas fa-at"></i></span>
            <input v-model="noteIdInput" v-on:keyup.enter="downloadNote" :disabled="this.formDisabled" placeholder="Note ID" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
              <button v-on:click="downloadNote" class="btn btn-dark" type="button" id="button-addon2">Download</button>
        </div>
    </form>
    
  </div>
</div>
    `,
};