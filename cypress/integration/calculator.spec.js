describe("Calculator tests", () => {
  it("should check 7 + 2 equals 9", () => {
    // 1. act
    cy.visit("localhost:5500/index.html");

    // 2. arrange
    cy.get('[value="7"]').click();
    cy.get('[value="+"]').click();
    cy.get('[value="9"]').click();
    cy.get('[value="="]').click();

    // 3. assert
    cy.get(".calculator__input-display").should("contain", "7 + 9");
    cy.get(".calculator__result-display").should("contain", "16");
  });
});
