# LAMA - Labenu Music Awards

### Descrição
- API para um festival de música
- Principais funcionalidades: cadastrar/visualizar informações de usuários, bandas e shows. 

### Como usar

- Cadastrar novo usuário: usar o endpoint signup. Passanod via body as seguintes informações: name, email, password e role. Para role temos duas opções: ADMIN ou NORMAL. Automaticamente, também, já realizado login, após o cadastro.

- Login: usar o endpoint login. Passando via body as seguintes informações: email, password.

- Cadastrar nova banda: usar o endpoint createBand. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de cadastrar nova banda, colocando o token, no campo de Headers - Authorization, e passando no campo Body, as seguintes informações:  name, music_genre, responsible. Somente usuários ADMIN podem cadastrar uma nova banda. 

- Pegar detalhes de uma banda: user o endpoint getBandByIdOrName. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de pegar detalhes da banda, colocando o token, no campo de Headers - Authorization, e passando no campo Body, as seguintes informações: 'name' ou 'id'. 

- Cadastrar um novo show: usar o enpoint createShow. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de cadastrar nova banda, colocando o token, no campo de Headers - Authorization, e passando no campo Body, as seguintes informações:  band_id, week_day, start_time, end_time. Para week_day temos tês opções: SEXTA, SÁBADO ou DOMINGO. Somente usuários ADMIN podem cadastrar uma nova banda. 

- Pegar todos os shows de uma data: usar o endpoint getShowByDay. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de visualizar shows de uma data específica, colocando o token, no campo de Headers - Authorization, e passando no campo Body, as seguintes informações: weekDay. Para weekDay temos tês opções: SEXTA, SÁBADO ou DOMINGO.

* Para mais informações, sobre como usar essa API, consultar a documentação no Postaman, pois nela, tem exemplos de como usar cada enpoint.


### Tecnologias utulizadas:
- Typescript
- Node.js
- Dotenv
- Express
- Cors
- MySQL
- Knex
- UUID
- Jsonwebtoken
- Bcryptjs
- Jest

### Documentação do Postaman
https://documenter.getpostman.com/view/18386394/UVsSNPVq

### Documentação do Heroku
https://projectlamacarver.herokuapp.com

### Nome do integrantes
- Igor Eiiji
- Soraia Aparecida

