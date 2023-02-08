import * as userQueries from './user';
import * as articleQueries from './article';

export const gql = {
  ...userQueries,
  ...articleQueries,
};
