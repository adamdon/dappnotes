import React from "react";




export default function StepWrapper(props)
{


    return (
        <div className="alert bg-secondary" style={{height: 400}}>
            {React.cloneElement(props.children, {...props})}
        </div>
    );
}