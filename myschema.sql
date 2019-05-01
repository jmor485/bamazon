DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products (
item_id INTEGER (5) NOT NULL,
product_name VARCHAR (100),
department_name VARCHAR (100),
price DECIMAL (10,4),
stock_quantity INTEGER (10),
PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4214, "Instant Pot Pressure Cooker", "Home & Kitchen", 49.99, 1500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5961, "Gel Enhanced Seat Cushion", "Office", 22.65, 4020);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4981, "Handheld Milk Frother", "Home & Kitchen", 10.10, 730);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5286, "Youth Kids Swim Goggles", "Sports & Outdoors", 10.00, 1040);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3969, "Noise Cancelling Headphones", "Electronics", 49.99, 610);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4252, "Natural Hemp Gummies", "Health & Household", 29.70, 289);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3565, "Waterproof Bluetooth Headphones", "Electronics", 18.95, 3000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4875, "Vitamin C Face Serum", "Beauty & Personal Care", 7.99, 2200);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3217, "Indoor Pet Camera", "Pet Supplies", 43.99, 555);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5692, "Lightweight Mesh Running Shoes", "Clothing, Shoes & Jewelry", 39.99, 1380);
