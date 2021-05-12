import Navbar from './Navbar.js'
import ContainerLayout from './containers/ContainerLayout.js'
import ContainerContent from './containers/ContainerContent.js';
import ContainerContentRow from './containers/ContainerContentRow.js';


export default
{
    name: "NotFoundPage",


    methods: {
        async method(event)
        {

        },


    },




    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow},
    template: `
      <ContainerLayout>
      <ContainerContentRow>
        <ContainerContent desktop="col-xl-12">


          <div class="card text-white bg-primary">
            <div class="card-header"><i class="fas fa-question-circle"></i> 404</div>
            <div class="card-body">
              <p class="card-text">
                Page not round
              </p>
            </div>
          </div>
          
          
        </ContainerContent>
      </ContainerContentRow>
      </ContainerLayout>
      
  `,
};