import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import React, {useEffect} from "react";
import {useData} from "../../utilities/DataContextProvider";

export default function HomePage()
{
    const [data, setData] = useData();

    // useEffect(() => {
    //     console.log("HomePage")
    // }, []) ;


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="home" title="Welcome">
                        <div className="alert bg-secondary">
                            <p>
                                {"Welcome text here"}
                            </p>
                        </div>
                    </ContainerContent>
                </ContainerContentRow>


                <ContainerContentRow>
                    <ContainerContent size="6" icon="hotel" title="Input">

                        <div className="alert bg-secondary">
                            <p>
                                {"Input"}
                            </p>
                        </div>

                    </ContainerContent>

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