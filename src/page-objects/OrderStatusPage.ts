import { Page, Locator } from "@playwright/test";
import { MESSAGES } from "data-test/Messages";

export default class OrderStatusPage {
    readonly billingAddress: Locator;

    constructor(private page: Page) {
        this.billingAddress = this.page.locator('.woocommerce-customer-details address');
    }

    getItemName(productName: string) {
        return this.page.locator('tr.order_item td.product-name')
        .filter({ hasText: productName })
        .locator('a');
    }

    getItemQuantity(productName: string){
        return this.page.locator('tr.order_item td.product-name')
        .filter({ hasText: productName })
        .locator('.product-quantity');
    }

    getItemPrice(productName: string){
        return this.page.locator('tr.order_item')
        .filter({ hasText: productName })
        .locator('span.woocommerce-Price-amount');
    }
    
    getSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }

    getOrderNumber() {
        return this.page.locator('.order strong').innerText();
    }
}