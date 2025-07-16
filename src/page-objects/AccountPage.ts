import { Locator, Page } from "@playwright/test";

export default class AccountPage {
    readonly allDepartmentsDropdown: Locator = this.page.getByText('All departments');

    constructor(private page: Page) {}

    async navigateToAllDepartmentsDropdown() {
        await this.allDepartmentsDropdown.hover();
    }

    async selectPage(optionName: string) {
        await this.page.getByRole('link', { name: ` ${optionName}` }).click();
    }

    async selectDepartments(dpName: string) {
        await this.page.getByRole('link', { name: dpName }).click();
    }

    async goToPage(pageName: string) {
        await this.page.locator('#menu-main-menu-1').getByRole('link', { name: pageName }).click();
    }
}