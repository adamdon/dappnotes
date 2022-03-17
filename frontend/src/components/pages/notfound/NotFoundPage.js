import React, {useEffect} from "react";
import FadeIn from 'react-fade-in';
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import {useData} from "../../utilities/DataContextProvider";
import {Link} from "react-router-dom";

export default function NotFoundPage()
{
    const [data, setData] = useData();

    useEffect(() => {
        // console.log("HomePage");
    }, []) ;


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="question" title="404 - Page Not Found">
                        <FadeIn transitionDuration={500} delay={250}>
                            <div className="alert bg-secondary mb-0">
                                Try visting the
                                <Link to="/" className="text-white text-decoration-none fw-bold"> Home Page <i className="fa fa-link"></i></Link>
                            </div>
                        </FadeIn>
                    </ContainerContent>
                </ContainerContentRow>
            </ContainerLayout>
        </span>
    );

}