import {MutationLoginArgs} from '../../@types/gql';
import {fetchGql} from './utils';

export const login = (data: MutationLoginArgs) => fetchGql({
  body: `mutation {
    login (
        username: "${data.username}"
        password: "${data.password}"
    ) { token }
  }`
});