
describe('Register Form Actions', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3001')
  })

  it('exists', function() {
    cy.get('#register-form').should('exist')
  })

  // it('allows a user to self-register', function() {
  //   cy.get('#register-email').type('new@user')
  //   cy.get('#register-username').type('the newest user')
  //   cy.get('#register-password').type('password')
  //   cy.get('#register-passcopy').type('password')
  //   cy.get('#register-submit-button').click()
  //
  //   cy.location('pathname').should('eq', '/menu')
  // })
  //
  // it('errors on login with pre-existing username', function() {
  //   cy.get('#register-email').type('new@user')
  //   cy.get('#register-username').type('EXISTING USER')
  //   cy.get('#register-password').type('password')
  //   cy.get('#register-passcopy').type('password')
  //
  //   cy.get('#register-submit-button').click()
  //
  //   cy.get('#alert').contains('User not found')
  // })

  //
  describe('Email Input', function() {
    //
    it('errors with empty email', function() {
      cy.get('#register-submit-button').click()
      cy.get('#register-form').contains('Enter an email!')
    })

    //
    it('errors with no "@" symbol', function() {
      cy.get('#register-email').type('thereisnoathere')
      cy.get('#register-submit-button').click()
      cy.get('#register-form').contains(`Email must include '@'`)
    })

    //
    it('requires a minimum input of 5 characters', function() {
      cy.get('#register-email').type('@23')
      cy.get('#register-submit-button').click()
      cy.get('#register-form').contains('Email is too short')
    })

    //
    it('has a maximum input of 50 characters', function() {
      cy.get('#register-email').type('@2345678901234567890123456789012345678910123456789012345')
      cy.get('#register-email').should('have.value', '@2345678901234567890123456789012345678910123456789')
      cy.get('#register-form').contains('0 character(s) remaining')
    })
  })

  //
  describe('Username Input', function() {
    //
    it('errors with empty username', function() {
      cy.get('#register-submit-button').click()
      cy.get('#register-form').contains('Enter a username!')
    })

    //
    it('requires a minimum input of 2 characters', function() {
      cy.get('#register-username').type('1')
      cy.get('#register-submit-button').click()
      cy.get('#register-form').contains('Username is too short')
    })

    //
    it('has a maximum input of 30 characters', function() {
      cy.get('#register-username').type('12345678901234567890123456789012345')
      cy.get('#register-username').should('have.value', '123456789012345678901234567890')
    })
  })

  //
  describe('Password Input', function() {

    //
    it('errors with empty password', function() {
      cy.get('#register-submit-button').click()
      cy.get('#register-form').contains('Enter a password!')
    })

    //
    it('requires a minimum input of 5 characters', function() {
      cy.get('#register-password').type('1234')
      cy.get('#register-submit-button').click()
      cy.get('#register-form').contains('Password is too short')
    })

    //
    it('has a maximum input of 50 characters', function() {
      cy.get('#register-password').type('12345678901234567890123456789012345678910123456789012345')
      cy.get('#register-password').should('have.value', '12345678901234567890123456789012345678910123456789')
      cy.get('#register-form').contains('0 character(s) remaining')
    })
  })

  //
  describe('Passcopy Input', function() {

    //
    it('errors with empty passcopy', function() {
      cy.get('#register-submit-button').click()
      cy.get('#register-form').contains('Reenter your password!')
    })

    //
    it('errors on mismatched passwords', function() {
      cy.get('#register-password').type('12345')
      cy.get('#register-passcopy').type('54321')
      cy.get('#register-submit-button').click()

      cy.get('#register-form').contains('Passwords do not match!')
    })
  })
})
