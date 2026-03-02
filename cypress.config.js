const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL base da API. Sobrescrita automaticamente pelo arquivo de configuração do ambiente.
    // Exemplo de uso nos testes: cy.request('/users') -> chama baseUrl + /users
    baseUrl: "http://localhost:8000/api/v1",

    video: true,
    screenshotOnRunFailure: true,

    env: {
      // Define o ambiente padrão a ser carregado (dev | hml)
      // Para rodar em hml: cypress run --env environment=hml
      environment: "dev",

      // Habilita o painel visual de requests do cypress-plugin-api
      requestMode: true,
    },

    setupNodeEvents(on, config) {
      // Carrega as configurações do arquivo de ambiente selecionado.
      // Os arquivos ficam em: cypress/config/<ambiente>.js
      const environment = config.env.environment || "dev";
      const environmentConfig = require(`./cypress/config/${environment}.js`);

      // Mescla as variáveis do arquivo de ambiente com as envs do Cypress
      config.env = { ...config.env, ...environmentConfig };

      // Atualiza a baseUrl conforme definida no arquivo de ambiente
      if (environmentConfig.baseUrl) {
        config.baseUrl = environmentConfig.baseUrl;
      }

      return config;
    },
  },
});
