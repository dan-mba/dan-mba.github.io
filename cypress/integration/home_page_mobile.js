describe('Home Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-7')
  })

  it('successfully loads', () => {
    cy.visit('/')
  })
  
  it('Menu loads', () => {
    cy.visit('/')
    cy.get('#menu-button').click()
    cy.get('#menu-drawer').should('be.visible')
  })
})