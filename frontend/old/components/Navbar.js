export default
{
    name: "Navbar",

    data()
    {
        return {
            test: false
        };
    },


    async mounted()
    {
        this.emitter.on("toastMessage", (text) => this.toastMessage(text));
        this.emitter.on("toastSuccess", (text) => this.toastSuccess(text));
        this.emitter.on("toastError", (text) => this.toastError(text));
    },




    methods: {
        async method(event)
        {

        },

        async toastMessage(text)
        {
            console.log("toastMessage: " + text);
            await this.addToast(text, "bg-dark");
        },

        async toastSuccess(text)
        {
            console.log("toastSuccess: " + text);
            await this.addToast(text, "bg-success");
        },

        async toastError(text)
        {
            console.log("toastError: " + text);
            await this.addToast(text, "bg-danger");
        },

        async addToast(text, color)
        {
            let toastContainer = document.getElementById("toastContainer");

            let toastDiv = document.createElement("div");
            // newDiv.className = "toast shadow-lg align-items-center text-white bg-dark border-0 w-100"
            toastDiv.setAttribute("class", "toast shadow-lg align-items-center text-white border-0 w-100");
            toastDiv.classList.add(color)
            toastDiv.setAttribute("role", "alert");
            toastDiv.setAttribute("aria-live", "assertive");
            toastDiv.setAttribute("aria-atomic", "true");


            let dFlexDiv = document.createElement("div");
            dFlexDiv.setAttribute("class", "d-flex");


            let toastBodyDiv = document.createElement("div");
            toastBodyDiv.setAttribute("class", "toast-body");


            let toastBodyTextNode = document.createTextNode(text);


            let closeButton = document.createElement("button");
            closeButton.setAttribute("class", "btn-close btn-close-white me-2 m-auto");
            closeButton.setAttribute("data-bs-dismiss", "toast");
            closeButton.setAttribute("aria-label", "Close");


            toastBodyDiv.appendChild(toastBodyTextNode);
            dFlexDiv.appendChild(toastBodyDiv);
            dFlexDiv.appendChild(closeButton);
            toastDiv.appendChild(dFlexDiv);
            toastContainer.appendChild(toastDiv);


            let toastOptions =
                {
                    animation: true,
                    autohide: true,
                    delay: 10000,

                };
            let bootstrapToast = new bootstrap.Toast(toastDiv, toastOptions);
            bootstrapToast.show();
        }





    },


    template: `

<div aria-live="polite" aria-atomic="true" class="position-relative ">
  <div class="toast-container align-center  position-fixed top-0 start-50 translate-middle-x p-0" id="toastContainer" >


<!--    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">-->
<!--        <div class="d-flex">-->
<!--            <div class="toast-body">-->
<!--                Hello, world! -->
<!--            </div>-->
<!--            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">-->
<!--        <div class="d-flex">-->
<!--            <div class="toast-body">-->
<!--                Hello, world! This is a toast message. This is a toast message. This is a toast message. This is a toast message. This is a toast message.-->
<!--            </div>-->
<!--            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">-->
<!--        <div class="d-flex">-->
<!--            <div class="toast-body">-->
<!--                Hello, world! This is a toast message. This is a toast message.-->
<!--            </div>-->
<!--            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">-->
<!--        <div class="d-flex">-->
<!--            <div class="toast-body">-->
<!--                Hello, world! This is a toast message. This is a toast message. This is a toast message. This is a toast message. This is a toast message.-->
<!--            </div>-->
<!--            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>-->
<!--        </div>-->
<!--    </div>-->
<!--    -->
<!--    -->
<!--    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">-->
<!--        <div class="d-flex">-->
<!--            <div class="toast-body">-->
<!--                Hello, world! This is a toast message.  This is a toast message.-->
<!--            </div>-->
<!--            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>-->
<!--        </div>-->
<!--    </div>    -->

    
    
  </div>
</div>



      
<nav class="navbar navbar-dark bg-primary p-0">
    <router-link class="navbar-brand" to="/">
      &nbsp<img src="/images/logo.svg" width="30" height="30" class="d-inline-block align-top" alt="logo">DappNotes
    </router-link>
    
    
    <div>
      <a class="nav-link dropdown-toggle btn btn-primary" href="" id="navbarDropdownMenuLink" role="button" data-bs-popper="none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="/images/menu.svg"  width="30" height="30" class="rounded-circle " alt="icon"> Menu
      </a>

      <div class="dropdown-menu dropdown-menu-dark  dropdown-menu-end animate slideIn" aria-labelledby="navbarDropdownMenuLink">
        <router-link to="/" class="dropdown-item text-center"> Home Link </router-link>
        <router-link to="/two" class="dropdown-item text-center"> Link 2</router-link>
        <router-link to="/three" class="dropdown-item text-center"> Link 3 </router-link>
        <a class="dropdown-item text-center" href="">Dead link</a>
      </div>
    </div>




   




</nav>

  `,
};