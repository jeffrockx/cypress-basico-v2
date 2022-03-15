/// <reference types="Cypress" />

describe('Política de Privacidade', () => {

    beforeEach(() => {
        cy.visit('./src/privacy.html')
    })
    it('verifica o título da aplicação', () => {
        cy.contains('Talking About Testing').should('be.visible')
    })

})
