import {QueryGetArticlesArgs} from '../../@types/gql';
import {fetchGql} from '../utils';

export const getArticles = (data: QueryGetArticlesArgs) => fetchGql({
  body: `query {
    getArticles 
      ${data.limit ? `(limit: ${data.limit})` : ''}
     { 
      id
      title
      perex
      commentCount
      createdAt
      authorId
      authorUsername
    }
  }`
});