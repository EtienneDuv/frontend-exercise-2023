import {
  QueryGetArticlesArgs,
  QueryGetArticleArgs,
  MutationUpdateArticleArgs,
  MutationCreateArticleArgs
} from '../../@types/gql';
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
        authorId
        content
        score
        createdAt
        children {
        authorId
        content
          score
          createdAt
          children {
            authorId
            content
            score
            createdAt
          }
        }
      }
    }
  }`
});

export const updateArticle = (data: MutationUpdateArticleArgs) => fetchGql({
  body: `mutation {
    updateArticle (
        articleId: "${data.articleId}"
        title    : "${data.title}"
        perex    : """${data.perex}"""
        content  : """${data.content}"""
    ) { 
      updatedAt
    }
  }`
});

export const createArticle = (data: MutationCreateArticleArgs) => fetchGql({
  body: `mutation {
    createArticle (
        title    : "${data.title}"
        perex    : """${data.perex}"""
        content  : """${data.content}"""
    ) { 
      id
    }
  }`
});
