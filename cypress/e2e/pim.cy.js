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
    // Clica no botão Adicionar
    cy.contains('button', 'Add').should('be.visible').click();
    
    // Valida se foi redirecionado
    cy.shouldRedirect('/pim/addEmployee');

    // Preenche os campos 
    cy.get('input[placeholder="First Name"]').should('be.visible').type(employee.firstName, {force: true});
    cy.get('input[placeholder="Middle Name"]').should('be.visible').type(employee.middleName, {force: true});
    cy.get('input[placeholder="Last Name"]').should('be.visible').type(employee.lastName, {force: true});

    // Verifica se o Employee Id já existe
    cy.get('.oxd-input-field-error-message')
    .if('contain', 'Employee Id already exists')
    .selectInputByLabel('Employee Id')
    .clear()
    .type(Math.floor(Math.random() * 10000));

    // Guarda o valor de Employee Id
    cy.selectInputByLabel('Employee Id').invoke('val').then((value) => {
      employeeId = value;
    });

    // Upload da imagem do perfil
    cy.get('.orangehrm-employee-image input').selectFile('cypress/fixtures/image.png', {force: true});

    // Valida upload
    cy.get('img.employee-image').should('not.contain', '/web/images/default-photo.png');

    // Escolhe Criar Detalhes de Login
    cy.get('input[type="checkbox"]').if('not.checked').check({force: true});

    // Preenche os novos campos
    cy.selectInputByLabel('Username').type(employee.userName);
    cy.selectInputByLabel('Password').type(employee.password);
    cy.selectInputByLabel('Confirm Password').type(employee.password);

    // Submete
    cy.get('button[type="submit"]').should('be.visible').click();

    // Valida mensagem de sucesso
    cy.get('div.oxd-toast-content--success').as('sucessAlert').should('exist');

    // Valida se foi redirecionado
    cy.shouldRedirect('/pim/viewPersonalDetails');

    // Valida os valores cadastrados
    cy.get('input[placeholder="First Name"]').should('have.value', employee.firstName);
    cy.get('input[placeholder="Middle Name"]').should('have.value', employee.middleName);
    cy.get('input[placeholder="Last Name"]').should('have.value', employee.lastName);
  })

  it('pesquisa pelo id do empregado cadastrado e valida os dados', () => {
    let fullName = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;

    // Preenche os campos
    cy.selectInputByLabel('Employee Name').type(fullName);
    cy.selectInputByLabel('Employee Id').type(employeeId);

    // Submete
    cy.get('button[type="submit"]').should('be.visible').click();

    // Valida se há apenas 1 resultado
    cy.get('div.oxd-table-body').as('searchResults')
    .children().should('have.length', 1);

    // Clica em editar
    cy.get('@searchResults').find('button').last().click();

    // Valida se foi redirecionado
    cy.shouldRedirect('/pim/viewPersonalDetails');

    // Valida os valores cadastrados
    cy.get('input[placeholder="First Name"]').should('have.value', employee.firstName);
    cy.get('input[placeholder="Middle Name"]').should('have.value', employee.middleName);
    cy.get('input[placeholder="Last Name"]').should('have.value', employee.lastName);

  })

})