import { Locator, Page, expect } from "@playwright/test";
import { MESSAGES } from "data-test/Messages";

export default class CartPage {
    readonly clearCartButton: Locator;
    readonly plusButton: Locator;
    readonly minusButton: Locator;
    readonly title: Locator;
    readonly updateCartBtn: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(private page: Page) {
        this.clearCartButton = page.locator('.clear-cart');
        this.plusButton = page.locator('.plus');
        this.minusButton = page.locator('.minus');
        this.title = page.locator('.product-title');
        this.updateCartBtn = page.getByRole('button', { name: 'UPDATE CART' });
        this.proceedToCheckoutButton = page.getByRole('link', { name: 'PROCEED TO CHECKOUT' });
    }

    async verifyOrdersInTable() {
        const cartItems =  await this.page.locator('.table-responsive table tbody tr.cart_item').count();
        expect(cartItems).toBeGreaterThan(0);
    }

    async clearCart() {
        await this.clearCartButton.click();
    }

    getEmptyCartMsg() {
        return this.page.getByRole('heading', { name: MESSAGES.EMPTY_CART_MESSAGE });
    }

    getOrderedItemQuantity(prdName: string) {
        return this.page.getByRole('spinbutton', { name: `${prdName} quantity` });
    }

    async addQuantity() {
        await this.plusButton.click();
        await this.page.waitForSelector('form .blockOverlay');
        await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
    }

    async reduceQuantity() {
        await this.minusButton.click();
        await this.page.waitForSelector('form .blockOverlay');
        await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
    }

    async getOrderItemPrice(prdName: string) {
        return await this.page.locator('tr')
        .filter({ 
            has: this.page.getByRole('link', { name: prdName }) 
        })
        .locator('.product-subtotal span bdi')
        .innerText();
    }

    async fillQuantity(prdName: string, quantity: string) {
        await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).fill(quantity);
    }

    async updateCart() {
        await this.updateCartBtn.click();
        await this.page.waitForSelector('form .blockOverlay');
        await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async verifyItemOrdered(products: string[][]) {
        for(let i = 0; i < products.length; i++) {
            const actualItemListInfo = [];
            const item = this.page.locator('.cart_item').nth(i);
            const itemName = await item.locator('.product-title').innerText();
            actualItemListInfo.push(itemName);

            const itemPrice = await item.locator('.product-price .woocommerce-Price-amount').innerText();
            actualItemListInfo.push(itemPrice);

            const itemQuantity = await item.locator('.qty').getAttribute('value');
            actualItemListInfo.push(itemQuantity);

            expect(actualItemListInfo).toEqual(products[i]);
        }
    }
}