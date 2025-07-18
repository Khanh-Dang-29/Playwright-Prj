import { test } from "utils/fixtures";
import { PAGE_NAV } from "data-test/PageNav";
import BILLING_INFO from "data-test/BillingInfo";
import ItemOrderUtils from "actions/ItemOrderedUtils";

test("TC05 - Verify orders appear in order history", async ({ 
    page,
    homePage,
    loginPage,
    accountPage,
    orderHistory
}) => {
    // Pre-conditions: User has placed 02 orders
    await homePage.navigate();
    await homePage.goToLoginPage();
    await loginPage.login();
    const itemOrderUtils = new ItemOrderUtils(page);
    const ordNumList = await itemOrderUtils.orderRandomPrd(2, BILLING_INFO);

    // Step 1: Go to My Account page
    await homePage.goToMyAccountPage();

    // Step 2: Click on Orders in left navigation
    await accountPage.selectPage(PAGE_NAV.ORDERS);

    // Step 3: Verify order details (The orders are displayed in the user’s order history)
    await orderHistory.verifyOrderHistory(ordNumList);
})