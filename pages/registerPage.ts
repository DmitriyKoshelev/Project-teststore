import { Page  } from "@playwright/test";

export function RegistrationPage(page: Page, username: string, email: string, password: string) {
    this.singInButtonLocator = page.locator('//*[@id="_desktop_user_info"]/div/a/span');
    this.gotoregisterPageLocator = page.locator('//*[@class="no-account"]');
    this.selectGenderLocator = page.locator('//*[@id="field-id_gender-1"]');
    this.firstNameLocator = page.locator('//*[@id="field-firstname"]');
    this.lastNameLocator = page.locator('//*[@id="field-lastname"]');
    this.emailInputLocator = page.locator('//*[@id="field-email"]');
    this.passwordInputLocator = page.locator('//*[@id="field-password"]');
    this.selectBirthdayLocator = page.locator('//*[@id="field-birthday"]');
    this.agreeButtonLocator = page.locator('//*[@class="custom-checkbox"]/label/input[@name="optin"]');
    this.agreeButtonLocator1 = page.locator('//*[@class="custom-checkbox"]/label/input[@name="psgdpr"]');
    this.agreeButtonLocator2 = page.locator('//*[@class="custom-checkbox"]/label/input[@name="newsletter"]');
    this.singUpButtonLocator = page.locator('//*[@id="customer-form"]/footer/button');

    this.registerUser = async function (
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        await this.singInButtonLocator.click();
        await this.gotoregisterPageLocator.click();
        await this.selectGenderLocator.click();
        await this.firstNameLocator.fill(firstName);
        await this.lastNameLocator.fill(lastName);
        // Generate a random first name and last name using Faker.js
        await this.selectBirthdayLocator.click();
        await this.agreeButtonLocator.click();
        await this.agreeButtonLocator1.click();
        await this.agreeButtonLocator2.click();
        // Fill in the registration form with the provided username, email, and password
        await this.emailInputLocator.fill(email);
        await this.passwordInputLocator.fill(password);
        await this.singUpButtonLocator.click();
    }
};