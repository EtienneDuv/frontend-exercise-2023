describe('Can access protected pages', () => {
  beforeEach(() => {
    cy.login();
  });


  it('tries to access profile page', () => {
    cy.visit('localhost:4000/');
    cy.get('a[href*="/"].navbar-brand').click();
    cy.clickLink('profile/', /test[._]\w+/);
    cy.contains('Owned articles');
    cy.contains('Owned comments');
  });


  it('tries to create an article', () => {
    cy.visit('localhost:4000/');
    cy.get('a[href*="/@me"]').click();
    cy.clickLink('article/new', 'New article');

    cy.get('input#articleTitle').type('[Cypress] Test article ' + new Date().toISOString());
    cy.get('textarea#articlePerex').type('Perex');
    cy.get('div#articleContent').find('textarea.w-md-editor-text-input')
      .type('{selectAll}')
      .type('Content');

    cy.get('button').contains('Save article').click();
    cy.wait(1000);

    cy.url().should('match', new RegExp('http://localhost:4000/article/.{36}/edit'));
  });


  it('tries to delete an article', () => {
    cy.visit('localhost:4000/');
    cy.get('a[href*="/@me"]').click();

    cy.get('tr')
      .contains('[Cypress] Test article')
      .siblings()
      .find('i.bi-trash')
      .click();
    cy.wait(250);
    cy.get('div.popup').contains('Article removed');
  });
});

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};
