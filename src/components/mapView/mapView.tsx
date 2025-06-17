/* eslint-disable @typescript-eslint/no-unused-vars */
import "@arcgis/map-components";
import "./mapView.css"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import { useEffect } from "react"

interface Props{
    children?: React.ReactNode
}

function ShowMap({ children }: Props){

    useEffect(() => {
        const map = new Map({
            basemap: "topo-vector"
        });

        const viewCon = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 10,
            center: [-92.93028, 17.98689], // Coordenadas de ejemplo
        });
        
        const anotherMap = document.getElementsByClassName('esri-view-user-storage');

        while (anotherMap.length > 0){
            anotherMap[0].parentNode?.removeChild(anotherMap[0])
        }
    }, []);

    return(
        <div id="viewDiv" style={{width:"247vh"}}>{children}</div>
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