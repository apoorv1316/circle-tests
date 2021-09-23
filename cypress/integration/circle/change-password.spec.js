/// <reference types="cypress" />
describe("change password", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.fixture("credentials").as("data");
    cy.get("@data").then((data) => {
      cy.login(data.correctEmail, data.correctPassword);
    });
  });
  it("should change user password",()=>{
    cy.get('a[data-tippy-content="Settings"]').click()
    cy.get('a[href="/settings/account"]').eq(2).click()

    cy.get('#user_password').type("Circle@1234")
    cy.get('#user_password_confirmation').type("Circle@1234")
    cy.get('.form-button').within(()=>{
      cy.get('input[type="submit"]').click()
    })
  })
})
