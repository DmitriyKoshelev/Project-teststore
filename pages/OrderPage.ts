import {Page, Locator, expect} from '@playwright/test';

export class OrderPage {
    private page: Page;

    private deliveryContinueButton: Locator;
    private paymentOptionBank: Locator;
    private termsCheckbox: Locator;
    private placeOrderButton: Locator;
    private confirmationTitle: Locator;
    private confirmationBlock: Locator;
  choosePaymentMethod: any;
  acceptTermsAndConditions: any;

    constructor(page: Page) {
        this.page = page;
        this.deliveryContinueButton = page.locator('button[name="confirmDeliveryOption"]');
        this.paymentOptionBank = page.locator('#payment-option-1');
        this.termsCheckbox = page.locator('#conditions_to_approve\\[terms-and-conditions\\]');
        this.placeOrderButton = page.locator('button.btn.btn-primary.center-block');
        this.confirmationTitle = page.locator('.h1.card-title');
        this.confirmationBlock = page.locator('.order-confirmation');

    }

};