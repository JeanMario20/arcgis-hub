import type {ReactNode, MouseEvent }  from "react";
import { useState } from 'react';

interface Props{
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

function Button({onClick, children}: Props){
    return(
        <button onClick={onClick}>
            {children}
        </button>
    )
}


function ButtonOnOff(){
    const [draw, setDraw ] = useState(false);

    function onOffDraw(){
        setDraw(!draw);
        alert(`este modo es: ${draw}` );
    }

    return(
        <>
        <Button onClick={onOffDraw}>Polyline</Button>
        </>
    )
}

export default function button(){
    
    return(
        <>
        <ButtonOnOff/>
        </>
    )
}