Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Jefferson')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('jeffersonrock_05@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})