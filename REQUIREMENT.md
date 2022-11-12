# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
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
  - /products (GET): shows order products using id, (order_id) required in req.body as json (token required)
  - /user (GET): shows user orders and its products using user_id, (user_id) required in req.body as json (token required)
  - /addProduct (POST): adds new product to existing order, (order_id,product_id,quantity) required in req.body as json (token required)
  - /deleteProduct (DELETE): deletes order using id, (order_id,product_id) required in req.body as json (token required)


## Data Shapes
#### Product
  - id (Serial int)
  - name (varchar(100))
  - price (float)

#### User
  - id (Serial int)
  - first_name (varchar(100))
  - last_name (varchar(100))
  - password (varchar(60))

#### orders Table 
  - id (Serial int)
  - user_id (int FK)
  - status (varchar(20))

#### order_procducts Table
  - id (Serial int)
  - order_id (int FK)
  - product_id (int FK)
  - quantity (int)


