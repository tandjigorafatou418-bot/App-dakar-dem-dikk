import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

// CORS - Autoriser toutes les origines en développement
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// ==================== DONNÉES MOCKÉES (PAS DE BDD) ====================

const users = [
  {
    id: '1',
    name: 'Administrateur',
    email: 'admin@dakardemlikk.sn',
    password: 'adm123',
    role: 'admin',
    phone: '+221 77 123 4567'
  },
  {
    id: '2',
    name: 'Agent Transport',
    email: 'agent@dakardemlikk.sn',
    password: 'ag123',
    role: 'agent',
    phone: '+221 77 234 5678'
  },
  {
    id: '3',
    name: 'Fatou Diakho',
    email: 'client@dakardemlikk.sn',
    password: 'cli123',
    role: 'client',
    phone: '+221 77 345 6789'
  }
];

let reservations = [
  {
    id: 'DDK1704123456',
    userId: '3',
    route: 'Dakar → Pikine',
    routeName: 'Dakar → Pikine',
    date: '2025-01-15',
    time: '08:30',
    seats: 2,
    passengerName: 'Absa Niang',
    phone: '+221 77 111 2222',
    email: 'absa.niang@email.sn',
    price: 500,
    totalPrice: 1000,
    paymentMethod: 'wave',
    status: 'confirmed',
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: 'DDK1704123457',
    userId: '4',
    route: 'Plateau → Guédiawaye',
    routeName: 'Plateau → Guédiawaye',
    date: '2025-01-16',
    time: '09:00',
    seats: 1,
    passengerName: 'Arame Cisse',
    phone: '+221 77 222 3333',
    email: 'arame.cisse@email.sn',
    price: 600,
    totalPrice: 600,
    paymentMethod: 'orange_money',
    status: 'confirmed',
    createdAt: '2025-01-11T14:30:00Z'
  },
  {
    id: 'DDK1704123458',
    userId: '5',
    route: 'Dakar → Thiès',
    routeName: 'Dakar → Thiès',
    date: '2025-01-17',
    time: '07:00',
    seats: 3,
    passengerName: 'Noguay Diouf',
    phone: '+221 77 333 4444',
    email: 'noguay.diouf@email.sn',
    price: 2500,
    totalPrice: 7500,
    paymentMethod: 'cash',
    status: 'confirmed',
    createdAt: '2025-01-12T09:15:00Z'
  },
  {
    id: 'DDK1704123459',
    userId: '6',
    route: 'Dakar → Kaolack',
    routeName: 'Dakar → Kaolack',
    date: '2025-01-18',
    time: '06:30',
    seats: 2,
    passengerName: 'Pape Diop',
    phone: '+221 77 444 5555',
    email: 'pape.diop@email.sn',
    price: 4500,
    totalPrice: 9000,
    paymentMethod: 'wave',
    status: 'confirmed',
    createdAt: '2025-01-13T11:45:00Z'
  },
  {
    id: 'DDK1704123460',
    userId: '7',
    route: 'Dakar → Rufisque',
    routeName: 'Dakar → Rufisque',
    date: '2025-01-19',
    time: '10:30',
    seats: 1,
    passengerName: 'Thierno Sow',
    phone: '+221 77 555 6666',
    email: 'thierno.sow@email.sn',
    price: 750,
    totalPrice: 750,
    paymentMethod: 'orange_money',
    status: 'confirmed',
    createdAt: '2025-01-14T16:20:00Z'
  }
];

let buses = [
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

let supportMessages = [];

// ==================== ROUTES API ====================

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: '🚌 Serveur Dakar Dem Dikk en marche!',
    endpoints: ['/api', '/api/auth/login', '/api/buses', '/api/reservations', '/api/stats']
  });
});

// Route API test
app.get('/api', (req, res) => {
  res.json({ 
    message: '🚌 API Dakar Dem Dikk fonctionnelle!',
    version: '1.0.0',
    status: 'OK'
  });
});

// ==================== CONNEXION (LOGIN) ====================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔑 Tentative de connexion:', { email, password });

    // Validation
    if (!email || !password) {
      console.log('❌ Email ou mot de passe manquant');
      return res.status(400).json({ 
        success: false,
        error: 'Email et mot de passe requis' 
      });
    }

    // Trouver l'utilisateur
    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Email incorrect' 
      });
    }

    // Vérifier le mot de passe (comparaison directe pour la démo)
    if (password !== user.password) {
      console.log('❌ Mot de passe incorrect pour:', email);
      console.log('   Reçu:', password);
      console.log('   Attendu:', user.password);
      return res.status(401).json({ 
        success: false,
        error: 'Mot de passe incorrect' 
      });
    }

    // Générer token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_key_demo_2025',
      { expiresIn: '24h' }
    );

    // Retourner utilisateur sans mot de passe
    const { password: _, ...userWithoutPassword } = user;
    
    console.log('✅ Connexion réussie:', userWithoutPassword.email, '-', userWithoutPassword.role);
    
    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('❌ Erreur login:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur serveur lors de la connexion' 
    });
  }
});

// ==================== INSCRIPTION (REGISTER) ====================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    console.log('📝 Tentative d\'inscription:', { name, email, phone });

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Tous les champs sont requis' 
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        error: 'Un compte existe déjà avec cet email' 
      });
    }

    // Créer le nouvel utilisateur
    const newUser = {
      id: `${Date.now()}`,
      name,
      email,
      phone,
      password, // En production, il faudrait hasher le mot de passe
      role: 'client' // Par défaut, les nouveaux comptes sont des clients
    };

    users.push(newUser);

    // Générer token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'secret_key_demo_2025',
      { expiresIn: '24h' }
    );

    // Retourner utilisateur sans mot de passe
    const { password: _, ...userWithoutPassword } = newUser;
    
    console.log('✅ Inscription réussie:', userWithoutPassword.email);
    
    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('❌ Erreur inscription:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur serveur lors de l\'inscription' 
    });
  }
});

// ==================== BUSES ====================

// Obtenir tous les bus
app.get('/api/buses', (req, res) => {
  console.log('📍 Récupération des bus');
  res.json({ success: true, buses });
});

// Mise à jour position bus
app.patch('/api/buses/:id/position', (req, res) => {
  const { id } = req.params;
  const { position, occupancy } = req.body;
  
  const bus = buses.find(b => b.id === id);
  if (bus) {
    if (position) bus.position = position;
    if (occupancy !== undefined) bus.occupancy = occupancy;
    
    console.log('🚌 Bus mis à jour:', bus.name);
    res.json({ success: true, bus });
  } else {
    res.status(404).json({ 
      success: false,
      error: 'Bus non trouvé' 
    });
  }
});

// ==================== RÉSERVATIONS ====================

// Créer une réservation
app.post('/api/reservations', async (req, res) => {
  try {
    const reservationData = req.body;
    
    console.log('🎫 Nouvelle réservation:', reservationData);
    
    const newReservation = {
      id: `DDK${Date.now()}`,
      ...reservationData,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Générer QR Code
    const qrCodeData = JSON.stringify({
      ticketId: newReservation.id,
      route: newReservation.route,
      date: newReservation.date,
      time: newReservation.time,
      seats: newReservation.seats,
      passenger: newReservation.passengerName,
      price: newReservation.price
    });

    const qrCodeUrl = await QRCode.toDataURL(qrCodeData, {
      width: 300,
      margin: 2,
      color: { dark: '#10B981', light: '#FFFFFF' }
    });

    newReservation.qrCode = qrCodeUrl;
    reservations.push(newReservation);

    console.log('✅ Réservation créée:', newReservation.id);

    res.json({ 
      success: true, 
      reservation: newReservation 
    });
  } catch (error) {
    console.error('❌ Erreur réservation:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur lors de la réservation' 
    });
  }
});

// Obtenir les réservations d'un utilisateur
app.get('/api/reservations/user/:userId', (req, res) => {
  const { userId } = req.params;
  const userReservations = reservations.filter(r => r.userId === userId);
  
  console.log('🎫 Réservations utilisateur', userId, ':', userReservations.length);
  
  res.json({ success: true, reservations: userReservations });
});

// Obtenir toutes les réservations (admin)
app.get('/api/reservations', (req, res) => {
  console.log('🎫 Toutes les réservations:', reservations.length);
  res.json({ success: true, reservations });
});

// ==================== STATISTIQUES ====================

app.get('/api/stats', (req, res) => {
  const stats = {
    totalUsers: users.length,
    activeBuses: buses.filter(b => b.status === 'active').length,
    dailyRevenue: reservations.reduce((sum, r) => sum + (r.price || 0), 0),
    reservationsToday: reservations.length,
    totalReservations: reservations.length
  };
  
  console.log('📊 Statistiques:', stats);
  res.json({ success: true, stats });
});

// ==================== SUPPORT CLIENT ====================

// Envoyer un message support
app.post('/api/support/messages', (req, res) => {
  try {
    const { userId, userName, category, message } = req.body;
    
    const newMessage = {
      id: `MSG${Date.now()}`,
      userId,
      userName,
      category,
      message,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    supportMessages.push(newMessage);
    
    console.log('💬 Nouveau message support:', newMessage);
    
    res.json({ 
      success: true, 
      message: newMessage 
    });
  } catch (error) {
    console.error('❌ Erreur message support:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur lors de l\'envoi du message' 
    });
  }
});

// Obtenir tous les messages support (admin)
app.get('/api/support/messages', (req, res) => {
  console.log('📨 Récupération messages support');
  res.json({ success: true, messages: supportMessages });
});

// ==================== GESTION D'ERREURS ====================

// Route 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route non trouvée',
    path: req.path 
  });
});

// Erreur serveur
app.use((err, req, res, next) => {
  console.error('💥 Erreur serveur:', err);
  res.status(500).json({ 
    success: false,
    error: 'Erreur interne du serveur' 
  });
});

// ==================== DÉMARRAGE SERVEUR ====================

app.listen(PORT, () => {
  console.log('\n' + '═'.repeat(50));
  console.log('🚀 Serveur Dakar Dem Dikk démarré!');
  console.log('═'.repeat(50));
  console.log(`🌍 URL: http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log('═'.repeat(50));
  console.log('\n📋 Comptes de test:');
  console.log('   Admin:  admin@dakardemlikk.sn  / adm123');
  console.log('   Agent:  agent@dakardemlikk.sn  / ag123');
  console.log('   Client: client@dakardemlikk.sn / cli123');
  console.log('═'.repeat(50) + '\n');
});