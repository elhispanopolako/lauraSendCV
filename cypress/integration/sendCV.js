/// <reference types="cypress" />
let email = 'laura20021@onet.pl'
let phone = '570 148 896'
let offerTitle = ''
describe('Automat do wysyłania CV siostry do wszystkich firm w mielcu które przez ostatnie 24h dodały ogłoszenie', () => {
    it('Lets go', () => {
        let aplicationCount = 0
        for (let i = 0; i < 18; i++) {
            cy.visit('https://www.pracuj.pl/praca/mielec;wp/ostatnich%2024h;p,1?rd=0&cc=5003%2C5024%2C5017%2C5001%2C5018%2C5021%2C5028&ws=0')
            if (i == 0) {
                cy.get('[data-test="button-submitCookie"]').click()
            }
            cy.get('[data-test="section-offers"] [data-test="link-offer"]').then((offer) => {
                cy.get(offer).parent().find('[data-test="offer-title"]').eq(i).then((title) => {
                    offerTitle = title.text()
                    cy.get(offer).eq(i).click()
                    cy.get('[data-test="text-positionName"]').should('have.text', offerTitle)
                    cy.get('[data-test="anchor-apply"]').eq(0).then((applyBtn) => {
                        let aplyText = applyBtn.text()
                        cy.log(aplyText)
                        if (aplyText == 'Aplikuj szybko') {
                            cy.get(applyBtn).click({ force: true })
                            cy.get('#EmailAddress').type(email)
                            cy.get('[data-test="applyFirstStepBtn"]').click()
                            cy.get('[data-test="applyLogStepSkip"]').click()
                            cy.get('[data-test="input-fileFromDrive"]').attachFile('LauraWozniakCV.pdf')
                            cy.get('[data-test="button-fileName"]').should('have.text', 'LauraWozniakCV.pdf')
                            cy.get('[data-test="input-firstName"]').type('Laura')
                            cy.get('[data-test="input-lastName"]').type('Woźniak')
                            cy.get('[data-test="input-phoneNumber"]').type(phone)
                            cy.get('[data-test="input-email"]').should('have.value', email)
                            cy.get('[data-test="button-submit"]').should('be.visible').click()
                            aplicationCount++
                        } else {
                            cy.log('Aplikujemy tylko szybko xd')
                        }
                        cy.log('Wysłano Aplikacji: ' + aplicationCount)
                    })
                })
            })
        }
    })
})