const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todoArray = [{text:'First test todo', _id:new ObjectID()}, {_id:new ObjectID(), text: 'Second test todo'}];

beforeEach((done) => {
  Todo.remove({}).then(() => Todo.insertMany(todoArray))
  .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

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
      .end(done());
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
      .end(done());
  });

  it('should return 404 because ID even though valid does not exist', (done) => {
    let id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.body).toBeNull();
      })
      .end(done());
  });

  it('should return 404 because ID is invalid', (done) => {
    let id = 'ac1';
    reques(app)
      .get(`/todos/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.body).toBeNull();
      })
      .end(done());
  });

});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', (done) => {
    let _id = '5a92f75cd8e800507af3157e';
    request(app)
      .delete(`/todos/${_id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo).toMatchObject({"n":1, "ok":1})
      })
      .end((err,res) => {
          if(err) {
            return done(err);
          }
          done();
      })
  });
});

describe('PUT /todos/:id', () => {
  it('should update a todo', (done) => {
    let _id = '5a92f75cd8e800507af3157e';
    request(app)
      .put(`/todos/${_id}`)
      .expect(200)
      .expect((res) => {
        expect(res).toMatchObject({"n":1, "ok":1})
      })
      .end((err,res) => {
          if(err) {
            return done(err);
          }
          done();
      })
  });
});
