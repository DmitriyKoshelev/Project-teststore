import { test, expect, Page } from '@playwright/test';
import { RegistrationPage } from '../pages/registerPage'; 
import { faker, fi } from "@faker-js/faker";


test('ur-01User Registration Page',{tag:"@reguser"}, async ({ page }) => {
    test.slow();
    const registerPage = new RegistrationPage(page);


    const userRegistrationData = {
        firstname: "" + faker.person.firstName(),
        lastname: "" + faker.person.lastName(),
        // Generate a random email and password using Faker.js
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    await page.goto("https://teststore.automationtesting.co.uk/index.php");

    await registerPage.registerUser(
        userRegistrationData.firstname,
        userRegistrationData.lastname,
        userRegistrationData.email,
        userRegistrationData.password
    );
    
});