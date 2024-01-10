describe('Test Genre Selection', () => {
  it('Select "Action" genre and verify UI update', () => {
    cy.visit('http://localhost:3000/');

    cy.get('button').contains('ACTION').click()
    cy.get('button').contains('ACTION').should('have.class','selected-genre')
  });
});
