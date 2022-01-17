import React from "react";
import StepWizard from "react-step-wizard";
import WizardNav from "./WizardNav";
import StepIntro from "./StepIntro";
import StepImageSelect from "./StepImageSelect";
import StepImageCompress from "./StepImageCompress";
import {useData} from "../../utilities/DataContextProvider";
import StepWrapper from "../../containers/StepWrapper";




export default function NoteWizard(props)
{
    const [data, setData] = useData();

    const transitions = {
        enterRight: `${"animated"} ${"enterRight"}`,
            enterLeft: `${"animated"} ${"enterLeft"}`,
            exitRight: `${"animated"} ${"exitRight"}`,
            exitLeft: `${"animated"} ${"exitLeft"}`,
            intro: `${"animated"} ${"intro"}`,
    };


    return (
        <StepWizard nav={<WizardNav/>} transitions={transitions} instance={(instance) => setData({stepWizard: instance})}>
            <StepWrapper stepName={"StepIntro"}>
                <StepIntro/>
            </StepWrapper>
            <StepWrapper stepName={"StepImageSelect"}>
                <StepImageSelect/>
            </StepWrapper>
            <StepWrapper stepName={"StepImageCompress"}>
                <StepImageCompress/>
            </StepWrapper>
        </StepWizard>
    );
}