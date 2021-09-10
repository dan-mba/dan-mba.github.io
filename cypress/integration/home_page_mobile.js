describe('Home Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-7')
  })

  it('successfully loads', () => {
    cy.visit('/')
  })

  it('Menu loads', () => {
    cy.get('#nav-bar button').click()
    cy.get('div.MuiDrawer-paper').should('be.visible')
  })
})