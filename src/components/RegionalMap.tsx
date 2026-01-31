'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface Region {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    status: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    consumption: number;
}

export default function RegionalMap() {
    const [regions, setRegions] = useState<Region[]>([]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const res = await fetch('/api/map');
                const data = await res.json();
                if (Array.isArray(data)) setRegions(data);
            } catch (error) {
                console.error('Failed to load map data', error);
            }
        };
        fetchRegions();
    }, []);

    const getColor = (status: string) => {
        switch (status) {
            case 'CRITICAL': return '#ef4444'; // red-500
            case 'HIGH': return '#f97316'; // orange-500
            case 'MEDIUM': return '#eab308'; // yellow-500
            default: return '#10b981'; // emerald-500
        }
    };

    return (
        <div className="h-full w-full relative z-0">
            <MapContainer
                center={[31.7917, -7.0926]} // Center of Morocco
                zoom={5}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', zIndex: 0, background: '#0f172a' }}
                className="rounded-2xl"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {regions.map(region => (
                    <CircleMarker
                        key={region.id}
                        center={[region.latitude, region.longitude]}
                        pathOptions={{
                            color: getColor(region.status),
                            fillColor: getColor(region.status),
                            fillOpacity: 0.5,
                            weight: 2,
                            stroke: true
                        }}
                        radius={15 + (region.consumption / 2000)}
                    >
                        <Popup className="premium-popup">
                            <div className="p-1 min-w-[120px]">
                                <h3 className="font-black text-slate-900 leading-tight mb-1">{region.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getColor(region.status) }} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{region.status}</span>
                                </div>
                                <p className="text-xs text-slate-600 font-medium">Consommation: <span className="font-bold text-slate-900">{region.consumption} kWh</span></p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>

            {/* Map Overlay Legende */}
            <div className="absolute bottom-4 right-4 z-[400] bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Légende</div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-white font-bold">Optimal</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] text-white font-bold">Critique</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
