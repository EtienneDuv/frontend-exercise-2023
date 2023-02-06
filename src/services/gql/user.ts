import {MutationLoginArgs} from '../../@types/gql';

export const login = (data: MutationLoginArgs) => `
  mutation {
    login (
        username: ${data.username}
        password: ${data.password}
    ) { token }
  }`;