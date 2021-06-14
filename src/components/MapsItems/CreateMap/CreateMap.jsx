import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { geosearch, arcgisOnlineProvider, featureLayerProvider } from 'esri-leaflet-geocoder';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
import { Map, TileLayer } from 'react-leaflet';
import './CreateMap.css';
import { InputItem } from './InputItem';
import Geocode from "react-geocode";
import ReactLeafletSearch from "react-leaflet-search";
import CustomSearch from './CustomSearch';

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
});



const CreateMap = () =>{

    const mapRef = useRef();
    const center = [55.59935, 26.435249];
    const [item, setItem] = useState('')
   
    useEffect(()=>{
      const { current = {} } = mapRef;
      const { leafletElement: map } = current;

      if(!map) return;

      const control = geosearch({placeholder: 'Įveskite adresą', position: 'topleft' });

      control.addTo(map);

      control.on('results', handleOnSearchResults,  handleSubmit );

      return () => {
        control.off('results', handleOnSearchResults)
      }
     
    },[])

    function handleOnSearchResults(data) {
      console.log('Search results', data)
    }
    

    console.log(item)
    const handleSubmit = (event, data) =>{
      
      event.preventDefault();

    }
 
  

    return (
      <>
      <CustomSearch />
      <form onSubmit={handleSubmit}>
<input value={item} onChange={(e)=>setItem(e.target.value)} type='text' placeholder="Enter Name" name='results1' />
  </form>

        <Map
          style={{ height: '80vh' }}
          center={center}
          zoom='10'
          ref={mapRef}
        >
          <ReactLeafletSearch 
          position="topright" 
          provider="OpenStreetMap" 
          providerOptions={{ region: "lt" }} 
          // searchBounds = {
          //   [
          //     [33.100745405144245, 46.48315429687501],
          //     [44.55916341529184, 24.510498046875]
          //   ]}
          inputPlaceholder="Įveskite adresą!"
          openSearchOnLoad={true}
          customProvider={item }

          />
          <TileLayer
            attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
            url={'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          />
          <div className='pointer' />
        </Map>
      </>
    );
  }

export default CreateMap;
