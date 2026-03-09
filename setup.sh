#!/usr/bin/env bash

# Encerra o script se algum comando fundamental falhar
set -e

echo "====================================================="
echo " Iniciando o setup do projeto E-Commerce RESTFul API "
echo "====================================================="
echo ""

# 0. Verificações de dependências básicas
command -v git >/dev/null 2>&1 || { echo >&2 "❌ Erro: O 'git' não está instalado na máquina. Instale e tente novamente."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "⚠️ Aviso: O 'npm' (Node.js) não está instalado. Você precisará instalá-lo para rodar a aplicação."; }

# 1. Clonar o repositório
REPO_DIR="mentoria-ecommerce"
if [ -d "$REPO_DIR" ]; then
    echo "⚠️ A pasta '$REPO_DIR' já existe. Pulando a etapa de clone."
    cd "$REPO_DIR"
else
    echo "📦 Clonando o repositório do GitHub..."
    git clone https://github.com/alin00r/Node.js-Full-E-Commerce-RESTFul-Api-with-Payment.git "$REPO_DIR"
    cd "$REPO_DIR" || exit
    echo "✅ Repositório clonado com sucesso."
fi

# 2. Criar o arquivo de configuração config.env
if [ -f config.env ]; then
    echo "⚠️ O arquivo 'config.env' já existe. Pulando a criação para não sobrescrever."
else
    echo "⚙️ Criando o arquivo de configuração config.env..."
    cat <<EOL > config.env
# Arquivo de variáveis de ambiente para a aplicação

# Porta do servidor
PORT=8000

# URI do Banco de Dados MongoDB
DB_URI=mongodb://localhost:27017/ecommerce-api

# Ambiente
NODE_ENV=development

# Chave secreta para JWT (JSON Web Token)
JWT_SECRET_KEY=sua-chave-super-secreta
JWT_EXPIRE_TIME=30d
JWT_COOKIE_EXPIRES_IN=30

# Configuração de E-mail (ex: Mailtrap para desenvolvimento)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=seu_usuario_mailtrap
EMAIL_PASS=sua_senha_mailtrap
EMAIL_FROM=seuemail@exemplo.com

# Chaves da API do Stripe
STRIPE_API_KEY=sua_chave_api_stripe
STRIPE_WEBHOOK_SECRET=sua_chave_webhook_secret_stripe
EOL
    echo "✅ Arquivo config.env criado com sucesso."
fi

# 3. Subir o MongoDB via Docker
echo ""
echo "🐳 Configurando o banco de dados MongoDB via Docker..."

if command -v docker >/dev/null 2>&1; then
    # Verifica se o Docker daemon está rodando
    if docker info >/dev/null 2>&1; then
        # Verifica se já existe um container com esse nome
        if [ "$(docker ps -aq -f name=mongodb-ecommerce)" ]; then
            echo "⚠️ O container 'mongodb-ecommerce' já existe."
            # Verifica se o container não está em execução
            if [ ! "$(docker ps -q -f name=mongodb-ecommerce)" ]; then
                echo "🔄 Iniciando o container existente..."
                docker start mongodb-ecommerce
            else
                echo "✅ O container já está em execução."
            fi
        else
            echo "🚀 Baixando a imagem (se necessário) e iniciando o container do MongoDB..."
            docker run -d -p 27017:27017 --name mongodb-ecommerce mongo
            echo "✅ Banco de dados MongoDB rodando na porta 27017."
        fi
    else
        echo "⚠️ O Docker está instalado na sua máquina, mas o Docker Desktop (daemon) parece estar fechado."
        echo "   👉 Recomendação: Abra o Docker Desktop e depois inicie o container manualmente com:"
        echo "      docker run -d -p 27017:27017 --name mongodb-ecommerce mongo"
    fi
else
    echo "⚠️ O Docker não foi encontrado na sua máquina."
    echo "   👉 Você precisará instalar o MongoDB localmente ou usar um cluster no MongoDB Atlas para continuar."
fi

# 4. Instalar as dependências e tentar rodar as seeds
echo ""
echo "🔧 Instalando dependências (npm install)..."
if command -v npm >/dev/null 2>&1; then
    # Desativamos o 'set -e' temporariamente, caso o npm install retorne algum erro não grave
    set +e
    npm install
    
    echo ""
    echo "🌱 Injetando dados iniciais no banco (seeder)..."
    (cd utils/dummyData && node seeder.js -i)
    set -e
else
    echo "⚠️ Pulando a instalação de dependências pois o comando 'npm' não foi encontrado."
fi

echo ""
echo "🎉 Setup finalizado com sucesso! 🎉"
echo "--------------------------------------------------------"
echo "⚠️ ATENÇÃO: Caso precise, atualize o 'config.env' preenchendo as chaves do Stripe, JWT ou Mailtrap."
echo ""
echo "Para testar se tudo deu certo, rode os comandos abaixo:"
echo ""
echo "  1. Entre na pasta: cd $REPO_DIR"
echo "  2. Inicie a API:   npm run start:dev"
echo ""
echo "Acesse no navegador ou Postman: http://localhost:8000"
echo "--------------------------------------------------------"