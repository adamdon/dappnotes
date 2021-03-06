import React, {useEffect} from "react";
import FadeIn from 'react-fade-in';
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import {useData} from "../../utilities/DataContextProvider";
import NoteWizard from "./NoteWizard";
import {Link} from "react-router-dom";

export default function HomePage()
{
    const [data, setData] = useData();

    useEffect(() => {
        // console.log("HomePage");
    }, []) ;


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="home" title="Create your note">
                        <NoteWizard/>
                    </ContainerContent>
                </ContainerContentRow>


                <ContainerContentRow>

                    <ContainerContent size="6" icon="eye" title="View Notes">
                        <FadeIn transitionDuration={500} delay={250}>
                            <div className="alert bg-secondary mb-0">
                                View an already created notes
                                <Link to="/view" className="text-white text-decoration-none fw-bold"> here <i className="fa fa-link"></i></Link>
                            </div>
                        </FadeIn>
                    </ContainerContent>


                    <ContainerContent size="6" icon="question" title="About DappNotes">
                        <FadeIn transitionDuration={500} delay={250}>
                            <div className="alert bg-secondary mb-0">
                                Learn more about how to use DappNotes and how it all works
                                <Link to="/about" className="text-white text-decoration-none fw-bold"> here <i className="fa fa-link"></i></Link>
                            </div>
                        </FadeIn>
                    </ContainerContent>

                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );

}