# Story of AMS - Back-end Challange

Here's my solution to the back-end challange for **Story of AMS**, an trello-like GraphQL API for a project management application based on given design.

## Requirements

- Use NestJS together with GraphQL
- Connect the database and create schemas / models
- Tile management (Creating, Retreiving, Updating and Deleting)
- Make the titles moveable between phases
- Authentication on the create, update and delete mutations

## Getting Started.

Make sure node / npm, docker and docker-compose are installed.

1. Install node modules: `npm install`
2. Copy .env.example to .env: `cp .env.example .env`
3. Start database service: `docker-compose up`
4. Start dev environment: `npm run start:dev`
5. Visit the Playground at [http://localhost:3000/graphql](http://localhost:3000/graphql) to play with the API and see the documentation.

## Authentication

I kept the authentication super simple for now, the update, create, delete mutations are protected with a custom auth gaurd (Which is located in the main src folder), which expects an 'authentication' header with a specific value, which can be configured in the .env file. Normally if I had a little bit more time I would implement authentication with PassportJS with JWT tokens.

I assumed the core of this exercise was creating the basic API for tiles, so I cut some corners here.

You can add the 'authentication' header with the default value 'secret' to the GraphQL Playground to access the Update, Delete, Create actions.

## Implementation

I've decided to go with a code-first approach, letting NestJS GraphQL module generate the schema MDL for us. This has the advantage of the schema always be in sync.

For the implementation I've choosen to create 3 models.

1. Projects - The 'project' that hosts the phases.
2. Lists - The 'phases' related to a project.
3. Cards - The 'tasks' connected to a list / 'phase'.

For making the cards movable between lists, I've decided to keep it simple and just make the listId changeable for each card. To change the order of the lists, or the cards, both models have an 'order' property that can be changed using mutations.

## How I would personally build this API

In the recent few months I've been getting more and more familiar with Hasura. Hasura is tool that is able to create instantly an real-time GraphQL API based on a new, or existing postgres database. It supports an advanced permissions column / row level permission system and custom business logic based on events or adding custom queries or mutation is supported through webhooks or joining custom GraphQL servers.

You save a lot of time by not having to write a lot of the standard boilerplate required for getting CRUD working for entities in GraphQL, definitly worth looking into.

- [Hasura](https://hasura.io/opensource/)
