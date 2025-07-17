import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MapView from '../src/components/mapView/mapView'
//import ButtonDraw from './components/drawWidget/buttonDraw/buttonDraw'
import WidgetContainer from './components/widgetContainer/widgetContainer'
//import Template from './components/drawWidget/template/template'
import { MapContext } from './context/viewContext'
import BufferTemplate from './components/bufferWidget/bufferWidget'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapContext>
      <MapView>
        <WidgetContainer>
          <BufferTemplate/>
          {/* <ButtonDraw/> */}
          {/* <Template/> */}
        </WidgetContainer>
      </MapView>
    </MapContext>
    
    
  </StrictMode>,
)
