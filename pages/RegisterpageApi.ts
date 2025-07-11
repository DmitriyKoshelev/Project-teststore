import {Page, expect} from '@playwright/test';

export class RegisterPageApi {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://teststore.automationtesting.co.uk/index.php');
    };

    async registerUser(firstName: string, lastName: string, email: string, password: string) {
       await this.page.click('a[href*="my-account"]');
       await this.page.fill('#firstname', firstName);
       await this.page.fill('#lastname', lastName);
       await this.page.fill('#email', email);
       await this.page.fill('#password', password);
       await this.page.click('button[type="submit"]');
       await expect(this.page.locator('text=Welcome')).toBeVisible();
    }

};    
