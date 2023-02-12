import {MutationLoginArgs, QueryGetUserArgs} from '../../@types/gql';
import {fetchGql} from '../utils';

export const login = (data: MutationLoginArgs) => fetchGql({
  body: `mutation {
    login (
        username: "${data.username}"
        password: "${data.password}"
    ) { 
    token
    userId
    }
  }`
});

export const getUser = (data: QueryGetUserArgs) => fetchGql({
  body: `query {
    getUser (userId: "${data.userId}") { 
      username
      createdAt
      articles {
        id
        title
        perex
        commentCount
        createdAt
      }
      comments {
        authorId
        articleId
        score
        content
        createdAt
      }
    }
  }`
});
