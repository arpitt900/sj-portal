-- Insert sample data into clients table
INSERT INTO clients (id, name, phone, email, address, pan_no, birthday, anniversary, ring_size, bangle_size, bracelet_size, total_purchases, lifetime_purchases, current_balance, last_purchase, preferred_category, vip_status) VALUES
('CL001', 'Mrs. Priya Sharma', '+91 98765 43210', 'priya.sharma@email.com', 'Sector 15, Gurgaon', 'ABCDE1234F', '1985-03-15', '2010-12-05', '16', '2.6', 'M', 1250000.00, 3500000.00, -25000.00, '2024-11-20', 'Diamond Jewelry', 'vip'),
('CL002', 'Mr. Rajesh Patel', '+91 87654 32109', 'rajesh.patel@email.com', 'Vastrapur, Ahmedabad', 'FGHIJ5678K', '1978-08-22', '2005-02-14', NULL, NULL, NULL, 850000.00, 2100000.00, 15000.00, '2024-10-15', 'Gold Jewelry', 'premium'),
('CL003', 'Ms. Anita Gupta', '+91 76543 21098', 'anita.gupta@email.com', 'CP, New Delhi', 'KLMNO9012P', '1992-06-10', NULL, NULL, NULL, NULL, 320000.00, 450000.00, 0.00, '2024-09-30', 'Silver Jewelry', 'regular');

-- Insert sample data into inventory table
INSERT INTO inventory (id, tag_id, type, name, gold_weight, gold_karat, diamond_weight, diamond_quality, description, purchase_price, current_value, status, location, last_updated, qr_code) VALUES
('SJ001', 'TAG001', 'diamond-jewelry', 'Diamond Necklace Set', 45.500, 18, 2.500, '1 no (EF VVS)', 'Elegant diamond necklace with matching earrings', 185000.00, 245000.00, 'in-stock', 'Main Display', CURRENT_TIMESTAMP, 'QR_SJ001'),
('SJ002', 'TAG002', 'gold-jewelry', 'Gold Bangles Set (6 pieces)', 85.200, 22, NULL, NULL, 'Traditional gold bangles with intricate design', 425000.00, 485000.00, 'in-stock', 'Vault A', CURRENT_TIMESTAMP, 'QR_SJ002'),
('SJ003', 'TAG003', 'loose-diamond', 'Loose Diamond Collection', NULL, NULL, 5.750, '2 no (EFG VVS-VS)', 'Round brilliant cut diamonds, various sizes', 575000.00, 625000.00, 'in-stock', 'Diamond Box - Main', CURRENT_TIMESTAMP, 'QR_SJ003'),
('SJ004', 'TAG004', 'pure-gold', 'Gold Bar 100g', 100.000, 24, NULL, NULL, 'Fine gold bar 999.9 purity', 580000.00, 610000.00, 'in-stock', 'Vault B', CURRENT_TIMESTAMP, 'QR_SJ004');

-- Insert sample data into transactions table
INSERT INTO transactions (id, type, category, amount, description, party, method, date, status, reference) VALUES
('TXN001', 'receipt', 'client', 245000.00, 'Diamond necklace set payment', 'Mrs. Sharma', 'rtgs', '2024-11-28', 'completed', 'REF123456'),
('TXN002', 'payment', 'vendor', 185000.00, 'Gold purchase from vendor', 'Rajesh Gold Suppliers', 'rtgs', '2024-11-27', 'completed', 'PAY789012'),
('TXN003', 'payment', 'karigar', 25000.00, 'Labour charges for diamond setting', 'Suresh Karigar', 'cash', '2024-11-26', 'completed', NULL),
('TXN004', 'payment', 'expense', 15000.00, 'Shop rent for December', 'Property Owner', 'cheque', '2024-11-25', 'pending', 'CHQ001');

-- Insert sample data into harvest_plans table
INSERT INTO harvest_plans (id, client_id, type, group_no, registration_no, monthly_amount, start_date, end_date, total_paid, remaining_amount, status) VALUES
('HP001', 'CL001', 'diamond', 10, 15, 25000.00, '2024-01-01', '2024-12-31', 250000.00, 50000.00, 'active'),
('HP002', 'CL002', 'gold', 11, 8, 15000.00, '2024-01-01', '2024-12-31', 180000.00, 0.00, 'completed'),
('HP003', 'CL003', 'diamond', 10, 42, 25000.00, '2024-01-01', '2024-12-31', 275000.00, 25000.00, 'active');

-- Insert sample data into karigars table
INSERT INTO karigars (id, name, phone, specialization, active_orders, completed_orders, rating, gold_balance, diamond_balance) VALUES
('KAR001', 'Suresh Kumar', '+91 98765 43210', ARRAY['Diamond Setting', 'Gold Jewelry'], 5, 234, 4.8, 125.5, 12.5),
('KAR002', 'Ramesh Patel', '+91 87654 32109', ARRAY['Traditional Jewelry', 'Repair Work'], 3, 189, 4.6, 89.2, 8.3),
('KAR003', 'Mahesh Sharma', '+91 76543 21098', ARRAY['Modern Designs', 'Custom Work'], 7, 156, 4.9, 156.8, 15.2);

-- Insert sample data into karigar_orders table
INSERT INTO karigar_orders (id, karigar_id, order_date, expected_delivery, status, gold_issued, gold_karat, diamond_issued, labour_charges, description, current_stage) VALUES
('KO001', 'KAR001', '2024-11-15', '2024-12-15', 'in-progress', 45.5, 18, 2.5, 25000.00, 'Diamond necklace set with matching earrings', 'Diamond Setting'),
('KO002', 'KAR002', '2024-11-20', '2024-12-10', 'qc-pending', 85.2, 22, 0.0, 15000.00, 'Traditional gold bangles set (6 pieces)', 'Quality Check'),
('KO003', 'KAR003', '2024-11-25', '2024-12-20', 'issued', 32.8, 18, 1.8, 18000.00, 'Custom engagement ring', 'Initial Design');
