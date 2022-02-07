import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import React, {useEffect} from "react";
import {useData} from "../../utilities/DataContextProvider";

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
                    <ContainerContent size="12" icon="home" title="View Note">


                        <div>testtesttest</div>

                    </ContainerContent>
                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );

}