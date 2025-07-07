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
        // await this.page.waitForSelector('.content-product ');
        // await this.closePopupBtn.click();
        let price: number[] = [];
        
        const allPrices = await this.page.locator('.content-product ').count();

        for(let i = 1; i <= allPrices; i++) {
            // let priceCount = await this.page.locator('.content-product .price').filter({ hasNot: this.page.locator('del')}).nth(i).textContent();
            // console.log(priceCount);
            const allPrice : string = await this.page.locator
            (`(//div[@class ='content-product '])[${i}]//span[@class ='woocommerce-Price-amount amount' and not(ancestor::del)]`).
            innerText();
            const numberOnly = allPrice.replace(/[^0-9.]/g, '');
            const prices = parseFloat(numberOnly);
            price.push(prices);
        }
        return price;
    }

    async getItemOrder() {
        await this.page.waitForSelector('.loading', { state: 'detached' });
        return await this.getAllPrice();
    }

    async sortArray(sortType: string): Promise<number[]> {
        const price = await this.getItemOrder();
        let sorted: number[] = [];
        if(sortType === 'Ascend') {
            sorted = [...price].sort((a, b) => a - b);
        } else if (sortType === 'Descend') {
            sorted = [...price].sort((a, b) => b - a);
        } else {
            console.log('Cannot sort with value given!');
        }
        return sorted;
    }
}