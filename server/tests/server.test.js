const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todoArray, populateTodos, usersArray, populateUsers} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})                           // sending data through body of POST
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // ensuring that todo got saved into the collection properly

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})             // empty obj - invalid todo
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should fetch all todos',  (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
        expect(res.body.todos[0]).toMatchObject({text:todoArray[0].text});
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should fetch one todo', (done) => {
    let _id = todoArray[0]._id.toHexString();
    request(app)
      .get(`/todos/${_id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo).toMatchObject({_id:_id, text:todoArray[0].text})
      })
      .end(done);
  });

  it('should return 404 because ID even though valid does not exist', (done) => {
    let id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 because ID is invalid', (done) => {
    let id = 'ac1';
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', (done) => {
    let _id = todoArray[1]._id.toHexString();
    request(app)
      .delete(`/todos/${_id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(_id)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // ensuring that todo got deleted from the collection properly

        Todo.findById(_id).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 because ID even though valid does not exist', (done) => {
    let id = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 because ID is invalid', (done) => {
    let id = 'ac1';
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {

  it('should update a todo', (done) => {
    let _id = todoArray[0]._id.toHexString();
    let obj = {text:'updated text', completed:true};
    request(app)
      .patch(`/todos/${_id}`)
      .send(obj)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(obj.text)
        expect(res.body.todo.completed).toBe(true)
        expect(typeof res.body.todo.completedAt).toBe('number')
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    let _id = todoArray[1]._id.toHexString();
    let obj = {text:'different text', completed:false};
    request(app)
      .patch(`/todos/${_id}`)
      .send(obj)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(obj.text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toBeFalsy()
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', usersArray[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(usersArray[0].email)
        expect(res.body._id).toBe(usersArray[0]._id.toHexString())
      })
      .end(done);
  });

  it('should return 401 if token not provided', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done);
  });

});

describe('POST /users', () => {
  it('should create a user', (done) => {
    let email = 'example@ex.com';
    let password = '34fgsf23';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(email)
        expect(res.body._id).toBeTruthy()
        expect(res.header['x-auth']).tobeTruthy
      })
      .end((err) => {
        if(err){
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy()
          expect(user.email).toBe(email)
          expect(user.password).not.toBe(password)
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    let email = 'example123@ex.com';
    let password = '34s3';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .expect((res) => {
        expect(res.body.name).toBe('ValidationError')
      })
      .end(done);
  });

  it('should not create a user if email in use', (done) =>{
    let email = usersArray[0].email;
    let password = '34s355675hfthtr';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .expect((res) => {
        expect(res.body.code).toBe(11000)
      })
      .end(done);
  });
});
