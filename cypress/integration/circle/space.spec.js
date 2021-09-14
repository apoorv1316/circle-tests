/// <reference types="cypress" />
describe("dasboard", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.fixture("credentials").as("data");
    // cy.visit("https://login.circle.so/sign_in?request_host=app.circle.so");
    // cy.get(".btn.btn-primary.btn-center-wide").click();
    // cy.get("#user_email").type("tiwari.apoorv1316@gmail.com");
    // cy.get("#user_password").type("Circle@123");
    // cy.get('input[value="Log in"]').click();
    cy.get("@data").then((data) => {
      cy.login(data.correctEmail, data.correctPassword);
    });
  });
  it("should create a space", () => {
    cy.get("h2").should("be.visible");
    cy.get(".sidebar__join-space").eq(1).click({ force: true });
    cy.get('[data-target="form.inputName"]').type("space101");
    cy.get(".create-space").click();
  });
});
