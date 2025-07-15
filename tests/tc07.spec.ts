import { test, expect } from "utils/fixtures";
import { PAGE_NAV } from "data-test/PageNav";

test("TC07 - Ensure proper error handling when mandatory fields are blank", async ({
    homePage,
    accountPage,
    productPage,
    detailPage,
    checkoutPage
}) => {
    // Pre-condition:User is at checkout
    await homePage.navigate();
    await accountPage.goToPage(PAGE_NAV.SHOP);
    await productPage.chooseProduct('iPad Air 2');
    await detailPage.addToCart();
    await detailPage.clickCart();
    await detailPage.clickCheckout();

    // Step 1: Leave mandatory fields (address, payment info) blank
    // Step 2: Click 'Confirm Order'
    await checkoutPage.placeOrder();
    await checkoutPage.placeOrder(); // Click 1 more time to solve the issue fields are not highlighted

    // Step 3: Verify error messages (System should highlight missing fields and show an error message)
    const errorMsg = await checkoutPage.getErrMsg();
    await expect(errorMsg).toBeVisible();

    const fields = ['First name', 'Last name', 'Street address', 'Town / City', 'ZIP Code', 'Phone', 'Email address'];
    await checkoutPage.verifyFieldHighlighted(fields);
})