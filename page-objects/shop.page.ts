import { Locator, Page } from "@playwright/test";
import { writeFileSync } from 'fs';
import DetailPage from "./detail.page";

export default class ShopPage {
    readonly closePopupBtn: Locator;

    constructor(private page: Page) {
        this.closePopupBtn = page.getByRole('button', { name: 'Close' });
    }

    async chooseRandomProds(numberOfPrds: number) {
        await this.closePopupBtn.click();
        await this.page.waitForSelector('.content-product ');
        const items = this.page.locator('.content-product ');
        const count = await items.count();
        const detailPage = new DetailPage(this.page);
        console.log(count);

        if(count === 0) {
            console.log('Không tìm thấy sản phẩm nào!');
            return;
        }

        var i: number = 0;

        while(i <= numberOfPrds){
            const randomIndex = Math.floor(Math.random() * count);
            console.log(randomIndex);
            const selected = items.nth(randomIndex);

            const category = await selected.locator('.products-page-cats').locator('a').innerText();
            const title = await selected.locator('.product-title').locator('a').innerText();
            var price: any = await selected.locator('.price span bdi').count();
            if(price > 1) {
                price = await selected.locator('.price').locator('ins').locator('bdi').innerText();
            } else {
                price = await selected.locator('.price').locator('span').locator('bdi').innerText();
            }
            const rating = await selected.locator('.star-rating').getAttribute('aria-label');

            const product = { category, title, price, rating };
            console.log(product);
            writeFileSync('selected-product.json', JSON.stringify(product, null, 2));
            // await selected.locator('.product-content-image').hover();
            // await this.page.getByRole('link', { name: `Add “${title}” to your cart`, exact: true }).locator('.footer-product').click()
            // await this.page.locator('.text-center product-details');
            await this.page.getByRole('link', { name: `${title}`, exact: true }).click();
            await detailPage.addToCart();
            await this.page.goBack();
            i++;
        }
    }
} 