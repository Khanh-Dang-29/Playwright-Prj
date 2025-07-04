import { Locator, Page, expect } from "@playwright/test";

export default class CartPage {
    readonly clearCartBtn: Locator;
    readonly plusBtn: Locator;
    readonly minusBtn: Locator;
    readonly title: Locator;

    constructor(private page: Page) {
        this.clearCartBtn = page.locator('.clear-cart');
        this.plusBtn = page.locator('.plus');
        this.minusBtn = page.locator('.minus');
        this.title = page.locator('.product-title');
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

    async getOrderedItemQuantity(prdName: string) {
        return parseFloat(await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? '0');
    }

    async addQuantity() {
        await this.plusBtn.click();
        await this.page.waitForSelector('.blockUI');
        await this.page.waitForSelector('.blockUI', { state: 'detached' });
    }

    async reduceQuantity() {
        await this.minusBtn.click();
        await this.page.waitForSelector('.blockUI');
        await this.page.waitForSelector('.blockUI', { state: 'detached' });
    }

    async getOrderItemPrice(prdName: string) {
        const price = await this.page.locator('tr').filter({ has: this.page.getByRole('link', { name: `${prdName}` }) }).locator('.product-subtotal span bdi').innerText();
        const numberOnly = price.replace(/[^0-9.]/g, '');
        return parseFloat(numberOnly);
    }
}