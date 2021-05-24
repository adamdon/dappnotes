export default {
    name: "HomeOutput",

    data()
    {
        return {
            formDisabled: false,
            noteIdInput: "",
            noteDataUriOutput: "",
        };
    },




    methods: {
        async method(event)
        {

        },

        async downloadNote()
        {
            await this.databaseDownloadNote(this.noteIdInput);

        },

        async databaseDownloadNote(id)
        {
            let requestBody = {_id: id,};
            let requestUrl = "/api/downloadNote";
            let requestHeaders = {"Content-Type": "application/json"};

            const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
            const data = await response.json();

            if(data.errors)
            {
                this.emitter.emit("toastError", data.errors[0].message);
            }
            else if(data)
            {
                this.noteDataUriOutput = data.dataUri;
                this.emitter.emit("toastSuccess", "Downloaded file: " + data.name);
            }
            else
            {
                this.emitter.emit("toastError", "Unexpected response");
                console.log(data);
            }

        }


    },




    template: `
<div class="card text-white bg-primary">
  <div class="card-header"><i class="fas fa-download"></i> Output</div>
  
  <div class="card-body">
 

    
    <form v-on:submit.prevent="downloadNote">
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default"><i class="fas fa-at"></i></span>
            <input v-model="noteIdInput" :disabled="this.formDisabled" placeholder="Note ID" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
              <button v-on:click="downloadNote" class="btn btn-dark" type="button" id="button-addon2">Download</button>
        </div>
    </form>
    
    <p class="card-text">
        {{noteDataUriOutput}}
    </p>
    
  </div>
</div>
    `,
};