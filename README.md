# NEST Pokedex

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Tech Stack Used
* Nest
* MongoDB
* Docker

## How to run this
1. Clone the repo

2. Exec with ```yarn install```

3. You must need already have CLI installed: ```npm i -g @nestjs/cli```

4. Up Database with ```docker-compose up-d```

5. If you want to load data into the database, you will need to use the [Seed Endpoint](#seed-endpoint)

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


---


# Endpoints
```
{{API_URL}} = http://localhost:{your_port}/api/v1/
```
---
## Pokemon Endpoint
### Get Pokemons

as GET method:
```javascript
{{API_URL}}/pokemon/
```

### Get Pokemon by name, no. or id

as GET method:
```javascript
{{API_URL}}/pokemon/{id, name, no}

//by id
{{API_URL}}/pokemon/630a7942816c4d85e01b5ad6

//by name
{{API_URL}}/pokemon/bulbasur

//by no.
{{API_URL}}/pokemon/1
```

### Add Pokemon

as POST method:
```javascript
{{API_URL}}/pokemon/

//data
{
  "no": 1,            //number, required
  "name": "bulbasur" //string, required
}
```

### Update Pokemon

as PATCH method:
```javascript
{{API_URL}}/pokemon/{id, name, no}

//url to update
{{API_URL}}/pokemon/630a7942816c4d85e01b5ad6
//data
{
  "no": 1,                    //number, optional
  "name": "new pokemon name"  //string, optional, force to lowercase
}
```

### Delete Pokemon

as DELETE method:
```javascript
{{API_URL}}/pokemon/id

//Id must be valid mongo id
{{API_URL}}/pokemon/630a7942816c4d85e01b5ad6
```

---
## Seed Endpoint

This endpoint is used for fetching pokemons from PokeApi and insert them into the database.

as GET method:
```javascript
{{API_URL}}/seed/
```