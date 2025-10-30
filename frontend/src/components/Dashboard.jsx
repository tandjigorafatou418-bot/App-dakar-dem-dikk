import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Bus, CreditCard, AlertTriangle } from 'lucide-react';

const revenueData = [
  { day: 'Lun', revenue: 45000 },
  { day: 'Mar', revenue: 52000 },
  { day: 'Mer', revenue: 48000 },
  { day: 'Jeu', revenue: 61000 },
  { day: 'Ven', revenue: 55000 },
  { day: 'Sam', revenue: 67000 },
  { day: 'Dim', revenue: 43000 },
];

const routeData = [
  { name: 'Dakar-Pikine', value: 35, color: '#10B981' },
  { name: 'Plateau-Guédiawaye', value: 25, color: '#3B82F6' },
  { name: 'Parcelles-Colobane', value: 20, color: '#F59E0B' },
  { name: 'Autres', value: 20, color: '#8B5CF6' },
];

export default function Dashboard({ stats }) {
  const statCards = [
    {
      title: 'Utilisateurs Actifs',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Bus en Service',
      value: stats.activeBuses,
      icon: Bus,
      color: 'bg-emerald-500',
      change: '+3',
      trend: 'up'
    },
    {
      title: 'Revenus Aujourd\'hui',
      value: `${stats.dailyRevenue.toLocaleString()} FCFA`,
      icon: CreditCard,
      color: 'bg-amber-500',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Réservations',
      value: stats.reservationsToday,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+15',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-600 ml-1">vs hier</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenus de la Semaine</h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Voir détails
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} FCFA`, 'Revenus']}
              />
              <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Route Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par Ligne</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={routeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {routeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Part']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {routeData.map((route, index) => (
              <div key={index} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: route.color }}
                ></div>
                <span className="text-gray-600">{route.name}: {route.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
          <div className="space-y-4">
            {[
              { type: 'reservation', user: 'Amadou Diallo', action: 'a réservé un billet', time: '2 min', route: 'Dakar-Pikine' },
              { type: 'maintenance', bus: 'Bus DDD-005', action: 'maintenance programmée', time: '15 min', status: 'warning' },
              { type: 'payment', user: 'Fatou Seck', action: 'paiement confirmé', time: '1h', amount: '500 FCFA' },
              { type: 'alert', bus: 'Bus DDD-012', action: 'retard signalé', time: '2h', status: 'error' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'warning' ? 'bg-amber-500' :
                  activity.status === 'error' ? 'bg-red-500' : 'bg-emerald-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user || activity.bus}</span> {activity.action}
                    {activity.route && <span className="text-emerald-600 ml-1">({activity.route})</span>}
                    {activity.amount && <span className="text-blue-600 ml-1">{activity.amount}</span>}
                  </p>
                  <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes Système</h3>
          <div className="space-y-3">
            {[
              { level: 'warning', message: 'Bus DDD-008 en retard de 15 minutes', time: '5 min' },
              { level: 'info', message: 'Maintenance programmée demain à 6h', time: '1h' },
              { level: 'success', message: 'Nouveau bus DDD-015 ajouté à la flotte', time: '3h' },
              { level: 'error', message: 'Panne signalée sur Bus DDD-003', time: '4h' },
            ].map((alert, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.level === 'warning' ? 'bg-amber-50 border border-amber-200' :
                alert.level === 'error' ? 'bg-red-50 border border-red-200' :
                alert.level === 'success' ? 'bg-emerald-50 border border-emerald-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  alert.level === 'warning' ? 'text-amber-500' :
                  alert.level === 'error' ? 'text-red-500' :
                  alert.level === 'success' ? 'text-emerald-500' :
                  'text-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">Il y a {alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
