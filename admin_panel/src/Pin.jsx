import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    item && (
      <Marker position={[item.lat, item.lng]}>
        <Popup>
          <p>User Id : {item.userId}</p>
          <img src={item.image} style={{ width: "800px", height: "auto" }} />
        </Popup>
      </Marker>
    )
  );
}

export default Pin;
