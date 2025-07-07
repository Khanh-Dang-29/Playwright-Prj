import { Locator, Page, expect } from "@playwright/test";
import { MESSAGES } from "@data-test/Messages";

export default class CartPage {
    readonly clearCartBtn: Locator;
    readonly plusBtn: Locator;
    readonly minusBtn: Locator;
    readonly title: Locator;
    readonly updateCartBtn: Locator;

    constructor(private page: Page) {
        this.clearCartBtn = page.locator('.clear-cart');
        this.plusBtn = page.locator('.plus');
        this.minusBtn = page.locator('.minus');
        this.title = page.locator('.product-title');
        this.updateCartBtn = page.getByRole('button', { name: 'UPDATE CART' });
    }

    async verifyOrdersInTable() {
        const cartItems =  await this.page.locator('.table-responsive table tbody tr.cart_item').count();
        await expect(cartItems).toBeGreaterThan(0);
    }

    async clearCart() {
        await this.clearCartBtn.click();
    }

    async getEmptyCartMsg() {
        return this.page.getByRole('heading', { name: MESSAGES.EMPTY_CART_MESSAGE });
    }

    async getOrderedItemQuantity(prdName: string) {
        return parseFloat(await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? '0');
    }

    async addQuantity() {
        await this.plusBtn.click();
        await this.page.waitForSelector('form .blockOverlay');
        await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
    }

    async reduceQuantity() {
        await this.minusBtn.click();
        await this.page.waitForSelector('form .blockOverlay');
        await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
    }

    async getOrderItemPrice(prdName: string) {
        const price = await this.page.locator('tr')
        .filter({ 
            has: this.page.getByRole('link', { name: `${prdName}` }) 
        })
        .locator('.product-subtotal span bdi')
        .innerText();
        const numberOnly = price.replace(/[^0-9.]/g, '');
        return parseFloat(numberOnly);
    }

    async fillQuantity(prdName: string, quantity: string) {
        await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).fill(quantity);
    }

    async updateCart() {
        await this.updateCartBtn.click();
    }
}