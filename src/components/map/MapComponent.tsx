'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MapComponent() {
    const regions = [
        { name: "North Region", lat: 34.0, lng: -6.8, status: "HIGH", color: "#ef4444" }, // Red for High
        { name: "South Region", lat: 31.6, lng: -8.0, status: "LOW", color: "#10b981" },  // Green for Low
        { name: "East Region", lat: 34.0, lng: -5.0, status: "MEDIUM", color: "#f59e0b" }, // Amber for Medium
    ];

    return (
        <MapContainer
            center={[31.7917, -7.0926]} // Centered on Morocco roughly
            zoom={6}
            className="w-full h-full rounded-xl z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {regions.map((region, idx) => (
                <Circle
                    key={idx}
                    center={[region.lat, region.lng]}
                    pathOptions={{ fillColor: region.color, color: region.color }}
                    radius={50000}
                >
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold text-gray-900">{region.name}</h3>
                            <p className="text-sm text-gray-600">Status: {region.status}</p>
                            <p className="text-xs text-gray-500">Consumption: {region.status === 'HIGH' ? '1.2 GWh' : '0.4 GWh'}</p>
                        </div>
                    </Popup>
                </Circle>
            ))}

            {regions.map((region, idx) => (
                <Marker key={`marker-${idx}`} position={[region.lat, region.lng]} icon={customIcon}>
                    <Popup>{region.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
