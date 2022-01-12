# Simple Storefront Backend

## Tech Stack
- Typescript/Node
- Express
- PostgreSQL
- Jasmine

## Instructions
The API connects to a postgres database. As a first step, it is necessary to create two databases (storefront_dev and storefront_test), create a new user (storefront_user), and grant it all priviliges to work on the databases. \
Run the command `sudo -u postgres psql` in a terminal to access postgres CLI. Then run the following:

```SQL
CREATE USER storefront_user WITH PASSWORD 'YOUR_PASSWORD';
CREATE DATABASE storefront_dev;
\c storefront_dev;
GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO storefront_user;
CREATE DATABASE storefront_test;
\c storefront_test;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_user;
\q
````

## Available Commands and Scripts: 

```
- Make sure to fill in your .env file (find a sample in .env.example file)
(To install required packages) npm install
(To create users, products, and orders tables in storefront_dev) npx db-migrate up -e dev
(To drop tables in storefront_dev) npx db-migrate down -e dev -c 3 
(To run server) npm run start
(To run tests) npm run test
````


## Ports
- Database: 5432
- Backend: 3000 (or you can specify another env var)
  