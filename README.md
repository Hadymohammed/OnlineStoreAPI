# OnlineStoreAPI
Practicing on RESTFUL API &amp; Postgres DB
## How to start
- install package dependencies => npm install
- add .env file to the root directory following .env.example format
- run dev script using npm
- database port : 5432
- app port : 3000

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
  - /create (POST): adds new user, (id,first_name,last_name,password) required in req.body as json (token required)
  - /update (PATCH): updates user data, (id,password) required for editing varification + updated data (first_name?,last_name?) in req.body as json (token required)
  - /delete (DELETE): deletes user using id, (id,password) required for varification in req.body as json (token required)
- /products
  - index (GET): shows all products
  - /show (GET): shows product using id, (id) required in req.body as json
  - /create (POST): adds new product, (name,price) required in req.body as json (token required)
  - /update (PATCH): update existing product, (id,name?,price?) required in req.body as json (token required)
  - /delete (DELETE): deletes product using id, (id) required in req.body as json (token required)
- /orders
  - index (GET): shows all orders
  - /show (GET): shows order using id, (id) required in req.body as json
  - /create (POST): adds new order, (user_id,status) required in req.body as json (token required)
  - /update (PATCH): update existing order, (id,user_id?,status?) required in req.body as json (token required)
  - /delete (DELETE): deletes order using id, (id) required in req.body as json (token required)
  #### orderProducts.Router
  - /orderProducts (GET): shows order products using id, (order_id) required in req.body as json (token required)
  - /addProduct (POST): adds new product to existing order, (order_id,product_id,quantity) required in req.body as json (token required)
  - /deleteProduct (DELETE): deletes order using id, (order_id,product_id) required in req.body as json (token required)
