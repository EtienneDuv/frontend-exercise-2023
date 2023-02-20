import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
      on('task', {
        log (message) {
          [('\n'+'====='.repeat(15)).repeat(2) + ' cypress.config.ts:9',
            message
          ].forEach(el => console.log(el));
          return null;
        },
      });
    },
  },
});
