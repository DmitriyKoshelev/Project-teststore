import { test, expect, Page } from '@playwright/test';
import { RegistrationPage } from '../../My-Project/pages/registerPage'; 
import { faker, fi } from "@faker-js/faker";


test('ur-01User Registration Page',{tag:"@reguser"}, async ({ page }) => {
    test.slow();
    const userRegistrationData = {
        firstname: "" + faker.person.firstName(),
        lastname: "" + faker.person.lastName(),
        // Generate a random email and password using Faker.js
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    const registerPage = new RegistrationPage(
        page,
        userRegistrationData.firstname,
        userRegistrationData.email,
        userRegistrationData.password
    );

    await page.goto("https://teststore.automationtesting.co.uk/index.php");

    await registerPage.registerUser(
        userRegistrationData.firstname,
        userRegistrationData.lastname,
        userRegistrationData.email,
        userRegistrationData.password
    ); 
});