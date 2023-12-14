import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import './styles.css';

const createRoutineMachineLayer = ({lats, ref}) => {
  const instance = L.Routing.control({
    waypoints: lats.map((item) => L.latLng(item[0], item[1])),
    show: false,
    createMarker: function() {return null},
  })
//   instance.hide();

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;