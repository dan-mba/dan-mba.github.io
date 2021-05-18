describe('Topics Page', () => {
  it('successfully loads', () => {
    cy.visit('/topics')
  })
  
  it('displays topic chips', () => {
    cy.get('.MuiChip-root').should('have.length.gte', 1)
  })

  it('should link to topic page', () => {
    cy.contains('a', 'javascript').click()
    cy.url().should('include', '/topics/javascript')
  })
})