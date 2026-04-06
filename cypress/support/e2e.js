// Importa os custom commands do projeto
import './commands';
import './commands/apiCommands';

// Importa o cypress-plugin-api para habilitar o comando cy.api()
// e o painel visual de requests (estilo Postman) na interface do Cypress
import 'cypress-plugin-api';