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
        const prdName = await this.getPrdName();
        return parseFloat(await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? '0');
    }

    async getPrice() {
        const price = await this.page.locator('.fixed-content .price .woocommerce-Price-amount').last().innerText();
        const numberOnly = price.replace(/[^0-9.]/g, '');
        return parseFloat(numberOnly);
    }

    async getPrdName() {
        return this.page.locator('.product_title').innerText();
    }
}