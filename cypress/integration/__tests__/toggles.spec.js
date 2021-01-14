/// <reference types="cypress" />

context('should toggle stores on and off', () => {
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

  it('should toggle Target', () => {
    cy.get('#target')
      .click()
  })

  it('should return only items from target API', () => {
    cy.get('#search_bar')
      .type('computer')
      .should('have.value', 'computer')

    cy.get('#search_btn').click();
    cy.wait(10000);

    cy.contains('Target')
  })

  it('should toggle Best Buy', () => {
    cy.get('#bestbuy')
      .click()
  })

  it('should return only items from Best Buy API', () => {
    cy.get('#search_bar')
      .type('computer')
      .should('have.value', 'computer')

    cy.get('#search_btn').click();
    cy.wait(10000);

    cy.contains('Best Buy')
  })

  it('should toggle Walmart', () => {
    cy.get('#walmart')
      .click()
  })

  it('should return only items from walmart API', () => {
    cy.get('#search_bar')
      .type('computer')
      .should('have.value', 'computer')

    cy.get('#search_btn').click();
    cy.wait(10000);

    cy.contains('Walmart')
  })

  it('should toggle Apple', () => {
    cy.get('#apple')
      .click()
  })

  it('should return only items from Apple API', () => {
    cy.get('#search_bar')
      .type('computer')
      .should('have.value', 'computer')

    cy.get('#search_btn').click();
    cy.wait(10000);

    cy.contains('Apple')
  })

  it('should toggle New Egg', () => {
    cy.get('#newegg')
      .click()
  })

  it('should return only items from New Egg API', () => {
    cy.get('#search_bar')
      .type('computer')
      .should('have.value', 'computer')

    cy.get('#search_btn').click();
    cy.wait(10000);

    cy.contains('New Egg')
  })
})