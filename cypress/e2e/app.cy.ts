/// <reference types="cypress" />
import '@testing-library/cypress/add-commands'

describe('Youtube Clone', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('renders', () => {
        cy.findByText('YouTube').should('exist');
    });
})