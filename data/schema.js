/* @flow */

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} from 'graphql';

const entryType = new GraphQLObjectType({
  name: 'RssEntry',
  description: 'RssEntry type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'id',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'title',
    },
  }),
});

const feedType = new GraphQLObjectType({
  name: 'RssFeed',
  description: 'RssFeed type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: GraphQLString,
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'author',
    },
    entries: {
      type: new GraphQLList(entryType),
      args: {
        count: {
          name: 'count',
          type: GraphQLInt,
        },
      },
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      feeds: {
        type: new GraphQLList(feedType),
        args: {
          count: {
            name: 'count',
            type: GraphQLInt,
          },
        },
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createTodo: {
        type: feedType,
        args: {
          url: {
            name: 'url',
            type: GraphQLString,
          },
        },
      },
    }),
  }),
});

export default Schema;
