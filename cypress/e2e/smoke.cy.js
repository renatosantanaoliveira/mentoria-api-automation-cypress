/**
 * Smoke Test - Valida que o Cypress consegue se comunicar com a API do ecommerce.
 * Utiliza cy.api() do cypress-plugin-api para exibir o painel visual de requests (estilo Postman).
 * Este arquivo pode ser removido após validação inicial do projeto.
 */
describe("Smoke Test - API do Ecommerce", () => {
    it("deve conseguir acessar a API e retornar status 200", () => {
        cy.api({
            method: "GET",
            url: "/products",
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});
