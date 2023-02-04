
import type {CodegenConfig} from '@graphql-codegen/cli';

// Run https://github.com/EtienneDuv/test-Applifting API
const config: CodegenConfig = {
    overwrite: true,
    schema   : 'http://localhost:3000',
    generates: {
        'src/generated/types.ts': {
            plugins: ['typescript', 'typescript-resolvers']
        },
        'doc/graphql.schema.json': {
            plugins: ['introspection']
        }
    }
};

export default config;
