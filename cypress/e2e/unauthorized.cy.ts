describe('Can\'t access protected pages', () => {
  it('tries to access profile page', () => {
    cy.visit('localhost:4000/');
    cy.clickLink('profile/', /test[._]\w+/);
    cy.contains('UNAUTHORIZED: No JWT token provided.');
  });


  it('tries to access article edit page', () => {
    cy.visit('localhost:4000/');
    cy.clickLink('article/', 'Read more');
    cy.url().then(urlString => {
      cy.visit(urlString + '/edit');
      cy.contains('You are not the owner of this article');
    });
  });


  it('tries to access @me page', () => {
    cy.visit('localhost:4000/@me');
    cy.contains('UNAUTHORIZED: No JWT token provided.');
  });
});

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};
