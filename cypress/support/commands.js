import 'cypress-file-upload';

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
            cy.visit('/web/index.php/auth/login');
            cy.get('input[placeholder="Username"]').type(username);
            cy.get('input[placeholder="Password"]').type(password);
            cy.get('button').contains('Login').click();  
            cy.url().should('contain', '/dashboard');
        })
    cy.visit('/');
})

Cypress.Commands.add('selectNavItemByLabel', (label) => {
    cy.contains('span', label).click();
    cy.url().should('include', '/pim/viewEmployeeList');;
})

Cypress.Commands.add('selectInputByLabel', (label) => {
    cy.contains('label', label).parent().next().find('input').should('be.visible');
})