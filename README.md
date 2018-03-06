# Node-Todo-API

The project is still in progress. 

Its a todo application using Node.js, Express.js, MongoDB. 

The endpoints are for  

1. To get all todos :           GET /todos      (https://tranquil-plateau-37234.herokuapp.com/todos)
2. To get a single todo:        GET /todos/:id 
3. To create a new todo :       POST /todos/:id 
4. To update an existing todo : PATCH /todos/:id
5. To delete an existing todo : DELETE /todos/:id

All the endpoints are tested using Expect.js, Mocha and Supertest.

The application is hosted on heroku and the endpoints can be tested at the following base url using Postman.

https://tranquil-plateau-37234.herokuapp.com 

For a local set up, clone this repo and run npm install to run a local server on port 3000.
