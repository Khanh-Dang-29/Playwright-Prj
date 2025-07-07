import { test, expect } from "../config-fixtures/fixtures";
import { DEPARTMENTS } from "../dataTest/Departments";
import { PAGE_NAV } from "../dataTest/PageNav";
import { BILLING_INFO } from "../dataTest/BillingInfo";

test("TC05 - Verify orders appear in order history", async ({ page, homePage, loginPage, accountPage }) => {
    // Pre-condition: User has placed 02 orders
    await accountPage.goToPage(PAGE_NAV.SHOP);
    const prdList = ['AirPods', 'iPad Air 2'];
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
})