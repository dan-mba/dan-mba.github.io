describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })

  it('shows 4 nav elements', () => {
    cy.get('#desktop-links').children().should('have.length', 4)
  })
    
  it('shows Portfolio dropdown', () => {
    cy.get('#nav-bar').contains('button','Portfolio').click()
    cy.get('#portfolio-menu ul a').should('have.length', 3)
  })
})