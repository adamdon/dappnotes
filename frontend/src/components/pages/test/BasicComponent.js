import React, {useState} from "react";
import {useData} from "../../data/DataContextProvider"



export default function BasicComponent()
{
    const [data, setData] = useData();
    const [input, setInput] = useState("start");


    function test()
    {
        setData({letter4: "4"});
        // setData({letter: "d", letter4: "4"});
        // setData((oldData) => ({...oldData, letter: (oldData.letter + "+")}));
    }



    function handleSubmit(event)
    {
        event.preventDefault();
        console.log("handleSubmit");
        console.log(input);
    }


    return (
        <div>
            <p>data.letter: {data.letter}</p>
            <p>data.letter2: {data.letter2}</p>
            <p>data.letter4: {data.letter4}</p>
            <button onClick={test}>Click to call global - letter4</button>


            <form onSubmit={handleSubmit}>
                <label>Local Input state here
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </label>
            </form>
            <p>Local input state is: {input}</p>



            <p>----------------------------</p>
            <form onSubmit={handleSubmit}>
                <label>Global Input state here
                    <input
                        type="text"
                        value={data.letter}
                        onChange={(e) => setData({letter: e.target.value})}
                    />
                </label>
            </form>
            <p>Global input state is: {data.letter2}</p>


        </div>
    );
}


