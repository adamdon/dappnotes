import Navbar from "/components/Navbar.js";
import HomePage from "/components/pages/home/HomePage.js";
import NotFoundPage from "/components/NotFoundPage.js";


const rootComponent =
    {
        name: "vueApp",


        components: {Navbar,},
        template: `
    <Navbar></Navbar>
  

    <router-view v-slot="slotProps">

        <transition
            name="test"
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutDown animate__faster"
        >
            <component :is="slotProps.Component"/>

        </transition>
    </router-view>

    `,
    };


const routes =
    [
        { path: '/', component: HomePage },
        { path: '/:pathMatch(.*)*', name: 'NotFoundPage', component: NotFoundPage },
    ];

const router = window.VueRouter.createRouter({history: VueRouter.createWebHistory(), routes: routes, });




const app = Vue.createApp({render: () => Vue.h(rootComponent)});
app.use(router)
app.config.devtools = true;
app.config.globalProperties.emitter = window.mitt();
app.mount("#vueApp");