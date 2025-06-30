import { Locator, Page } from "@playwright/test";

export default class CheckoutPage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly country: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly phoneNum: Locator;
    readonly placeOrderBtn: Locator;

    constructor(private page: Page) {
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.country = page.getByLabel('Country / Region *');
        this.streetAddress = page.getByRole('textbox', { name: 'Street address *' });
        this.city = page.getByRole('textbox', { name: 'Town / City *' });
        this.phoneNum = page.getByRole('textbox', { name: 'Phone *' });
        this.placeOrderBtn = page.getByRole('button', { name: 'Place order' });
    }

    async getItemOrdered(productName: string, quantity: number) {
        return this.page.getByRole('cell', { name: `${productName}  × ${quantity}` });
    }

    async fillBillingDetails(param:{firstName: string, lastName: string, country: string, streetAddress: string, city: string, phoneNum: string}): Promise<void> {
        const { firstName, lastName, country, streetAddress, city, phoneNum } = param;
        
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.country.selectOption(country);
        await this.streetAddress.fill(streetAddress);
        await this.city.fill(city);
        await this.phoneNum.fill(phoneNum);
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }
}