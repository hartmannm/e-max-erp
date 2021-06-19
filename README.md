# e-Max-ERP

Projeto desenvolvido para a disciplina de Arquitetura de Software, ministrada pelo professor [Kleiner Farias](https://kleinnerfarias.github.io/).

O projeto consiste em implementar casos de uso a partir das especificações de um projeto que vem sendo desenvolvido nas disciplinas da trilha de desenvolvimento de software. Os casos de uso implementados até o momento são:

* Login
* Logout
* Solicitação de alteração de senha
* Alteração de senha
* Cadastro de usuário
* Manutenção de companhia (CRUD)

## Como executar
1. Na raíz do projeto crie um arquivo com o nome `.env` e coloque as seguintes configurações:
  * Ajustar as configurações do banco conforme o seu banco de dados utilizado. A aplicação está utilizando o banco de dados MongoDB.

```
PORT=3000
PROFILE=development
DB_HOST=host do seu banco de dados
DB_PORT=porta do seu banco de dados
DB_USERNAME=usuário do banco de dados
DB_PASSWORD=senha do banco de dados
DB_NAME=e_max_erp
DB_POOLSIZE=quantidade de conexões do pool (não obrigatório)
SESSION_SECRET=9d8f4v6s5d4va98-s4dc89a4sd6c4ads984-4b84b6df54ad8s4
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu endereço do gmail
EMAIL_PASSWORD=sua senha do gmail
```

2. Execute o comando `npm install` para instalar as dependências do projeto
3. Execute o comando `npm start` para iniciar a aplicação ou `npm run watch` para executar em modo de "hot reload"
4. Para ser capaz de enviar emails, se sua conta do Google não estiver habilitada para aceso de apps não seguros, siga o passo 4 indicado [aqui](https://edigleyssonsilva.medium.com/how-to-send-emails-securely-using-gmail-and-nodejs-eef757525324)

## Banco de dados

A aplicação utiliza o [MongoDB](https://www.mongodb.com/) como banco de dados e o [Mongoose](https://mongoosejs.com/) como ORM.

Para inserir dados no banco copie o conteúdo do arquivo `data.js` que está na raíz do projeto e execute no console do MongoDB. Os dados irão inserir as roles de usuário, companhias e um usuário no banco de dados, a senha do usuário é `admin@123`.
