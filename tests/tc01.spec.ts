import { test, expect } from "utils/fixtures";
import { DEPARTMENTS } from "data-test/Departments";
import BILLING_INFO from "data-test/BillingInfo";

test("TC01 - Verify users can buy an item successfully", async ({ 
    page,
    homePage,
    loginPage,
    accountPage,
    productPage,
    detailPage,
    checkoutPage,
    orderStatusPage
}) => {
    // Step 1: Open browser and navigate to page
    await homePage.navigate();
    
    // Step 2: Login with valid credentials
    await homePage.goToLoginPage();
    await loginPage.login();

    // Step 3: Navigate to All departments section
    await accountPage.navigateToAllDepartmentsDropdown();

    // Step 4: Select Electronic Components & Supplies
    await accountPage.selectDepartments(DEPARTMENTS.ELECTRONIC_COMPONENT_AND_SUPPLIES);

    // Step 5: Verify the items should be displayed as a grid
    // Step 6: Switch view to list
    // Step 7: Verify the items should be displayed as a list
    // Step 8: Select andy item randomly to purchase (DJI Mavic Pro Camera Drone)
    await productPage.chooseRandomPrd();
    const prdName = await detailPage.getPrdName();
    const prdQuantity = await detailPage.getQuantity();
    const prdPrice = await detailPage.getPrice();

    // Step 9: Click 'Add to Cart'
    await detailPage.addToCart();

    // Step 10: Go to the cart
    // Step 11: Verify item details in mini content (confirm w/ BA)
    await detailPage.clickCart();

    // Step 12: Click on Checkout
    await detailPage.clickCheckout();

    // Step 13: Verify Checkout page displays
    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');

    // Step 14: Verify item details in order
    await expect(checkoutPage.itemOrderedInOrderTable).toHaveText(new RegExp(`\\s*${prdName}\\s*×\\s*${prdQuantity}\\s*`, 'i'));

    // Step 15: Fill the billing details with default payment method
    await checkoutPage.fillBillingDetails(BILLING_INFO);

    // Step 16: Click on PLACE ORDER
    await checkoutPage.placeOrder();

    // Step 17: Verify Order status page displays
    await expect(page).toHaveURL(/.*order-received.*/);

    // Step 18: Verify the Order details with billing and item information
    await expect(orderStatusPage.getItemName(prdName)).toHaveText(new RegExp(`${prdName}`, 'i'));
    await expect(orderStatusPage.getItemQuantity(prdName)).toHaveText(`× ${prdQuantity}`);
    await expect(orderStatusPage.getItemPrice(prdName)).toHaveText(`${prdPrice}`);
    await expect(orderStatusPage.billingAddress).toHaveText(new RegExp (
        `\\s*${BILLING_INFO
            .firstName}\\s*${BILLING_INFO
            .lastName}\\s*${BILLING_INFO
            .StrAdd}\\s*${BILLING_INFO
            .city}\\s*,\\s*${BILLING_INFO
            .stateInShort}\\s*${BILLING_INFO
            .zipCode}\\s*${BILLING_INFO
            .phoneNum}\\s*${BILLING_INFO
            .email}\\s*`)
    );
})