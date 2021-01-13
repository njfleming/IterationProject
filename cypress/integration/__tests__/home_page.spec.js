/// <reference types="cypress" />

context('Add product, delete product, logout', () => {
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

  it('shows alert if search bar is empty and search button is clicked', () => {
    cy.get('#search_btn').click();
  })

  it('Searches for input product, adds it to homescreen', () => {
    cy.get('#search_bar')
      .type('computer')
      .should('have.value', 'computer')
    
    cy.get('#search_btn').click();
    cy.wait(10000);
    cy.get('#add_btn').click();
    cy.wait(5000)
  })

  it('Deletes item from homescreen', () => {
    cy.get('#delete_btn').click();
  })

  it('logs out, sends user to login page', () => {
    cy.wait(1500);

    cy.contains('Logout').click();
  })
})