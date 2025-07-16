import { Locator, Page } from "@playwright/test";

export default class LoginPage {
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly submitButton: Locator;
    readonly allDepartmentsDropdown: Locator;

    constructor(private page: Page) {
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username or email address *' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' });
        this.submitButton = page.getByRole('button', { name: 'log in' });
        this.allDepartmentsDropdown = page.getByText('All departments');
    }

    async login() {
        await this.usernameTextbox.fill(process.env.USER_NAME!);
        await this.passwordTextbox.fill(process.env.PASSWORD!);
        await this.submitButton.click();
    }
}