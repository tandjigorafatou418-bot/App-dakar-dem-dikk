import React, { useState } from 'react';
import { Clock, MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { urbanRoutes, interurbanRoutes } from '../data/stations';

export default function RoutesList({ type, onSelectRoute }) {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = type === 'urban' ? urbanRoutes : interurbanRoutes;

  const handleRouteSelect = (route) => {
    setSelectedRoute(route.id);
    if (onSelectRoute) onSelectRoute(route);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {type === 'urban' ? 'Lignes Urbaines' : 'Lignes Interurbaines'}
        </h3>
        <span className="text-sm text-gray-600">
          {routes.length} ligne{routes.length > 1 ? 's' : ''} disponible{routes.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid gap-4">
        {routes.map((route) => (
          <div
            key={route.id}
            className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedRoute === route.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-300'
            }`}
            onClick={() => handleRouteSelect(route)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    type === 'urban' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                ></div>
                <h4 className="font-semibold text-gray-900">{route.name}</h4>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">{route.price} FCFA</p>
                <p className="text-xs text-gray-500">par personne</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{route.duration} min</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{route.distance} km</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{route.frequency}</span>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Arrêts principaux:</p>
              <div className="flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto">
                <span className="whitespace-nowrap">{route.startPoint}</span>
                {route.stops.slice(0, 3).map((stop, index) => (
                  <React.Fragment key={index}>
                    <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="whitespace-nowrap">{stop}</span>
                  </React.Fragment>
                ))}
                {route.stops.length > 3 && (
                  <>
                    <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400">+{route.stops.length - 3} arrêts</span>
                  </>
                )}
                <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span className="whitespace-nowrap">{route.endPoint}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.8 (245 avis)</span>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Réserver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
