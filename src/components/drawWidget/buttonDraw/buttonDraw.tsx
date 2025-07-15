import {type ReactNode, type MouseEvent, useEffect, useRef, type RefObject }  from "react";
import { useState } from 'react';
import { useMap } from "../../../context/viewContext";
import Graphic from "@arcgis/core/Graphic.js"
import SimpleMarkerSymbol from "arcgis/core/symbols/SimpleMarkerSymbol"
import type GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
//import type Graphic from "@arcgis/core/views/Graphic";

interface Props{
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    isDrawPolyline: boolean;
    setIsDrawPolyline: React.Dispatch<React.SetStateAction<boolean>>,
    coordenadas: number[],
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
    const { bufferLayer } = useMap()
    const view = clickRef;
    const coordenadasPoints: number[] = [];
    const coordenadasPolyline: number[] = []
    const trazoCounter = {trazo: 0};

    useEffect(() => {
        isDrawPolylineRef.current = isDrawPolyline;
        if(isDrawPolylineRef.current){
            const handlerClick = view.current?.on("click", (event) => {
                DibujarPolyline(view, event, coordenadasPoints, trazoCounter, bufferLayer);
                coordenadasPolyline.push([event.mapPoint.longitude, event.mapPoint.latitude]);
            })
            const handlerDoubleClick = view.current?.on("double-click",(event) => {
                setIsDrawPolyline( prev => !prev);
                console.log("se hizo doble click");
                
            })
            return () => {
                handlerClick?.remove();
                handlerDoubleClick?.remove();
            };
        }else{
            return;
        }

    }, [isDrawPolyline, clickRef, view])

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

function DibujarPolyline(view: RefObject<__esri.MapView | null>, event: __esri.ViewClickEvent, coordenadas: [number, number | null | undefined][], ref:{ trazo:number}, bufferLayer: React.RefObject<GraphicsLayer | null>){
    
    const point = {
        type: "point", // autocasts as new Point()
        longitude: event.mapPoint.longitude,
        latitude: event.mapPoint.latitude,
    };

    coordenadas.push([event.mapPoint.longitude, event.mapPoint.latitude]);

    const markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
            color: [255, 255, 255],
            width: 2
        },
    };

    const pointAtt = {
        id: ref.trazo,
        Name: "user",
        owner: "user",
        space: "number",
        x: event.mapPoint.longitude?.toString(),
        y: event.mapPoint.latitude?.toString(),
        type: "point"
    };

    ref.trazo++;

    const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        attributes: pointAtt
    });

    //view.current?.graphics.add(pointGraphic); <-- dibujar en el mapa
    bufferLayer.current?.graphics.add(pointGraphic);
    const countGraphics = bufferLayer.current?.graphics.length;
    

    if(countGraphics != undefined && countGraphics == 1 && ref.trazo == 1){

        const polyline = {
            type: "polyline",
            paths: [
                //[coordenadas[0][0], coordenadas[0][1]],
                [-94.56682631003801, 18.022285257769557],
                [-94.2489634193771, 18.07070008924522],
            ]
        };

        const lineSymbol = {
            type: "simple-line",
            color: [226, 119, 40],
            width: 4
        };

        const lineAtt = {
            Name: "temp",
            owner: "temp",
            length: "temp",
            type: "polyline",
        };

        const polylineGraphics = new Graphic({
            geometry: polyline,
            Symbol: lineSymbol,
            attributes: lineAtt,
        });
        
        //view.current?.graphics.add(polylineGraphics);
        bufferLayer.current?.graphics.add(polylineGraphics);
    }

    if(countGraphics != undefined && countGraphics > 1 && bufferLayer.current?.graphics.items[1].geometry.paths){
        const polyline = {
            type: "polyline",
            paths: [coordenadas]
        }
        bufferLayer.current.graphics.items[1].geometry = polyline;
    }   
    
}