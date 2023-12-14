import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import './styles.css';
import positionList from "./PositionList";

// const calTime = (instance) => {
//     const n = positionList.length;
//     for(let i = 0; i < n; i++){
//         for(let j = i + 1; j < n; j++){
//             instance.setWaypoints([
//                 [positionList[i][0], positionList[i][1]],
//                 [positionList[j][0], positionList[j][1]],
//             ])
//             console.log(instance._routes);
//             console.log(instance._routes[0].summary.totalTime);
//         }
//     }

// }
const createRoutineMachineLayer = ({lats, ref}) => {
  const instance = L.Routing.control({
    waypoints: lats.map((item) => L.latLng(item[0], item[1])),
    show: false,
    createMarker: function() {return null},
  })

//   const instanceDummy = L.Routing.control({
//     waypoints: [],});
//     console.log('jj');
//     calTime(instanceDummy);

//   instance.hide();

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;