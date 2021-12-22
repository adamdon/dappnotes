import {useData} from "../../data/DataContextProvider"
import React from "react";



export default function InfoComponent()
{
    const [data, setData] = useData();


    // console.log("InfoComponent render");

    function test()
    {
        setData({toastMessage: "hey"});
        setData({showSpinner: true});
    }

    function test2()
    {
        setData({toastSuccess: "hey you"});
        setData({toastError: "hey error"});
        setData({showSpinner: false});
    }

    return (
        <div>
            {data.letter4}
            <button onClick={test}> test</button>
            <button onClick={test2}> test2</button>
        </div>
    );
}


