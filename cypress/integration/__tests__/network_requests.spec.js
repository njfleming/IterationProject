/// <reference types="cypress" />

context('Network Requests', () => {
  beforeEach(() => {
    cy.visit('localhost:8080')
  })

  it('cy.request() - make a GET request', () => {
    cy.request('https://api.scaleserp.com/search')
      .should((response) => {
        expect(response.status).to.eq(200)
      })
  })
})