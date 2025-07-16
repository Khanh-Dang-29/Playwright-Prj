import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly loginButton: Locator = this.page.getByRole('link', { name: 'Log in / Sign up' });
    readonly accountButton: Locator = this.page.locator('.header-top .login-link');

    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto(process.env.URL!);
    }

    async goToLoginPage() {
        await this.loginButton.click();
    }

    async goToMyAccountPage() {
        await this.accountButton.click();
    }
}