import { Locator, Page } from "@playwright/test";
import DetailPage from "./detail.page";

export default class ShopPage {
    readonly closePopupBtn: Locator;

    constructor(private page: Page) {
        this.closePopupBtn = page.getByRole('button', { name: 'Close' });
    }

    async getAllProducts() {
        await this.page.waitForSelector('.content-product');
        return this.page.locator('.content-product');
    }

    async getRandomProductInfo(items: Locator): Promise<{ category: string; title: string; price: string }> {
        const count = await items.count();
        const randomIndex = Math.floor(Math.random() * count);
        const selected = items.nth(randomIndex);

        const category = await selected.locator('.products-page-cats a').first().innerText();
        const title = await selected.locator('.product-title a').first().innerText();

        let price: string;
        const priceCount = await selected.locator('.price span bdi').count();
        if (priceCount > 1) {
            price = await selected.locator('.price ins bdi').first().innerText();
        } else {
            price = await selected.locator('.price span bdi').first().innerText();
        }

        return { category, title, price };
    }

    async addProductToCartByTitle(title: string) {
        await this.page.getByRole('link', { name: title, exact: true }).first().click();
        const detailPage = new DetailPage(this.page);
        await detailPage.addToCart();
        await this.page.goBack();
    }

    async addRandomProductsToCart(numberOfPrds: number): Promise<void> {
        const items = await this.getAllProducts();
        const count = await items.count();

        if (count === 0) {
            console.log('Không tìm thấy sản phẩm nào!');
            return;
        }

        let i = 0;

        while (i < numberOfPrds) {
            await this.closePopupBtn.click();

            const product = await this.getRandomProductInfo(items);
            console.log(`Selected product #${i + 1}:`, product);

            await this.addProductToCartByTitle(product.title);

            i++;
        }
    }
} 