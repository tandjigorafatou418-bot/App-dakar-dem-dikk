export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  phone?: string;
}

export interface Bus {
  id: string;
  name: string;
  route: string;
  position: [number, number];
  status: 'active' | 'inactive' | 'maintenance';
  capacity: number;
  occupancy: number;
}

export interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  stops: string[];
  price: number;
  duration: number;
  type: 'urban' | 'interurban';
  distance: number;
  frequency: string;
}

export interface Reservation {
  id: string;
  userId: string;
  routeId: string;
  busId: string;
  date: string;
  time: string;
  seats: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: number;
  qrCode?: string;
}

export interface Stats {
  totalUsers: number;
  activeBuses: number;
  dailyRevenue: number;
  reservationsToday: number;
}

export interface Station {
  id: string;
  name: string;
  type: 'urban' | 'interurban';
  location: [number, number];
  city: string;
  region: string;
  facilities: string[];
  status: 'active' | 'maintenance' | 'closed';
}

export interface Region {
  id: string;
  name: string;
  capital: string;
  stations: Station[];
  routes: Route[];
}