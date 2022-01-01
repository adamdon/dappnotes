import NavTop from "../NavTop";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import React, {useEffect, useState} from "react";
import BasicComponent from "./BasicComponent";
import {useData} from "../../utilities/DataContextProvider";
import InfoComponent from "./InfoComponent";
import AnimatedMount from "../../utilities/AnimatedMount";

export default function TestPage()
{
    const [data, setData] = useData();
    const [show, setShow] = useState(false);


    useEffect(() => {
        console.log("TestPage")
    }, []) ;


    useEffect(() => {
        if(data.letter4 === "x")
        {
            setShow(true);
        }
        else if(data.letter4 === "y")
        {
            setShow(false);
        }
    }, [data.letter4]) ;

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

                <AnimatedMount show={show}>
                    <ContainerContentRow>
                        <ContainerContent size="12" icon="bitcoin" title="AnimatedMount Test">
                            {data.letter4}
                        </ContainerContent>
                    </ContainerContentRow>
                </AnimatedMount>



            </ContainerLayout>
        </span>
    );

}