# Node-Todo-API

The project is still in progress, but following is the progress as of now. 

Its a todo application using **Node.js, Express.js, and MongoDB**. 

The RESTful endpoints for the project are as follows  

1. To get all todos :           GET /todos      (https://tranquil-plateau-37234.herokuapp.com/todos)
2. To get a single todo:        GET /todos/:id 
3. To create a new todo :       POST /todos/:id 
4. To update an existing todo : PATCH /todos/:id
5. To delete an existing todo : DELETE /todos/:id

All the endpoints are tested using Expect.js, Mocha and Supertest.

The application is hosted on heroku and the endpoints can be tested at the following base url using Postman (Postman - an application that simplifies sending HTTP requests).

https://tranquil-plateau-37234.herokuapp.com 

For a local set up, clone this repo and run npm install to run a local server on port 3000.
