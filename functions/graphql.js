const { GraphQLClient } = require("graphql-request");
const { ApolloServer, gql } = require("apollo-server-lambda");

const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_KEY}`,
  }
})

const typeDefs = gql`

  type Profile {
    alias: String!
    email: String!
    linkedin: String
    description: String!
    skills: [String!]!
    categories: [String]!
  }

  type Query {
    allProfiles: [Profile!]
  }

`;

const allProfiles = `
  query getAllProfiles {
    allProfiles {
      data {
        alias
        email
        linkedin
        description
        skills
        categories
      }
    }
  }
`

const resolvers = {
  Query: {
    allProfiles: async () => {
      const response = await client.request(allProfiles)
      return response.allProfiles.data
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

exports.handler = server.createHandler();
