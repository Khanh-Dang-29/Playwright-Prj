import { Locator, Page } from "@playwright/test";

export default class LoginPage {
    readonly usernameTextbox: Locator = this.page.getByRole('textbox', { name: 'Username or email address *' });
    readonly passwordTextbox: Locator = this.page.getByRole('textbox', { name: 'Password *' });
    readonly submitButton: Locator = this.page.getByRole('button', { name: 'log in' });
    readonly allDepartmentsDropdown: Locator = this.page.getByText('All departments');

    constructor(private page: Page) {}

    async login() {
        await this.usernameTextbox.fill(process.env.USER_NAME!);
        await this.passwordTextbox.fill(process.env.PASSWORD!);
        await this.submitButton.click();
    }
}