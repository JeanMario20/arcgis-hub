import type {ReactNode, MouseEvent }  from "react";
//import { useState } from 'react';
import { useMap } from "../../../context/viewContext";

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
    const { isDrawing,setIsDrawing } = useMap();
    const { divElement, startDraw } = useMap()
    const { clickRef } = useMap();

    function onOffDraw(){
        setIsDrawing(!isDrawing);
        if(isDrawing == true){
            clickRef.current?.on("click", (event) => {
            console.log("longitud:", event.mapPoint.longitude);
            console.log("latitud:", event.mapPoint.latitude);
            })
        }
        { divElement() }
        { startDraw() }

        //tratar de conseguir el viewRef ponerlo aqui mismo y ver si puedo hacer operaciones de onClick
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