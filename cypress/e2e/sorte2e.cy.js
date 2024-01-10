describe('SortControl Component', () => {
  it('Should have the proper selected value after changing the sort option', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.sort-by select').select('title');
    cy.get('.sort-by select').should('have.value', 'title');

    cy.get('.sort-by select').select('release_date');
    cy.get('.sort-by select').should('have.value', 'release_date');
  });

  it('Should trigger sort', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(2000); // Wait for page load and intercept the second call
    cy.intercept('GET','**/movies**').as('sortRequest');
    cy.get('.sort-by select').select('title');
    cy.get('.sort-by select').should('have.value', 'title');

    cy.wait('@sortRequest', {timeout: 10000}).then((interception) => {
      expect(interception.request.url).to.include('sortBy=title');
    });
  });

  it('Selecting sort should reflect in the browser url', () => {
    cy.visit('http://localhost:3000/');

    cy.wait(2000);
    cy.intercept('GET','**/movies**').as('sortRequest');
    cy.get('.sort-by select').select('title');
    cy.get('.sort-by select').should('have.value', 'title');

    cy.wait('@sortRequest', {timeout: 10000}).then((interception) => {
      expect(interception.request.url).to.include('sortBy=title');
    });
    cy.url().should('include', 'sortBy=title');
  });

  it('SortBy value should be read from url', () => {
    cy.visit('http://localhost:3000/?sortBy=title');
    
    cy.intercept('GET','**/movies**').as('sortRequest');
    cy.wait(2000);
    cy.get('.sort-by select').should('have.value', 'title');
    cy.wait('@sortRequest', {timeout: 10000}).then((interception) => {
      expect(interception.request.url).to.include('sortBy=title');
    });
  });
});
