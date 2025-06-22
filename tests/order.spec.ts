import { test, expect } from '@playwright/test';
import fs from 'fs';
import { OrderPage } from '../pages/OrderPage';
import { DeliveryAddressPage } from '../pages/DeliveryAddressPage';

 test.beforeEach(async ({ page }) => {await page.goto("https://teststore.automationtesting.co.uk/index.php?controller=authentication");
  });

test('order-01 Placing an order by filling in the address and confirming',{tag: "@order"}, async ({ page }) => {
  test.slow();
  // Authorization
  const rawData = fs.readFileSync('login-data.json', 'utf-8');
  const userData = JSON.parse(rawData);
  const orderPage = new OrderPage(page);
  const deliveryPage = new DeliveryAddressPage(page);

  await page.locator('#field-email').fill(userData.email);
  await page.locator('input[name="password"]').fill(userData.password);
  await page.locator('button#submit-login').click();
  await expect(page.locator('#_desktop_user_info')).toContainText(`${userData.firstname} ${userData.lastname}`);

  //add product to basket
  await page.goto('https://teststore.automationtesting.co.uk');
  await page.locator('a.product-thumbnail').first().click();
  await page.locator('button.add-to-cart').click();
  // Wait for the cart modal to be attached to the DOM before checking visibility
const cartModal = page.locator('#blockcart-modal');
await expect(cartModal).toBeVisible();

const proceedButton = cartModal.locator('a.btn.btn-primary');
await expect(proceedButton).toBeVisible();
await proceedButton.click();

await page.goto("https://teststore.automationtesting.co.uk/index.php?controller=order&newAddress=delivery");

    await deliveryPage.fillAddressForm({
    firstName: 'Ivan',
    lastName: 'Ivanov',
    address: 'st.Kharkov the Best 1',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
    phone: '+79111234567',
  });
  await deliveryPage.saveAddress();
});
