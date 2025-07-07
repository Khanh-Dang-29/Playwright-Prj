import { Page } from "@playwright/test";
import { MESSAGES } from "@data-test/Messages";

export default class OrderStatusPage {
    constructor(private page: Page) {}

    async getItemName(productName: string) {
        return this.page.getByText(`${productName}`);
    }

    async getItemQuantity(quantity: string) {
        return this.page.getByText(`× ${quantity}`);
    }

    async getOrderDetail(prodName: string) {
        return this.page.locator(`//h2[text()='Order details']//following-sibling::table//a[text()='${prodName}']`);
    }

    async getSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }
}