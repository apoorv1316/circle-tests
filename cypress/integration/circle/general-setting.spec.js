/// <reference types="cypress" />
describe("general setting", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.fixture("credentials").as("data");
    cy.get("@data").then((data) => {
      cy.login(data.correctEmail, data.correctPassword);
    });
  });
  it("should edit profile details",()=>{
    cy.get('a[data-tippy-content="Settings"]').click()
    cy.get('#community_name').clear().type("community101")
    cy.get('#community_slug').clear().type("community1001")
    cy.get('#community_prefs_brand_color').clear().type("#a3a3a3")
    cy.get('.ss-option').eq(0).click({force: true})
    cy.get('.form-button').within(()=>{
      cy.get('button').click()
    })
  })
})
