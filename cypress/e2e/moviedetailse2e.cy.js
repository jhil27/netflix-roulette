describe('Should select a movie, display details, and return back to search', () => {
  it('Should select a movie, and display details', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.movie-tile').first().as('firstMovieTile').click();
    cy.get('.movie-details-container').should('be.visible');
  });

  it('The Movie Details should be removed when close is clicked', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.movie-tile').first().as('firstMovieTile').click();
    cy.get('.movie-details-container').should('be.visible');
    cy.get('.close').click();
    cy.get('.movie-details-container').should('not.exist');
    cy.url().should('not.match', /\/(\d+)$/); // Close should remove id from url
  });

  it('Should select a movie, and display details', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.movie-tile').first().as('firstMovieTile').click();
    cy.get('.movie-details-container').should('be.visible');
  });

  it('Selecting a movie should change the browser url', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.movie-tile').first().as('firstMovieTile').click();
    cy.get('.movie-details-container').should('be.visible');
    cy.url().should('match', /\/(\d+)$/); // Should have movie id in the url
  });
});
