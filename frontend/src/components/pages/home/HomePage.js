import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import React, {useEffect} from "react";
import {useData} from "../../utilities/DataContextProvider";
import InputFile from "./InputFile";
import NoteWizard from "./NoteWizard";

export default function HomePage()
{
    const [data, setData] = useData();

    useEffect(() => {
        console.log("HomePage")
    }, []) ;


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="home" title="Welcome">
                        <NoteWizard/>
                        {/*<div className="alert bg-secondary">*/}
                        {/*    <p>*/}
                        {/*        {"Welcome text here"}*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </ContainerContent>
                </ContainerContentRow>


                <ContainerContentRow>

                    <InputFile/>

                    <ContainerContent size="6" icon="flag" title="Output">
                        <div className="alert bg-secondary">
                            <p>
                                {"Output"}
                            </p>
                        </div>
                    </ContainerContent>

                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );

}