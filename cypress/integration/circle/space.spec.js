/// <reference types="cypress" />
describe("dasboard", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.fixture("credentials").as("data");
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
  it('should create an open space',()=>{
    cy.get('.icon-circle-add').eq(0).click({force: true})
    cy.get('input[name="name"]').type('open space')
    cy.get('button[name="open"]').click()
    cy.get('.multi-step-panel__actions').within(()=>{
      cy.contains('Next').click()
    })
    cy.get('button[name="none"]').click()
    cy.contains("Finish").click()
    cy.contains('open space').should('be.visible')
  })
  it('should create an open space',()=>{
    cy.get('.icon-circle-add').eq(0).click({force: true})
    cy.get('input[name="name"]').type('private space')
    cy.get('button[name="private"]').click()
    cy.get('.multi-step-panel__actions').within(()=>{
      cy.contains('Next').click()
    })
    cy.get('input[name="locked_page_heading"]').type("private space")
    cy.get('trix-editor').type("description for private space")
    cy.get('input[name="locked_button_label"]').type("Sign up")
    cy.get('input[name="locked_button_url"]').type('https://domain.com/signup-cta"')
    cy.get('.multi-step-panel__actions').eq(2).within(()=>{
      cy.get('button').eq(0).click({force: true})
    })
    cy.get('button[name="none"]').click()
    cy.contains("Finish").click()
  })
  it.only('should create a secret space',()=>{
    cy.get('.icon-circle-add').eq(0).click({force: true})
    cy.get('input[name="name"]').type('secret space')
    cy.get('button[name="secret"]').click()
    cy.get('.multi-step-panel__actions').within(()=>{
      cy.contains('Next').click()
    })
    cy.get('button[name="none"]').click()
    cy.contains("Finish").click()
    cy.get('.title-name').should('be.visible')
  })

});
