import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import 'bootstrap';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'font-awesome/css/font-awesome.min.css';
import "./styles/colors.css";
import "./styles/main.css";
import React, {useEffect} from "react"
import {Routes, Route, Link} from "react-router-dom";
import {useData} from "./components/utilities/DataContextProvider";
import NavTop from "./components/pages/NavTop";
import HomePage from "./components/pages/home/HomePage";
import TestPage from "./components/pages/test/TestPage";
import ToastBock from "./components/utilities/ToastBlock";
import LoadingSpinner from "./components/utilities/LoadingSpinner";







export default function App()
{
    const [data, setData] = useData();

    useEffect( () =>
    {
        async function mountUseEffect()
        {
            await fetchConfigData();
        }
        mountUseEffect().then(r => console.log("HostelsPage mountUseEffect complete"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchConfigData()
    {
        setData({showSpinner: true});

        // let requestBody = {};
        let methodType = "GET"
        let requestUrl = (data.config.backendUrl + "testRoute");
        let requestHeaders = {"Content-Type": "application/json"};

        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders});
        // const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

        if(Number(response.status.toString().substring(0, 1)) === 2) //if response code stats with 2
        {
            const jsonData = await response.json();
            console.log(jsonData);
            setData({testKey: jsonData.text});
        }
        else
        {
            setData({toastError: "Error: " + response.status + " - Could not load"});
        }

        setData({showSpinner: false});
    }


    return (
        <span>
            <ToastBock/>
            <NavTop/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
            <LoadingSpinner></LoadingSpinner>
        </span>
    );
}