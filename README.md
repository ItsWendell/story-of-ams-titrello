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

For making the cards movable between lists, I've decided to keep it simple and just make the listId changeable for each card. To change the order of the lists, or the cards, both models have an 'order' property that can be changed using mutations. The project and list query properly orders the relationships for lists and cards.

I left it for the front-end to figure out how to properly mutate the order of the cards, or mutate the listId within a card.

## TODO

- Create update mutations for projects.
- Implement proper authentication and user relationships.
- Create queries with conditions.
- Write unit / integration tests.

## How I would personally build this API

In the recent few months I've been getting more and more familiar with Hasura. Hasura is tool that is able to create instant real-time GraphQL APIs based on a new, or existing postgres databases. It supports an advanced permissions column / row level permission system. Custom business logic can be added based on database events, or by adding custom queries and mutations through webhooks. It's also possible to add custom queries and mutations through external GraphQL servers by joining schemas.

I noticed using NestJS, even though the code is quite clean and manageable, you still have to write a lot of boilerplate code for simple CRUD operations. You can save a lot of time by not having to write a lot of the standard boilerplate required for getting CRUD working for entities in GraphQL by using solutions like Hasura or similar Headless API's or CMSses.

- [Hasura](https://hasura.io/opensource/)

## Conclusion

It was quite nice to work with NestJS and GraphQL, I spent about 6-8 hours working on this, figuring out the basics of working with GraphQL in NestJS on the first hour or two. I started with MongoDB / Typegoose but quickly realized that I'm more familiar with TypeORM and Postgres, so I later switched. I got stuck a little bit on trying handle the field resolvers, eventually solved this by adding listId and projectId next to the relationships in the respective models.

I enjoyed working on this and I hope we can find some time further discussing this test-case and the potential position at Story of AMS!

Kind Regards,
_Wendell Misiedjan_
