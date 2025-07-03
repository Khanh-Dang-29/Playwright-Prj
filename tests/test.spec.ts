import { test as base, expect } from "@playwright/test";
import { DEPARTMENTS } from "../dataTest/Departments";
import { PAGE_NAV } from "../dataTest/PageNav";
import { BILLING_INFO } from "../dataTest/BillingInfo";
import HomePage from "../page-objects/HomePage";
import LoginPage from "../page-objects/LoginPage";
import ProductPage from "../page-objects/ProductPage";
import DetailPage from "../page-objects/DetailPage";
import AccountPage from "../page-objects/AccountPage";
import CheckoutPage from "../page-objects/CheckoutPage";
import OrderStatusPage from "../page-objects/OrderStatusPage";
import ShopPage from "../page-objects/ShopPage";
import CartPage from "../page-objects/CartPage";

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

const test = base.extend<{ homePage: HomePage,
                        loginPage: LoginPage,
                        accountPage: AccountPage,
                        producPage: ProductPage, 
                        detailPage: DetailPage,
                        checkoutPage: CheckoutPage,
                        orderStatusPage: OrderStatusPage,
                        shopPage: ShopPage,
                        cartPage: CartPage }>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.goToLoginPage();
        await use(homePage);
    },

    loginPage: async ({ page }, use) => { 
        const loginPage = new LoginPage(page);
        await loginPage.login();
        await use(loginPage);
    },

    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },

    producPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    detailPage: async ({ page }, use) => {
        await use(new DetailPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    orderStatusPage: async ({ page }, use) => {
        await use(new OrderStatusPage(page));
    },

    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
    },

    cartPage: async({ page }, use) => {
        await use(new CartPage(page));
    }
})

test("TC01 - Verify users can buy an item successfully", async ({ page, accountPage, producPage, detailPage, checkoutPage, orderStatusPage }) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Navigate to All departments section
    await accountPage.navigateToAllDepartmentsDropdown();

    // Step 4: Select Electronic Components & Supplies
    await accountPage.selectPage(DEPARTMENTS.ELECTRONIC_COMPONENT_AND_SUPPLIES);

    // Step 5: Verify the items should be displayed as a grid
    // const gridDisplayProductView = await producPage.getDisplayProductView('grid');
    // await expect(gridDisplayProductView).toBeVisible();

    // Step 6: Switch view to list
    // await producPage.changeDisplayView('list');

    // Step 7: Verify the items should be displayed as a list
    // const listDisplayProductView = await producPage.getDisplayProductView('list');
    // await expect(listDisplayProductView).toBeVisible();

    // Step 8: Select andy item randomly to purchase (DJI Mavic Pro Camera Drone)
    await producPage.chooseProduct('DJI Mavic Pro Camera Drone');

    // Step 9: Click 'Add to Cart'
    await detailPage.addToCart();

    // Step 10: Go to the cart
    // Step 11: Verify item details in mini content (confirm w/)
    await detailPage.clickCart();

    // Step 12: Click on Checkout
    await detailPage.clickCheckout();

    // Step 13: Verify Checkbout page displays
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

test("TC03 - Verify users can buy an item using different payment methods (all payment methods)", async ({ homePage, loginPage, accountPage, detailPage, producPage, checkoutPage, orderStatusPage }) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 4: Select an item and add to cart
    await producPage.chooseProduct('AirPods');
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
    const cfMsg =  await orderStatusPage.getSuccessMsg('Thank you. Your order has been received.');
    await expect(cfMsg).toBeVisible();
})

test("TC04 - Verify users can sort items by price", async ({ page, homePage, loginPage, accountPage, producPage }) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 4: Switch view to list
    // await producPage.changeDisplayView('list');

    // Step 5: Sort items by price (low to high / high to low)
    await producPage.sortItems('Sort by price: low to high');

    // Step 6: Verify order of items
    const actualPriceSort = await producPage.getItemOrder();
    const expectedPriceSort = await producPage.sortArray('Ascend');
    expect(actualPriceSort).toEqual(expectedPriceSort);
})

test("TC05 - Verify orders appear in order history", async ({ page, homePage, loginPage, accountPage }) => {
    // Pre-condition: User has placed 02 orders
    await accountPage.goToPage(PAGE_NAV.SHOP);
    const prdList = ['AirPods', 'iPad Air 2'];
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
})

test("TC06 - Verify users try to buy an item without logging in (As a guest)", async ({ homePage, accountPage, producPage, detailPage, checkoutPage, orderStatusPage }) => {
    // Step 1: Open https://demo.testarchitect.com/
    await homePage.navigate();

    // Step 2: Navigate to 'Shop' or 'Products' section
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 3: Add a product to cart
    await producPage.chooseProduct('iPad Air 2');
    await detailPage.addToCart();

    // Step 4: Click on Cart button
    await detailPage.clickCart();

    // Step 5: Proceed to complete order
    await detailPage.clickCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage. placeOrder();

    const cfMsg =  await orderStatusPage.getSuccessMsg('Thank you. Your order has been received.');
    await expect(cfMsg).toBeVisible();
})

test("TC07 - Ensure proper error handling when mandatory fields are blank", async ({ page, homePage, accountPage, producPage, detailPage, checkoutPage }) => {
    // Pre-condition:User is at checkout
    await homePage.navigate();
    await accountPage.goToPage(PAGE_NAV.SHOP);
    await producPage.chooseProduct('iPad Air 2');
    await detailPage.addToCart();
    await detailPage.clickCart();
    await detailPage.clickCheckout();

    // Step 1: Leave mandatory fields (address, payment info) blank
    // Step 2: Click 'Confirm Order'
    await checkoutPage.placeOrder();

    // Step 3: Verify error messages (System should highlight missing fields and show an error message)
    const errorMsg = await checkoutPage.getErrMsg();
    await expect(errorMsg).toBeVisible();

    const fields = ['First name', 'Last name', 'Country / Region', 'Street address', 'Town / City', 'ZIP Code', 'Phone', 'Email address'];
    await checkoutPage.verifyFieldHighlighted(fields);
})

test("TC08 - Verify users can clear the cart", async ({ page, homePage, loginPage, accountPage, producPage, detailPage, cartPage }) => {
    // Pre-conditions: User added the items into cart
    await accountPage.goToPage(PAGE_NAV.SHOP);
    await producPage.chooseProduct('AirPods');
    await detailPage.addToCart();
    await page.goBack();
    await producPage.chooseProduct('iPad Air 2');
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
    const title = await cartPage.getEmptyCartMsg('YOUR SHOPPING CART IS EMPTY');
    await expect(title).toBeVisible();
})

test("TC09 - Verify users can update quantity of product in cart", async ({ page, homePage, loginPage, accountPage, producPage, detailPage, cartPage}) => {
    // Step 1: Open browser and go to https://demo.testarchitect.com/
    // Step 2: Login with valid credentials
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 4: Add a product
    await producPage.chooseProduct('Robotic Arm Edge');
    await detailPage.addToCart();
    const actualQuantity = await detailPage.getQuantity();
    // console.log(quantity);

    // Step 5: Go to the cart
    await detailPage.goToCart();

    // Step 6: Verify quantity of added product
    const expectedQuantity = await cartPage.getOrderedItemQuantity();
    await expect(expectedQuantity).toEqual(actualQuantity);
    
    // Step 7: Click on Plus(+) button
    await cartPage.addQuantity();

    // Step 8: Verify quantity of product and SUB TOTAL price

    
    // Step 9: Enter 4 into quantity textbox then click on UPDATE CART button
    // Step 10: Verify quantity of product is 4 and SUB TOTAL price
    // Step 11: Click on Minus(-) button
    // Step 12: Verify quantity of product and SUB TOTAL price

})