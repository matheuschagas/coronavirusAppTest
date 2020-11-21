import {UserService} from '../UserService';
import {StorageService} from '../StorageService';

beforeEach(async () => {
  await StorageService.remove('@users');
});

describe('UserService', () => {
  test('the add function', async () => {
    await UserService.add(
      'John Doe',
      '+1 925-945-6645',
      '21',
      {
        latitude: 30.268498,
        longitude: -97.743111,
        type: 'address',
        name: '600 Congress Ave',
        number: '600',
        postal_code: '78701',
        street: 'Congress Ave',
        confidence: 1,
        region: 'Texas',
        region_code: 'TX',
        county: null,
        locality: null,
        administrative_area: null,
        neighbourhood: null,
        country: 'United States',
        country_code: 'USA',
        continent: 'North America',
        label: '600 Congress Ave, TX, USA',
        map_url:
          'https://map.positionstack.com/export/embed.html?bbox=-97.742611,30.268998,-97.743611,30.267998&layer=mapnik&marker=30.268498,-97.743111',
      },
      'fever, cough, shortness of breath',
    );
    let users = await UserService.get();
    expect(users.length).toBe(1);
  });

  test('error if user already exists', async (done) => {
    await UserService.add(
      'John Doe',
      '+1 925-945-6645',
      '21',
      {
        latitude: 30.268498,
        longitude: -97.743111,
        type: 'address',
        name: '600 Congress Ave',
        number: '600',
        postal_code: '78701',
        street: 'Congress Ave',
        confidence: 1,
        region: 'Texas',
        region_code: 'TX',
        county: null,
        locality: null,
        administrative_area: null,
        neighbourhood: null,
        country: 'United States',
        country_code: 'USA',
        continent: 'North America',
        label: '600 Congress Ave, TX, USA',
        map_url:
          'https://map.positionstack.com/export/embed.html?bbox=-97.742611,30.268998,-97.743611,30.267998&layer=mapnik&marker=30.268498,-97.743111',
      },
      'fever, cough, shortness of breath',
    );
    UserService.add(
      'John Doe',
      '+1 925-945-6645',
      '29',
      {
        latitude: 30.268498,
        longitude: -97.743111,
        name: '600 Congress Ave',
        country_code: 'USA',
        label: '600 Congress Ave, TX, USA',
      },
      'fever, cough, shortness of breath',
    ).catch((e) => {
      expect(e.message).toBe('User already exists');
      done();
    });
  });

  test('the add function should throw without parameters', (done) => {
    UserService.add().catch((e) => {
      expect(e.message).toBe(
        'The following fields are required: name, phone, age, address',
      );
      done();
    });
  });

  test('get sorted by country', async () => {
    await UserService.add(
      'John Doe',
      '+1 925-945-6645',
      '29',
      {
        country_code: 'USA',
        label: '600 Congress Ave, TX, USA',
      },
      'fever, cough, shortness of breath',
    );
    await UserService.add(
      'Zé da Silva',
      '+55 51 998505401',
      '25',
      {
        country_code: 'BRA',
        label: 'Av. Brasil, 920',
      },
      'fever, cough, shortness of breath',
    );
    await UserService.add(
      'Miguel',
      '+52 222.230-2224 ',
      '21',
      {
        country_code: 'MEX',
        label: 'Jardines del Bosque 44520 Guadalajara',
      },
      'fever, cough, shortness of breath',
    );
    let users = await UserService.get();
    expect(users[0][1].address.country_code).toBe('BRA');
    expect(users[1][1].address.country_code).toBe('MEX');
    expect(users[2][1].address.country_code).toBe('USA');
  });
  test('get sorted by name', async () => {
    await UserService.add(
      'John Doe',
      '+1 925-945-6645',
      '29',
      {
        country_code: 'USA',
        label: '600 Congress Ave, TX, USA',
      },
      'fever, cough, shortness of breath',
    );
    await UserService.add(
      'Alex Doe',
      '+1 925-945-6645',
      '29',
      {
        country_code: 'USA',
        label: '600 Congress Ave, TX, USA',
      },
      'fever, cough, shortness of breath',
    );
    await UserService.add(
      'Jane Doe',
      '+1 925-945-6645',
      '29',
      {
        country_code: 'USA',
        label: '600 Congress Ave, TX, USA',
      },
      'fever, cough, shortness of breath',
    );
    let users = await UserService.get();
    expect(users[0][1].name).toBe('Alex Doe');
    expect(users[1][1].name).toBe('Jane Doe');
    expect(users[2][1].name).toBe('John Doe');
  });
});
