import { Locator, Page } from "@playwright/test";

export default class LoginPage {
    readonly username: Locator;
    readonly password: Locator;
    readonly submitBtn: Locator;
    readonly allDepartmentsDropdown: Locator;
    private optionName: Locator;

    constructor(private page: Page) {
        this.username = page.getByRole('textbox', { name: 'Username or email address *' });
        this.password = page.getByRole('textbox', { name: 'Password *' });
        this.submitBtn = page.getByRole('button', { name: 'log in' });
        this.allDepartmentsDropdown = page.getByText('All departments');
    }

    async login() {
        await this.username.fill(process.env.USER_NAME!);
        await this.password.fill(process.env.PASSWORD!);
        await this.submitBtn.click();
    }

    async goToPage(optionName: string) {
        await this.allDepartmentsDropdown.hover();
        // this.optionName = this.page.locator("//div[@class='secondary-menu-wrapper']//a[text()='"+ optionName +"']");
        this.optionName = this.page.locator('.secondary-menu-wrapper a').filter({ hasText: `${optionName}`});
        await this.optionName.click();
    }
}