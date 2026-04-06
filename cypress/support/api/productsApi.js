/**
 * @class ProductsApi
 * @description API Object para o recurso de Produtos.
 * Abstrai todas as chamadas de rede relacionadas ao endpoint /api/v1/products.
 * Nenhuma asserção deve ser feita dentro desta classe.
 */
class ProductsApi {
    constructor() {
        /** @type {string} URL base do recurso de produtos. baseUrl já contém /api/v1. */
        this.url = '/products';
    }

    /**
     * Lista os produtos com suporte a filtros via query string.
     * @param {Object} [params={}] - Parâmetros de query string (ex: { limit: 2, page: 1 }).
     * @returns {Cypress.Chainable} Chainable do cy.api() para encadeamento nos testes.
     */
    list(params = {}) {
        return cy.api({
            method: 'GET',
            url: this.url,
            qs: params,
            failOnStatusCode: false,
        });
    }

    /**
     * Busca um produto pelo seu ID.
     * @param {string|number} id - Identificador único do produto.
     * @returns {Cypress.Chainable} Chainable do cy.api() para encadeamento nos testes.
     */
    getById(id) {
        return cy.api({
            method: 'GET',
            url: `${this.url}/${id}`,
            failOnStatusCode: false,
        });
    }
}

export default new ProductsApi();
