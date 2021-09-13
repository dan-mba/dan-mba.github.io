describe('Portfolio Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-7');
  })

  it('successfully loads', () => {
    cy.visit('/portfolio')
  })

  it('loads 6 repo cards', () => {
    // 6 repo cards on initial page
    cy.get('.MuiCard-root')
      .should('have.length', 6)
  })

  it('each repo card should have at least 1 topic', () => {
    // 6 repo cards on initial page
    cy.get('.MuiCard-root')
      .each(($el) => {
        // each repo should have at least 1 topic
        cy.wrap($el).find('.MuiChip-root')
          .should('have.length.gte', 1)
      })
  })
})