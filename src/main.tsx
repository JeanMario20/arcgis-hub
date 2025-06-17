import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MapView from '../src/components/mapView/mapView'
import ButtonDraw from './components/drawWidget/buttonDraw/buttonDraw'
import WidgetContainer from './components/widgetContainer/widgetContainer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <MapView value={viewCon}/> */}
    <MapView>
      <WidgetContainer>
        <ButtonDraw/>
      </WidgetContainer>
    </MapView>
    
  </StrictMode>,
)
