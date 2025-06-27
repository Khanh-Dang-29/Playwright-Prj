import { Locator, Page } from "@playwright/test";
import { writeFileSync } from 'fs';

export default class ProductPage {
    // private productView: Locator;
    // private changeViewBtn: Locator;
    private product: Locator;

    constructor(private page: Page) {
        this.product = this.product;
    }

    // async getDisplayProductView(displayType: string) {
    //     return this.productView = this.page.locator(`//div[contains(@class,'products-${displayType}')]`);
    // }

    // async changeDisplayView(displayType: string) {
    //     this.changeViewBtn = this.page.locator(`//div[contains(@class,'switch-${displayType}')]`);
    //     await this.changeViewBtn.click();
    // }

    async chooseProduct(productName: string) {
        this.product = this.page.getByRole('link', { name: `${productName}`, exact: true });
        await this.product.click();
    }

    async chooseRandomProd() {
        await this.page.waitForSelector('.content-product');
        const items = this.page.locator('.content-product ');
        const count = await items.count();

        if(count === 0) {
            console.log('Không tìm thấy sản phẩm nào!');
            return;
        }

        const randomIndex = Math.floor(Math.random() * count);
        console.log(randomIndex);
        const selected = items.nth(0);

        const category = await selected.locator('.products-page-cats').locator('a').innerText();
        const title = await selected.locator('.product-title').locator('a').innerText();
        const price = await selected.locator('.price').locator('span').locator('bdi').innerText();
        const rating = await selected.locator('.star-rating').getAttribute('aria-label');

        const product = { category, title, price, rating };
        console.log(product);
        writeFileSync('selected-product.json', JSON.stringify(product, null, 2));

        await this.page.getByRole('link', { name: `${title}`, exact: true }).click();
    }
}