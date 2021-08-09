describe('Contributions Page', () => {
  it('successfully loads', () => {
    cy.visit('/contributions')
  })

  it('loads repo cards', () => {
    // At least 1 repo card on initial page
    cy.get('.MuiCard-root')
      .should('have.length.gte', 1)
  })
})