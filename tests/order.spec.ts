import { test, expect } from '@playwright/test';
import fs from 'fs';
import { DeliveryAddressPage } from '../pages/DeliveryAddressPage';
import { OrderPage } from '../pages/OrderPage';

test('order-01 Placing an order by filling in the address and confirming',{tag: "@order"}, async ({ page }) => {
  test.slow();
  // Authorization
  const rawData = fs.readFileSync('login-data.json', 'utf-8');
  const userData = JSON.parse(rawData);
  const orderPage = new OrderPage(page);

  await page.goto('https://teststore.automationtesting.co.uk/index.php?controller=authentication');
  await page.locator('#field-email').fill(userData.email);
  await page.locator('input[name="password"]').fill(userData.password);
  await page.locator('button#submit-login').click();
  await expect(page.locator('#_desktop_user_info')).toContainText(`${userData.firstname} ${userData.lastname}`);

  //add product to basket
  await page.goto('https://teststore.automationtesting.co.uk');
  await page.locator('a.product-thumbnail').first().click();
  await page.locator('button.add-to-cart').click();
  // Wait for the cart modal to appear and check its text
  // await expect(page.getByRole('link', { name: ' Proceed to checkout' })).toBeVisible();!!!!!!!!!!!!!!!!!!!

  //Proceed to registration
  await page.locator('a.btn-primary').click(); // кнопка в модальном окне
  await page.locator('a.btn.btn-primary').click(); // кнопка на странице корзины

  //to create a new address
  await page.goto('https://teststore.automationtesting.co.uk/index.php?controller=order&newAddress=delivery');

  const deliveryPage = new DeliveryAddressPage(page);
  await deliveryPage.fillAddressForm({
    firstName: 'Ivan',
    lastName: 'Ivanov',
    address: 'st.Kharkov the Best 1',
    city: 'Urkaine',
    postalCode: '101000',
    country: 'United Kingdom',
    phone: '+79111234567',
  });
  await deliveryPage.saveAddress();

  // const orderPage = new OrderPage(page);
  await orderPage.confirmDelivery();
  await orderPage.choosePaymentMethod();
  await orderPage.acceptTermsAndConditions();
  await orderPage.verifyPaymentAndTermsChecked();
  await orderPage.placeOrder();
  await orderPage.verifyOrderConfirmed();
});