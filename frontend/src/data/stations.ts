import { Station, Route, Region } from '../types';

// Gares urbaines de Dakar
export const urbanStations: Station[] = [
  {
    id: 'dakar-plateau',
    name: 'Gare Plateau',
    type: 'urban',
    location: [14.6937, -17.4441],
    city: 'Dakar',
    region: 'Dakar',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Boutiques'],
    status: 'active'
  },
  {
    id: 'dakar-colobane',
    name: 'Gare Colobane',
    type: 'urban',
    location: [14.6892, -17.4658],
    city: 'Dakar',
    region: 'Dakar',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes'],
    status: 'active'
  },
  {
    id: 'pikine-terminus',
    name: 'Terminus Pikine',
    type: 'urban',
    location: [14.7549, -17.3924],
    city: 'Pikine',
    region: 'Dakar',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Parking'],
    status: 'active'
  },
  {
    id: 'guediawaye-terminus',
    name: 'Terminus Guédiawaye',
    type: 'urban',
    location: [14.7667, -17.4167],
    city: 'Guédiawaye',
    region: 'Dakar',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes'],
    status: 'active'
  },
  {
    id: 'parcelles-assainies',
    name: 'Gare Parcelles Assainies',
    type: 'urban',
    location: [14.7833, -17.4000],
    city: 'Guédiawaye',
    region: 'Dakar',
    facilities: ['Billetterie', 'Salle d\'attente'],
    status: 'active'
  },
  {
    id: 'rufisque-gare',
    name: 'Gare de Rufisque',
    type: 'urban',
    location: [14.7167, -17.2667],
    city: 'Rufisque',
    region: 'Dakar',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Restaurant'],
    status: 'active'
  }
];

// Gares interurbaines
export const interurbanStations: Station[] = [
  {
    id: 'dakar-gare-routiere',
    name: 'Gare Routière Dakar',
    type: 'interurban',
    location: [14.6937, -17.4441],
    city: 'Dakar',
    region: 'Dakar',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Restaurant', 'Boutiques', 'Parking'],
    status: 'active'
  },
  {
    id: 'thies-gare',
    name: 'Gare de Thiès',
    type: 'interurban',
    location: [14.7886, -16.9317],
    city: 'Thiès',
    region: 'Thiès',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Restaurant'],
    status: 'active'
  },
  {
    id: 'kaolack-gare',
    name: 'Gare de Kaolack',
    type: 'interurban',
    location: [14.1594, -16.0733],
    city: 'Kaolack',
    region: 'Kaolack',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Restaurant', 'Boutiques'],
    status: 'active'
  },
  {
    id: 'saint-louis-gare',
    name: 'Gare de Saint-Louis',
    type: 'interurban',
    location: [16.0469, -16.4814],
    city: 'Saint-Louis',
    region: 'Saint-Louis',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Restaurant'],
    status: 'active'
  },
  {
    id: 'ziguinchor-gare',
    name: 'Gare de Ziguinchor',
    type: 'interurban',
    location: [12.5681, -16.2719],
    city: 'Ziguinchor',
    region: 'Ziguinchor',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Restaurant', 'Boutiques'],
    status: 'active'
  },
  {
    id: 'tambacounda-gare',
    name: 'Gare de Tambacounda',
    type: 'interurban',
    location: [13.7671, -13.6681],
    city: 'Tambacounda',
    region: 'Tambacounda',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes', 'Restaurant'],
    status: 'active'
  },
  {
    id: 'diourbel-gare',
    name: 'Gare de Diourbel',
    type: 'interurban',
    location: [14.6594, -16.2281],
    city: 'Diourbel',
    region: 'Diourbel',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes'],
    status: 'active'
  },
  {
    id: 'fatick-gare',
    name: 'Gare de Fatick',
    type: 'interurban',
    location: [14.3344, -16.4119],
    city: 'Fatick',
    region: 'Fatick',
    facilities: ['Billetterie', 'Salle d\'attente', 'Toilettes'],
    status: 'active'
  }
];

// Routes urbaines
export const urbanRoutes: Route[] = [
  {
    id: 'dakar-pikine',
    name: 'Dakar ↔ Pikine',
    startPoint: 'Gare Plateau',
    endPoint: 'Terminus Pikine',
    stops: ['Place de l\'Indépendance', 'Marché Sandaga', 'Colobane', 'Grand Yoff', 'Pikine'],
    price: 500,
    duration: 45,
    type: 'urban',
    distance: 18,
    frequency: 'Toutes les 15 min'
  },
  {
    id: 'plateau-guediawaye',
    name: 'Plateau ↔ Guédiawaye',
    startPoint: 'Gare Plateau',
    endPoint: 'Terminus Guédiawaye',
    stops: ['Médina', 'Fass', 'Colobane', 'Parcelles Assainies', 'Guédiawaye'],
    price: 600,
    duration: 50,
    type: 'urban',
    distance: 20,
    frequency: 'Toutes les 20 min'
  },
  {
    id: 'dakar-rufisque',
    name: 'Dakar ↔ Rufisque',
    startPoint: 'Gare Plateau',
    endPoint: 'Gare de Rufisque',
    stops: ['Liberté 6', 'Keur Massar', 'Yeumbeul', 'Rufisque'],
    price: 750,
    duration: 60,
    type: 'urban',
    distance: 25,
    frequency: 'Toutes les 30 min'
  },
  {
    id: 'parcelles-colobane',
    name: 'Parcelles ↔ Colobane',
    startPoint: 'Gare Parcelles Assainies',
    endPoint: 'Gare Colobane',
    stops: ['Parcelles U10', 'Cambérène', 'Yoff', 'Ouakam', 'Colobane'],
    price: 450,
    duration: 35,
    type: 'urban',
    distance: 15,
    frequency: 'Toutes les 25 min'
  }
];

// Routes interurbaines
export const interurbanRoutes: Route[] = [
  {
    id: 'dakar-thies',
    name: 'Dakar ↔ Thiès',
    startPoint: 'Gare Routière Dakar',
    endPoint: 'Gare de Thiès',
    stops: ['Rufisque', 'Bargny', 'Sébikotane', 'Thiès'],
    price: 2500,
    duration: 90,
    type: 'interurban',
    distance: 70,
    frequency: 'Toutes les heures'
  },
  {
    id: 'dakar-kaolack',
    name: 'Dakar ↔ Kaolack',
    startPoint: 'Gare Routière Dakar',
    endPoint: 'Gare de Kaolack',
    stops: ['Thiès', 'Diourbel', 'Kaolack'],
    price: 4500,
    duration: 180,
    type: 'interurban',
    distance: 190,
    frequency: '4 fois par jour'
  },
  {
    id: 'dakar-saint-louis',
    name: 'Dakar ↔ Saint-Louis',
    startPoint: 'Gare Routière Dakar',
    endPoint: 'Gare de Saint-Louis',
    stops: ['Thiès', 'Louga', 'Saint-Louis'],
    price: 5500,
    duration: 240,
    type: 'interurban',
    distance: 270,
    frequency: '3 fois par jour'
  },
  {
    id: 'dakar-ziguinchor',
    name: 'Dakar ↔ Ziguinchor',
    startPoint: 'Gare Routière Dakar',
    endPoint: 'Gare de Ziguinchor',
    stops: ['Kaolack', 'Fatick', 'Bignona', 'Ziguinchor'],
    price: 8500,
    duration: 420,
    type: 'interurban',
    distance: 450,
    frequency: '2 fois par jour'
  },
  {
    id: 'dakar-tambacounda',
    name: 'Dakar ↔ Tambacounda',
    startPoint: 'Gare Routière Dakar',
    endPoint: 'Gare de Tambacounda',
    stops: ['Kaolack', 'Kaffrine', 'Koungheul', 'Tambacounda'],
    price: 7500,
    duration: 360,
    type: 'interurban',
    distance: 400,
    frequency: '2 fois par jour'
  }
];

// Régions du Sénégal
export const regions: Region[] = [
  {
    id: 'dakar',
    name: 'Dakar',
    capital: 'Dakar',
    stations: urbanStations.concat([interurbanStations[0]]),
    routes: urbanRoutes
  },
  {
    id: 'thies',
    name: 'Thiès',
    capital: 'Thiès',
    stations: [interurbanStations[1]],
    routes: interurbanRoutes.filter(r => r.name.includes('Thiès'))
  },
  {
    id: 'kaolack',
    name: 'Kaolack',
    capital: 'Kaolack',
    stations: [interurbanStations[2]],
    routes: interurbanRoutes.filter(r => r.name.includes('Kaolack'))
  },
  {
    id: 'saint-louis',
    name: 'Saint-Louis',
    capital: 'Saint-Louis',
    stations: [interurbanStations[3]],
    routes: interurbanRoutes.filter(r => r.name.includes('Saint-Louis'))
  },
  {
    id: 'ziguinchor',
    name: 'Ziguinchor',
    capital: 'Ziguinchor',
    stations: [interurbanStations[4]],
    routes: interurbanRoutes.filter(r => r.name.includes('Ziguinchor'))
  },
  {
    id: 'tambacounda',
    name: 'Tambacounda',
    capital: 'Tambacounda',
    stations: [interurbanStations[5]],
    routes: interurbanRoutes.filter(r => r.name.includes('Tambacounda'))
  }
];