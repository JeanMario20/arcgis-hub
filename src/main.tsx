import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MapView from '../src/components/mapView/mapView'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapView/>
  </StrictMode>,
)
