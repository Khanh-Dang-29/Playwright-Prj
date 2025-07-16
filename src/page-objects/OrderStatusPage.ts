import { Page, Locator } from "@playwright/test";
import { MESSAGES } from "data-test/Messages";

export default class OrderStatusPage {
    readonly billingAddress: Locator = this.page.locator('.woocommerce-customer-details address');
    readonly sussessMessage: Locator = this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);

    constructor(private page: Page) {}

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

    getOrderNumber() {
        return this.page.locator('.order strong').innerText();
    }
}