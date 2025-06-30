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
}