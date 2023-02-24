import { faker } from '@faker-js/faker';

export const contexts = [
  {
    id: faker.lorem.word(),
    items: [
      {
        heading: {
          text: faker.lorem.word(),
        },
        content: {
          html: `<p class="govuk-body">${faker.lorem.paragraph()}</p>`,
        },
      },
    ],
  },
  {
    id: faker.lorem.word(),
    headingLevel: 1,
    classes: `${faker.lorem.word()} ${faker.lorem.word()}`,
    attributes: {
      [faker.lorem.word()]: faker.lorem.word(),
      [faker.lorem.word()]: faker.lorem.word(),
    },
    hideAllSectionsText: faker.lorem.word(),
    hideSectionText: faker.lorem.word(),
    hideSectionAriaLabelText: faker.lorem.word(),
    showAllSectionsText: faker.lorem.word(),
    showSectionAriaLabelText: faker.lorem.word(),
    items: [
      {
        heading: {
          text: faker.lorem.word(),
        },
        summary: {
          text: faker.lorem.word(),
        },
        content: {
          text: faker.lorem.paragraph(),
        },
        expanded: true,
      },
      {
        heading: {
          html: `<p class="govuk-body">${faker.lorem.paragraph()}</p>`,
        },
        summary: {
          html: `<p class="govuk-body">${faker.lorem.paragraph()}</p>`,
        },
        content: {
          html: `<p class="govuk-body">${faker.lorem.paragraph()}</p>`,
        },
        expanded: false,
      },
    ],
  },
];
