describe('Can\'t access protected pages', () => {
  it('tries to access profile page', () => {
    cy.visit('localhost:4000/');
    cy.get('a[href*="profile/"]')
      .contains(/test[._]\w+/)
      .click();
    cy.contains('UNAUTHORIZED: No JWT token provided.');
  });


  it('tries to access article edit page', () => {
    cy.visit('localhost:4000/');
    cy.get('a[href*="article/"]')
      .contains('Read more')
      .click();
    cy.then(async () => {
      cy.url().then(urlString => {
        console.log(urlString);
        cy.visit(urlString + '/edit');
        cy.contains('You are not the owner of this article');
      });
    });
  });


  it('tries to access @me page', () => {
    cy.visit('localhost:4000/@me');
    cy.contains('UNAUTHORIZED: No JWT token provided.');
  });


});

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};
