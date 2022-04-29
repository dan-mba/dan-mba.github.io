describe('Home Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-7')
  })

  it('successfully loads', () => {
    cy.visit('/')
  })
  
  it('Menu loads', () => {
    cy.get('#menu-button').click()
    cy.get('#menu-drawer').should('be.visible')
  })
})
