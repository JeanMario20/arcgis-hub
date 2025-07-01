import type MapView from "@arcgis/core/views/MapView";
import React, { createContext, useContext, useRef, useState } from "react";

interface Props{
    children: React.ReactNode;
}

interface MapContextValue {
    viewRefs: React.RefObject<HTMLInputElement | null>
    isDrawing: boolean;
    setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>,
    divElement: () => void;
    clickRef: React.RefObject<MapView | null>
}

const ViewContext = createContext<MapContextValue | undefined>(undefined);

export function useMap(){
    const context = useContext(ViewContext);
    if (context === undefined){
        throw new Error('useMap must be used withing a MapCONTEXT provider');
    }
    return context;
}

export function MapContext({ children }: Props){
    const viewRefs = useRef<HTMLInputElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(true);
    const clickRef = useRef<MapView | null >(null);

    const divElement = () => {
        console.log(viewRefs.current?.offsetWidth);
    }

    /*const startDraw = () => { 
        console.log("aalgo")
    }*/

    const value = {
        viewRefs,
        isDrawing,
        setIsDrawing,
        divElement,
        clickRef
    }

    return(
        <ViewContext.Provider value={value}>
            {children}
        </ViewContext.Provider>
    );
}

