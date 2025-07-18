import { test, expect } from "utils/fixtures";
import { PAGE_NAV } from "data-test/PageNav";
import BILLING_INFO from "data-test/BillingInfo";

test("TC03 - Verify users can buy an item using different payment methods (all payment methods)", async ({
    homePage,
    loginPage,
    accountPage,
    detailPage,
    productPage,
    checkoutPage,
    orderStatusPage
}) => {
    // Step 1: Open browser and navigate to page
    await homePage.navigate();

    // Step 2: Login with valid credentials
    await homePage.goToLoginPage();
    await loginPage.login();

    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 4: Select an item and add to cart
    await productPage.chooseProduct('AirPods');
    await detailPage.addToCart();

    // Step 5: Go to Checkout page
    await detailPage.clickCart();
    await detailPage.clickCheckout();

    // Step 6: Choose a different payment method (Direct bank transfer, Cash on delivery)
    await checkoutPage.choosePaymentMethod('Direct bank transfer');

    // Step 7: Complete the payment process
    await checkoutPage.fillBillingDetails(BILLING_INFO);
    await checkoutPage.placeOrder();

    // Step 8: Verify order confirmation message
    await expect(orderStatusPage.successMessage).toBeVisible();
})