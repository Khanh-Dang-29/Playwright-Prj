import { test as base, expect } from "@playwright/test";
import { Departments } from "../dataTest/departments";
import { PAGE_NAV } from "../dataTest/pageNav";
import dotenv from 'dotenv';
import HomePage from "../page-objects/home.page";
import LoginPage from "../page-objects/login.page";
import ProductPage from "../page-objects/product.page";
import DetailPage from "../page-objects/detail.page";
import AccountPage from "../page-objects/account.page";
import CheckoutPage from "../page-objects/checkout.page";
import OrderStatusPage from "../page-objects/orderStatus.page";
import ShopPage from "../page-objects/shop.page";

const billingDetails = {
        firstName: 'Alice',
        lastName: 'Smith',
        country: 'United States (US)',
        streetAddress: 'Oak Avenue',
        city: 'Los Angeles',
        phoneNum: '9876543210'
};

const test = base.extend<{ homePage: HomePage,
                        loginPage: LoginPage,
                        accountPage: AccountPage,
                        producPage: ProductPage, 
                        detailPage: DetailPage,
                        checkoutPage: CheckoutPage,
                        orderStatusPage: OrderStatusPage,
                        shopPage: ShopPage }>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.goToLoginPage();
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        dotenv.config(); 
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.USER_NAME as string, process.env.PASSWORD as string);
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
})

test("Verify users can buy an item successfully", async ({ page, accountPage, producPage, detailPage, checkoutPage, orderStatusPage }) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Navigate to All departments section
    await accountPage.navigateToAllDepartmentsDropdown();

    // Step 4: Select Electronic Components & Supplies
    await accountPage.selectPage(Departments.ELECTRONIC_COMPONENT_AND_SUPPLIES);

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

test("Verify users can buy multiple item successfully", async ({ homePage, loginPage, accountPage, shopPage }) => {
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

test("Verify users can buy an item using different payment methods (all payment methods)", async ({ homePage, loginPage, accountPage, detailPage, producPage, checkoutPage, orderStatusPage }) => {
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
    await checkoutPage.paymentMethod('Check payments');

    // Step 7: Complete the payment process
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();

    // Step 8: Verify order confirmation message
    const cfMsg =  await orderStatusPage.getSuccessMsg('Thank you. Your order has been received.');
    await expect(cfMsg).toBeVisible();
})

test("Verify users can sort items by price", async ({ page, homePage, loginPage, accountPage, producPage }) => {
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

test("Verify orders appear in order history", async ({ page, homePage, loginPage, accountPage }) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Go to Shop page
    await accountPage.selectPage(PAGE_NAV.ORDERS);
})