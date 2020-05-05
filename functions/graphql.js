

const { GraphQLClient } = require("graphql-request");
const { ApolloServer, gql } = require("apollo-server-lambda");

const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_KEY}`,
  }
})

const typeDefs = gql`
  
  type Profile {
    name: String
    alias: String!
    email: String!
    linkedin: String
    description: String!
    skills: [String]!
    industries: [String]!
  }

  type Query {
    allProfiles: [Profile!]
  }
  
  input CreateProfileInput {
    alias: String!,
    description: String!,
    email: String!,
    skills: [String]!
    industries: [String]
  }
  
  input UpdateProfileInput {
    alias: String!,
    description: String!,
    email: String!,
    skills: [String!]!
    industries: [String]
  }
  
  type Mutation {
    createProfile(input: CreateProfileInput): Profile
    updateProfile(input: UpdateProfileInput): Profile
  }
`;

const mutateProfile = `
  mutation CreateAProfile {
    createProfile(data: {
      alias: "Peter"
      email: "peterbartels@gmail.com"
      description: "test"
      skills:["none"]
      industries:["d"]
    }) {
      alias
    }
  }
`

const mutate = `
  mutation CreateAProfile(
    $alias: String!, 
    $description: String!, 
    $email: String!,
    $skills: [String!]!
    $industries: [String]
  ) {
    createProfile(
      alias: $alias,
      description: $description,
      email: $email,
      skills: $skills,
      industries: $industries
    ) {
      alias
    }
  }
  mutation UpdateAProfile(
    $alias: String!, 
    $description: String!, 
    $email: String!,
    $skills: [String!]!
    $industries: [String]
  ) {
    updateProfile(
      alias: $alias,
      description: $description,
      email: $email,
      skills: $skills,
      industries: $industries
    ) {
      alias
      email
    }
  }
`

const allProfiles = `
query getAllProfiles {
    allProfiles {
      data {
        alias
        email
        linkedin
        description
        skills
        industries
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
  },
  Mutation: {
    createProfile: async (_, {  }, { dataSources }) => {
      console.log('111111111111111111', '', dataSources)
      const avatar = await client.request(mutate)
      return "test";
      //if (user) return Buffer.from(email).toString('base64');
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
