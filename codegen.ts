import type {CodegenConfig} from '@graphql-codegen/cli';

// Run https://github.com/EtienneDuv/backend-exercise-2023 API
const config: CodegenConfig = {
  overwrite: true,
  schema   : 'http://localhost:3000',
  generates: {
    'src/@types/gql.d.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    },
    'doc/graphql.schema.json': {
      plugins: ['introspection']
    }
  }
};

export default config;
