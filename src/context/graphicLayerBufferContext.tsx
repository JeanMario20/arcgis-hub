import { createContext, useContext, useRef } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

interface layersValues{
    bufferLayer: React.RefObject<GraphicsLayer | null>,
    children: React.ReactNode,
}

const graphicLayerBufferContext = createContext <layersValues | undefined>(undefined)

export function useBufferLayer(){
    const context = useContext(graphicLayerBufferContext)
    if(context == undefined){
        throw new Error("useBufferLayer must be used withing a mapContext provider")
    }
    return context
}

export function LayerContext({ children }: layersValues){
    const bufferLayer = useRef<GraphicsLayer | null>(null);

    const Layer = new GraphicsLayer({
        id: 'BufferLayer',
        graphics: [],
        
    })

    bufferLayer.current = Layer;

    const value = {
        bufferLayer,
        children
    }

    return(
        <graphicLayerBufferContext.Provider value={value}>
            {children}
        </graphicLayerBufferContext.Provider>
    )
}