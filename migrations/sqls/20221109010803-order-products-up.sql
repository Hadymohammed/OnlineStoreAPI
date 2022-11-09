CREATE TABLE order_products(
    id SERIAL primary key,
    order_id int,
    foreign key (order_id) references orders(id),
    product_id int,
    foreign key (product_id) references products(id),
    quantity int
);