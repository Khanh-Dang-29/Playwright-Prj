import { test, expect } from "utils/fixtures";
import { DEPARTMENTS } from "data-test/Departments";
import { BILLING_INFO } from "data-test/BillingInfo";

const billingDetails: BILLING_INFO = {
        firstName: 'Alice',
        lastName: 'Smith',
        country: 'United States (US)',
        StrAdd: 'Oak Avenue',
        city: 'Los Angeles',
        phoneNum:'9876543210',
        zipCode: '12345-6789',
        state: 'California',
        stateInShort: 'CA',
        email: process.env.USER_NAME!
};

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
    // await productPage.chooseProduct('DJI Mavic Pro Camera Drone');
    await productPage.chooseRandomPrd();
    const prdName = await detailPage.getPrdName();
    const prdQuantity = await detailPage.getQuantity();
    const prdPrice = await detailPage.getPrice();

    // Step 9: Click 'Add to Cart'
    await detailPage.addToCart();

    // Step 10: Go to the cart
    // Step 11: Verify item details in mini content (confirm w/)
    await detailPage.clickCart();

    // Step 12: Click on Checkout
    await detailPage.clickCheckout();

    // Step 13: Verify Checkout page displays
    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');

    // Step 14: Verify item details in order
    // const itemOrdered = await checkoutPage.getItemOrdered(prdName, prdQuantity);
    await expect(await checkoutPage.getItemOrdered()).toHaveText(new RegExp(`\\s*${prdName}\\s*×\\s*${prdQuantity}\\s*`, 'i'));

    // Step 15: Fill the billing details with default payment method
    await checkoutPage.fillBillingDetails(billingDetails);

    // Step 16: Click on PLACE ORDER
    await checkoutPage.placeOrder();

    // Step 17: Verify Order status page displays
    // await expect(page).toHaveURL(/.*order-received.*/);

    // Step 18: Verify the Order details with billing and item information
    await expect(await orderStatusPage.getItemName(prdName)).toHaveText(new RegExp(`${prdName}`, 'i'));
    await expect(await orderStatusPage.getItemQuantity(prdName)).toHaveText(`× ${prdQuantity}`);
    await expect(await orderStatusPage.getItemPrice(prdName)).toHaveText(`${prdPrice}`);
    await expect(orderStatusPage.billingAddress).toHaveText(new RegExp (
        `\\s*${billingDetails
            .firstName}\\s*${billingDetails
            .lastName}\\s*${billingDetails
            .StrAdd}\\s*${billingDetails
            .city}\\s*,\\s*${billingDetails
            .stateInShort}\\s*${billingDetails
            .zipCode}\\s*${billingDetails
            .phoneNum}\\s*${billingDetails
            .email}\\s*`)
    );
})