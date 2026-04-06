import productsApi from '../api/productsApi';
import authApi from '../api/authApi';
import categoriesApi from '../api/categoriesApi';
import ordersApi from '../api/ordersApi';

// ─── Products ─────────────────────────────────────────────────────────────────

/**
 * Lista produtos com suporte a filtros via query string.
 * @example cy.productsApiList({ limit: 2, page: 1 })
 */
Cypress.Commands.add('productsApiList', (params = {}) => productsApi.list(params));

/**
 * Busca um produto pelo ID.
 * @example cy.productsApiGetById('abc123')
 */
Cypress.Commands.add('productsApiGetById', (id) => productsApi.getById(id));

// ─── Auth ──────────────────────────────────────────────────────────────────────

/**
 * Realiza o signup de um novo usuário.
 * @example cy.authApiSignup({ name, email, password, passwordConfirm })
 */
Cypress.Commands.add('authApiSignup', (payload) => authApi.signup(payload));

/**
 * Realiza o login e armazena o token em Cypress.env('token').
 * @example cy.authApiLogin('user@email.com', 'senha123')
 */
Cypress.Commands.add('authApiLogin', (email, password) => authApi.login(email, password));

// ─── Categories ────────────────────────────────────────────────────────────────

/**
 * Lista categorias com suporte a filtros via query string.
 * @example cy.categoriesApiList({ limit: 10 })
 */
Cypress.Commands.add('categoriesApiList', (params = {}) => categoriesApi.list(params));

/**
 * Busca uma categoria pelo ID.
 * @example cy.categoriesApiGetById('abc123')
 */
Cypress.Commands.add('categoriesApiGetById', (id) => categoriesApi.getById(id));

/**
 * Cria uma nova categoria. Requer token de admin/manager em Cypress.env('token').
 * @example cy.categoriesApiCreate({ name: 'Hardware' })
 */
Cypress.Commands.add('categoriesApiCreate', (body) => categoriesApi.create(body));

// ─── Orders ────────────────────────────────────────────────────────────────────

/**
 * Cria um novo pedido a partir de um carrinho.
 * @example cy.ordersApiCreate('cartId123', { street: 'Rua A', city: 'Cidade' })
 */
Cypress.Commands.add('ordersApiCreate', (cartId, shippingAddress) => ordersApi.create(cartId, shippingAddress));

// ─── Contract Validation ───────────────────────────────────────────────────────

import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

/**
 * Valida um objeto de dados contra um JSON Schema usando AJV.
 * Falha o teste com mensagem detalhada se a validação não passar.
 * @param {Object} schema - JSON Schema a ser utilizado na validação.
 * @param {Object} data - Dados a serem validados (ex: response.body).
 * @example cy.validateContract(categoriesSchema, response.body)
 */
Cypress.Commands.add('validateContract', (schema, data) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        const errors = ajv.errorsText(validate.errors, { separator: '\n  - ' });
        throw new Error(`Violação de contrato de schema:\n  - ${errors}`);
    }
});
