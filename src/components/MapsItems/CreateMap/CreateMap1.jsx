import React, { Component } from 'react';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map, TileLayer } from 'react-leaflet';
import './CreateMap.css';
import { InputItem } from './InputItem';
import Geocode from "react-geocode";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
});

class CreateMap1 extends Component {
  state = {
    item: 'labas'
  };

  componentDidMount() {
   
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    searchControl.on('results', function (data) {
      console.log('data', data);
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });

  }


  render() {

    const center = [55.59935, 26.435249];
    
    return (
      <>
    <InputItem />

        <Map
          style={{ height: '80vh' }}
          center={center}
          zoom='10'
          ref={(m) => {
            this.leafletMap = m;
          }}
        >
          <TileLayer
            attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
            url={'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          />
          <div className='pointer' />
        </Map>
      </>
    );
  }
}

export default CreateMap1;
