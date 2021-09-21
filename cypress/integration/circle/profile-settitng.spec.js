/// <reference types="cypress" />
describe("profile setting", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.fixture("credentials").as("data");
    cy.get("@data").then((data) => {
      cy.login(data.correctEmail, data.correctPassword);
    });
  });
  it("should edit profile details",()=>{
    cy.get('a[data-tippy-content="Settings"]').click()
    cy.get('a[href="/settings/profile"]').eq(2).click()
    cy.get('#community_member_headline').type("Fitness coach")
    cy.get('#community_member_bio').type("I love to hike, ski, and travel.")
    cy.get('#community_member_location').type("Uttar Pradesh")
    cy.get('#community_member_website').type("https://www.saeloun.com/")
    cy.get('#community_member_twitter_url').type('https://twitter.com/apoorv1316')
    cy.get('#community_member_instagram_url').type('https://instagram.com/apoorv__tiwari')
    cy.get('#community_member_facebook_url').type('https://facebook.com/apoorv13')
    cy.get('#community_member_linkedin_url').type('https://linkedin.com/apoorv1316')
    cy.get('.form-button').within(()=>{
      cy.get('button').click()
    })
  })
})
