/// <reference types="cypress" />

context("should toggle stores on and off", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");

    cy.get("#email")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get("#password").type("testtest").should("have.value", "testtest");

    cy.contains("Log In").click();
  });

  it('should toggle each store', () => {
    cy.get('#target').click();
    cy.get('#bestbuy').click();
    cy.get('#walmart').click();
    cy.get('#apple').click();
    cy.get('#newegg').click();
  })

  it("should toggle and then return only items from target API", () => {
    cy.get("#target").click();

    cy.get("#search_bar").type("computer").should("have.value", "computer");

    cy.get("#search_btn").click();
    cy.wait(15000);

    cy.contains("Target");
    
  });

  it("should return only items from Best Buy API", () => {
    cy.get("#bestbuy").click();

    cy.get("#search_bar").type("computer").should("have.value", "computer");

    cy.get("#search_btn").click();
    cy.wait(15000);

    cy.contains("Best Buy");
  });

  it("should return only items from walmart API", () => {
    cy.get("#walmart").click();

    cy.get("#search_bar").type("computer").should("have.value", "computer");

    cy.get("#search_btn").click();
    cy.wait(15000);

    cy.contains("Walmart");
  });

  it("should return only items from Apple API", () => {
    cy.get("#apple").click();

    cy.get("#search_bar").type("computer").should("have.value", "computer");

    cy.get("#search_btn").click();
    cy.wait(15000);

    cy.contains("Apple");
  });

  it("should return only items from New Egg API", () => {
    cy.get("#newegg").click();

    cy.get("#search_bar").type("computer").should("have.value", "computer");

    cy.get("#search_btn").click();
    cy.wait(15000);

    cy.contains("Newegg");
  });
});
