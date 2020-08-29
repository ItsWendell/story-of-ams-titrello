require("dotenv").config();

console.log('DATABASE URL', process.env.DATABASE_URL);
module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.model.js'],
    migrations: ['dist/src/database/migrations/*.js'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };