import {QueryGetArticlesArgs, QueryGetArticleArgs} from '../../@types/gql';
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

export const getArticle = (data: QueryGetArticleArgs) => fetchGql({
  body: `query {
    getArticle (articleId: "${data.articleId}") { 
      title
      perex
      content
      createdAt
      authorId
      authorUsername
      commentCount
      comments (topLevelOnly: true) {
        content
        score
        children {
          content
          score
          children {
            content
            score
          }
        }
      }
    }
  }`
});