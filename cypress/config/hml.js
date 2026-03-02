/**
 * Configurações do ambiente de HOMOLOGAÇÃO (hml)
 * Aponta para a API do ecommerce no ambiente de staging.
 * Para rodar: npm run cypress:run:hml
 */
module.exports = {
    baseUrl: "https://api.hml.mentoria-ecommerce.com/api/v1",
    environment: "hml",
};
