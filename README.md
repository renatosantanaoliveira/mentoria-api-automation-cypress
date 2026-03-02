# 🛒 Mentoria API Automation Cypress

> Projeto base para automação de testes de APIs REST com **Cypress** e **GitHub Copilot (IA)**, utilizado na mentoria de Qualidade de Software e Testes Automatizados para Backend.

---

## 🎯 Sobre o Projeto

Este repositório contém o framework de testes automatizados de API para o projeto de e-commerce da mentoria. Ele foi projetado para ser didático, progressivo e com as melhores práticas do mercado — utilizando as ferramentas mais modernas do ecossistema JavaScript.

A **API alvo** dos testes é o projeto [`mentoria-ecommerce`](https://github.com/renatosantanaoliveira/mentoria-ecommerce), uma API REST de e-commerce com autenticação JWT, gerenciamento de produtos, pedidos, usuários e muito mais.

---

## 🧰 Stack de Tecnologias

| Ferramenta | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^13.7.0 | Framework de testes E2E e API |
| [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api) | ^2.11.1 | Painel visual de requests (estilo Postman) |
| [@faker-js/faker](https://fakerjs.dev/) | ^8.4.1 | Geração de massa de dados dinâmica |
| [ajv](https://ajv.js.org/) | ^8.12.0 | Validação de JSON Schema (contrato de API) |
| [ESLint](https://eslint.org/) | ^8.57.0 | Padronização e qualidade do código |
| [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress) | ^2.15.2 | Regras específicas para Cypress |

---

## 📂 Estrutura do Projeto

```
mentoria-api-automation-cypress/
├── cypress/
│   ├── config/             # Configurações por ambiente
│   │   ├── dev.js          # Ambiente local (localhost:8000)
│   │   └── hml.js          # Ambiente de homologação
│   ├── e2e/                # Specs (arquivos de teste)
│   │   └── smoke.cy.js     # Smoke test de validação inicial
│   ├── fixtures/           # Massa de dados estática para testes
│   │   └── example.json
│   └── support/
│       ├── commands.js     # Custom Commands do Cypress
│       └── e2e.js          # Ponto de entrada do suporte global
├── .eslintrc.json          # Regras de qualidade de código
├── .gitignore
├── cypress.config.js       # Configuração principal do Cypress
├── ONBOARDING.md           # Guia de configuração do ambiente
├── package.json
└── setup.sh                # Script de setup automático do ambiente
```

---

## ✅ Pré-requisitos

Antes de iniciar, é necessário ter o projeto `mentoria-ecommerce` rodando localmente. Siga o guia de configuração completo:

📖 **[ONBOARDING.md](./ONBOARDING.md)**

---

## 🚀 Como Instalar

```bash
# 1. Clone o repositório
git clone https://github.com/renatosantanaoliveira/mentoria-api-automation-cypress.git
cd mentoria-api-automation-cypress

# 2. Instale as dependências
npm install
```

---

## ▶️ Como Executar os Testes

### Modo interativo (Interface Gráfica — recomendado para desenvolvimento)
```bash
npm run cypress:open
```

### Modo headless (linha de comando — ideal para CI/CD)
```bash
# Ambiente dev (padrão → localhost:8000)
npm run cypress:run

# Ambiente de homologação
npm run cypress:run:hml
```

---

## 🌍 Estratégia Multi-Ambiente

O projeto utiliza arquivos JavaScript separados por ambiente dentro de `cypress/config/`. A seleção do ambiente é feita via variável de ambiente `--env environment=<nome>`.

| Arquivo | Ambiente | URL Base |
|---|---|---|
| `cypress/config/dev.js` | `dev` (padrão) | `http://localhost:8000/api/v1` |
| `cypress/config/hml.js` | `hml` | `https://api.hml.mentoria-ecommerce.com/api/v1` |

---

## 🖼️ Visual de Execução (cypress-plugin-api)

Os testes utilizam o comando `cy.api()` em vez do `cy.request()` padrão. Isso ativa o painel visual de requests na interface do Cypress, exibindo de forma legível:

- **Método HTTP** e **URL** da requisição
- **Headers** enviados e recebidos
- **Body** do request e do response formatados
- **Status Code** e tempo de resposta

> 💡 Funciona de forma similar ao Postman, mas diretamente no Cypress!

---

## 📏 Qualidade de Código (ESLint)

O projeto possui ESLint configurado com regras específicas para Cypress. Para verificar o código:

```bash
# Verificar erros
npm run lint

# Corrigir erros automaticamente
npm run lint:fix
```

---

## 📚 Recursos de Aprendizado

- [Documentação oficial do Cypress](https://docs.cypress.io/)
- [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api)
- [Faker.js — geração de dados](https://fakerjs.dev/)
- [AJV — validação de JSON Schema](https://ajv.js.org/)
- [Documentação da API (Swagger)](http://localhost:8000/api-docs) *(necessita da API rodando localmente)*

---

## 👤 Autor

**Renato Santana de Oliveira**  
Mentoria de Qualidade de Software e Testes Automatizados
