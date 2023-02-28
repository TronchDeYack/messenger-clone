import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { SlackAPI } from './SlackAPI.js';

const typeDefs = `#graphql
  type User {
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: (_, __, { dataSources }) => dataSources.slackAPI.getAllUsers(),
  },
};

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

interface ContextValue {
  dataSources: {
    slackAPI: SlackAPI;
  };
}

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const { cache } = server;
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        slackAPI: new SlackAPI({ cache }),
      },
    };
  }
});

console.log(`🚀  Server ready at: ${url}`);