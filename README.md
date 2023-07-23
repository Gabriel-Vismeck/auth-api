# Auth API

[![Node.js](https://img.shields.io/badge/Node.js-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-darkgreen)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?)](https://jwt.io/)
[![Express.js](https://img.shields.io/badge/Express.js-white)](https://expressjs.com/)

Bem-vindo a Auth API!
Este é um projeto feito para estudo, entendimento e aplicação de APIs RESTful com NodeJS e Express.js e MongoDB. 
E aqui estão algumas informações importantes sobre o projeto, suas funcionalidades e objetivos.

## 💻 Introdução

A Auth API é uma aplicação back-end que oferece serviços para registro e autenticação de usuários. Através desta API, os usuários podem se cadastrar, fazer login e acessar informações de perfil protegidas por autenticação.

## 🛠️ Tecnologias Utilizadas

A Auth API foi desenvolvida utilizando as seguintes tecnologias:

- Node.js: Plataforma utilizada para executar o código JavaScript do servidor.
- Express.js: Framework utilizado para criar e gerenciar rotas e middlewares.
- MongoDB: Sistema de gerenciamento de banco de dados NoSQL utilizado para armazenar os dados dos usuários.
- Mongoose: Biblioteca de modelagem de objetos MongoDB utilizada para criar e interagir com os modelos de dados.
- bcrypt: Biblioteca utilizada para realizar o hash das senhas dos usuários.
- jsonwebtoken: Biblioteca utilizada para geração e verificação de tokens JWT (JSON Web Tokens).
- dotenv: Biblioteca utilizada para carregar variáveis de ambiente a partir de um arquivo `.env`.

## ⚙ Configuração

Antes de executar a Auth API, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js: Baixe em: https://nodejs.org/.
- MongoDB: Instale em sua máquina ou tenha acesso a um servidor MongoDB remoto: https://www.mongodb.com/pt-br.
- Editor de código: Recomendamos o uso de um editor como Visual Studio Code, Sublime Text ou Atom.

## 🔧 Configuração do Banco de Dados

A Auth API utiliza o MongoDB como sistema de gerenciamento de banco de dados. Siga as etapas abaixo para configurar o banco de dados em sua máquina:

1. Crie um banco de dados no MongoDB para a Auth API.
2. No arquivo `.env`, substitua o valor da variável `DB_USER` pelo nome do usuário do banco de dados, e o valor da variável `DB_PASS` pela senha do usuário.

## 🚀 Executando a Auth API

Após configurar o banco de dados, siga as etapas abaixo para executar a Auth API:

1. Clone este repositório para o seu ambiente local.
2. Abra o terminal e navegue até a pasta raiz do projeto.
3. Execute o comando `npm install` para instalar todas as dependências listadas no arquivo `package.json`.
4. Execute o comando `npm start` para iniciar o servidor. O servidor será executado na porta 3000.
5. Acesse a API em seu navegador ou através de ferramentas como Postman utilizando o endereço `http://localhost:3000`.

## 📄 Endpoints

A Auth API oferece os seguintes endpoints para interação:

1. `GET /`: Rota pública de boas-vindas, que retorna uma mensagem de saudação.

2. `POST /auth/register`: Rota para registrar um novo usuário na plataforma. É necessário enviar um corpo de requisição contendo os campos `name`, `email`, `password` e `confirmpassword`. O usuário será criado e armazenado no banco de dados, e a senha será criptografada antes de ser armazenada.

3. `POST /auth/login`: Rota para autenticar um usuário existente. É necessário enviar um corpo de requisição contendo os campos `email` e `password`. A API verificará se o usuário existe no banco de dados e se a senha fornecida é válida. Em caso de sucesso, a API retornará um token JWT válido que pode ser usado para acessar rotas protegidas.

4. `GET /user/:id`: Rota protegida que permite acessar as informações de perfil de um usuário autenticado. É necessário fornecer o token JWT obtido após o login no cabeçalho da requisição, na forma "Authorization: Bearer <seu_token>". O ID do usuário desejado deve ser passado na URL. A API verificará a autenticidade do token antes de retornar os dados do usuário.
#
> "O verdadeiro conhecimento é aquele que permite ação." - *Albert Einstein*
