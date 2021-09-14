/// <reference types="cypress" />
describe("dasboard", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.fixture("credentials").as("data");
    cy.get("@data").then((data) => {
      cy.login(data.correctEmail, data.correctPassword);
    });
  });
  it("should not create a post without a space", () => {
    cy.get("h2").should("be.visible");
    cy.get("#sidebar--right__btn-quick-post").click();
    // No error at this stage
    cy.contains("Please select a space.").should("not.exist");
    cy.get('[data-tribute="true"]').type("hello world!!");
    cy.get(".quickpost-modal__footer--actions").within(() => {
      cy.get("button").click();
    });
    cy.get(".form-errors").should("have.text", "Please select a space.");
  });

  it.only("should create a post with a space", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get('[data-tribute="true"]').type("hello world!!");
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get(".quickpost-modal__footer--actions").within(() => {
      cy.get("button").click();
    });
  });
});
