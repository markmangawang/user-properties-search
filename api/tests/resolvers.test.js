import { exec } from 'child_process';
import resolvers from '../server/resolvers';
import models from '../models';

describe('Test resolvers', () => {
  beforeAll(async (done) => {
    await new Promise(async (resolve, reject) => {
      const migrate = exec(
        'sequelize db:migrate',
        { env: process.env },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );

      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });

    await models.User.create({
      firstName: 'John',
      lastName: 'Doe',
    });

    await models.User.create({
      firstName: 'Johnny',
      lastName: 'Dee',
    });

    await models.User.create({
      firstName: 'Jane',
      lastName: 'Adams',
    });

    await models.Property.create({
      userId: 1,
      street: 'Groove Street',
      city: 'Tokyo',
      state: 'Tokyo',
      zip: '1235',
      rent: 100,
    });

    await models.Property.create({
      userId: 1,
      street: '2nd Groove Street',
      city: 'Tokyo',
      state: 'Tokyo',
      zip: '4567',
      rent: 100,
    });

    await models.Property.create({
      userId: 2,
      street: '3rd Street',
      city: 'San Francisco',
      state: 'California',
      zip: '8000',
      rent: 100,
    });

    await models.Property.create({
      userId: 3,
      street: '4th Street',
      city: 'Davao City',
      state: 'Davao del Sur',
      zip: '8000',
      rent: 100,
    });

    done();
  });

  afterAll(async (done) => {
    await new Promise(async (resolve, reject) => {
      const migrate = exec(
        'sequelize db:migrate:undo:all',
        { env: process.env },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );

      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });

    done();
  });

  test('query: search should return empty list if nothing found', async () => {
    const args = {
      query: 'Nothing',
    };

    const context = {
      models,
    };

    const result = await resolvers.Query.search(null, args, context);

    expect(result.length).toEqual(0);
  });

  test('query: search should return list if query matched', async () => {
    const args = {
      query: 'san',
    };

    const context = {
      models,
    };

    const result = await resolvers.Query.search(null, args, context);

    expect(result.length).toEqual(1);
    expect(result[0].city).toEqual('San Francisco');
    expect(result[0].user.firstName).toEqual('Johnny');
  });

  test('query: search should return list if query matched in user\'s name', async () => {
    const args = {
      query: 'john',
    };

    const context = {
      models,
    };

    const results = await resolvers.Query.search(null, args, context);

    expect(results.length).toEqual(3);

    for (let i = 0; i < results.length; i += 1) {
      expect(results[i].user.firstName.toLowerCase()).toEqual(expect.stringContaining('john'));
    }
  });

  test('query: search should limit list to page and pageSize', async () => {
    const args = {
      query: 'john',
      page: 1,
      pageSize: 2,
    };

    const context = {
      models,
    };

    let results = await resolvers.Query.search(null, args, context);

    expect(results.length).toEqual(2);

    args.page = 2;

    results = await resolvers.Query.search(null, args, context);

    expect(results.length).toEqual(1);
  });
});
