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
    console.log('Query Connected!');
  }
});

let getUserDetails = async (parent, args, context) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT firstname, lastname, bio, uri FROM user LIMIT 1',
      (error, result, fields) => {
        if (error) {
          reject(error);
        }
        resolve(result[0]);
      },
    );
  });
};

module.exports = getUserDetails;
