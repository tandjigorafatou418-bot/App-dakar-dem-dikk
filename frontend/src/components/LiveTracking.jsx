import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom bus icon
const busIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#10B981">
      <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10M7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17m9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5M5 11V6h14v5H5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const stopIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6">
      <circle cx="12" cy="12" r="8"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function LiveTracking({ className = '' }) {
  const [buses, setBuses] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('route1');

  // Mock bus data
  useEffect(() => {
    const mockBuses = [
      {
        id: '1',
        name: 'Bus A - DDD001',
        route: 'Dakar → Pikine',
        position: [14.6928, -17.4467],
        status: 'active',
        capacity: 45,
        occupancy: 32
      },
      {
        id: '2',
        name: 'Bus B - DDD002',
        route: 'Guédiawaye → Plateau',
        position: [14.7167, -17.4167],
        status: 'active',
        capacity: 45,
        occupancy: 28
      },
      {
        id: '3',
        name: 'Bus C - DDD003',
        route: 'Parcelles → Colobane',
        position: [14.7500, -17.4500],
        status: 'active',
        capacity: 45,
        occupancy: 15
      }
    ];

    setBuses(mockBuses);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => ({
        ...bus,
        position: [
          bus.position[0] + (Math.random() - 0.5) * 0.001,
          bus.position[1] + (Math.random() - 0.5) * 0.001
        ],
        occupancy: Math.max(0, Math.min(bus.capacity, bus.occupancy + Math.floor((Math.random() - 0.5) * 5)))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock route data
  const routes = {
    route1: [
      [14.6928, -17.4467],
      [14.7000, -17.4400],
      [14.7100, -17.4300],
      [14.7200, -17.4200]
    ]
  };

  const busStops = [
    { id: '1', name: 'Gare Routière', position: [14.6928, -17.4467] },
    { id: '2', name: 'Place de l\'Indépendance', position: [14.7000, -17.4400] },
    { id: '3', name: 'Marché Sandaga', position: [14.7100, -17.4300] },
    { id: '4', name: 'Terminal Pikine', position: [14.7200, -17.4200] }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Suivi en Temps Réel</h3>
          <select 
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="route1">Toutes les lignes</option>
            <option value="dakar-pikine">Dakar - Pikine</option>
            <option value="plateau-guediawaye">Plateau - Guédiawaye</option>
          </select>
        </div>
      </div>

      <div className="h-96 relative">
        <MapContainer
          center={[14.7167, -17.4167]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Route line */}
          <Polyline 
            positions={routes.route1} 
            color="#10B981" 
            weight={4} 
            opacity={0.7}
          />

          {/* Bus stops */}
          {busStops.map(stop => (
            <Marker key={stop.id} position={stop.position} icon={stopIcon}>
              <Popup>
                <div className="text-center">
                  <p className="font-medium">{stop.name}</p>
                  <p className="text-sm text-gray-600">Arrêt de bus</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Buses */}
          {buses.map(bus => (
            <Marker key={bus.id} position={bus.position} icon={busIcon}>
              <Popup>
                <div className="min-w-48">
                  <h4 className="font-bold text-emerald-700">{bus.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{bus.route}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Occupation:</span>
                      <span className="font-medium">{bus.occupancy}/{bus.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(bus.occupancy / bus.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Statut:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        bus.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {bus.status === 'active' ? 'En service' : 'Hors service'}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-600">{buses.filter(b => b.status === 'active').length}</p>
            <p className="text-sm text-gray-600">Bus actifs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(buses.reduce((acc, bus) => acc + (bus.occupancy / bus.capacity), 0) / buses.length * 100)}%
            </p>
            <p className="text-sm text-gray-600">Taux d'occupation moyen</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600">{buses.length}</p>
            <p className="text-sm text-gray-600">Total des bus</p>
          </div>
        </div>
      </div>
    </div>
  );
}
