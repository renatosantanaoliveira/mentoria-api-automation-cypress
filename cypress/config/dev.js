/**
 * Configurações do ambiente de DESENVOLVIMENTO (dev)
 * Aponta para a API do ecommerce rodando localmente.
 * Para rodar: npm run cypress:run (padrão)
 */
module.exports = {
    baseUrl: "http://localhost:8000/api/v1",
    environment: "dev",
    // Credenciais para testes de autenticação no ambiente de dev
    userEmail: "admin@mentoria.com",
    userPassword: "Admin@123",
};
