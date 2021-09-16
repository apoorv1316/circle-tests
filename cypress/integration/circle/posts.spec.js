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

  it("should create a post with a space", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("trix-editor").type("hi there");
    cy.get(".quickpost-modal__footer--actions").within(() => {
      cy.get("button").click();
    });
    cy.wait(2000);
    cy.contains("hi there").should("be.visible");
  });

  it("should create a post with a title", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("hi there");
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
      cy.wait(2000);
      cy.contains(data.postTitle).should("be.visible");
    });
  });

  it("should create a post with an attachment", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("post with an attachment");

      cy.get('input[type="file"]').attachFile("resume.pdf", { force: true });
      cy.wait(5000);
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
      cy.get(".attachment__preview_link").should("be.visible");
    });
  });

  it("should create a post with a drag and drop image", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("post with a drag and drop image");
      cy.get(".toolbar__btn").eq(2).click({ force: true });
      cy.get(".upload-box").attachFile("apoorv.jpeg", {
        subjectType: "drag-n-drop",
      });
      cy.wait(10000);
      cy.get(".editor-overlay").should("be.visible");
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
    });
  });

  it("should create a post with an embeded image", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("post with an embeded image");
      cy.get(".toolbar__btn").eq(2).click({ force: true });
      cy.get(".tab-list-item").eq(1).click();
      cy.get(".upload-input").type(data.imageUrl);
      cy.get(".upload-btn").click();
      cy.get("trix-editor").within(() => {
        cy.get("a").should(
          "have.attr",
          "href",
          "https://free-url-shortener.rb.gy/open-graph.png"
        );
      });
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
    });
  });

  it("should create a post with a unsplash image", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("post with a unsplash image");
      cy.get(".toolbar__btn").eq(2).click({ force: true });
      cy.get(".tab-list-item").eq(2).click();
      cy.get(".unsplash-tab__result").eq(0).click();
      cy.wait(5000);
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
    });
  });

  it("should create a post with a unsplash image using search feature", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("post with a unsplash image using search");
      cy.get(".toolbar__btn").eq(2).click({ force: true });
      cy.get(".tab-list-item").eq(2).click();
      cy.get(".upload-input").type("dog");
      cy.wait(5000);
      cy.get(".unsplash-tab__result").eq(0).click();
      cy.wait(5000);
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
    });
  });

  it("should create a post with a yt video embeded", ()=>{
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("post with an embeded youtube video");
      cy.get(".toolbar__btn").eq(1).click({ force: true });
      cy.get(".tab-list-item").eq(1).click();
      cy.get(".upload-input").type(data.youtubeUrl);
      cy.get(".upload-btn").click();
      cy.wait(5000);
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
      cy.wait(5000)
      cy.get('iframe').should('be.visible')
    });
  })

  it("should create a post with a drag and drop video", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("post with a drag and drop video");
      cy.get(".toolbar__btn").eq(2).click({ force: true });
      cy.get(".upload-box").attachFile("sample.mp4", {
        subjectType: "drag-n-drop",
      });
      cy.wait(10000);
      cy.get("figure").should("be.visible");
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
    });
  });

  it.only("should create a post with a gif", () => {
    cy.get("#sidebar--right__btn-quick-post").click();
    cy.get(".react-space-selector__space-name").click();
    cy.get(".react-space-selector-dropdown__name").click({ force: true });
    cy.get("@data").then((data) => {
      cy.get("#post_name").type(data.postTitle);
      cy.get("trix-editor").type("post with a doggy gif");
      cy.get(".toolbar__btn").eq(3).click({ force: true });
      cy.get(".giphy-input").type("dog");
      cy.wait(3000)
      cy.get("img").eq(0).click({force: true});
      cy.wait(5000);
      cy.get("figure").should('be.visible')
      cy.get(".quickpost-modal__footer--actions").within(() => {
        cy.get("button").click();
      });
    });
  });
});
