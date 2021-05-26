const {ApolloServer} = require('apollo-server');

let getUserDetails = require('./resolver/query.js');
let addProfilePicture = require('./resolver/mutation.js');

const resolvers = {
  Query: {
    getUserDetails,
  },
  Mutation: {
    addProfilePicture,
  },
};

var fs = require('fs');
var path = require('path');

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
});

server.listen().then(({url}) => console.log(`Server is running on ${url}`));
