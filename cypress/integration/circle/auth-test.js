/// <reference types="cypress" />
describe("user authentication", () => {
  beforeEach(() => {
    cy.fixture("credentials").as("data");
  });

  it("should take user to login page", () => {
    cy.visit("/");
    cy.get(".link-login").click();
    cy.get('[data-action="click->toggle#toggle click->signin#focus"]').click();
    cy.get("h1").should("have.text", "Log in to your Circle account");
  });

  it("should display incorrect email or password when credentials incorrect", () => {
    cy.get("@data").then((data) => {
      // Error does not exist at this point
      cy.contains(data.invalidCredentialsMessage).should("not.exist");
      cy.login(data.invalidEmail, data.invalidPassword);
      cy.contains(data.invalidCredentialsMessage);
    });
  });

  it("should sign in when correct credentials", () => {
    cy.get("@data").then((data) => {
      cy.login(data.correctEmail, data.correctPassword);
    });
  });

  it("should display error if email not found for forgot password", () => {
    cy.visit(Cypress.env("forgotPasswordUrl"));
    cy.get("@data").then((data) => {
      // warning doesn't exist at this point
      cy.get(".alert-warning").should("not.exist");

      cy.get("#user_email").type(data.incorrectEmail);
      cy.get('[data-disable-with="Reset my password"]').click();
      cy.get(".alert-warning").should("have.text", "not found");
    });
  });

  it("should send reset password confirmation with correct email", () => {
    cy.visit(Cypress.env("forgotPasswordUrl"));
    // Message not exist at this point

    cy.get("@data").then((data) => {
      cy.contains(data.emailConfirmationMessage).should("not.exist");
      cy.get("#user_email").type(data.correctEmail);
      cy.get('[data-disable-with="Reset my password"]').click();
      cy.location("pathname").should("eq", "/sign_in");
      cy.contains(data.emailConfirmationMessage).should("exist");
    });
  });
});
