# Guia de Onboarding: Automação de APIs REST (Cypress + IA)

Bem-vindo(a) à nossa Mentoria! Este diretório contém o kit oficial para iniciar o projeto base E-Commerce que servirá de alvo para os nossos testes automatizados. 

Revisamos e simplificamos todo o processo de setup para que você possa focar no que importa: **Testar a API**.

---

## 🛠️ Pré-requisitos

Antes de iniciar, garanta que sua máquina tenha as três ferramentas fundamentais:
1. **[Node.js](https://nodejs.org/)** (versão 14 ou superior)
2. **[Git](https://git-scm.com/)** (Para usuários de Windows, as ações de terminal abaixo deverão ser feitas no **Git Bash**).
3. **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** rodando na sua máquina (ícone visível na bandeja do sistema).

---

## 🚀 Passo 1: O Setup Automático Mágico (Recomendado)

Longe dos tutoriais intermináveis, criamos um script para deixar sua API no ponto em 1 minuto.

Abra o seu terminal (no Windows, **Git Bash**) na pasta deste guia e execute o script de automação:

```bash
./setup.sh
```

**O que este script resolve por você:**
✅ Clona o repositório fonte da API e entra na pasta correta (`mentoria-ecommerce`).
✅ Verifica e sobe um Banco de Dados MongoDB novinho no contêiner do seu Docker local.
✅ Cria seu arquivo oculto (`config.env`) que armazena as chaves e rotas da API.
✅ Instala silenciosamente todas as bibliotecas necessárias (`npm install`).
✅ (Bônus) Alimenta o banco inicial com produtos / dados dummy rodando o seeder da aplicação, para você não começar num banco vazio!

*(Caso caia a internet ou falhe algum passo, apenas analise o erro vermelho, arrume, e rode o `./setup.sh` novamente. Ele foi feito para não quebrar reinstalando).*

---

## ▶️ Passo 2: Rodando a Aplicação

Se a mágica funcionou perfeitamente e apareceu o aviso de *Setup finalizado!*, basta dar a partida no motor:

1. No terminal, entre na nova pasta do código do projeto gerada pelo script:
   ```bash
   cd mentoria-ecommerce
   ```
2. Inicie o servidor em modo de desenvolvimento contínuo (Assistindo alterações):
   ```bash
   npm run start:dev
   ```

Você deverá ver no console algo parecido com: `App running on port 8000` e `Database Connected Successfully`.

---

## ⚙️ Passo 3: Conhecendo seu *config.env*

Dentro da pasta `mentoria-ecommerce`, você verá que um arquivo `config.env` nasceu sozinho. Ele é crucial para a API funcionar. Espie o conteúdo dele:

```ini
PORT=8000
DB_URI=mongodb://localhost:27017/ecommerce-api
NODE_ENV=development
JWT_SECRET_KEY=sua-chave-super-secreta
JWT_EXPIRE_TIME=30d
JWT_COOKIE_EXPIRES_IN=30
EMAIL_USER=seu_usuario_mailtrap # Opcional agora (Substituir pela conta real quando precisar)
EMAIL_PASS=sua_senha_mailtrap # Opcional agora 
```
> **Nota de Testes:** Durante a mentoria de Integração com Cypress e IA, quando chegarmos nas aulas de simular pagamentos reais ou recuperar senhas via e-mail, é neste arquivo que nós vamos colar nossas *Keys* fresquinhas criadas no Mailtrap ou Stripe.

---

## 👑 Passo 4: Promover um Administrador (Pós-instalação e Autenticação)

Algumas rotas da API (como a de deletar Categorias ou adicionar chaves financeiras) exigirão que o `role` (papel) do usuário atual seja `admin`.

**Como conseguir seus poderes de Admin rapidamente?**

1. **Crie a conta via API (Use Postman, Insomnia ou o próprio Cypress)**:
   - Requisição: **`POST`** `http://localhost:8000/api/v1/auth/signup`
   - Corpo (JSON):
     ```json
     {
       "name": "Admin da Mentoria",
       "email": "admin@mentoria.com",
       "password": "senhaforte123",
       "passwordConfirm": "senhaforte123"
     }
     ```

2. **Use o banco para promover essa conta cadastrada:**
   Deixe a API rodando e abra um **novo terminal** na sua máquina para invadir gentilmente o container do seu Mongo:
   ```bash
   docker exec -it mongodb-ecommerce mongosh
   ```
   Lá dentro (o painel de comando vai mudar p/ o mongosh), digite estes 3 passos sequencialmente e dê "Enter" após cada um:
   ```javascript
   use ecommerce-api
   
   db.users.updateOne( { "email": "admin@mentoria.com" }, { $set: { "role": "admin" } } )
   
   exit
   ```

3. **Pronto! Prove seu valor e pegue seu Token:**
   - Requisição: **`POST`** `http://localhost:8000/api/v1/auth/login` (enviando `email` e `password`)
   - Você receberá um `token` enorme contendo suas credenciais de superusuário! Basta colar ele nas requisições da plataforma.

---

## 📚 Documentação (Swagger)

A API vem com a interface de documentação inteira pronta.
Para ler as rotas, os `Payloads` (Corpos de Envios) permitidos, métodos REST disponíveis, visite o painel: 

👉 **[http://localhost:8000/api-docs](http://localhost:8000/api-docs)**

Te vejo na primeira aula de mentoria com tudo rodando! 🚀