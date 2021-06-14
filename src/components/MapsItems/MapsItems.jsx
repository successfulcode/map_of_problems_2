import React, { useState, useCallback } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './MapsItems.css';
import { Icon } from 'leaflet';
import pav from '../../assets/marker2.svg';

const MapsItems = () => {
  const [activePark, setActivePark] = useState(null);
  const [markers, setMarkers] = React.useState([]);

  const mano = new Icon({
    iconUrl: pav,
    iconSize: [50, 50]
  });

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        id: Math.random(),
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        time: new Date(),
        title: `${'Mmano'} ${current.length + 1}`
      }
    ]);
  }, []);

  return (
    <div>
      saas
      <Map
        center={[55.59935, 26.435249]}
        zoom={14}
        onclick={onMapClick}
        minZoom={12}
      >
        <TileLayer
          url='https://api.mapbox.com/styles/v1/stopmusic/ckas96el431fv1insedfseafe/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3RvcG11c2ljIiwiYSI6ImNrYXM5YmhiYTBxb2IyenBya2ZuNmRsNjQifQ.9NQXZC-gl9_suSXL7P1U2A'
          attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
        />
        {markers.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            onClick={() => {
              setActivePark({
                params: [item.lat, item.lng],
                title: item.title,
                time: item.time.toString()
              });
            }}
            icon={mano}
          />
        ))}

        {activePark && (
          <Popup
            position={activePark.params}
            onClose={() => {
              setActivePark(null);
            }}
          >
            <div>
              <h6>{activePark.title}</h6>
              <p>{activePark.time}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapsItems;
