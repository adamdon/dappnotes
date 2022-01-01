import React from "react";
import Animated from "react-mount-animation";




export default function AnimatedMount(props)
{

    const mountAnimation = `
        0% {opacity: 0;}
        0% {transform : scale(0);}
        
        50% {transform : scale(1.05);}
        
        100% {opacity: 1;}
        100% {transform : scale(1);}
        `

    const unmountAnimation = `
        0% {opacity: 1;}
        0% {transform : scale(1);}
        
        50% {transform : scale(0.75);}
        
        100% {opacity: 0;}
        100% {transform : scale(0);}
        `

    return (

        <Animated.div show={props.show} delay={0.25} time={0.5} className={'div-wrapper'} mountAnim={mountAnimation} unmountAnim={unmountAnimation}>
            {props.children}
        </Animated.div>

    );
}