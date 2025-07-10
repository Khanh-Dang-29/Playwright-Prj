import { test, expect } from "@utils/fixtures";
import { PAGE_NAV } from "@data-test/PageNav";
import { BILLING_INFO } from "@data-test/BillingInfo";

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

test("TC06 - Verify users try to buy an item without logging in (As a guest)", async ({
    homePage,
    accountPage,
    productPage,
    detailPage,
    checkoutPage,
    orderStatusPage
}) => {
    // Step 1: Open https://demo.testarchitect.com/
    // Step 2: Navigate to 'Shop' or 'Products' section
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 3: Add a product to cart
    await productPage.chooseProduct('iPad Air 2');
    await detailPage.addToCart();

    // Step 4: Click on Cart button
    await detailPage.clickCart();

    // Step 5: Proceed to complete order
    await detailPage.clickCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage. placeOrder();

    await expect(await orderStatusPage.getSuccessMsg()).toBeVisible();
})