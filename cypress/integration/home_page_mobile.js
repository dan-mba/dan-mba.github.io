describe('Home Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-7')
  })

  it('successfully loads', () => {
    cy.visit('/')
  })

  it('Menu loads', () => {
    cy.wait(200) // wait because this arbitrarily fails
    cy.get('#menu-button').click()
    cy.get('#menu-drawer').should('be.visible')
  })
})