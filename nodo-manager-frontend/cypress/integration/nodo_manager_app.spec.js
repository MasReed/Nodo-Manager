describe('Nodo Manager App', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3001')
  })

  it('front page contains welcome, login form, register form', function() {
    cy.contains('Welcome!')
    cy.get('#login-form')
    cy.get('#register-form')
  })
})
