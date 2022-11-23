Olá! 
Esse projeto foi desenvolvido por Carolina Valdrighi para a empresa NG.CASH.
Para roda-lo, siga as instruções:

### SERVER SIDE ###
# `cd server`

* instalar dependencias
# `npm i`

* subir docker
# `docker-compose up`

* criar arquivo .env (seguir .env-example)

* sincronizar ORM com o BD
# `npx prisma db push`

* acessar ORM GUI para visualizar BD
# `npx prisma studio`

* subir aplicação
# `npm run start`


### CLIENT SIDE ###
# `cd client`

* instalar dependencias
# `npm i`

* subir aplicação
# `npm run start`


### OBSERVAÇÕES ###
* realizar pelo menos dois cadastros para que possa haver transferencias entre os respectivos.
* consulte o BD para verificar o username das outras contas caso esqueça quando for realizar uma transferência.
