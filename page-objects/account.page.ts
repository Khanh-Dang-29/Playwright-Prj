import { Locator, Page } from "@playwright/test";

export default class AccountPage {
    private optionName: Locator;
    readonly allDepartmentsDropdown: Locator;

    constructor(private page: Page) {
        this.allDepartmentsDropdown = page.getByText('All departments');
    }

    async goToPage(optionName: string) {
        await this.allDepartmentsDropdown.hover();
        this.optionName = this.page.getByRole('link', { name: ` ${optionName}` });
        await this.optionName.click();
    }
}