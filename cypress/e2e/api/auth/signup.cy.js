describe('Autenticação - Signup', () => {
    it('deve cadastrar um novo perfil com sucesso', () => {
        const payload = {
            name: 'Perfil de Teste',
            email: `teste.${Date.now()}@mentoria.com`,
            password: 'senhaforte123',
            passwordConfirm: 'senhaforte123',
        };

        cy.authApiSignup(payload).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.status).to.eq('success');
            expect(response.body.token).to.be.a('string').and.not.be.empty;
        });
    });

    it('deve retornar erro ao cadastrar com email já existente', () => {
        const payload = {
            name: 'Perfil Duplicado',
            email: Cypress.env('userEmail'),
            password: 'senhaforte123',
            passwordConfirm: 'senhaforte123',
        };

        cy.authApiSignup(payload).then((response) => {
            expect(response.status).to.eq(400);
        });
    });
});
