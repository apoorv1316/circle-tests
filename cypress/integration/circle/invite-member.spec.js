/// <reference types="cypress" />
describe("invite member", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.fixture("credentials").as("data");
    cy.get("@data").then((data) => {
      cy.login(data.correctEmail, data.correctPassword);
    });
  });
  it("should send invite to a member",()=>{
    cy.get('a[data-tippy-content="Members"]').click()
    cy.get('#community-member-invite').click()
    cy.get('#community_member_name').type("Apoorv Tiwari")
    cy.get('#community_member_email').type('tiwari.apoorv13@gmail.com')
    cy.get('.ss-option').eq(2).click({force: true})
    cy.get('.ss-list').eq(3).within(()=>{
      cy.get('.ss-option').eq(0).click({force: true})
    })
    cy.get('.form-button').within(()=>{
      cy.get('button').eq(0).click()
    })
  })

})
