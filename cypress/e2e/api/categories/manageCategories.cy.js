describe('Gestão de Inventário - Categorias', () => {
    before(() => {
        cy.authApiLogin(
            Cypress.env('userEmail'),
            Cypress.env('userPassword')
        );
    });

    it('deve criar uma categoria e validar sua persistência via GET', () => {
        const categoriaDescricao = 'Hardware Premium';

        cy.categoriesApiCreate({ name: categoriaDescricao }).then((resPost) => {
            expect(resPost.status).to.eq(201);
            expect(resPost.body.data).to.have.property('_id');
            expect(resPost.body.data.name).to.eq(categoriaDescricao);

            const categoryId = resPost.body.data._id;

            cy.categoriesApiGetById(categoryId).then((resGet) => {
                expect(resGet.status).to.eq(200);
                expect(resGet.body.data.name).to.eq(categoriaDescricao);
                expect(resGet.body.data._id).to.eq(categoryId);
            });
        });
    });

    it('deve retornar erro ao criar categoria sem autenticação', () => {
        Cypress.env('token', 'token_invalido');

        cy.categoriesApiCreate({ name: 'Categoria Sem Auth' }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});
