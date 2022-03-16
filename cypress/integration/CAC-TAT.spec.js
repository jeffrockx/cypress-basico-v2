/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    const TRES_SEGUNDOS_EM_MS = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', () => {
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Xavier')
        cy.get('#email').type('jeffersonrock_05@hotmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.success').should('not.be.visible')
    })
    it('preenche os campos obrigatórios e envia o formulário - Texto longo', () => {
        const textolongo = Cypress._.repeat('Teste, ', 15)
        cy.clock()
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Xavier')
        cy.get('#email').type('jeffersonrock_05@hotmail.com')
        cy.get('#open-text-area').type(textolongo, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Xavier')
        cy.get('#email').type('jeffersonrock_05@hotmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone').type('+()-.')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Xavier')
        cy.get('#email').type('jeffersonrock_05@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
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

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(5, () => {
        it('envia o formuário com sucesso usando um comando customizado', () => {
            cy.clock()
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('be.visible')
            cy.tick(TRES_SEGUNDOS_EM_MS)
            cy.get('.success').should('not.be.visible')
        })
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', () => {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.eq('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should($input => {
                expect($input[0].files[0].name).to.eq('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('#file-upload')
            .selectFile('@arquivoExemplo')
            .should($input => {
                expect($input[0].files[0].name).to.eq('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.get('#title').should('be.visible')
        cy.get('#white-background').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')

    })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('Teste, ', 25)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('Faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')
                expect(response.body).to.include('CAC TAT')
            })
    })

    it.only('Encontra o gato escondido', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu 💚 gatos!')
    })

})
