import { faker } from '@faker-js/faker';

export const employee = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),


    userName: faker.internet.userName(),
    password: faker.internet.password()

}