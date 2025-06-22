import { test, expect } from '@playwright/test';
import fs from 'fs';
import { DeliveryAddressPage } from '../pages/DeliveryAddressPage';

test.beforeEach(async ({ page }) => {await page.goto("https://teststore.automationtesting.co.uk/index.php?controller=authentication");

  });

test('delivery-01 Placing an order by filling in the address and confirming',{tag: "@delivery"}, async ({ page }) => {
  test.slow();
   //loading user data
      const rawData = fs.readFileSync('login-data.json', 'utf-8');
      const userData = JSON.parse(rawData);
      const deliveryPage = new DeliveryAddressPage(page);
  
      await page.locator('//*[@id="field-email"]').fill(userData.email);
      await page.locator('input[name="password"]').fill(userData.password);
      await page.locator('button#submit-login').click();

     await page.goto("https://teststore.automationtesting.co.uk/index.php?controller=order&newAddress=delivery");
     await deliveryPage.fillAddressForm({
    firstName: 'Ivan',
    lastName: 'Ivanov',
    address: 'st.Kharkov the Best 1',
    city: 'Ukraine',
    postalCode: '101000',
    country: 'United Kingdom',
    phone: '+79111234567',
  });
//   await deliveryPage.saveAddress();
//   await orderPage.confirmDelivery();
//   await orderPage.choosePaymentMethod();
//   await orderPage.acceptTermsAndConditions();
//   await orderPage.verifyPaymentAndTermsChecked();
//   await orderPage.placeOrder();
//   await orderPage.verifyOrderConfirmed();

});