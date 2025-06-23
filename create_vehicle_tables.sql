-- Create trucks table
CREATE TABLE trucks (
  id SERIAL PRIMARY KEY,
  truck_number VARCHAR(50) NOT NULL UNIQUE,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER,
  license_plate VARCHAR(20) UNIQUE,
  vin VARCHAR(17) UNIQUE,
  capacity_kg INTEGER,
  fuel_type VARCHAR(20) DEFAULT 'diesel',
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create trailers table
CREATE TABLE trailers (
  id SERIAL PRIMARY KEY,
  trailer_number VARCHAR(50) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL, -- 'flatbed', 'box', 'refrigerated', 'tanker', etc.
  make VARCHAR(100),
  model VARCHAR(100),
  year INTEGER,
  license_plate VARCHAR(20) UNIQUE,
  vin VARCHAR(17) UNIQUE,
  capacity_kg INTEGER,
  length_m DECIMAL(4,2),
  width_m DECIMAL(4,2),
  height_m DECIMAL(4,2),
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample trucks
INSERT INTO trucks (truck_number, make, model, year, license_plate, capacity_kg, fuel_type) VALUES
('TRK001', 'Volvo', 'FH16', 2020, 'ABC123', 26000, 'diesel'),
('TRK002', 'Mercedes', 'Actros', 2019, 'DEF456', 25000, 'diesel'),
('TRK003', 'Scania', 'R500', 2021, 'GHI789', 27000, 'diesel'),
('TRK004', 'MAN', 'TGX', 2018, 'JKL012', 24000, 'diesel');

-- Insert sample trailers
INSERT INTO trailers (trailer_number, type, make, model, year, license_plate, capacity_kg, length_m, width_m, height_m) VALUES
('TRL001', 'box', 'Krone', 'Profi Liner', 2020, 'TRL123', 33000, 13.6, 2.48, 3.0),
('TRL002', 'flatbed', 'Schmitz', 'Cargobull', 2019, 'TRL456', 35000, 13.6, 2.48, 1.5),
('TRL003', 'refrigerated', 'Thermoking', 'SLXe', 2021, 'TRL789', 30000, 13.6, 2.48, 2.7),
('TRL004', 'box', 'Krone', 'Dry Liner', 2018, 'TRL012', 32000, 13.6, 2.48, 3.0),
('TRL005', 'tanker', 'Feldbinder', 'KIP', 2020, 'TRL345', 28000, 12.0, 2.48, 3.8); 