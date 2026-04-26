import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { Icon } from 'leaflet'
import L from 'leaflet'
import pin from '../assets/alarm.png'
const Map = ()=>{
    //const position=[22.68,88.46]
    const [coord,setCoord] = useState(null)
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
                (position)=>{
                    console.log(position.coords.latitude)
                    setCoord([position.coords.latitude, position.coords.longitude])

                },
                (err)=>{
                    console.log(err.message);
                    
                }
            )
    },[])

    const customIcon = L.icon({
    iconUrl:pin,
    iconSize: [30,30]
  })
    if (!coord) return <h2>Loading Map</h2>;        
    return (
        <MapContainer center={coord} zoom={18}>
            <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'/>

            <Marker position={coord} icon={customIcon}>
                <Popup>Your Location</Popup>
            </Marker>
        </MapContainer>
    )
}
export default Map