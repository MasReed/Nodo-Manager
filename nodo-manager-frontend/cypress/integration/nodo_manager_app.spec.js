describe('Nodo Manager App', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Welcome!')
  })
})
