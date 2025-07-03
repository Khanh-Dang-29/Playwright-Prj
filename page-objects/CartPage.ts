import { Locator, Page, expect } from "@playwright/test";

export default class CartPage {
    readonly clearCartBtn: Locator;
    readonly plusBtn: Locator;
    readonly minusBtn: Locator;

    constructor(private page: Page) {
        this.clearCartBtn = page.locator('.clear-cart');
        this.plusBtn = page.locator('.plus');
        this.minusBtn = page.locator('.minus');
    }

    async verifyOrdersInTable() {
        const cartItems =  await this.page.locator('.table-responsive table tbody tr.cart_item').count();
        await expect(cartItems).toBeGreaterThan(0);
    }

    async clearCart() {
        await this.clearCartBtn.click();
    }

    async getEmptyCartMsg(msg: string) {
        return this.page.getByRole('heading', { name: `${msg}`});
    }

    async getOrderedItemQuantity() {
        const prdName = await this.page.locator('.product-title').innerText();
        return this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value');
    }

        async addQuantity() {
        await this.plusBtn.click();
    }

    async reduceQuantity() {
        await this.minusBtn.click();
    }
}