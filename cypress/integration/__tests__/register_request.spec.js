/// <reference types="cypress" />

it("make a POST request to successfully register a user", () => {
  cy.visit("localhost:8080");

  cy.contains("Create Account").click();

  cy.get("#email2")
    .type("test6@test.com", { force: true })
    .should("have.value", "test6@test.com");
  cy.get("#password2")
    .type("testtest", { force: true })
    .should("have.value", "testtest");
  cy.get("#confirmPassword")
    .type("testtest", { force: true })
    .should("have.value", "testtest");
  //Shows password
  cy.get(".pw-checkbox").click();
  cy.wait(1500);

  cy.contains("Sign Up").click();

  cy.request("POST", "localhost:8080/api/auth/signup").should((response) => {
    expect(response.status).to.eq(200);
    expect(response).to.have.property("headers");
  });
});
