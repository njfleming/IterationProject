/// <reference types="cypress" />

context('Network Requests', () => {
  before(() => {
    cy.visit('localhost:8080');

    cy.get('#email')
      .type('test@test.com')
      .should('have.value', 'test@test.com');
    cy.get('#password')
      .type('testtest')
      .should('have.value', 'testtest');

    cy.contains('Log In').click();
  })


  it('cy.request() - make a GET request', () => {
    cy.request('localhost:8080/api/products/')
      .should((response) => {
        expect(response.status).to.eq(200)
      })
  })
})