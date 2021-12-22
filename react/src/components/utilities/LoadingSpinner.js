import Loader from "react-loader-spinner";
import {useData} from "../data/DataContextProvider";
import {useState, useEffect} from "react";


export default function LoadingSpinner()
{
    const [data, setData] = useData();
    const [isSpinning, setSpinning] = useState(false);

    useEffect(() =>
    {
        // console.log("showSpinner change!!")
        if(data.showSpinner)
        {
            setSpinning(true)
        }
        else
        {
            new Promise(resolve => setTimeout(resolve, 1500)).then(() => setSpinning(false));
        }
    }, [data.showSpinner, setSpinning]);




    return (

        // <div className="fixed-bottom d-flex justify-content-center p-3">
        <div className=" align-center  position-fixed bottom-0 start-50 translate-middle-x p-3">
            <div className={isSpinning ? 'fadeIn' : 'fadeOut' }>
                <Loader
                    type="Grid"
                    color="orange"
                    height={40}
                    width={40}
                    // timeout={9000} //3 secs
                />
            </div>
            {/*{data.showSpinner ?*/}
            {/*    <Loader*/}
            {/*        type="Circles"*/}
            {/*        color="#00BFFF"*/}
            {/*        height={40}*/}
            {/*        width={40}*/}
            {/*        // timeout={9000} //3 secs*/}
            {/*    />*/}
            {/*    :*/}
            {/*    <></>*/}
            {/*}*/}
        </div>

    );


}


