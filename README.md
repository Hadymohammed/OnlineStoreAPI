# OnlineStoreAPI
Practicing on RESTFUL API &amp; Postgres DB
- build RESTFUL API integrated with Postgres DB for onlineStore
- providing info for each user orders with its products
- providing CRUD operations on database models
- use hashing to secure user's password
- provide JWT to verify access all over application routes
## Connect to postgres
- connect to the default postgres database as the server's root user: psqL -U postgres' 
- In psql run the following to create a user : CREATE USER Admin WITH PASSWORD '12345678';
- In psql run the following to create the dev and test database : CREATE DATABASE onlineStore; CREATE DATABASE onlineStore_test;
- Connect to the databases and grant all privileges : '\c onlineStore' ,  'GRANT ALL PRIVILEGES ON DATABASE onlineStore TO admin;' 
- Grant for test database - '\c onlineStore_test' , 'GRANT ALL PRIVILEGES ON DATABASE onlineStore_test TO admin;' 

## How to start
- install package dependencies => npm install
- add .env file to the root directory following .env.example format
- run dev script using npm
- database port : 5432
- app port : 3000
## Scripts to use
- test : for endpoint testing and run all tests in a testing database
- dev : run the development environment
- start : run the app in js after building
- lint : use eslint
- prettier : run prettier with --write option
## Running senario "Follow endpoints instructions"
- send (POST) request to /users/create 
- send (POST) request to /products/create
- send (POST) request to /orders/create
- send (POST) request to /orders/addProduct
- send (GET) request to /orders/user
- send (GET) request to /orders/products

## DataBase Schema
- products Table
  - id
  - name
  - price
- users Table
  - id 
  - first_name
  - last_name
  - password
- orders Table 
  - id
  - user_id (one to many relation)
  - status
- order procducts Table (many to many)
  - id
  - order_id
  - product_id
  - quantity

### EndPoints
- /users
  - index (GET): shows all users (token required)
  - /show (GET): shows user, (id) required in req.body as json (token required)
  - /create (POST): adds new user, (id,first_name,last_name,password) required in req.body as json 
  - /update (PATCH): updates user data, (id,password) required for editing varification + updated data (first_name?,last_name?) in req.body as json (token required)
  - /delete (DELETE): deletes user using id, (id,password) required for varification in req.body as json (token required)
- /products
  - index (GET): shows all products
  - /show (GET): shows product using id, (id) required in req.body as json
  - /create (POST): adds new product, (name,price) required in req.body as json (token required)
  - /update (PATCH): update existing product, (id,name?,price?) required in req.body as json (token required)
  - /delete (DELETE): deletes product using id, (id) required in req.body as json (token required)
- /orders
  - index (GET): shows all orders (token required)
  - /show (GET): shows order using id, (id) required in req.body as json (token required)
  - /create (POST): adds new order, (user_id,status) required in req.body as json (token required)
  - /update (PATCH): update existing order, (id,user_id?,status?) required in req.body as json (token required)
  - /delete (DELETE): deletes order using id, (id) required in req.body as json (token required)
  #### orderProducts.Router
  - /products (GET): shows order products using id, (order_id) required in req.body as json (token required)
  - /user (GET): shows user orders and its products using user_id, (user_id) required in req.body as json (token required)
  - /addProduct (POST): adds new product to existing order, (order_id,product_id,quantity) required in req.body as json (token required)
  - /deleteProduct (DELETE): deletes order using id, (order_id,product_id) required in req.body as json (token required)
