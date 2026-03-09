/**
 * @class CategoriesApi
 * @description API Object para o recurso de Categorias.
 * Abstrai todas as chamadas de rede relacionadas ao endpoint /categories.
 * Nenhuma asserção deve ser feita dentro desta classe.
 */
class CategoriesApi {
    constructor() {
        /** @type {string} URL base do recurso de categorias. baseUrl já contém /api/v1. */
        this.url = '/categories';
    }

    /**
     * Lista as categorias com suporte a filtros via query string.
     * @param {Object} [params={}] - Parâmetros de query string (ex: { limit: 10, page: 1 }).
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
     * Busca uma categoria pelo seu ID.
     * @param {string} id - Identificador único da categoria.
     * @returns {Cypress.Chainable} Chainable do cy.api() para encadeamento nos testes.
     */
    getById(id) {
        return cy.api({
            method: 'GET',
            url: `${this.url}/${id}`,
            failOnStatusCode: false,
        });
    }

    /**
     * Cria uma nova categoria. Requer autenticação com perfil admin ou manager.
     * @param {Object} body - Dados da categoria (ex: { name: 'Hardware' }).
     * @returns {Cypress.Chainable} Chainable do cy.api() para encadeamento nos testes.
     */
    create(body) {
        return cy.api({
            method: 'POST',
            url: this.url,
            body,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
            },
            failOnStatusCode: false,
        });
    }

    /**
     * Atualiza uma categoria existente. Requer autenticação com perfil admin ou manager.
     * @param {string} id - Identificador único da categoria.
     * @param {Object} body - Dados a atualizar.
     * @returns {Cypress.Chainable} Chainable do cy.api() para encadeamento nos testes.
     */
    update(id, body) {
        return cy.api({
            method: 'PUT',
            url: `${this.url}/${id}`,
            body,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
            },
            failOnStatusCode: false,
        });
    }

    /**
     * Remove uma categoria. Requer autenticação com perfil admin.
     * @param {string} id - Identificador único da categoria.
     * @returns {Cypress.Chainable} Chainable do cy.api() para encadeamento nos testes.
     */
    delete(id) {
        return cy.api({
            method: 'DELETE',
            url: `${this.url}/${id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
            },
            failOnStatusCode: false,
        });
    }
}

export default new CategoriesApi();
