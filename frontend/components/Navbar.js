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
        console.log("toast test");
        let toastElList = [].slice.call(document.querySelectorAll('.toast'))
        let toastList = toastElList.map(function(toastEl)
        {
            // Creates an array of toasts (it only initializes them)
            return new bootstrap.Toast(toastEl) // No need for options; use the default options
        });

        toastList.forEach(toast => toast.show()); // This show them

        console.log(toastList); // Testing to see if it works
    },




    methods: {
        async method(event)
        {

        },

        async toastMessage(text)
        {

        },

        async toastSuccess(text)
        {

        },

        async toastError(text)
        {

        },

        async addToast(text, type)
        {

        }





    },


    template: `

<div aria-live="polite" aria-atomic="true" class="position-relative ">
  <div class="toast-container align-center  position-fixed top-0 start-50 translate-middle-x p-0" >


    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                Hello, world! 
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>

    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                Hello, world! This is a toast message. This is a toast message. This is a toast message. This is a toast message. This is a toast message.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>

    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                Hello, world! This is a toast message. This is a toast message.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>

    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                Hello, world! This is a toast message. This is a toast message. This is a toast message. This is a toast message. This is a toast message.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    
    
    <div class="toast shadow-lg align-items-center text-white bg-dark border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                Hello, world! This is a toast message.  This is a toast message.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>    
<!--    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">-->
<!--      <div class="toast-header">-->
<!--        <img src="" class="rounded me-2" alt="...">-->
<!--        <strong class="me-auto">Bootstrap</strong>-->
<!--        <small class="text-muted">2 seconds ago</small>-->
<!--        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>-->
<!--      </div>-->
<!--      <div class="toast-body">-->
<!--        Heads up, toasts will stack automatically-->
<!--      </div>-->
<!--    </div>-->
    
    
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