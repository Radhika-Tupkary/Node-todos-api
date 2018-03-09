const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'abhd123';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPassword = '$2a$10$eOaKbsJS9CZERzcPUkdgTOd75f9bXAqgtS5RIjRLvlzT7Xg/hDcz2';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})

// let msg = 'i am user 34';
// let hash = SHA256(msg).toString();
//
// console.log(`msg : ${msg}`);
// console.log(`hasg : ${hash}`);
//
// let data = {
//   id:4
// }
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()       // to make sure that client does not manipulate data
// }
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString()
//
// let resultHash = SHA256(JSON.stringify(data) + 'some secret').toString()
//
// if(resultHash === token.hash) {
//   console.log('Data was not changed, go ahead.')
// } else {
//   console.log('Data was changed, don\'t trust!');
// }


/*
adding 'somesecret' - is called salting! Remember!
All of the above code comes in with JWT - Json Web Support
*/

// let data = {
//   id: 15
// }
//
// let token = jwt.sign(data, '123abcd');  // header.payload.hash
// console.log(token);
//
// let decoded = jwt.verify('$2a$10$eOaKbsJS9CZERzcPUkdgTOd75f9bXAqgtS5RIjRLvlzT7Xg/hDcz2', 'pqr987');
// console.log(decoded);
