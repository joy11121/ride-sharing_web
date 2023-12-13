import { 
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useState } from "react";

export default function LeafletMap({setInputDict}) {
  const center = [24.80806, 121.040415];
  const positionList = [
    [24.80806, 121.040415, ""],
    [24.817616, 121.025921, '六家庄'],
    [24.821205, 121.181797, '六福村'],
  ];
  const fillRedOptions = { fillColor: 'red' }

  const handleAddPoint = (item) => {
    setInputDict(prev => {
      const newSchedule = [...(prev.schedule), 
        {stop: item[2], hour:0, minute:0}];
      prev.schedule = newSchedule;
      console.log(prev);
      return prev;
    });
  }
  return (
    <MapContainer center={center} zoom={11} 
      scrollWheelZoom={false} 
      style={{height: "50vh", width: "40vw"}}
    >
        
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <LayerGroup>
        {positionList.map((item) =>
          <Circle
            center={[item[0], item[1]]}
            pathOptions={fillRedOptions}
            radius={2000}
            eventHandlers={{click: () => handleAddPoint(item)}}
          >
            {/* <Popup>
              {item[2]}
            </Popup> */}
          </Circle>
        )}
      </LayerGroup>
    </MapContainer>
  );
}