/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Xavier')
        cy.get('#email').type('jeffersonrock_05@hotmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('preenche os campos obrigatórios e envia o formulário - Texto longo', function () {
        const textolongo = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste'
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Xavier')
        cy.get('#email').type('jeffersonrock_05@hotmail.com')
        cy.get('#open-text-area').type(textolongo, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Xavier')
        cy.get('#email').type('jeffersonrock_05@hotmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone').type('+()-.')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Xavier')
        cy.get('#email').type('jeffersonrock_05@hotmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Jefferson')
            .should('have.value', 'Jefferson')
            .clear()
            .should('have.value', '')
        cy.get('#lastName').type('Xavier')
            .should('have.value', 'Xavier')
            .clear()
            .should('have.value', '')
        cy.get('#email').type('jeffersonrock_05@hotmail.com')
            .should('have.value', 'jeffersonrock_05@hotmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone').type('997047671')
            .should('have.value', '997047671')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
})
