# user-properties-search
This is a Onerent coding challenge.

## Running the server
Go to `/api` directory and install dependencies.
```bash
$ cd /api
$ npm install
```

Create .env
```
DB_DEV_USERNAME=<yourdbusername>
DB_DEV_PASSWORD=<yourdbpassword>
```

Create two postgres database named `user_properties_dev_db` for local db and `user_properties_test_db` for test db.

Run the database migration:
```bash
$ npm run db db:migrate
```

Run seed to populate database with sample data:
```bash
$ npm run db db:seed:all
```

Run app:
```bash
$ npm run dev
```

Go to localhost:4000 to play with the graphql API.

Run tests:
```bash
$ npm run test
```
## Running the webapp
On a separate terminal, go to `/webapp` directory and install the dependencies.

```bash
$ cd /webapp
$ npm install
```

Run react app:
```bash
$ npm start
```

Run tests:
```bash
$ npm test
```
