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

  it.only("should create a member tag",()=>{
    cy.get('a[data-tippy-content="Settings"]').click()
    cy.get('a[href="/settings/member_tags"]').eq(1).click()
    cy.get('#member_tag_name').type("Tag1")
    cy.get('.emoji-picker__placeholder').click()
    cy.get('button[aria-label="😃, smiley"]').click()
    cy.get('[data-target="colorpicker.colorInput"]').clear().type('#1B38C0')
    cy.get('.search-input').type('Appu Tiwari{enter}')
    cy.get('.form-button').within(()=>{
      cy.get('button').click()
    })
  })
})
