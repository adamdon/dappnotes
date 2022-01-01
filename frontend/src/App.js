import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import 'bootstrap';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'font-awesome/css/font-awesome.min.css';
import "./styles/colors.css";
import "./styles/main.css";
import React, {useEffect, useState} from "react"
import {Routes, Route, Link} from "react-router-dom";
import Animated from "react-mount-animation";
import {useData} from "./components/utilities/DataContextProvider";
import NavTop from "./components/pages/NavTop";
import HomePage from "./components/pages/home/HomePage";
import TestPage from "./components/pages/test/TestPage";
import ToastBock from "./components/utilities/ToastBlock";
import LoadingSpinner from "./components/utilities/LoadingSpinner";







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
            setData({backendUrl: "./api/"});
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
        let requestUrl = (data.backendUrl + "testRoute");
        let requestHeaders = {"Content-Type": "application/json"};

        try
        {
            const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders});
            // const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

            if(Number(response.status.toString().substring(0, 1)) === 2) //if response code stats with 2
            {
                const jsonData = await response.json();
                // console.log(jsonData);
                setData({testKey: jsonData.text});
                await new Promise(r => setTimeout(r, 1000));
                setLoaded(true);
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

    const mountAnimation1 = `
            0% {border-radius: 4px}
            0% {opacity: 0}
            0% {font-size: 12px}
            10% {opacity: 0}
            35% {font-size: 12px}
            60% {font-size: 24px}
            70% {border-radius: 4px}
            70% {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0), inset 0px 0px 2px 2px rgba(255,255,255,0)}
            100% {opacity: 1}
            100% {box-shadow: 0px 0px 13px 4px rgba(0,0,0,1), inset 0px 0px 2px 2px rgba(255,255,255,0.2)}
          `

    const unmountAnimation1 = `
            0% { opacity: 1; }
            10% { transform: rotate(-20deg); }
            100% {opacity: 0;}
          `

    const mountAnimation2 = `
    60% {transform: translate(0px, 0)}
    85% {transform: translate(10px, 0)}
    `


    return (
        <span>
            <ToastBock/>
            <NavTop/>
            {/*<Animated.div show={loaded} mountAnim={`*/}
            {/*    0% {opacity: 0} */}
            {/*    100% {opacity: 1}*/}
            {/*`}>*/}
            {/*    Hi World!*/}
            {/*</Animated.div>*/}

        {/*    <Animated.div*/}
        {/*        show={loaded}*/}
        {/*        mountAnim={mountAnimation1}*/}
        {/*        unmountAnim={unmountAnimation1}*/}
        {/*        style={{*/}
        {/*            fontSize: 24,*/}
        {/*            color: "white",*/}
        {/*            backgroundColor: "black",*/}
        {/*            padding: 20,*/}
        {/*            borderRadius: 20,*/}
        {/*            boxShadow:*/}
        {/*                "0px 0px 13px 4px rgba(0,0,0,1), inset 0px 0px 2px 2px rgba(255,255,255,0.2)",*/}
        {/*        }}*/}
        {/*    >*/}
        {/*  <Animated.div*/}
        {/*      show={loaded}*/}
        {/*      mountAnim={mountAnimation2}*/}
        {/*      time={1.1}*/}
        {/*  >*/}
        {/*    Hi! This is a test component 😝*/}
        {/*  </Animated.div>*/}
        {/*</Animated.div>*/}

            <Routes>
                {/*<Route path="/" element={loaded ? <HomePage /> : null} />*/}
                <Route path="/" element={
                    <Animated.div show={loaded} mountAnim={`
                        0% {opacity: 0} 
                        100% {opacity: 1}
            `       }>
                        <HomePage />
                    </Animated.div>
                } />
                <Route path="/test" element={<TestPage />} />
            </Routes>
            <LoadingSpinner></LoadingSpinner>
        </span>
    );
}