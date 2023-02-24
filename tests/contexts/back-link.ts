import { faker } from '@faker-js/faker';

export const contexts = [
  {},
  {
    html: `<span>${faker.lorem.word()}</span>`,
    href: faker.internet.url(),
    classes: `${faker.lorem.word()} ${faker.lorem.word()}`,
    attributes: {
      [faker.lorem.word()]: faker.lorem.word(),
      [faker.lorem.word()]: faker.lorem.word(),
    },
  },
  {
    text: faker.lorem.word(),
    href: faker.internet.url(),
  },
  {
    href: faker.internet.url(),
  },
];
