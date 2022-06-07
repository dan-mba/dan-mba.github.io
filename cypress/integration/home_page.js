describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })

  it('shows 4 nav elements', () => {
    // 4 nav element + hidden dropdown
    cy.get('#desktop-links').children().should('have.length', 5)
  })
    
  it('shows Portfolio dropdown', { retries: 3 }, () => {
    cy.get('#nav-bar').contains('button','Portfolio').click()
    cy.get('#portfolio-menu a').should('have.length', 3)
  })
})