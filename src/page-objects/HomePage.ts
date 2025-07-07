import { Locator, Page } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();

export default class HomePage {
    readonly loginBtn: Locator;
    readonly accountBtn: Locator;

    constructor(private page: Page) {
        this.loginBtn = page.getByRole('link', { name: 'Log in / Sign up' });
        this.accountBtn = page.locator('.header-top .login-link');
    }

    async navigate() {
        await this.page.goto(process.env.URL!);
    }

    async goToLoginPage() {
        await this.loginBtn.click();
    }

    async goToMyAccountPage() {
        await this.accountBtn.click();
    }
}