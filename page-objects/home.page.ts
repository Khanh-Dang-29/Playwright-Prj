import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly loginBtn: Locator;

    constructor(private page: Page) {
        this.loginBtn = page.getByRole('link', { name: 'Log in / Sign up' });
    }

    async navigate() {
        await this.page.goto("/");
    }

    async goToLoginPage() {
        await this.loginBtn.click();
    }
}