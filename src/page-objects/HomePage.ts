import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly loginButton: Locator = this.page.getByRole('link', { name: 'Log in / Sign up' });
    readonly accountButton: Locator = this.page.locator('.header-top .login-link');
    readonly closeAdsButton: Locator = this.page.getByRole('button', { name: 'Close' });

    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto(process.env.URL!);
        await this.closeAdsButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.closeAdsButton.click();
    }

    async goToLoginPage() {
        await this.loginButton.click();
    }

    async goToMyAccountPage() {
        await this.accountButton.click();
    }
}