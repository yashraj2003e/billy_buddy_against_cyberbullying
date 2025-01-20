import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

function Map({ items }) {
  //   console.log(items[0].lat);
  return (
    <MapContainer
      center={items.length === 1 ? [items[0].lat, items[0].lng] : [52, -1]}
      zoom={7}
      scrollWheelZoom={false}
      className="h-[100vh] w-[100vw]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
