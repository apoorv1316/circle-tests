/// <reference types="cypress" />

describe("landing page test", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    // cy.visit("https://circle.so/pricing");
    cy.visit(Cypress.env("pricingUrl"));
  });

  it("should have a heading", () => {
    cy.get(".c-heading-h1").should("have.text", "Circle starts at $39/mo");
  });

  it("should have a pricing grid", () => {
    cy.get(".c-price-box-wrapper").should("be.visible");
    cy.get(".c-price-box").should("have.length", 3);
    cy.get(".check-mark-green").should("have.length", 18);
  });

  it("should have a basic pricing grid", () => {
    cy.get(".c-heading-h4-gray").contains("BASIC").should("be.visible");
    cy.get("h1").contains("39").should("be.visible");
  });

  it("should have a professional pricing grid", () => {
    cy.get(".c-heading-h4-gray").contains("PROFESSIONAL").should("be.visible");
    cy.get("div").contains("20% Early Bird Discount");
    cy.get("h1").contains("79").should("be.visible").should("be.visible");
  });

  it("should have an enterprise pricing grid", () => {
    cy.get(".c-heading-h4-gray").contains("ENTERPRISE").should("be.visible");
    cy.get("h1").contains("199").should("be.visible");
  });

  it("should have a testimonial section", () => {
    cy.get(".section-video-testimonial-left").within(() => {
      cy.get("img").should("be.visible");
      cy.get(".testimonial-name").should("have.text", "Tiago Forte");
      cy.get(".testimonial-title-2").should(
        "have.text",
        "Building a Second Brain"
      );
    });
  });

  it("should have a features grid", () => {
    cy.get(".pricing-section-features").within(() => {
      cy.contains("Features").should("be.visible");
    });
  });

  it("should have a add-ons grid", () => {
    cy.contains("Add-ons").should("be.visible");
  });

  it("should have a single sign on grid", () => {
    cy.contains("Single Sign-On (SSO)").should("be.visible");
  });

  it("should have a support grid", () => {
    cy.contains("Support").should("be.visible");
  });

  it("should have a jay clouse testimonial ", () => {
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

  it("should have a footer section", () => {
    cy.get("footer").within(() => {
      cy.get("img").should("be.visible");
      cy.get("a").should("have.length", 9);
    });
  });

  it("trial button should have a href property", () => {
    cy.get(".c-btn-white").should(
      "have.attr",
      "href",
      "https://circle.so/start"
    );
  });

  it.only("footer links should have a href property", () => {
    cy.get(".footer-link")
      .eq(0)
      .should("have.attr", "href", "https://circle.so");
    cy.get(".footer-link")
      .eq(1)
      .should("have.attr", "href", "https://circle.so/pricing");
    cy.get(".footer-link")
      .eq(2)
      .should(
        "have.attr",
        "href",
        "https://community.circle.so/c/knowledge-base"
      );
    cy.get(".footer-link")
      .eq(3)
      .should(
        "have.attr",
        "href",
        "https://community.circle.so/c/product-updates"
      );
    cy.get(".footer-link")
      .eq(4)
      .should("have.attr", "href", "https://app.circle.so/users/sign_in");
    cy.get(".footer-link")
      .eq(5)
      .should("have.attr", "href", "https://circle.so/start");
  });
});
