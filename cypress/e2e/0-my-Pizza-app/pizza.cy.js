describe("Pizza", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Anasayfada Acıktım butonu bulunuyor.", () => {
    cy.get('[data-cy="aciktim-button"]').should("be.visible");
  });
  it("Acıktım butonuna tıklandığında order sayfasına ulaşılıyor.", () => {
    cy.get('[data-cy="aciktim-button"]')
      .click()
      .url()
      .should("include", "/orderform");
  });
});
describe("Order Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/orderform");
  });
  it("Sipariş Ver butonu disabled.", () => {
    cy.get('[id="order-button"]').should("have.disabled", true);
  });
  const malzemeler = [
    "Pepperoni",
    "Domates",
    "Biber",
    "Sosis",
    "Mısır",
    "Sucuk",
  ];
  it("Hamur ve boyut seçimi yapılmadan forma geçilemez", () => {
    cy.get("[data-cy=malzemeler]").check(["Pepperoni", "Domates"], {
      force: true,
    });
    cy.get("[data-cy=note-input]").type("Ekstra sos istiyorum");
    cy.get("[data-cy=adet]").clear().type("2");
    cy.get("[data-cy=submit-button]").should("be.disabled");
  });

  it("Boyut seçilmeden form gönderilemez", () => {
    cy.get("[data-cy=hamur]")
      .find("option")
      .contains("İnce Kenar")
      .then((option) => {
        cy.get("[data-cy=hamur]").select(option.val());
      });
    cy.get("[data-cy=malzemeler]").check(["Pepperoni", "Domates"], {
      force: true,
    });
    cy.get("[data-cy=note-input]").type("Ekstra sos istiyorum");
    cy.get("[data-cy=adet]").clear().type("2");
    cy.get("[data-cy=submit-button]").should("be.disabled");
  });

  it("Form gönderilebilir", () => {
    cy.get("[data-cy=orta]").check("M", { force: true });
    cy.get("[data-cy=hamur]")
      .find("option")
      .contains("İnce Kenar")
      .then((option) => {
        cy.get("[data-cy=hamur]").select(option.val());
      });
    cy.get("[data-cy=malzemeler]").check(["Pepperoni", "Domates"], {
      force: true,
    });
    cy.get("[data-cy=note-input]").type("Ekstra sos istiyorum");
    cy.get("[data-cy=adet]").clear().type("2");
    cy.get("[data-cy=submit-button]").should("not.be.disabled").click();
    cy.url().should("include", "http://localhost:3000/confirm");
  });
});
