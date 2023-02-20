/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('clickLink', (href: string|RegExp, label: string|RegExp) => {
  return cy.get(`a[href*="${href}"]`)
  // .should('have.attr', 'href', '/users')
    .contains(label)
    .click();
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      clickLink(href:string|RegExp, value: string|RegExp): Chainable<JQuery<HTMLElement>>
    }
  }
}

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};