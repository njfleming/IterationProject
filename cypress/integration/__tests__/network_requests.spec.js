/// <reference types="cypress" />

context("Network Requests", () => {
  before(() => {
    cy.visit("localhost:8080");

    cy.get("#email")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get("#password").type("testtest").should("have.value", "testtest");

    cy.contains("Log In").click();
  });

  it("make a POST request to successfully login", () => {
    cy.request("POST", "localhost:8080/api/auth/login").should((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("headers");
    });
  });

  it("make a GET request to retrieve updated pricing for items in database", () => {
    cy.request("GET", "localhost:8080/api/products/updatePricing").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property("headers");
        expect(response).to.have.property("body");
      }
    );
  });

  it("make a GET request to get all current users products", () => {
    cy.request("GET", "localhost:8080/api/products/6").should((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("headers");
    });
  });
});
