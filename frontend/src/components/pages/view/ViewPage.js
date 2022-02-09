import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import {useData} from "../../utilities/DataContextProvider";
import KeyInput from "./KeyInput";

export default function ViewPage()
{
    const [data, setData] = useData();

    useEffect(() => {
        // console.log("HomePage");
    }, []) ;


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="eye" title="View Note">

                        <KeyInput keyId={useParams().keyId}/>

                    </ContainerContent>
                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );

}