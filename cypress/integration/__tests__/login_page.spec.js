//Tests our Create Account functionality
context("Login Page", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });

  it("Creates an account", () => {
    cy.contains("Create Account").click();

    cy.get("#email2")
      .type("test@test.com", { force: true })
      .should("have.value", "test@test.com");
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

    it("successfully loads", () => {
      cy.visit("/");
    });
  });

  it("Logs in when stored email and correct password are entered", () => {
    cy.get("#email")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get("#password").type("testtest").should("have.value", "testtest");
    //Shows password
    cy.get(".pw-toggle").click();

    cy.contains("Log In").click();
  });
});
