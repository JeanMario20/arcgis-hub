import type MapView from "@arcgis/core/views/MapView";
import { createContext, useContext, useRef } from "react";

interface Props {
    children: React.ReactNode
}

interface layersValueInter{
    drawLayerRef: React.RefObject<MapView | null>,
}

const layersContext = createContext <layersValueInter | undefined>(undefined)

export function useLayer(){
    const context = useContext(layersContext)
    if(context == undefined){
        throw new Error("useLayer must be used withing a MapCONTEXT provider")
    }
    return context
}

export function LayerContext({ children }: Props){
    const drawLayerRef = useRef<MapView | null>(null)

    const value = {
        drawLayerRef
    }

    return(
        <layersContext.Provider value={value}>
            { children }
        </layersContext.Provider>
    )

} 