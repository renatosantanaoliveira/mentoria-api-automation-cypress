import { faker } from '@faker-js/faker';
import categoriesSchema from '../../../support/schemas/categories.json';

describe('Contrato de API - GET /api/v1/categories/', () => {
    before(() => {
        cy.authApiLogin(Cypress.env('userEmail'), Cypress.env('userPassword'));
        cy.categoriesApiCreate({ name: `${faker.commerce.department()} ${Date.now()}` });
    });

    it('deve respeitar o schema definido para a listagem de categorias', () => {
        cy.categoriesApiList().then((response) => {
            expect(response.status).to.eq(200);
            cy.validateContract(categoriesSchema, response.body);
        });
    });
});
