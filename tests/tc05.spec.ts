import { test } from "utils/fixtures";
import { BILLING_INFO } from "data-test/BillingInfo";
import { PAGE_NAV } from "data-test/PageNav";

const billingDetails: BILLING_INFO = {
        firstName: 'Alice',
        lastName: 'Smith',
        country: 'United States (US)',
        StrAdd: 'Oak Avenue',
        city: 'Los Angeles',
        phoneNum:'9876543210',
        zipCode: '123456789',
        state: 'California',
        stateInShort: 'CA',
        email: process.env.USER_NAME!
};

test("TC05 - Verify orders appear in order history", async ({ 
    homePage,
    loginPage,
    accountPage,
    productPage,
    orderHistory
}) => {
    // Pre-conditions: User has placed 02 orders
    await homePage.navigate();
    await homePage.goToLoginPage();
    await loginPage.login();
    const ordNumList = await productPage.addRandomPrd(2, billingDetails);

    // Step 1: Go to My Account page
    await homePage.goToMyAccountPage();

    // Step 2: Click on Orders in left navigation
    await accountPage.selectPage(PAGE_NAV.ORDERS);

    // Step 3: Verify order details (The orders are displayed in the user’s order history)
    await orderHistory.verifyOrderHistory(ordNumList);               
})