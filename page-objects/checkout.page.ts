import { Locator, Page } from "@playwright/test";

export default class CheckoutPage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly country: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly phoneNum: Locator;
    readonly zipCode: Locator;
    readonly email: Locator;
    readonly placeOrderBtn: Locator;
    
    constructor(private page: Page) {
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.country = page.getByLabel('Country / Region *');
        this.streetAddress = page.getByRole('textbox', { name: 'Street address *' });
        this.city = page.getByRole('textbox', { name: 'Town / City *' });
        this.zipCode = page.getByRole('textbox', { name: 'ZIP Code *' });
        this.phoneNum = page.getByRole('textbox', { name: 'Phone *' });
        this.email = page.getByRole('textbox', { name: 'Email address *' });
        this.placeOrderBtn = page.getByRole('button', { name: 'Place order' });
    }

    async getItemOrdered(productName: string, quantity: number) {
        return this.page.getByRole('cell', { name: `${productName}  × ${quantity}` });
    }

    async fillBillingDetails(info: billingInfo): Promise<void> {
        await this.firstName.fill(info.firstName);
        await this.lastName.fill(info.lastName);
        await this.country.selectOption(info.country);
        await this.streetAddress.fill(info.StrAdd);
        await this.city.fill(info.city);
        await this.zipCode.fill(info.zipCode);
        await this.phoneNum.fill(info.phoneNum);
        await this.email.fill(info.email);
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }

    async paymentMethod(method: string) {
        await this.page.getByText(`${method}`).click();
    }
}