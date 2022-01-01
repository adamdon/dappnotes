import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import 'bootstrap';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'font-awesome/css/font-awesome.min.css';
import "./styles/colors.css";
import "./styles/main.css";
import React, {useEffect, useState} from "react"
import {Routes, Route, Link} from "react-router-dom";
import {useData} from "./components/utilities/DataContextProvider";
import NavTop from "./components/pages/NavTop";
import HomePage from "./components/pages/home/HomePage";
import TestPage from "./components/pages/test/TestPage";
import ToastBock from "./components/utilities/ToastBlock";
import LoadingSpinner from "./components/utilities/LoadingSpinner";
import AnimatedMount from "./components/utilities/AnimatedMount";







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
                // await new Promise(r => setTimeout(r, 1000));
                setData({testKey: jsonData.text});
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


    return (
        <span>
            <ToastBock/>
            <NavTop/>
            <Routes>
                <Route path="/" element={<AnimatedMount show={loaded}> <HomePage /> </AnimatedMount>} />
                <Route path="/test" element={<AnimatedMount show={loaded}> <TestPage /> </AnimatedMount>} />
            </Routes>
            <LoadingSpinner></LoadingSpinner>
        </span>
    );
}