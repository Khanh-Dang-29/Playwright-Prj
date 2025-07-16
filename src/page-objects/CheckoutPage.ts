import { Locator, Page, expect } from "@playwright/test";
import { BILLING_INFO } from "data-test/BillingInfo";
import { COLORS } from "data-test/Colors";

export default class CheckoutPage {
    readonly firstNameTextbox: Locator = this.page.getByRole('textbox', { name: 'First name *' });
    readonly lastNameTextbox: Locator = this.page.getByRole('textbox', { name: 'Last name *' });
    readonly countryDropdown: Locator= this.page.getByLabel('Country / Region *');
    readonly streetAddressTextbox: Locator = this.page.getByRole('textbox', { name: 'Street address *' });
    readonly cityTextbox: Locator = this.page.getByRole('textbox', { name: 'Town / City *' });
    readonly phoneNumTextbox: Locator = this.page.getByRole('textbox', { name: 'Phone *' });
    readonly zipCodeTextbox: Locator = this.page.getByRole('textbox', { name: 'ZIP Code *' });
    readonly emailTextbox: Locator = this.page.getByRole('textbox', { name: 'Email address *' });
    readonly placeOrderButton: Locator = this.page.getByRole('button', { name: 'Place order' });
    readonly itemOrderedInOrderTable: Locator = this.page.locator('table.shop_table td.product-name');
    readonly errorMessage: Locator = this.page.getByRole('alert');
    
    constructor(private page: Page) {}

    async getItemOrderedPrice(prdName: string) {
        return this.page.locator('table.shop_table tr')
        .filter({ has: this.page.getByRole('cell', { name: prdName })})
        .locator('span.woocommerce-Price-amount');
    }

    async fillBillingDetails(info: BILLING_INFO): Promise<void> {
        await this.firstNameTextbox.fill(info.firstName);
        await this.lastNameTextbox.fill(info.lastName);
        await this.countryDropdown.selectOption(info.country);
        await this.streetAddressTextbox.fill(info.StrAdd);
        await this.cityTextbox.fill(info.city);
        await this.zipCodeTextbox.fill(info.zipCode);
        await this.phoneNumTextbox.fill(info.phoneNum);
        await this.emailTextbox.fill(info.email);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
        await this.page.waitForSelector('form .blockOverlay');
        await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
    }

    async choosePaymentMethod(method: string) {
        await this.page.getByText(`${method}`).click();
    }

    async verifyFieldHighlighted(fields: string[]) {
        for(const field of fields) {
            await expect(this.page.getByRole('textbox', { name: `${field} *` })).toHaveCSS('--et_inputs-border-color', COLORS.RED);
        }
    }
}