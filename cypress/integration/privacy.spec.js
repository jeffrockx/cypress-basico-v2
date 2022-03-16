/// <reference types="Cypress" />

describe('Política de Privacidade', () => {

    beforeEach(() => {
        cy.visit('./src/privacy.html')
    })
    it('verifica se contém determinado texto na página', () => {
        cy.contains('Talking About Testing').should('be.visible')
    })

})
