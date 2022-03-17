import React, {useEffect} from "react";
import FadeIn from 'react-fade-in';
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import {useData} from "../../utilities/DataContextProvider";
import {Link} from "react-router-dom";

export default function AboutPage()
{
    const [data, setData] = useData();

    useEffect(() => {
        // console.log("HomePage");
    }, []) ;


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="home" title="Source Code">
                        <FadeIn transitionDuration={500} delay={250}>
                            <div className="alert bg-secondary text-monospace mb-0 pb-3">
                                <span>
                                    DappNotes is open source with the code available at
                                    <a href="https://github.com/adamdon/dappnotes" target="_blank" rel="noopener noreferrer" type="button" className="btn fw-bold btn-sm btn-dark mx-1">
                                        <span><i className="fa fa-external-link"></i> GitHub</span>
                                    </a>
                                </span>
                            </div>
                        </FadeIn>
                    </ContainerContent>
                </ContainerContentRow>


                <ContainerContentRow>
                    <ContainerContent size="12" icon="eye" title="License">
                        <FadeIn transitionDuration={500} delay={250}>
                            <div className="alert bg-secondary text-monospace mb-0">
                                <p className="text-monospace">
                                    Copyright (c) 2022 Adam Don
                                </p>

                                <p className="text-monospace">
                                    Permission is hereby granted, free of charge, to any person obtaining a copy
                                    of this software and associated documentation files (the "Software"), to deal
                                    in the Software without restriction, including without limitation the rights
                                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                    copies of the Software, and to permit persons to whom the Software is
                                    furnished to do so, subject to the following conditions:
                                </p>

                                <p className="text-monospace">
                                    The above copyright notice and this permission notice shall be included in all
                                    copies or substantial portions of the Software.
                                </p>


                                <p className="text-monospace">
                                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                                    SOFTWARE.
                                </p>

                            </div>
                        </FadeIn>
                    </ContainerContent>
                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );

}