/// <reference types="cypress" />
describe("user authentication", () => {
  it("login page works fine", () => {
    cy.visit("https://circle.so/");
    cy.get(".link-login").click();
    cy.get('[data-action="click->toggle#toggle click->signin#focus"]').click();
    cy.get("h1").should("have.text", "Log in to your Circle account");
  });

  it("display incorrect email or password when credentials incorrect", () => {
    cy.visit("https://login.circle.so/sign_in#email");

    // Error does not exist at this point
    cy.contains("Oops! Invalid email or password").should("not.exist");

    cy.get('[data-target="signin.email"]').type("hello@gmail.com");
    cy.get("#user_password").type("password");
    cy.get('[data-disable-with="Log in"]').click();
    cy.contains("Oops! Invalid email or password");
  });

  it("should sign in when correct credentials", () => {
    cy.visit("https://login.circle.so/sign_in#email");
    cy.get('[data-target="signin.email"]').type("tiwari.apoorv1316@gmail.com");
    cy.get("#user_password").type("Circle@123");
    cy.get('[data-disable-with="Log in"]').click();
  });

  it("display error if email not found for forgot password", () => {
    cy.visit("https://login.circle.so/users/password/new");
    // warning doesn't exist at this point
    cy.get(".alert-warning").should("not.exist");

    cy.get("#user_email").type("woooowooo@gmail.com");
    cy.get('[data-disable-with="Reset my password"]').click();
    cy.get(".alert-warning").should("have.text", "not found");
  });

  it("should send reset password confirmation with correct email", () => {
    cy.visit("https://login.circle.so/users/password/new");
    // Message not exist at this point
    cy.contains(
      "You will receive an email with instructions on how to reset your password in a few minutes."
    ).should("not.exist");
    cy.get("#user_email").type("tiwari.apoorv1316@gmail.com");
    cy.get('[data-disable-with="Reset my password"]').click();
    cy.location("pathname").should("eq", "/sign_in");
    cy.contains(
      "You will receive an email with instructions on how to reset your password in a few minutes."
    ).should("exist");
  });
});
