import { Locator, Page } from "@playwright/test";

export default class OrderStatusPage {
    constructor(private page: Page) {
    }

    async getItemName(productName: string) {
        return this.page.getByText(`${productName}`);
    }

    async getItemQuantity(quantity: string) {
        return this.page.getByText(`× ${quantity}`);
    }

    async getOrderDetail(prodName: string) {
        return this.page.locator(`//h2[text()='Order details']//following-sibling::table//a[text()='${prodName}']`);
    }

    async getSuccessMsg(msg: string) {
        return this.page.getByText(`${msg}`);
    }
}