CREATE TABLE orders(
    id SERIAL primary key,
    user_id int,
    foreign key (user_id) references users(id),
    status varchar(20)
)