/// <reference types="cypress" />

context('homepage actions', () => {
  before(() => {
    cy.visit('localhost:8080');
  })

  it('make post', () => {
    cy.request('POST', 'http://localhost:8080/api/login/auth', {username: 'James', password: 'helloworld'})
  })

  // it('should toggle Target on', () => {
    
  // })
})