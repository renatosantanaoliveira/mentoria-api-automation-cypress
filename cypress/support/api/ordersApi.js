/**
 * @class OrdersApi
 * @description API Object para o recurso de Orders.
 * Abstrai todas as chamadas de rede relacionadas ao endpoint /api/v1/orders.
 * Nenhuma asserção deve ser feita dentro desta classe.
 */
class OrdersApi {
    constructor() {
        /** @type {string} URL base do recurso de orders. baseUrl já contém /api/v1. */
        this.url = '/orders';
    }

    /**
     * Cria um novo pedido a partir de um carrinho.
     * @param {string} cartId - ID do carrinho.
     * @param {Object} shippingAddress - Endereço de entrega.
     * @returns {Cypress.Chainable} Chainable com o response para encadeamento nos testes.
     */
    create(cartId, shippingAddress) {
        return cy.api({
            method: 'POST',
            url: `${this.url}/${cartId}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            },
            body: { shippingAddress },
            failOnStatusCode: false,
        });
    }
}

export default new OrdersApi();