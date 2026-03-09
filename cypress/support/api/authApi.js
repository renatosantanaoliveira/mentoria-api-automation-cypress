/**
 * @class AuthApi
 * @description API Object para o recurso de Autenticação.
 * Abstrai todas as chamadas de rede relacionadas ao endpoint /api/v1/auth.
 * Nenhuma asserção deve ser feita dentro desta classe.
 */
class AuthApi {
    constructor() {
        /** @type {string} URL base do recurso de autenticação. baseUrl já contém /api/v1. */
        this.url = '/auth';
    }

    /**
     * Cadastra um novo usuário na plataforma.
     * @param {Object} payload - Dados do usuário: { name, email, password, passwordConfirm }.
     * @returns {Cypress.Chainable} Chainable com o response para encadeamento nos testes.
     */
    signup(payload) {
        return cy.api({
            method: 'POST',
            url: `${this.url}/signup`,
            body: payload,
            failOnStatusCode: false,
        });
    }

    /**
     * Realiza o login de um usuário e armazena o token em Cypress.env caso o login seja bem-sucedido.
     * @param {string} email - E-mail do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Cypress.Chainable} Chainable com o response para encadeamento nos testes.
     */
    login(email, password) {
        return cy
            .api({
                method: 'POST',
                url: `${this.url}/login`,
                body: { email, password },
                failOnStatusCode: false,
            })
            .then((response) => {
                // A API retorna { status: 'success', token: '...' } no body com HTTP 200
                if (response.status === 200 && response.body.status === 'success' && response.body.token) {
                    Cypress.env('token', response.body.token);
                }

                return response;
            });
    }
}

export default new AuthApi();
