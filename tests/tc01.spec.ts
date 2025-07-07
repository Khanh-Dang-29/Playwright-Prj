import { test, expect } from "@utils/fixtures";
import { DEPARTMENTS } from "@data-test/Departments";
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
        email: process.env.USER_NAME!
};

test("TC01 - Verify users can buy an item successfully", async ({ 
    page,
    accountPage,
    productPage,
    detailPage,
    checkoutPage,
    orderStatusPage
}) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Navigate to All departments section
    await accountPage.navigateToAllDepartmentsDropdown();

    // Step 4: Select Electronic Components & Supplies
    await accountPage.selectPage(DEPARTMENTS.ELECTRONIC_COMPONENT_AND_SUPPLIES);

    // Step 5: Verify the items should be displayed as a grid
    // const gridDisplayProductView = await productPage.getDisplayProductView('grid');
    // await expect(gridDisplayProductView).toBeVisible();

    // Step 6: Switch view to list
    // await productPage.changeDisplayView('list');

    // Step 7: Verify the items should be displayed as a list
    // const listDisplayProductView = await productPage.getDisplayProductView('list');
    // await expect(listDisplayProductView).toBeVisible();

    // Step 8: Select andy item randomly to purchase (DJI Mavic Pro Camera Drone)
    await productPage.chooseProduct('DJI Mavic Pro Camera Drone');

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
    const itemOrdered = await checkoutPage.getItemOrdered('DJI Mavic Pro Camera Drone', 1);
    await expect(itemOrdered).toBeVisible();

    // Step 15: Fill the billing details with default payment method
    await checkoutPage.fillBillingDetails(billingDetails);

    // Step 16: Click on PLACE ORDER
    await checkoutPage.placeOrder();

    // Step 17: Verify Order status page displays
    await expect(page).toHaveURL(/.*order-received.*/);

    // Step 18: Verify the Order details with billing and item information
    const orderItem = await orderStatusPage.getItemName('DJI Mavic Pro Camera Drone');
    await expect(orderItem).toBeVisible();
})