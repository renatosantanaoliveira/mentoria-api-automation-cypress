import productsApi from '../api/productsApi';
import authApi from '../api/authApi';
import categoriesApi from '../api/categoriesApi';

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
