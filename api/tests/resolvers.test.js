import { exec } from 'child_process';
import resolvers from '../server/resolvers';
import models from '../models';

describe('Test resolvers', () => {
  beforeEach(async (done) => {
    await new Promise(async (resolve, reject) => {
      const migrate = exec(
        'sequelize db:migrate',
        {env: process.env},
        (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );

      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });

    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        firstName: 'Johnny',
        lastName: 'Dee'
      },
      {
        firstName: 'Jane',
        lastName: 'Adams',
      },
    ];

    for(let user of users) {
      await models.User.create({
        ...user,
      });
    }

    const properties = [
      {
        userId: 1,
        street: 'Groove Street',
        city: 'Tokyo',
        state: 'Tokyo',
        zip: '1235',
        rent: 100,
      },
      {
        userId: 1,
        street: '2nd Groove Street',
        city: 'Tokyo',
        state: 'Tokyo',
        zip: '4567',
        rent: 100,
      },
      {
        userId: 2,
        street: '3rd Street',
        city: 'San Francisco',
        state: 'California',
        zip: '8000',
        rent: 100,
      },
      {
        userId: 3,
        street: '4th Street',
        city: 'Davao City',
        state: 'Davao del Sur',
        zip: '8000',
        rent: 100,
      },
    ];

    for(let property of properties) {
      await models.Property.create({
        ...property,
      });
    }

    done();
  });

  afterEach(async (done) => {
    await new Promise(async (resolve, reject) => {
      const migrate = exec(
        'sequelize db:migrate:undo:all',
        {env: process.env},
        (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );

      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });

    done();
  });

  test(`query: search should return empty list if nothing found`, async () => {
    const args = {
      query: 'Nothing',
    };

    const context = {
      models,
    };

    const result = await resolvers.Query.search(null, args, context);

    expect(result.length).toEqual(0);
  });

  test(`query: search should return list if query matched`, async () => {
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

  test(`query: search should return list if query matched in user's name`, async () => {
    const args = {
      query: 'john',
    };

    const context = {
      models,
    };

    const results = await resolvers.Query.search(null, args, context);

    expect(results.length).toEqual(3);

    for (let result of results) {
      expect(result.user.firstName.toLowerCase()).toEqual(expect.stringContaining('john'));
    }
  });
});

