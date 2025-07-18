import { test, expect } from "utils/fixtures";
import { PAGE_NAV } from "data-test/PageNav";

test("TC08 - Verify users can clear the cart", async ({ 
    page,
    homePage,
    loginPage,
    accountPage,
    productPage,
    detailPage,
    cartPage 
}) => {
    // Pre-conditions: User added the items into cart
    await homePage.navigate();
    await homePage.goToLoginPage();
    await loginPage.login();
    await accountPage.goToPage(PAGE_NAV.SHOP);
    await productPage.chooseProduct('AirPods');
    await detailPage.addToCart();
    await page.goBack();
    await productPage.chooseProduct('iPad Air 2');
    await detailPage.addToCart();

    // Step 1: Open browser and go to https://demo.testarchitect.com/
    // Step 2: Login with valid credentials 
    // Step 3: Go to Shopping cart page
    await detailPage.goToCart(); 

    // Step 4: Verify items show in table
    await cartPage.verifyOrdersInTable();
    
    // Step 5: Click on Clear shopping cart
    await cartPage.clearCart();

    // Step 6: Verify empty cart page displays
    await expect(cartPage.emptyCartMessage).toBeVisible();
})