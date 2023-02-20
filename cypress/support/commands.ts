/// <reference types="cypress" />

Cypress.Commands.add('clickLink', (href: string|RegExp, label: string|RegExp) => {
  cy.get(`a[href*="${href}"]`)
    .contains(label)
    .click();
});

Cypress.Commands.add('login', () => {
  cy.visit('localhost:4000/');
  cy.clickLink('login', 'Login');
  cy.fixture('login').then(loginData => {
    cy.get('input#formUsername').type(loginData.username);
    cy.get('input#formPassword').type(loginData.password);
    cy.get('button').contains('Sign in').click();
    cy.wait(1000);
  });
  return;
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      clickLink(href:string|RegExp, value: string|RegExp): Chainable<JQuery<HTMLElement>>
      login(): Chainable<JQuery<HTMLElement>>
    }
  }
}

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};