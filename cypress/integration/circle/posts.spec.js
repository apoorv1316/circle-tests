/// <reference types="cypress" />
describe("dasboard", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.fixture("credentials").as("data");
    cy.get("@data").then((data) => {
      cy.login(data.correctEmail, data.correctPassword);
    });
  });
  it("should create a post", () => {
    cy.get("h2").should("be.visible");
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get('[data-tribute="true"]').type("hello world!!");
  });
});
