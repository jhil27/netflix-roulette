
describe('Movie functionality', () => {
  it('Opens "Add Movie" dialog with empty form on link click', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.add-movie-button').click();

    cy.get('.modal-content').should('be.visible');
    cy.get('input[id="title"]').should('have.value', '');
  });

  it('Opens "Edit" dialog with pre-populated movie details on context menu select', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.menu-button')
      .first()
      .click();

      cy.get('.menu-item')
      .contains('Edit')
      .click();


    cy.get('.modal-content').should('be.visible');
    cy.get('input[id="title"]').should('not.have.value', '');
  });

  it('Adds a new movie and verifies it appears in the list', () => {
    cy.visit('http://localhost:3000/');
  
    cy.get('.add-movie-button').click();

    cy.get('.modal-content').should('be.visible');
  
    cy.get('#title').type('New Movie Title');
    cy.get('#releaseDate').type('2023-01-01');
    cy.get('#movieUrl').type('http://example.com/new-movie-image.jpg');
    cy.get('#rating').type('8.5');
    
    cy.get('.form-select__control').click();
    cy.contains('Comedy').click();
  
    cy.get('#runtime').type('120');
    cy.get('#overview').type('This is a new movie overview');
  
    cy.get('button[type="submit"]').click();
  
    cy.get('.movie-details-container').should('be.visible');
  });
});