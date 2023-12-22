# Final Project

1. To get path of project 
cd finalProject

2. install necessary dependencies 
npm init     
npm install express
npm install jsonwebtoken
npm install sequelize mysql2

3. To run the code 
- npm index.js

# mysql 
- Create database 
Create database final_project;

- Insert user data into user table

 INSERT INTO User (id, name, username, email, password, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchPhrase, company_bs)VALUES (1, 'test',  'test123',  'test@gmail.com',  'test@123', 'Kulas Light',  'Apt. 556',  'Gwenborough',  '92998-3874',  '-37.3159',  '81.1496',  '1-770-736-8031 x56442',  'hildegard.org',  'Romaguera-Crona',  'Multi-layered client-server neural-net',  'harness real-time e-markets');