import { test, expect } from "../config-fixtures/fixtures";
import { PAGE_NAV } from "../dataTest/PageNav";
import { BILLING_INFO } from "../dataTest/BillingInfo";

const billingDetails: BILLING_INFO = {
        firstName: 'Alice',
        lastName: 'Smith',
        country: 'United States (US)',
        StrAdd: 'Oak Avenue',
        city: 'Los Angeles',
        phoneNum:'9876543210',
        zipCode: '123456789',
        state: 'California',
        email: process.env.USER_NAME!
};

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
    // Step 2: Login with valid credentials
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
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();

    // Step 8: Verify order confirmation message
    await expect(await orderStatusPage.getSuccessMsg()).toBeVisible();
})