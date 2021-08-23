describe('Parkbee EE tests', () => {
  describe('End to End Tests', () => {
    const baseUrl = 'http://localhost:8000'
    beforeEach(() => {
      cy.visit(baseUrl)
      cy.clearLocalStorage()
    })

    it('Testing auto complete', function () {
      cy.get('.mapboxgl-ctrl-geocoder--input').clear()
      cy.get('.mapboxgl-ctrl-geocoder--input').type('rotterdam')
      cy.get('.suggestions-wrapper li').should('have.length', 5)
    })

    it('Testing Parking actions', function () {
      const cardClass = 'div.flex.min-w-full.justify-between.mb-2 '
      cy.get('div.overlays > div:nth-child(4) > div').click()
      cy.get(`${cardClass} > h3`).should('have.text', 'Mock Garage 4')
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.collapse > input').check()
      cy.get('.collapse-content > ul > li').should('have.length', 3)
      cy.get('.collapse-content > ul > li > p').first().should('have.text', 'Librijesteeg, 3011NH, Amsterdam, NL')
      cy.get('.grid > .flex > .font-medium').should('have.text', '€5')
      cy.get('.btn').click()
      cy.get('.modal').should('be.visible')
      cy.get('.justify-center > .min-w-max').click()
      cy.get('.modal').should('not.exist')
      cy.get('[data-test=start-parking-btn]').click()
      cy.get('[data-test=modal-accept-btn]').click()
      cy.wait(5000)
      cy.get('div.flex.min-w-full.justify-between.mb-2 > div > div').should('have.text', 'Parking')
      cy.get('[data-test=end-parking-btn]').click({ force: true })
      cy.get('[data-test=modal-accept-btn]').click()
      cy.wait(5000)
      cy.get('[data-test=parking-success-card]').should('be.visible')
      cy.get('[data-test=parking-success-card]').contains('Librijesteeg, 3011NH, Amsterdam, NL')
      cy.get('[data-test=parking-success-card] .stat-value').should('be.visible')
      cy.get('[data-test=parking-success-card] button').click()
      cy.get('.modal').should('not.exist')
    })

    it('Testing theme toggle', function () {
      cy.get('#toggle-test').click()
      cy.get('html').should('have.attr', 'data-theme', 'dark')
    })
  })
})
