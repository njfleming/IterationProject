/// <reference types="cypress" />

context("Cookies", () => {
  before(() => {
    cy.visit("localhost:8080");

    cy.get("#email")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get("#password").type("testtest").should("have.value", "testtest");

    cy.contains("Log In").click();
    cy.wait(1000);
  });

  it("should have SSID cookie", () => {
    cy.getCookies()
      .should("have.length", 1)
      .should((cookies) => {
        expect(cookies[0]).to.have.property("name", "ssid");
        expect(cookies[0]).to.have.property("value");
        expect(cookies[0]).to.have.property("httpOnly", true);
        expect(cookies[0]).to.have.property("secure", false);
        expect(cookies[0]).to.have.property("domain");
        expect(cookies[0]).to.have.property("path");
      });
  });
});
