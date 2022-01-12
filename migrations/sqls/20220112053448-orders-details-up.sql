CREATE TABLE IF NOT EXISTS orders_details (
  id SERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products(id),
  quantity INTEGER,
  order_id BIGINT REFERENCES orders(id)
);