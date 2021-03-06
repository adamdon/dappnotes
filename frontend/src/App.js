import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import 'bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'react-image-lightbox/style.css';
import "./styles/colors.css";
import "./styles/main.css";
import React, {useEffect, useState} from "react"
import GA4React, { useGA4React } from "ga-4-react";
import {Routes, Route, Link} from "react-router-dom";
import {useData} from "./components/utilities/DataContextProvider";
import NavTop from "./components/pages/NavTop";
import HomePage from "./components/pages/home/HomePage";
import AdminPage from "./components/pages/admin/AdminPage";
import ToastBock from "./components/utilities/ToastBlock";
import LoadingSpinner from "./components/utilities/LoadingSpinner";
import AnimatedMount from "./components/utilities/AnimatedMount";
import ViewPage from "./components/pages/view/ViewPage";
import AboutPage from "./components/pages/about/AboutPage";
import NotFoundPage from "./components/pages/notfound/NotFoundPage";







export default function App()
{
    const [data, setData] = useData();
    const [loaded, setLoaded] = useState(false);


    //On mount run once for whole app
    useEffect( () =>
    {
        async function mountUseEffect()
        {
            await dappnotesApp();
        }
        mountUseEffect().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function dappnotesApp()
    {
        if(process.env.REACT_ENV === "PRODUCTION")
        {
            console.log(`%c 💻 dappnotes startup (╯°□°)╯︵ ┻━┻ (PRODUCTION)`, `background-color: gray; font-weight: bold`);
            setData({backendUrl: ("https://" + window.location.hostname + "/api/")});
        }
        else
        {
            console.log(`%c 💻 dappnotes startup (╯°□°)╯︵ ┻━┻ (DEVELOPMENT)`, `background-color: black; font-weight: bold`);
            setData({backendUrl: "http://localhost/api/"});
        }
    }




    //useEffect used to avoid race condition and wait for backend URL to be set
    useEffect( () =>
    {
        async function mountUseEffect()
        {
            if(data.backendUrl !== "null")
            {
                await fetchConfigData();
            }
        }
        mountUseEffect().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.backendUrl]);


    async function fetchConfigData()
    {
        setData({showSpinner: true});

        // let requestBody = {};
        let methodType = "GET"
        let requestUrl = (data.backendUrl + "getConfig");
        let requestHeaders = {"Content-Type": "application/json"};

        try
        {
            const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders});
            // const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

            if(Number(response.status.toString().substring(0, 1)) === 2) //if response code stats with 2
            {
                const jsonData = await response.json();

                if(jsonData.config)
                {
                    setData({config: jsonData.config});
                    setLoaded(true);
                    if(process.env.REACT_ENV === "PRODUCTION")
                    {
                        const ga4react = new GA4React(jsonData.config.googleAnalyticsId);
                        ga4react.initialize().then((ga4) => {
                            ga4.pageview(window.location.pathname)
                            ga4.gtag('event','pageview','path')
                        },(err) => {console.error(err)});
                    }
                    // console.log(jsonData.config);
                }
                else
                {
                    setData({toastError: "Error: Config not found"});
                }
            }
            else
            {
                setData({toastError: "Error: " + response.status + " - Could not load"});
            }
        }
        catch (exception)
        {
            setData({toastError: "Error: " + exception.message + " " + requestUrl});
        }


        setData({showSpinner: false});
    }


    return (
        <span>
            <ToastBock/>
            <NavTop/>
            <Routes>
                <Route path="/" element={<AnimatedMount show={loaded}> <HomePage /> </AnimatedMount>} />
                <Route path="/view/" element={<AnimatedMount show={loaded}> <ViewPage /> </AnimatedMount>} />
                <Route path="/view/:keyId" element={<AnimatedMount show={loaded}> <ViewPage /> </AnimatedMount>} />
                <Route path="/about" element={<AnimatedMount show={loaded}> <AboutPage /> </AnimatedMount>} />
                <Route path="/admin" element={<AnimatedMount show={loaded}> <AdminPage /> </AnimatedMount>} />
                <Route path="*" element={<AnimatedMount show={loaded}> <NotFoundPage /> </AnimatedMount>} />
            </Routes>
            <LoadingSpinner></LoadingSpinner>
        </span>
    );
}