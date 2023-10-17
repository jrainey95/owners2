const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    phoneNumber: String
    savedHorses: [Horse]
  }

  type Horse {
    horseId: ID!
    name: String!
    age: String!
    gender: String!
    sire: String
    dam: String
    trainer: String
    country: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input HorseInput {
    name: String!
    age: String!
    gender: String!
    sire: String
    dam: String
    trainer: String
    country: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, phoneNumber: String, password: String!): Auth
    saveHorse(HorseData: HorseInput!): User
    
    removeHorse(HorseId: ID!): User
  }
`;

module.exports = typeDefs;
