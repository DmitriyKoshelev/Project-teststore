import { test, expect } from '@playwright/test';
import { faker, fi } from "@faker-js/faker";
import fs from 'fs';

test('ur-02 test create new user',{tag: "@usreg"}, async ({ page }) => {
  test.slow();
  const formData = {
    firstname: "" + faker.person.firstName(),
    lastname: "" + faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthday: '02/22/2022',
  };
  await page.goto('https://teststore.automationtesting.co.uk/index.php?controller=registration');
  
  for (const key in formData) {
    let selector = `input[name='${key}']`;
    // Use registration email field
    if (key === 'email') {
      selector = "input[name='email']#field-email";
    }
    await page.locator(selector).fill(formData[key]);
  }
  await page.locator('input[name="psgdpr"]').click();
  await page.click('button[type="submit"]');

  // save user email and login
  fs.writeFileSync('login-data.json', JSON.stringify(formData, null, 2));
});