import { 
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
  Polyline,
  FeatureGroup,
  CircleMarker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useState } from "react";
import { useContext } from "react";
import UserContext from "app/contexts/UserContext";
import positionList from "./PositionList";
import RoutingMachine from "./Routes";
import { useRef } from "react";
import { useEffect } from "react";

// https://shaoweiwu088.pixnet.net/blog/post/262765884-%E5%85%A8%E5%8F%B0%E6%99%AF%E9%BB%9E%E5%BA%A7%E6%A8%99%E4%BD%8D%E7%BD%AE%E5%9C%96

export default function LeafletMap({schedule, setSchedule, lats, setLats}) {

  const center = [24.78919, 121.040415];
  const fillRedOptions = { fillColor: 'red' };

  const rMachine = useRef();

  const {timeValue} = useContext(UserContext);

  const handleAddPoint = (item) => {
    setSchedule(prev => {
      let t = timeValue.$H * 60 + timeValue.$m;
      t += 20 * prev.length;
      const newSchedule = [...prev,
        {stop: item[2], hour:(t / 60) >> 0, minute:t % 60}];
      console.log(newSchedule);
      return newSchedule;
    });
    setLats(prev => {
      const newLats = [...prev, [item[0], item[1]]];
      return newLats;
    });
  }

  useEffect(() => {
    rMachine.current?.setWaypoints(lats);
  }, [lats]);

  return (
    <MapContainer center={center} zoom={10.5} 
      scrollWheelZoom={false} 
      style={{height: "50vh", width: "40vw"}}
    >
        
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayerGroup>
        {positionList.map((item) =>
          <CircleMarker
            center={[item[0], item[1]]}
            pathOptions={fillRedOptions}
            radius={12}
            eventHandlers={{click: () => handleAddPoint(item),
              mouseover: (event) => event.target.openPopup(),}}
          >
            <Popup>
              {item[2]}
            </Popup>
          </CircleMarker>
        )}
        <RoutingMachine 
          lats={lats}
          ref={rMachine}
        />
      </LayerGroup>
      {/* <FeatureGroup>
        {lats.length > 1 && <Polyline 
          positions={lats.map((item)=>[item[0],item[1]])}
          color="blue"
        />}
      </FeatureGroup> */}
      
    </MapContainer>
  );
}