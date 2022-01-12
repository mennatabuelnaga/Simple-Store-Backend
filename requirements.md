# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## Schema Details

| Table          	| Attributes     	| Types                                      	|
|----------------	|----------------	|--------------------------------------------	|
| users          	| id             	| SERIAL PRIMARY KEY                         	|
|                	| first_name     	| VARCHAR(100) NOT NULL                      	|
|                	| last_name      	| VARCHAR(100) NOT NULL                      	|
|                	| password       	| VARCHAR NOT NULL                           	|
|                	|                	|                                            	|
| products       	| id             	| SERIAL PRIMARY KEY                         	|
|                	| name           	| VARCHAR(100) NOT NULL                      	|
|                	| price          	| INT NOT NULL                               	|
|                	|                	|                                            	|
| orders         	| id             	| SERIAL PRIMARY KEY                         	|
|                	| user_id        	| BIGINT FOREIGN KEY REFERENCES users(id)    	|
|                	| current_status 	| ENUM ('active', 'complete')                	|
|                	|                	|                                            	|
| orders_details 	| id             	| SERIAL PRIMARY KEY                         	|
|                	| order_id       	| BIGINT FOREIGN KEY REFERENCES orders(id)   	|
|                	| products_id    	| BIGINT FOREIGN KEY REFERENCES products(id) 	|
|                	| quantity       	| INTEGER                                    	|
## Available API Endpoints

|          	| API Endpoints                                         	
|----------	|-------------------------------------------------------	
| users    	| Index [token required]  -> get('/users')                           	
|          	| show [token required]   -> get('/users/:id')                               	
|          	| Create [Returns Token]  -> post('/users')                             	    
|          	|                                                       	
| products 	| Index                   -> get('/products')                                              	
|          	| Show                    -> get('/products/:id')                                   	
|          	| Create [token required] -> post('/products')                           	
|          	|                                                       	
| orders   	| Current Order by user (args: user id)[token required] -> get('/orders/:user_id')	