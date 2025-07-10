import { Page, Locator } from "@playwright/test";
import { MESSAGES } from "@data-test/Messages";

export default class OrderStatusPage {
    readonly billingAddress: Locator;

    constructor(private page: Page) {
        this.billingAddress = this.page.locator('.woocommerce-customer-details address');
    }

    async getItemName(productName: string): Promise<Locator> {
        return this.page.locator('tr.order_item td.product-name')
        .filter({ hasText: productName })
        .locator('a');
        // return this.page.locator('.woocommerce-order-details').getByText(productName);
    }

    async getItemQuantity(productName: string): Promise<Locator> {
        return this.page.locator('tr.order_item td.product-name')
        .filter({ hasText: productName })
        .locator('.product-quantity');
    }

    async getItemPrice(productName: string): Promise<Locator> {
        return this.page.locator('tr.order_item')
        .filter({ hasText: productName })
        .locator('span.woocommerce-Price-amount');
    }
    
    async getSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }

    async getOrderNumber() {
        return await this.page.locator('.order strong').innerText();
    }
}