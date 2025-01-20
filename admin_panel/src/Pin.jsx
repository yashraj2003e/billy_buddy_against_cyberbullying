import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return <Marker position={[item.lat, item.lng]}></Marker>;
}

export default Pin;
