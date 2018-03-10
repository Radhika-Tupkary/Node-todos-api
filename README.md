# Node-Todo-API

Its a todo application using **Node.js, Express.js, Mongoose and MongoDB**. 

**The Private RESTful endpoints related to todos are as follows  

1. To get all todos :           GET /todos      
2. To get a single todo:        GET /todos/:id 
3. To create a new todo :       POST /todos/:id 
4. To update an existing todo : PATCH /todos/:id
5. To delete an existing todo : DELETE /todos/:id

All the above endpoints related to todos are private so that the user can delete/update/view todos that he/she owns.
Todo related endpoints are accessible only when the user is authenticated, meaning logged in. 

**The public RESTful endpoints to sign up for the application or logging into the application are as follows  

1. POST /users    -> Sign up
2. POST /users/login     -> Log in for existing users


All of the endpoints are well tested using Expect.js, Mocha and Supertest.

The application is hosted on heroku and the endpoints can be accessed using Postman (Postman - an application that simplifies sending HTTP requests) by setting url = https://tranquil-plateau-37234.herokuapp.com 

The env variable MONGODB_URI is as follows:
MONGODB_URI: mongodb://heroku_pvp8wvjt:l1rd0anana1nm4409ousdrrcoj@ds249398.mlab.com:49398/heroku_pvp8wvjt

The MongoDB can be viewed using Robo 3T (GUI for MongoDB) and setting up a connection using env variable MONGODB_URI.


For a local set up, clone this repo and run npm install to spin a local server on port 3000.
