import { Locator, Page } from "@playwright/test";
import DetailPage from "./DetailPage";

export default class AccountPage {
    readonly allDepartmentsDropdown: Locator;
    readonly detailPage;
    private optionName: Locator;
    private pageName: Locator;

    constructor(private page: Page) {
        this.allDepartmentsDropdown = page.getByText('All departments');
        this.detailPage = new DetailPage(page);
    }

    async navigateToAllDepartmentsDropdown() {
        await this.allDepartmentsDropdown.hover();
    }

    async selectPage(optionName: string) {
        this.optionName = this.page.getByRole('link', { name: ` ${optionName}` });
        await this.optionName.click();
    }

    async goToPage(pageName: string) {
        this.pageName = this.page.locator('#menu-main-menu-1').getByRole('link', { name: `${pageName}` });
        await this.pageName.click();
    }
}