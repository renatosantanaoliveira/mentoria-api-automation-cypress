describe('Gestão de Produtos', () => {
    it('deve listar produtos com paginação e retornar 2 itens', () => {
        cy.productsApiList({ limit: 2, page: 1 }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.length(2);
        });
    });
});
