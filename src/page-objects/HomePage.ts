import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly loginButton: Locator;
    readonly accountButton: Locator;

    constructor(private page: Page) {
        this.loginButton = page.getByRole('link', { name: 'Log in / Sign up' });
        this.accountButton = page.locator('.header-top .login-link');
    }

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