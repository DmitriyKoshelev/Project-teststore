import {test, expect} from '@playwright/test';
import fs from 'fs';

test('ulog-01 test login with registered user', {tag: "@uslogin"}, async ({page}) => {
    //loading user data
    const rawData = fs.readFileSync('login-data.json', 'utf-8');
    const userData = JSON.parse(rawData);

    await page.goto('https://teststore.automationtesting.co.uk/index.php?controller=authentication');

    await page.locator('//*[@id="field-email"]').fill(userData.email);
    await page.locator('input[name="password"]').fill(userData.password);
    await page.locator('button#submit-login').click();

    //Verifying successful login
    await expect(page.locator('//*[@id="_desktop_user_info"]')).toContainText(`${userData.firstname} ${userData.lastname}`);
    console.log(`login user for: ${userData.firstname}, ${userData.lastname}`);
});