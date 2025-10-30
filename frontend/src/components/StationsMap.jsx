import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { urbanStations, interurbanStations, urbanRoutes, interurbanRoutes } from '../data/stations';
import 'leaflet/dist/leaflet.css';

// Icônes personnalisées
const urbanStationIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#10B981">
      <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
      <path d="M8 12h8M12 8v8" stroke="white" stroke-width="2"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const interurbanStationIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#F59E0B">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="white" stroke-width="2"/>
      <path d="M6 10h12M6 14h12" stroke="white" stroke-width="1.5"/>
    </svg>
  `),
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

export default function StationsMap({ selectedType }) {
  const [selectedStation, setSelectedStation] = useState(null);

  const getStationsToShow = () => {
    switch (selectedType) {
      case 'urban':
        return urbanStations;
      case 'interurban':
        return interurbanStations;
      default:
        return [...urbanStations, ...interurbanStations];
    }
  };

  const getRoutesToShow = () => {
    switch (selectedType) {
      case 'urban':
        return urbanRoutes;
      case 'interurban':
        return interurbanRoutes;
      default:
        return [...urbanRoutes, ...interurbanRoutes];
    }
  };

  const stations = getStationsToShow();
  const routes = getRoutesToShow();

  return (
    <div className="h-96 relative rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[14.7167, -17.4167]}
        zoom={selectedType === 'interurban' ? 7 : 11}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Lignes de routes */}
        {routes.map(route => {
          const startStation = stations.find(s => s.name === route.startPoint);
          const endStation = stations.find(s => s.name === route.endPoint);
          
          if (startStation && endStation) {
            return (
              <Polyline
                key={route.id}
                positions={[startStation.location, endStation.location]}
                color={route.type === 'urban' ? '#10B981' : '#F59E0B'}
                weight={3}
                opacity={0.7}
              />
            );
          }
          return null;
        })}

        {/* Marqueurs des gares */}
        {stations.map(station => (
          <Marker
            key={station.id}
            position={station.location}
            icon={station.type === 'urban' ? urbanStationIcon : interurbanStationIcon}
            eventHandlers={{
              click: () => setSelectedStation(station.id)
            }}
          >
            <Popup>
              <div className="min-w-64 p-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-gray-900">{station.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    station.type === 'urban' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {station.type === 'urban' ? 'Urbain' : 'Interurbain'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{station.city}, {station.region}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      station.status === 'active' ? 'bg-green-500' : 
                      station.status === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></span>
                    <span className="capitalize">{station.status}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <h5 className="font-medium text-gray-900 mb-2">Services disponibles:</h5>
                  <div className="flex flex-wrap gap-1">
                    {station.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Voir les horaires
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
