/// <reference types="cypress" />

describe("landing page test", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("https://circle.so/");
  });

  it("heading test", () => {
    cy.get("h1").should(
      "have.text",
      "The modern community platform for creators"
    );
  });
  it("navigation test", () => {
    cy.get("nav")
      .should("contain", "Pricing")
      .and("contain", "Login")
      .and("contain", "Get Started");
    cy.get(".link-pricing").click();
    cy.go("back");
    cy.get(".link-login").click();
    cy.go("back");
    cy.contains("Get started").click();
    cy.go("back");
  });

  it("images test", () => {
    cy.get('[alt="We love creators!"]').should("be.visible");
    cy.get(".creator-grid-left-img").should("be.visible");
    cy.get(".creator-grid-right-img").should("be.visible");
  });

  it("free trial button test", () => {
    cy.contains("Start your 14-day free trial").click;
  });

  it("features section tests", () => {
    cy.get(".section-features-grid").within(() => {
      cy.get("h2")
        .contains("Easily set up a premium community for every use-case")
        .should("exist");
      cy.get("p")
        .contains(
          "You can make Circle work for your project. Circle is flexible, white-labeled, and powers hundreds of diverse community types."
        )
        .should("exist");
      cy.get(".feature-wrapper").should("have.length", 8);
    });
  });

  it("creator grid tests", () => {
    cy.get(".section-built-for-creators").within(() => {
      cy.get("h2").should("have.text", "We built Circle forcreators like you");
      cy.get(".w-button").should("be.visible").click();
    });
  });

  it("instructions section", () => {
    cy.get(".section-instructions").within(() => {
      cy.get("h2")
        .contains("Organize your discussions in public or private spaces")
        .should("exist");
    });
    cy.get(".tabs-menu").within(() => {
      cy.get('[data-w-tab="Tab 1"]').click();
      cy.get('[data-w-tab="Tab 2"]').click();
      cy.get('[data-w-tab="Tab 3"]').click();
      cy.get(".tab-link").should("have.length", 3);
    });
  });

  it("section features engagement test", () => {
    cy.get(".section-feature-engagement").within(() => {
      cy.get("h2")
        .contains("Built for engaging discussions and connections")
        .should("exist");
      cy.get("img").should("be.visible");
    });
    cy.get(".testimonial-image-small").should("be.visible");
    cy.get(".testimonial-name-small").should("be.visible");
    cy.get(".testimonial-title").should("be.visible");
  });

  it("section features white label test", () => {
    cy.get(".section-feature-white-label").within(() => {
      cy.get("h2")
        .contains("A premium, white-labeled community experience")
        .should("exist");
      cy.get(".image-46").should("be.visible");
    });
  });

  it("integration section features test", () => {
    cy.get(".section-feature-integrations").within(() => {
      cy.get("h2")
        .contains("Easily connects with the tools you already use")
        .should("exist");
      cy.get(".image-44").should("be.visible");
    });
  });

  it("testimonials section tests", () => {
    cy.get(".section-wall-of-love").within(() => {
      cy.get("h2")
        .contains("Creators are building thriving communities on Circle")
        .should("exist");
    });
    cy.get(".testimonial-image-large").should("be.visible");
    cy.get(".testimonial-column").should("have.length", 10);
    cy.get(".testimonial-box").should("have.length", 32);
  });

  it("testimonial jay clouse test", () => {
    cy.get(".section-cta").within(() => {
      cy.get("h2")
        .contains(
          "The way y’all listen to your customers while also prioritizing product enhancements should be the gold standard."
        )
        .should("exist");
      cy.get("p")
        .contains("Jay Clouse, Founder @ Freelancing School")
        .should("exist");
      cy.get(".jay-clouse").should("be.visible");
      cy.get("a").click();
    });
  });

  it("footer section test", () => {
    cy.get("footer").within(() => {
      cy.get("img").should("be.visible");
      cy.get("a").should("have.length", 9);
    });
  });
});
