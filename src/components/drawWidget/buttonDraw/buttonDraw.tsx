import {type ReactNode, type MouseEvent, useEffect, useRef, type RefObject }  from "react";
import { useState } from 'react';
import { useMap } from "../../../context/viewContext";
import Graphic from "@arcgis/core/Graphic.js"
import SimpleMarkerSymbol from "arcgis/core/symbols/SimpleMarkerSymbol"
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
    const view = clickRef;
    const coordenadasPoints: number[] = [];
    const coordenadasPolyline: number[] = []
    const idCounter = {id: 0};

    useEffect(() => {
        isDrawPolylineRef.current = isDrawPolyline;
        if(isDrawPolylineRef.current){
            const handlerClick = view.current?.on("click", (event) => {
                dibujarPolyline(view, event, coordenadasPoints, idCounter);
                coordenadasPolyline.push([event.mapPoint.longitude, event.mapPoint.latitude]);
                console.log(coordenadasPoints);
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

function dibujarPolyline(view: RefObject<__esri.MapView | null>, event: __esri.ViewClickEvent, coordenadas: [number, number | null | undefined][], ref:{ id:number}){

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
        id: ref.id,
        Name: "user",
        owner: "user",
        space: "number",
        x: event.mapPoint.longitude?.toString(),
        y: event.mapPoint.latitude?.toString(),
        type: "point"
    };

    ref.id++;

    const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        attributes: pointAtt
    });

    view.current?.graphics.add(pointGraphic);
    const countGraphics = view.current?.graphics.length;

    if(countGraphics != undefined && countGraphics == 1 && ref.id == 1){

        console.log(coordenadas);
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

        view.current?.graphics.add(polylineGraphics);
    }

    if(countGraphics != undefined && countGraphics > 1 && view.current?.graphics.items[1].geometry.paths){
        const polyline = {
            type: "polyline",
            paths: [coordenadas]
        }
        view.current.graphics.items[1].geometry = polyline;
    }   
    
}