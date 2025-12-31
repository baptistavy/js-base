create table users
(
    id             serial
        primary key,
    name           varchar,
    email          varchar,
    password       varchar,
    email_verified boolean default false
);
