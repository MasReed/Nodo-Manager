describe('Nodo Manager App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  it('front page contains welcome, login form, register form', () => {
    cy.contains('Welcome!')
    cy.get('#login-form')
    cy.get('#register-form')
  })
})
