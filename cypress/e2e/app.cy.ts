/// <reference types="cypress" />
import '@testing-library/cypress/add-commands'

describe('Youtube Clone', () => {
    beforeEach(() => {
        cy.intercept('GET', /(mostPopular)/g, {
            fixture: 'popular.json'
        });
        cy.intercept('GET', /(search)/g, {
            fixture: 'search.json'
        });
        cy.viewport(1200, 800);
        cy.visit('/');
    });

    it('renders', () => {
        cy.findByText('YouTube').should('exist');
    });

    it('shows popular video firs', () => {
        cy.findByText('Popular Video').should('exist');
    });
})