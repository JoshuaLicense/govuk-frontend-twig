import { faker } from '@faker-js/faker';

export const contexts = [
  {
    items: [],
  },
  {
    items: [
      {
        text: faker.lorem.word(),
      },
      {
        html: `<span>${faker.lorem.word()}</span>`,
      },
    ],
  },
  {
    classes: `${faker.lorem.word()} ${faker.lorem.word()}`,
    collapseOnMobile: true,
    attributes: {
      [faker.lorem.word()]: faker.lorem.word(),
      [faker.lorem.word()]: faker.lorem.word(),
    },
    items: [
      {
        text: faker.lorem.word(),
        href: faker.internet.url(),
        attributes: {
          [faker.lorem.word()]: faker.lorem.word(),
          [faker.lorem.word()]: faker.lorem.word(),
        },
      },
      {
        html: `<span>${faker.lorem.word()}</span>`,
        href: faker.internet.url(),
        attributes: {
          [faker.lorem.word()]: faker.lorem.word(),
          [faker.lorem.word()]: faker.lorem.word(),
        },
      },
    ],
  },
];
