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

    },




    methods: {
        async method(event)
        {

        },



    },


    template: `
      
<nav class="navbar navbar-dark bg-primary p-0">
    <router-link class="navbar-brand" to="/">
      &nbsp<img src="/images/logo.svg" width="30" height="30" class="d-inline-block align-top" alt="logo">DappNotes
    </router-link>
    
    
    <div>
      <a class="nav-link dropdown-toggle btn btn-primary" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="/images/menu.svg"  width="30" height="30" class="rounded-circle " alt="icon"> Menu
      </a>

      <div class="dropdown-menu dropdown-menu-right animate slideIn" aria-labelledby="navbarDropdownMenuLink">
        <router-link to="/" class="dropdown-item text-center"> Home Link </router-link>
        <router-link to="/two" class="dropdown-item text-center"> Link 2</router-link>
        <router-link to="/three" class="dropdown-item text-center"> Link 3 </router-link>
        <a class="dropdown-item text-center" href="">Dead link</a>
      </div>
    </div>




   




</nav>

  `,
};