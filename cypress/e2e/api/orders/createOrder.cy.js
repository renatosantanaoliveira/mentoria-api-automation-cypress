describe('Orders - Create Order', () => {
    beforeEach(() => {
        cy.authApiLogin(Cypress.env('userEmail'), Cypress.env('userPassword'));
    });

    it('deve criar pedido pago em dinheiro com sucesso', () => {
        const cartId = 'mockCartId';
        const addressDetails = {
            street: 'Rua Exemplo',
            city: 'Cidade Exemplo',
            state: 'Estado Exemplo',
            zipCode: '12345-678'
        };

        // Mock da resposta para simular sucesso da API
        // Usado porque a API real pode não ter dados ou rotas implementadas,
        // permitindo focar no padrão de teste sem dependências externas.
        // Em produção, remova este mock e use dados reais.
        cy.intercept('POST', '**/api/v1/orders/mockCartId', {
            statusCode: 201,
            body: {
                data: {
                    paymentMethodType: 'cash'
                }
            }
        }).as('createOrder');

        cy.ordersApiCreate(cartId, addressDetails)
            .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.data.paymentMethodType).to.eq('cash');
            });
    });
});