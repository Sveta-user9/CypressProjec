describe('Positive testing', () => {
    it('should open the page, download certificate, and verify data', () => {
        // Відкриття сторінки
        cy.visit('https://js-55fbfg.stackblitz.io/');
        cy.contains('Run this project').click();
        cy.contains('Добавить').click();

        //Завантаження сертифікату
        cy.get('dropbox.dropbox.ng-isolate-scope')
            .trigger('dragenter')
            .should('have.class', 'dragover');

        cy.fixture('cert.cer', 'base64').then(fileContent => {
            const blob = Cypress.Blob.base64StringToBlob(fileContent, 'application/x-x509-ca-cert');
            cy.get('dropbox.dropbox.ng-isolate-scope')
                .trigger('drop', {dataTransfer: {files: [blob]}});

            // Перевірка таблиці
            cy.get('a.list-group-item.list-group-item-action.ng-binding.ng-scope')
                .should('be.visible')
                .click();

            // Перевірка інформаційної панелі
            cy.get('.card-body').within(() => {
                cy.contains('SubjectCN:').next('td').should('have.text', 'Таксер Тест Тестерович');
                cy.contains('IssuerCN:').next('td').should('have.text', 'UA-22723472');
                cy.contains('ValidFrom:').next('td').should('have.text', '2015-04-08 21:00:00 UTC');
                cy.contains('ValidTill:').next('td').should('have.text', '2017-04-08 21:00:00 UTC');
            });
        });
    });
});

describe('Uploading a certificate by dragging and dropping a file', () => {
    it('should open the page, download certificate, and verify data', () => {

        // Відкриття сторінки
        cy.visit('https://js-55fbfg.stackblitz.io/');
        cy.contains('Run this project').click();
        cy.contains('Добавить').click();
        cy.get('dropbox.dropbox.ng-isolate-scope')
            .trigger('dragenter')
            .should('have.class', 'dragover');

        cy.fixture('cert.cer', 'base64').then(fileContent => {
            const blob = Cypress.Blob.base64StringToBlob(fileContent, 'application/x-x509-ca-cert');
            cy.get('dropbox.dropbox.ng-isolate-scope')
                .trigger('drop', {dataTransfer: {files: [blob]}});

            // Перевірка таблиці
            cy.get('a.list-group-item.list-group-item-action.ng-binding.ng-scope')
                .should('be.visible')
                .click()
        });

        // Перевірка інформаційної панелі
        cy.get('.card-body').within(() => {
            cy.contains('Common Name:').next('td').should('have.text', 'Таксер Тест Тестерович');
            cy.contains('Issuer CN:').next('td').should('have.text', 'UA-22723472');
            cy.contains('Valid From:').next('td').should('have.text', '2015-04-08 21:00:00 UTC');
            cy.contains('Valid To:').next('td').should('have.text', '2017-04-08 21:00:00 UTC');

        });
    });
});

describe('Certificate upload via the \'Choose from standard dialog\' button.', () => {
    it('should open the page, download certificate, and verify data', () => {
        // Відкриття сторінки
        cy.visit('https://js-55fbfg.stackblitz.io/');
        cy.contains('Run this project').click();
        cy.contains('Добавить').click();

        // Симуляція вибору файлу через стандартний діалог
        cy.fixture('cert.cer', 'base64').then(fileContent => {
            cy.get('button.Виберіть через стандартний діалог').attachFile({
                fileContent: fileContent,
                fileName: 'cert.cer',
                mimeType: 'application/x-x509-ca-cert'
            });

            // Перевірка таблиці
            cy.get('a.list-group-item.list-group-item-action.ng-binding.ng-scope')
                .should('be.visible')
                .click()
        });

        // Перевірка інформаційної панелі
        cy.get('.card-body').within(() => {
            cy.contains('Common Name:').next('td').should('have.text', 'Таксер Тест Тестерович');
            cy.contains('Issuer CN:').next('td').should('have.text', 'UA-22723472');
            cy.contains('Valid From:').next('td').should('have.text', '2015-04-08 21:00:00 UTC');
            cy.contains('Valid To:').next('td').should('have.text', '2017-04-08 21:00:00 UTC');
        });
    });
});