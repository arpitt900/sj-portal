-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    pan_no VARCHAR(20),
    birthday DATE,
    anniversary DATE,
    ring_size VARCHAR(10),
    bangle_size VARCHAR(10),
    bracelet_size VARCHAR(10),
    total_purchases DECIMAL(15, 2) DEFAULT 0.00,
    lifetime_purchases DECIMAL(15, 2) DEFAULT 0.00,
    current_balance DECIMAL(15, 2) DEFAULT 0.00,
    last_purchase DATE,
    preferred_category VARCHAR(255),
    vip_status VARCHAR(50)
);

-- Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
    id VARCHAR(255) PRIMARY KEY,
    tag_id VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    gold_weight DECIMAL(10, 3) DEFAULT 0.000,
    gold_karat INTEGER DEFAULT 0,
    diamond_weight DECIMAL(10, 3) DEFAULT 0.000,
    diamond_quality VARCHAR(255),
    description TEXT,
    purchase_price DECIMAL(15, 2) DEFAULT 0.00,
    current_value DECIMAL(15, 2) DEFAULT 0.00,
    status VARCHAR(50),
    location VARCHAR(255),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    qr_code VARCHAR(255)
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(255) PRIMARY KEY,
    type VARCHAR(50),
    category VARCHAR(50),
    amount DECIMAL(15, 2) DEFAULT 0.00,
    description TEXT,
    party VARCHAR(255),
    method VARCHAR(50),
    date DATE,
    status VARCHAR(50),
    reference VARCHAR(255)
);

-- Harvest Plans Table
CREATE TABLE IF NOT EXISTS harvest_plans (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255) REFERENCES clients(id),
    type VARCHAR(50),
    group_no INTEGER,
    registration_no INTEGER,
    monthly_amount DECIMAL(15, 2) DEFAULT 0.00,
    start_date DATE,
    end_date DATE,
    total_paid DECIMAL(15, 2) DEFAULT 0.00,
    remaining_amount DECIMAL(15, 2) DEFAULT 0.00,
    status VARCHAR(50)
);

-- Karigars Table
CREATE TABLE IF NOT EXISTS karigars (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    specialization TEXT[],
    active_orders INTEGER DEFAULT 0,
    completed_orders INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.0,
    gold_balance DECIMAL(10, 3) DEFAULT 0.0,
    diamond_balance DECIMAL(10, 3) DEFAULT 0.0
);

-- Karigar Orders Table
CREATE TABLE IF NOT EXISTS karigar_orders (
    id VARCHAR(255) PRIMARY KEY,
    karigar_id VARCHAR(255) REFERENCES karigars(id),
    order_date DATE,
    expected_delivery DATE,
    status VARCHAR(50),
    gold_issued DECIMAL(10, 3) DEFAULT 0.0,
    gold_karat INTEGER DEFAULT 0,
    diamond_issued DECIMAL(10, 3) DEFAULT 0.0,
    labour_charges DECIMAL(12, 2) DEFAULT 0.0,
    description TEXT,
    current_stage VARCHAR(255)
);
