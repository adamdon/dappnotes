import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { Toast } from "bootstrap";


import {useData} from "../data/DataContextProvider";




export default function ToastBock()
{
    const [data, setData] = useData();


    useEffect(() =>
    {
        if(data.toastMessage !== "")
        {
            toastMessage(data.toastMessage);
            setData({toastMessage: ""});
        }

        if(data.toastSuccess !== "")
        {
            toastSuccess(data.toastSuccess);
            setData({toastSuccess: ""});
        }

        if(data.toastError !== "")
        {
            toastError(data.toastError);
            setData({toastError: ""});
        }




        // function toastMessage(text)
        function toastMessage(text)
        {
            console.log(`%c 🌈 toastMessage: ${text} `, `background-color: DarkBlue; font-weight: bold`);
            addToast(text, "bg-dark");
        }

        function toastSuccess(text)
        {
            console.log(`%c 💚 toastSuccess: ${text} `, `background-color: DarkBlue; font-weight: bold`);
            addToast(text, "bg-success");
        }

        function toastError(text)
        {
            console.log(`%c 💔 toastError: ${text} `, `background-color: DarkBlue; font-weight: bold`);
            addToast(text, "bg-danger");
        }



        function addToast(text, color)
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
                    delay: 3000,

                };
            let bootstrapToast = new Toast(toastDiv, toastOptions);
            bootstrapToast.show();
        }




    }, [data.toastMessage, data.toastSuccess, data.toastError, setData]);




    return (
    <div aria-live="polite" aria-atomic="true" className="position-relative ">
      <div className="toast-container align-center  position-fixed top-0 start-50 translate-middle-x p-0" id="toastContainer">
      </div>
    </div>
    );
}


