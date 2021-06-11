# e-max-erp

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
4. Para ser capaz de enviar, se sua conta do Google não estiver habilitada para aceso de apps não seguros, siga o passo 4 indicado [aqui](https://edigleyssonsilva.medium.com/how-to-send-emails-securely-using-gmail-and-nodejs-eef757525324)
