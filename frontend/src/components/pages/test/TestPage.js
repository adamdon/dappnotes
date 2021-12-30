import NavTop from "../NavTop";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import React from "react";
import BasicComponent from "./BasicComponent";
import {useData} from "../../utilities/DataContextProvider";
import InfoComponent from "./InfoComponent";

export default function HomePage()
{
    const [data, setData] = useData();


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="home" title="home">
                        <BasicComponent/>
                    </ContainerContent>
                </ContainerContentRow>


                <ContainerContentRow>
                    <ContainerContent size="6" icon="bitcoin" title="other">
                        {data.letter}
                    </ContainerContent>

                    <ContainerContent size="6" icon="clipboard" title="info">
                        <InfoComponent/>
                    </ContainerContent>

                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );

}