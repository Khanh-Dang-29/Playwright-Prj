import { test, expect } from "utils/fixtures";
import { PAGE_NAV } from "data-test/PageNav";
import { BILLING_INFO } from "data-test/BillingInfo";

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

test("TC02 - Verify users can buy multiple item successfully", async ({ 
    page,
    homePage,
    loginPage,
    accountPage,
    productPage,
    detailPage,
    cartPage,
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

    // Step 4: Select multiple items and add to cart
    await productPage.chooseProduct('Beats Solo3 Wireless On-Ear');
    await detailPage.addToCart();
    const prd1 = await detailPage.getPrdInfoList();

    await page.goBack();

    await productPage.chooseProduct('Bose SoundLink Mini');
    await detailPage.addToCart();
    const prd2 = await detailPage.getPrdInfoList();

    // Step 5: Go to the cart and verify all selected items
    await detailPage.goToCart();
    const allPrd = [prd1, prd2];
    await cartPage.verifyItemOrdered(allPrd);

    // // Step 6: Proceed to checkout and confirm order
    await cartPage.clickProceedToCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();

    // // Step 7: Verify order confirmation message
    await expect(orderStatusPage.getSuccessMsg()).toBeVisible();
})