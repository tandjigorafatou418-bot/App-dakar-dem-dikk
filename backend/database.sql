-- Création de la base de données
CREATE DATABASE IF NOT EXISTS dakar_dem_dikk;
USE dakar_dem_dikk;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'agent', 'client') DEFAULT 'client',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des lignes (routes)
CREATE TABLE IF NOT EXISTS routes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  start_point VARCHAR(100) NOT NULL,
  end_point VARCHAR(100) NOT NULL,
  type ENUM('urban', 'interurban') NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration INT NOT NULL COMMENT 'Durée en minutes',
  distance DECIMAL(10, 2) NOT NULL COMMENT 'Distance en km',
  frequency VARCHAR(50) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des stations (gares)
CREATE TABLE IF NOT EXISTS stations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('urban', 'interurban') NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  city VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  facilities TEXT COMMENT 'JSON des installations',
  status ENUM('active', 'maintenance', 'closed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des bus
CREATE TABLE IF NOT EXISTS buses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  registration VARCHAR(50) UNIQUE NOT NULL,
  route_id INT,
  capacity INT NOT NULL,
  occupancy INT DEFAULT 0,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE SET NULL
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  route_id INT NOT NULL,
  bus_id INT,
  ticket_id VARCHAR(50) UNIQUE NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  seats INT NOT NULL,
  passenger_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('confirmed', 'cancelled', 'used') DEFAULT 'confirmed',
  validated_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
  FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE SET NULL
);


-- Insertion des utilisateurs de test
INSERT INTO users (name, email, phone, password, role) VALUES
('Administrateur', 'admin@dakardemlikk.sn', '+221 77 123 4567', 'adm123', 'admin'),
('Agent Transport', 'agent@dakardemlikk.sn', '+221 77 234 5678', 'ag123', 'agent'),
('Fatou Diakho', 'client@dakardemlikk.sn', '+221 77 345 6789', 'cli123', 'client');

-- Insertion des lignes urbaines
INSERT INTO routes (name, start_point, end_point, type, price, duration, distance, frequency) VALUES
('Dakar ↔ Pikine', 'Gare Plateau', 'Terminus Pikine', 'urban', 500, 45, 18, 'Toutes les 15 min'),
('Plateau ↔ Guédiawaye', 'Gare Plateau', 'Terminus Guédiawaye', 'urban', 600, 50, 20, 'Toutes les 20 min'),
('Dakar ↔ Rufisque', 'Gare Plateau', 'Gare de Rufisque', 'urban', 750, 60, 25, 'Toutes les 30 min');

-- Insertion des lignes interurbaines
INSERT INTO routes (name, start_point, end_point, type, price, duration, distance, frequency) VALUES
('Dakar ↔ Thiès', 'Gare Routière Dakar', 'Gare de Thiès', 'interurban', 2500, 90, 70, 'Toutes les heures'),
('Dakar ↔ Kaolack', 'Gare Routière Dakar', 'Gare de Kaolack', 'interurban', 4500, 180, 190, '4 fois par jour'),
('Dakar ↔ Saint-Louis', 'Gare Routière Dakar', 'Gare de Saint-Louis', 'interurban', 5500, 240, 270, '3 fois par jour');

-- Insertion des stations urbaines
INSERT INTO stations (name, type, latitude, longitude, city, region, facilities) VALUES
('Gare Plateau', 'urban', 14.6937, -17.4441, 'Dakar', 'Dakar', '["Billetterie","Salle d\'attente","Toilettes","Boutiques"]'),
('Terminus Pikine', 'urban', 14.7549, -17.3924, 'Pikine', 'Dakar', '["Billetterie","Salle d\'attente","Toilettes","Parking"]'),
('Terminus Guédiawaye', 'urban', 14.7667, -17.4167, 'Guédiawaye', 'Dakar', '["Billetterie","Salle d\'attente","Toilettes"]');

-- Insertion des stations interurbaines
INSERT INTO stations (name, type, latitude, longitude, city, region, facilities) VALUES
('Gare Routière Dakar', 'interurban', 14.6937, -17.4441, 'Dakar', 'Dakar', '["Billetterie","Salle d\'attente","Toilettes","Restaurant","Boutiques","Parking"]'),
('Gare de Thiès', 'interurban', 14.7886, -16.9317, 'Thiès', 'Thiès', '["Billetterie","Salle d\'attente","Toilettes","Restaurant"]'),
('Gare de Kaolack', 'interurban', 14.1594, -16.0733, 'Kaolack', 'Kaolack', '["Billetterie","Salle d\'attente","Toilettes","Restaurant","Boutiques"]');

-- Insertion de bus de test
INSERT INTO buses (name, registration, route_id, capacity, occupancy, latitude, longitude, status) VALUES
('Bus DDD-001', 'DK-2024-001', 1, 45, 32, 14.6928, -17.4467, 'active'),
('Bus DDD-002', 'DK-2024-002', 2, 45, 28, 14.7167, -17.4167, 'active'),
('Bus DDD-003', 'DK-2024-003', 4, 55, 15, 14.7886, -16.9317, 'active');

-- Mot de passe pour tous les comptes de test: "password123"
