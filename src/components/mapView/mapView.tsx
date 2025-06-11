/* eslint-disable @typescript-eslint/no-unused-vars */
import "@arcgis/map-components";
import "./mapView.css"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import { useEffect } from "react"

function ShowMap(){

    useEffect(() => {
        const map = new Map({
            basemap: "topo-vector"
        });

        new MapView({
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
        <div id="viewDiv" style={{width:"247vh"}}></div>
    )
}

export default function mapView(){
    return(
    <>
    <ShowMap/>
    </>
    )
    
}