// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     expect(true).to.equal(true);
//   });
// });

//Tests our Create Account functionality
describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.visit('localhost:8080')

    cy.contains('Create Account').click()

    // cy.url().should('include', '/commands')

    cy.get('#email2')
      .type('fake3@email.com', { force: true })
      .should('have.value', 'fake3@email.com')
    cy.get('#password2')
      .type('testtest', { force: true })
      .should('have.value', 'testtest')
    cy.get('#confirmPassword')
      .type('testtest', { force: true })
      .should('have.value', 'testtest')
    
    cy.contains('Sign Up').click()

    it('successfully loads', () => {
      cy.visit('/')
    })
  })
})

//Tests our Log In functionality
describe('Login Test', () => {
  it('logs in when stored email and correct password are entered', () => {
    cy.visit('localhost:8080')

    cy.get('#email')
      .type('fake3@email.com')
      .should('have.value', 'fake3@email.com')
    cy.get('#password')
      .type('testtest')
      .should('have.value', 'testtest')
    
    cy.contains('Log In').click()

    it('successfully loads', () => {
      cy.visit('/')
    })
  })
})

// before(() => {
//   cy.visit('localhost:8080')
//   cy.waitForReact()
// })

// describe('show password button', () => {
//   it('shows password text when clicked', () => {

//     cy.get('#email')
//       .type('fake3@email.com')
//       .should('have.value', 'fake3@email.com')
//     cy.get('#password')
//       .type('testtest')
//       .should('have.value', 'testtest')
//     cy.get('svg.MuiSvgIcon-root')
//       .click()
    
//     cy.react('*')
//   })
// })