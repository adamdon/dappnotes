import React from "react";
import StepWizard from "react-step-wizard";
import WizardNav from "./WizardNav";
import StepIntro from "./StepIntro";
import StepImageSelect from "./StepImageSelect";
import StepImageCompress from "./StepImageCompress";
import {useData} from "../../utilities/DataContextProvider";
import StepWrapper from "../../containers/StepWrapper";
import StepDetails from "./StepDetails";
import StepIPFS from "./StepIPFS";
import StepFinal from "./StepFinal";
import StepWallet from "./StepWallet";
import StepTransaction from "./StepTransaction";
import StepCloud from "./StepCloud";




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
        <StepWizard className={'mt-0 note-wizard'} nav={<WizardNav/>} transitions={transitions}>
        {/*<StepWizard className={'mt-0'} nav={<WizardNav/>} transitions={transitions} instance={(instance) => setData({stepWizard: instance})}>*/}
            <StepWrapper stepName={"StepIntro"}>
                <StepIntro/>
            </StepWrapper>
            <StepWrapper stepName={"StepImageSelect"}>
                <StepImageSelect/>
            </StepWrapper>
            <StepWrapper stepName={"StepImageCompress"}>
                <StepImageCompress/>
            </StepWrapper>
            <StepWrapper stepName={"StepDetails"}>
                <StepDetails/>
            </StepWrapper>
            <StepWrapper stepName={"StepIPFS"}>
                <StepIPFS/>
            </StepWrapper>
            <StepWrapper stepName={"StepCloud"}>
                <StepCloud/>
            </StepWrapper>
            <StepWrapper stepName={"StepWallet"}>
                <StepWallet/>
            </StepWrapper>
            <StepWrapper stepName={"StepTransaction"}>
                <StepTransaction/>
            </StepWrapper>
            {/*<StepWrapper stepName={"StepFinal"}>*/}
            {/*    <StepFinal/>*/}
            {/*</StepWrapper>*/}
        </StepWizard>
    );
}