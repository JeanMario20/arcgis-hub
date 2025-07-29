import type Polyline from "@arcgis/core/geometry/Polyline";
import type Graphic from "@arcgis/core/Graphic";
import { useMap } from "../../context/viewContext";
//polyline: __esri.Collection<Graphic> | undefined): Promise<Props>
interface Props{
    id: number;
    response: string
}

export async function CreateBuffer(layer: React.RefObject<__esri.GraphicsLayer | null>){
    //const { bufferLayer } = useMap()
    //const url = "http://jejgelcvggsdn6mg.maps.arcgis.com/CreateBuffers/submitJob"
    //const response = await fetch(url);
    /*if(!response.ok){
        throw new Error("an error hath occuredd" + response.statusText);
    }*/
    //console.log(polyline);
    return true;
}