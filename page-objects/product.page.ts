import { Locator, Page } from "@playwright/test";

export default class ProductPage {
    // private productView: Locator;
    // private changeViewBtn: Locator;
    readonly sortDropdown: Locator;
    readonly closePopupBtn: Locator;

    constructor(private page: Page) {
        this.sortDropdown = page.getByRole('combobox', { name: 'Shop order' });
        this.closePopupBtn = page.getByRole('button', { name: 'Close' });
    }

    // async getDisplayProductView(displayType: string) {
    //     return this.productView = this.page.locator(`//div[contains(@class,'products-${displayType}')]`);
    // }

    // async changeDisplayView(displayType: string) {
    //     this.changeViewBtn = this.page.locator(`//div[contains(@class,'switch-${displayType}')]`);
    //     await this.changeViewBtn.click();
    // }

    async chooseProduct(productName: string) {
        await this.page.getByRole('link', { name: `${productName}`, exact: true }).click();
    }

    async sortItems(sort: string) {
        await this.sortDropdown.selectOption(`${sort}`);
    }

    async getAllPrice() {
        // let price = [];
        await this.page.waitForSelector('.content-product');
        await this.closePopupBtn.click();
        const allPrices = await this.page.locator('.content-product').count();

        for(let i = 1; i <= allPrices; i++) {
            // let priceCount = await this.page.locator('.price ins bdi').nth(i).count();
            // if (priceCount > 0) {
            //     let prdPrice = (await this.page.locator('.content-product .price ins bdi').nth(i).innerText());
            //     console.log(prdPrice);
            // } else {
            //     let prdPrice = (await this.page.locator('.content-product .price span bdi').nth(i).innerText());
            //     console.log(prdPrice);
            // } 
            const price : string = await this.page.locator
            (`(//div[@class ='content-product '])[${i}]//span[@class ='woocommerce-Price-amount amount' and not(ancestor::del)]`).
            innerText();
            console.log(price);
        }
    }

    async getItemOrder() {

    }
}