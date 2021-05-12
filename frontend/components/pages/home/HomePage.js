import Navbar from '../../Navbar.js'
import ContainerLayout from '../../containers/ContainerLayout.js'
import ContainerContent from '../../containers/ContainerContent.js';
import ContainerContentRow from '../../containers/ContainerContentRow.js';

import HomeWelcome from "./HomeWelcome.js";
import HomeInput from "./HomeInput.js";
import HomeOutput from "./HomeOutput.js";


export default
{
    name: "HomePage",

    data()
    {
        return {

            thisVar: false
        }
    },


    methods: {
        async method(event)
        {

        }
    },

    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow, HomeWelcome, HomeInput, HomeOutput},

    template: `
<!--    <Navbar></Navbar>-->
    
    <ContainerLayout>
        
        <ContainerContentRow>
            <ContainerContent desktop="col-xl-12"><HomeWelcome></HomeWelcome></ContainerContent>
        </ContainerContentRow>
        
        <ContainerContentRow>
            <ContainerContent desktop="col-xl-6"><HomeInput></HomeInput></ContainerContent>
            <ContainerContent desktop="col-xl-6"><HomeOutput></HomeOutput></ContainerContent>
        </ContainerContentRow>
        
    </ContainerLayout>
    `,
};