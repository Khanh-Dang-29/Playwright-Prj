import { Locator, Page } from "@playwright/test";

export default class OrderStatusPage {
    private productName: Locator;
    private quantity: Locator;
    private orderDetail: Locator;

    constructor(private page: Page) {
        this.productName = this.productName;
        this.quantity = this.quantity;
        this.orderDetail = this.orderDetail;
    }

    async getItemName(productName: string) {
        return this.productName = this.page.getByText(`${productName}`);
    }

    async getItemQuantity(quantity: string) {
        return this.quantity = this.page.getByText(`× ${quantity}`);
    }

    async getOrderDetail(prodName: string) {
        return this.orderDetail = this.page.locator(`//h2[text()='Order details']//following-sibling::table//a[text()='${prodName}']`);
    }
}