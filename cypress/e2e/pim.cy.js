import { employee } from "../fixtures/employee";

const username = 'Admin';
const password = 'admin123';

let employeeId;

describe('PIM', () => {

  beforeEach(() => {
    cy.login(username, password);
    cy.selectNavItemByLabel('PIM');
  });

  it('preenche os dados de um novo empregado e submete ao cadastro', () => {
    cy.contains('button', 'Add').should('be.visible').click();
    cy.url().should('include', '/pim/addEmployee');

    cy.get('input[placeholder="First Name"]').should('be.visible').type(employee.firstName, {force: true});
    cy.get('input[placeholder="Middle Name"]').should('be.visible').type(employee.middleName, {force: true});
    cy.get('input[placeholder="Last Name"]').should('be.visible').type(employee.lastName, {force: true});

    cy.selectInputByLabel('Employee Id').invoke('val').then((value) => {
      employeeId = value;
    });

    cy.get('.orangehrm-employee-image input').selectFile('cypress/fixtures/image.png', {force: true});
    cy.get('img.employee-image').should('not.contain', '/web/images/default-photo.png');

    cy.get('input[type="checkbox"]').if('not.checked').check({force: true});

    cy.selectInputByLabel('Username').type(employee.userName);
    cy.selectInputByLabel('Password').type(employee.password);
    cy.selectInputByLabel('Confirm Password').type(employee.password);

    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('div.oxd-toast-content--success').as('sucessAlert').should('exist');
    cy.url().should('include', '/pim/viewPersonalDetails');

    cy.get('input[placeholder="First Name"]').should('have.value', employee.firstName);
    cy.get('input[placeholder="Middle Name"]').should('have.value', employee.middleName);
    cy.get('input[placeholder="Last Name"]').should('have.value', employee.lastName);
  })

  it('pesquisa pelo id do empregado cadastrado e valida os dados', () => {
    let fullName = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;

    cy.selectInputByLabel('Employee Name').type(fullName);
    cy.selectInputByLabel('Employee Id').type(employeeId);
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('div.oxd-table-body').as('searchResults')
    .children().should('have.length', 1);

    cy.get('@searchResults').find('button').last().click();
    cy.url().should('include', '/pim/viewPersonalDetails');

    cy.get('input[placeholder="First Name"]').should('have.value', employee.firstName);
    cy.get('input[placeholder="Middle Name"]').should('have.value', employee.middleName);
    cy.get('input[placeholder="Last Name"]').should('have.value', employee.lastName);

  })

})