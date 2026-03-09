describe('Autenticação - Login', () => {
    it('deve realizar login com sucesso e armazenar o token', () => {
        const email = Cypress.env('userEmail');
        const password = Cypress.env('userPassword');

        cy.authApiLogin(email, password).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('success');
            expect(response.body.token).to.be.a('string').and.not.be.empty;
            expect(Cypress.env('token')).to.eq(response.body.token);
        });
    });

    it('deve retornar erro ao realizar login com credenciais inválidas', () => {
        cy.authApiLogin('invalido@email.com', 'senhaerrada').then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});
