import { test, expect } from "../config-fixtures/fixtures";
import { DEPARTMENTS } from "../dataTest/Departments";
import { PAGE_NAV } from "../dataTest/PageNav";
import { BILLING_INFO } from "../dataTest/BillingInfo";

test("TC02 - Verify users can buy multiple item successfully", async ({ homePage, loginPage, accountPage, shopPage }) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 4: Select multiple items and add to cart
    await shopPage.addRandomProductsToCart(3);

    // Step 5: Go to the cart and verify all selected items


    // Step 6: Proceed to checkout and confirm order


    // Step 7: Verify order confirmation message


})