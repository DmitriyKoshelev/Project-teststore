import { Page, Locator } from '@playwright/test';

export class DeliveryAddressPage {
    private page: Page;

    //Address form elements
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private addressInput: Locator;
    private cityInput: Locator;
    private postalCodeInput: Locator;
    private countrySelect: Locator;
    private phoneInput: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#field-firstname');
    this.lastNameInput = page.locator('#field-lastname');
    this.addressInput = page.locator('#field-address1');
    this.cityInput = page.locator('#field-city');
    this.postalCodeInput = page.locator('#field-postcode');
    this.countrySelect = page.locator('#field-id_country');
    this.phoneInput = page.locator('#field-phone');
    this.saveButton = page.locator('button[name="confirm-addresses"]');
  }

  //filling form
  async fillAddressForm(address: {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    phone: string
  }) {
    await this.firstNameInput.fill(address.firstName);
    await this.lastNameInput.fill(address.lastName);
    await this.addressInput.fill(address.address);
    await this.cityInput.fill(address.city);
    await this.postalCodeInput.fill(address.postalCode);
    await this.countrySelect.selectOption({ value: '8' });
    await this.phoneInput.fill(address.phone);
    await this.saveButton.click();
  }
//save address
async saveAddress() {
    await this.saveButton.click(); 
}

};