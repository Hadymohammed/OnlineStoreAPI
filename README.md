# OnlineStoreAPI
Practicing on RESTFUL API &amp; Postgres DB

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
  - /show (GET): shows user, id required in req.body as json (token required)
  - /create (POST): adds new user, (id,first_name,last_name,password) required in req.body as json (token required)
  - /update (PATCH): updates user data, (id,password) required for editing varification + updated data (first_name?,last_name?) in req.body as json (token required)
  - /delete (DELETE): deletes user using id, (id,password) required for varification in req.body as json (token required)
- /products
  - index (GET): shows all products
  - /show (GET): shows product using id, (id) required in req.body as json
  - /create (POST): adds new product, (name,price) required in req.body as json (token required)
