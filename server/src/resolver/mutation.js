var mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
});

connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log('Mutation Connected!');
  }
});

let addProfilePicture = (parent, args, context) => {
  console.log('Inside changeDP!');
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE user SET uri = '${args.uri}' WHERE id = ${args.id}`,
      (error, result, fields) => {
        if (error) {
          reject(error);
        }
        resolve(args.uri);
      },
    );
  });
};

module.exports = addProfilePicture;
