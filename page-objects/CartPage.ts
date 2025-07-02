import { Locator, Page, expect } from "@playwright/test";

export default class CartPage {
    readonly clearCartBtn: Locator;

    constructor(private page: Page) {
        this.clearCartBtn = page.locator('.clear-cart');
    }

    async verifyOrdersInTable() {
        await this.page.reload();
        const cartItems =  await this.page.locator('.table-responsive table tbody tr.cart_item').count();
        await expect(cartItems).toBeGreaterThan(0);
    }

    async clearCart() {
        await this.clearCartBtn.click();
    }

    async getEmptyCartMsg(msg: string) {
        return this.page.getByRole('heading', { name: `${msg}`});
    }
}