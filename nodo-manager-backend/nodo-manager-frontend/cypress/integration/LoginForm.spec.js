describe('Login Form Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  it('exists', () => {
    cy.get('#login-form').should('exist')
  })

  it('allows a user to login with the login form', () => {
    cy.get('#login-username').type('admin')
    cy.get('#login-password').type('password')
    cy.get('#login-submit-button').click()

    cy.location('pathname').should('eq', '/menu')
  })

  it('errors on login with non-existant user', () => {
    cy.get('#login-username').type('INVALID USER')
    cy.get('#login-password').type('password')
    cy.get('#login-submit-button').click()

    cy.get('#alert').contains('User not found')
  })

  it('errors on login with incorrect password', () => {
    cy.get('#login-username').type('admin')
    cy.get('#login-password').type('INVALID PASSWORD')
    cy.get('#login-submit-button').click()

    cy.get('#alert').contains('Invalid Password')
  })

  //
  describe('Username Input', () => {
    //
    it('errors on login with empty username', () => {
      cy.get('#login-submit-button').click()
      cy.get('#login-form').contains('Enter a username!')
    })

    //
    it('requires a minimum input of 2 characters', () => {
      cy.get('#login-username').type('1')
      cy.get('#login-submit-button').click()
      cy.get('#login-form').contains('Username is too short')
    })

    //
    it('has a maximum input of 30 characters', () => {
      cy.get('#login-username').type('12345678901234567890123456789012345')
      cy.get('#login-username').should('have.value', '123456789012345678901234567890')
    })
  })

  //
  describe('Password Input', () => {
    //
    it('errors on login with empty password', () => {
      cy.get('#login-submit-button').click()
      cy.get('#login-form').contains('Enter a password!')
    })

    //
    it('requires a minimum input of 5 characters', () => {
      cy.get('#login-password').type('1234')
      cy.get('#login-submit-button').click()
      cy.get('#login-form').contains('Password is too short')
    })

    //
    it('has a maximum input of 50 characters', () => {
      cy.get('#login-password').type('12345678901234567890123456789012345678910123456789012345')
      cy.get('#login-password').should('have.value', '12345678901234567890123456789012345678910123456789')
      cy.get('#login-form').contains('0 character(s) remaining')
    })
  })
})
