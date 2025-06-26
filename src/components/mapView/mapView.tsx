/* eslint-disable @typescript-eslint/no-unused-vars */
import "@arcgis/map-components";
import "./mapView.css"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import { useContext, useEffect } from "react"
import { useMap } from "../../context/viewContext";

interface Props{
    children?: React.ReactNode;
}

function ShowMap({ children }: Props){

    const { viewRefs,clickRef } = useMap();
    const { startDraw } = useMap();

    useEffect(() => {
        const map = new Map({
            basemap: "topo-vector"
        });

        const view = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 10,
            center: [-92.93028, 17.98689],// Coordenadas de ejemplo
        });

        clickRef.current = view;
        
        const anotherMap = document.getElementsByClassName('esri-view-user-storage');

        while (anotherMap.length > 0){
            anotherMap[0].parentNode?.removeChild(anotherMap[0])
        }
    }, [clickRef]);

    const draw = () => {
            console.log(`el valor actual de view: ${clickRef}`);
        }

    return(
        <div ref={ viewRefs } onClick={startDraw} id="viewDiv" style={{width:"247vh"}}>{children}</div>
    )
}

export default function mapView({ children }: Props){
    return(
    <>
    <ShowMap/>
    {children}
    </>
    )
    
}