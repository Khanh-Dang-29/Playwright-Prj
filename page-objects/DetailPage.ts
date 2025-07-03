import { Locator, Page } from "@playwright/test";

export default class DetailPage {
    readonly addToCartBtn: Locator;
    readonly cartBtn: Locator;
    readonly checkoutBTn: Locator;

    constructor(private page: Page) {
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
        this.cartBtn = page.getByRole('link').filter({ hasText: '$' });
        this.checkoutBTn = page.getByRole('link', { name: 'checkout' });
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async clickCart() {
        await this.cartBtn.hover();
    }

    async clickCheckout() {
        await this.checkoutBTn.click();
    }

    async goToCart() {
        await this.cartBtn.click();
        await this.page.reload();
    }

    async getQuantity() {
        const prdName = await this.page.locator('.product_title').innerText();
        return this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value');
    }
}