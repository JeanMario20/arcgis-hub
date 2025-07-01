import {type ReactNode, type MouseEvent, useEffect, useRef }  from "react";
import { useState } from 'react';
import { useMap } from "../../../context/viewContext";

interface Props{
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    isDrawPolyline: boolean;
    setIsDrawPolyline: React.Dispatch<React.SetStateAction<boolean>>,
}

function Button({onClick, children}: Props){
    return(
        <button onClick={onClick}>
            {children}
        </button>
    )
}

function ButtonOnOff(){
    const [isDrawPolyline, setIsDrawPolyline] = useState<boolean>(false);
    const { clickRef } = useMap();
    const isDrawPolylineRef = useRef(isDrawPolyline);

    useEffect(() => {
        isDrawPolylineRef.current = isDrawPolyline;
        if(isDrawPolylineRef.current){
            const handler = clickRef.current?.on("click", (event) => {
                console.log("longitud:", event.mapPoint.longitude);
                console.log("latitud:", event.mapPoint.latitude);
            })
            
            

            return () => {
                handler?.remove();
            };
        }else{
            return;
        }

    }, [isDrawPolyline, clickRef])

    return(
        <>
        <Button onClick={() => setIsDrawPolyline(prev => !prev)}>Polyline</Button>
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