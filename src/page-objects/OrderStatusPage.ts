import { Page, Locator } from "@playwright/test";
import { MESSAGES } from "@data-test/Messages";

export default class OrderStatusPage {
    readonly billingAddress: Locator;

    constructor(private page: Page) {
        this.billingAddress = this.page.locator('.woocommerce-customer-details address');
    }

    async getItemName(productName: string) {
        return this.page.locator('.woocommerce-order-details').getByText(productName);
    }

    async getItemQuantity(productName: string) {
        return (await this.page.locator('.order_item .product-name')
        .filter({ hasText: productName })
        .locator('.product-quantity').innerText()).replace(/\s+/g, '');
    }

    async getItemPrice(productName: string) {
        return (await this.page.locator('.order_item .product-name')
        .filter({ hasText: productName })
        .locator('.woocommerce-Price-amount').innerText());
    }
    
    async getSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }

    async getOrderNumber() {
        return await this.page.locator('.order strong').innerText();
    }

    async getBillingAddress() {
        return (await this.billingAddress.innerText()).replace(/\s+/g, '');
    }
}